import prisma, { type ApiKeyEntity } from "../database/index.js";
import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import { Instant } from "@mailtura/rpcmodel/lib/time/Instant.js";

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
