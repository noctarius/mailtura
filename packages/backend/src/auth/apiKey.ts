import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import { Instant } from "@mailtura/rpcmodel/lib/time/Instant.js";
import { createHash, getRandomValues } from "node:crypto";
import prisma, { type ApiKeyEntity } from "@mailtura/database";

export async function validateApiKey(headerApiKey: string): Promise<false | ApiKeyEntity> {
  const apiKey = await prisma.api_keys.findUnique({
    where: {
      key: headerApiKey,
    },
  });

  if (!apiKey || !apiKey.active) {
    return false;
  }

  const expired = apiKey.expires_at && UTC.now().before(Instant.fromDate(apiKey.expires_at));
  if (expired) {
    return false;
  }

  return apiKey;
}

export function generateNewKey(generatedAt: Instant) {
  const randomKey = getRandomValues(new Uint8Array(64)).toBase64();
  const checksum = createHash("sha512").update(randomKey).update(generatedAt.formatIsoTime()).digest("base64");
  return `mk.${randomKey}.${checksum}`;
}
