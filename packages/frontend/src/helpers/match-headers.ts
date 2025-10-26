import { partial_ratio } from "fuzzball";
import { Searcher, sortKind } from "fast-fuzzy";

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

export interface Field {
  key: string;
  label: string;
}

export interface MatchOptions {
  synonyms?: Record<string, string[]>;
  fuzzyThreshold?: number;
  useFastFuzzy?: boolean;
  useFuzzball?: boolean;
}

export interface MatchResult {
  index: number;
  header: string;
  bestMatch: string | null;
  confidence: number;
}

function bestMatch(
  currentHeader: string,
  index: number,
  availableHeaders: Field[],
  options: MatchOptions = {}
): MatchResult {
  const { synonyms = {}, fuzzyThreshold = 0.75, useFastFuzzy = true, useFuzzball = true } = options;

  const normalizedHeader = normalize(currentHeader);
  let best: { key: string; score: number } = { key: "", score: 0 };

  // Precompute a fast-fuzzy finder
  const searcher = useFastFuzzy ? new Searcher(availableHeaders.map(h => h.label)) : null;

  for (const header of availableHeaders) {
    const normalizedField = normalize(header.label);
    let score = 0;

    // 1️⃣ Exact or substring match
    if (normalizedHeader === normalizedField) {
      score = 1;
    } else if (normalizedHeader.includes(normalizedField) || normalizedField.includes(normalizedHeader)) {
      score = 0.9;
    }

    // 2️⃣ Synonym check
    const headerSynonyms = synonyms[header.key] || [];
    if (headerSynonyms.some(s => normalize(s) === normalizedHeader)) {
      score = Math.max(score, 0.95);
    }

    // 3️⃣ Fuzzy scoring (fast-fuzzy)
    if (useFastFuzzy && searcher) {
      const match = searcher.search(currentHeader, { sortBy: sortKind.bestMatch, limit: 1, returnMatchData: true });
      if (match && match[0]) {
        score = Math.max(score, match[0].score);
      }
    }

    // 4️⃣ Fuzzy scoring (fuzzball)
    if (useFuzzball) {
      const fuzzScore = partial_ratio(currentHeader, header.label) / 100;
      score = Math.max(score, fuzzScore);
    }

    if (score > best.score) {
      best = { key: header.key, score };
    }
  }

  return {
    index: index,
    header: currentHeader,
    bestMatch: best.score >= fuzzyThreshold ? best.key : null,
    confidence: best.score,
  };
}

export function mapHeaders(
  headers: string[],
  availableHeaders: Field[],
  options: MatchOptions = {}
): Record<string, MatchResult> {
  return headers.reduce((reduced, header, index) => {
    return {
      ...reduced,
      [header]: bestMatch(header, index, availableHeaders, options),
    };
  }, {});
}
