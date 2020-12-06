#!/bin/bash
cd "/var/www/beautybox-base"
yarn link

cd "/var/www/beautybox-ui-kit"
yarn link "@beautybox/core"

tail -f "/dev/null"
