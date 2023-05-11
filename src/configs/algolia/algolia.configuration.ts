import { registerAs } from '@nestjs/config';

const algoliaConfiguration = registerAs('algolia', () => ({
  appID: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
}));

export default algoliaConfiguration;
