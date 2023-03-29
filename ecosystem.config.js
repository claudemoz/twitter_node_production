module.exports = {
  apps : [{
    script: './bin/www',
    watch: true,
    instances : "max",
    autorestart: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
}],

  deploy : {
    production : {
      user : 'ubuntu',
      host : '51.38.237.251',
      ref  : 'origin/main',
      repo : 'https://github.com/claudemoz/twitter_node_production.git',
      path : '/home/ubuntu/twitter',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
