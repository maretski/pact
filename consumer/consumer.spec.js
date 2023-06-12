const {Pact} = require('@pact-foundation/pact');
const path = require('path');
const axios = require('axios');
const { like } = require('@pact-foundation/pact').Matchers;

const provider = new Pact({
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: 'api-consumer',
    provider: 'api-provider',
    logLevel: 'debug',
    port: 1234,
})

describe('API Service', () => {
    beforeAll(async () => {
        await provider
            .setup()
            .then(() => {
                provider.addInteraction({
                    uponReceiving: 'send GET pet by status',
                    withRequest: {
                        method: 'GET',
                        path: '/activity',
                        query: {
                            participants: '1',
                        },
                        headers: { Accept: "application/json, text/plain, */*" },
                    },
                    willRespondWith: {
                        status: 200,
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        body: like(
                            {
                                participants: 1,
                            }
                        ),
                    }
                })
            })
    });

    describe('test', () => {
        test('should return correct data', async () => {
            const res = await axios.get(`${provider.mockService.baseUrl}/activity?participants=1`)
            expect(res.status).toEqual(200);
            expect(res.data.participants).toEqual(1);
        })

        afterEach(async () => provider.verify())
        afterAll(async () => provider.finalize())
    })
})
