import {
  APIGatewayClient,
  CreateApiKeyCommand,
  CreateUsagePlanKeyCommand,
} from "@aws-sdk/client-api-gateway";


const client = new APIGatewayClient({ region: "us-east-1" });

async function createAndSendApiKey(merchantId) {
  // Create an API key
  const apiKeyResponse = await client.send(
    new CreateApiKeyCommand({ name: merchantId, enabled: true })
  );
  const apiKey = apiKeyResponse.id;
  const apiKeyValue = apiKeyResponse.value;

  // Associate the API key with the usage plan
  await client.send(
    new CreateUsagePlanKeyCommand({
      usagePlanId: "srer09",
      keyId: apiKey,
      keyType: "API_KEY",
    })
  );

  return apiKeyValue;
}

export default createAndSendApiKey;