#!/bin/bash
set -e

cd /var/www/front.minecraftstories.gg/ || exit

if [[ $1 == "pullnbuild" ]]; then
    git pull
    npm cache clean -f
    npm install
    npm run build
elif [[ $1 == "restartpm2" ]]; then
    pm2 restart front-gg
    exit 0
else
    exit 0
fi

echo "############## We are live now with new changes ##############"
