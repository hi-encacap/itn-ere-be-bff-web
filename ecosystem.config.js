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
    // {
    //   name: 'encacap-re-api',
    //   script: 'npm',
    //   args: 'run start:prod',
    //   env: {
    //     NODE_ENV: 'production',
    //   },
    // },
  ],
};
