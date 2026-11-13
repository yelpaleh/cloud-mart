#!/bin/sh
rm -rf /tmp/app
mkdir -p /tmp/app
cp -r /home/site/wwwroot/dist/. /tmp/app/
printf '{"APP_ENV":"%s"}' "${APP_ENV:-Unknown}" > /tmp/app/env.json
exec pm2 serve /tmp/app --no-daemon --spa