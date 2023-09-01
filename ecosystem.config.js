module.exports = {
  apps: [
    {
      name: 'uptime-development',
      script: './server.js',
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'uptime-staging',
      script: './server.js',
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'staging',
      },
    },
    {
      name: 'uptime-production',
      script: './server.js',
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
