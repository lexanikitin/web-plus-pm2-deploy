const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  ENV_DEPLOY_USER,
  ENV_DEPLOY_HOST,
  ENV_DEPLOY_PATH,
  ENV_DEPLOY_REF,
  ENV_DEPLOY_GIT_USER,
  ENV_DEPLOY_REPO_NAME,
} = process.env;

module.exports = {
  apps: [
    {
      name: "backend",
      script: "./dist/app.js",
    },
  ],

  deploy: {
    production: {
      user: ENV_DEPLOY_USER,
      host: ENV_DEPLOY_HOST,
      ref: ENV_DEPLOY_REF,
      repo: `git@github.com:${ENV_DEPLOY_GIT_USER}/${ENV_DEPLOY_REPO_NAME}.git`,
      path: ENV_DEPLOY_PATH,
      ssh_options: "StrictHostKeyChecking=no",
      "pre-deploy-local": `scp .env ${ENV_DEPLOY_USER}@${ENV_DEPLOY_HOST}:${ENV_DEPLOY_PATH}`,
      "post-deploy":
        "cd backend && npm i && npm run build && pm2 reload ecosystem.config.js && pm2 save",
    },
  },
};