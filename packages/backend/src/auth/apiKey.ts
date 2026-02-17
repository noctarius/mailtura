import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { Instant } from "@mailtura/rpcmodel/time/Instant.js";
import { createHash, getRandomValues } from "node:crypto";
import { type ApiKeyEntity, type PrismaType } from "@mailtura/database";

export async function validateApiKey(prisma: PrismaType, headerApiKey: string): Promise<false | ApiKeyEntity> {
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
  const randomKey = Buffer.from(getRandomValues(new Uint8Array(64))).toString("base64");
  const checksum = createHash("sha512").update(randomKey).update(generatedAt.formatIsoTime()).digest("base64");
  return `mk.${randomKey}.${checksum}`;
}
