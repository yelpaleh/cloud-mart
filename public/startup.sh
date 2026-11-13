#!/bin/sh
# Copy the built app to a writable folder (wwwroot can be read-only with zip deploy)
rm -rf /tmp/app
mkdir -p /tmp/app
cp -r /home/site/wwwroot/. /tmp/app/

# Generate runtime config from the Azure App Setting
printf '{"APP_ENV":"%s"}' "${APP_ENV:-Unknown}" > /tmp/app/env.json

# Serve the SPA
pm2 serve /tmp/app --no-daemon --spa