const { Verifier } = require('@pact-foundation/pact');
const path = require("path");

jest.setTimeout(10000)

const verifier = new Verifier({
    provider: 'api-provider',
    providerBaseUrl: 'https://www.boredapi.com/api',
    // pactUrls: [ path.resolve(process.cwd(), "./pacts/api-consumer-api-provider.json") ],
    pactBrokerUrl: 'http://localhost:9292',
    publishVerificationResult: true,
    providerVersion: '1.0.0',
});

describe('Pact Verification', () => {
    test('should validate the expectations of API request', () => {
        return verifier.verifyProvider();
    });
});
