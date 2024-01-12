const { testRoute } = require('../../../lib/helpers/tester');

testRoute(
  [
    {
      description: 'GET /v1/health',
      setUpCallback: () => {
        const buildRequest = {
          url: '/v1/health',
          method: 'GET',
        };
        return buildRequest;
      },
      testCallback: ({ response, tap }) => {
        const { statusCode, statusMessage } = response;
        tap.equal(statusCode, 200);
        tap.equal(statusMessage, 'OK');
      },
    },
  ],
);
