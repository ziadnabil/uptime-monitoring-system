# echo 'Kill all the running PM2 actions'
# sudo pm2 kill

echo 'Update app from Git'
git pull

echo 'Install app dependencies'
sudo rm package-lock.json
sudo npm install

echo 'restart app'
# pm2 start server.js --name uptime -i 3 --watch # only need that in case of first deployment
pm2 kill
pm2 save --force
pm2 start ecosystem.config.json
pm2 save --force
