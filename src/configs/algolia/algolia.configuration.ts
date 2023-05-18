import { registerAs } from '@nestjs/config';

const algoliaConfiguration = registerAs('algolia', () => ({
  appID: process.env.API_ALGOLIA_APP_ID,
  apiKey: process.env.API_ALGOLIA_API_KEY,
}));

export default algoliaConfiguration;
