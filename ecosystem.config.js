module.exports = {
  apps: [
    {
      name: 're-api-stg',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'staging',
      },
    },
  ],
};
