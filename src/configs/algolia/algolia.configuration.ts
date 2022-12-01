const algoliaConfiguration = () => ({
  appID: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
});

export default algoliaConfiguration;
