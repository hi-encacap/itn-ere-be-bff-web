module.exports = {
  apps: [
    {
      name: 'encacap-re-api-stg',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'staging',
      },
    },
  ],
};
