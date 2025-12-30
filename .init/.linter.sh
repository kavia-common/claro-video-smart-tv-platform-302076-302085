#!/bin/bash
cd /home/kavia/workspace/code-generation/claro-video-smart-tv-platform-302076-302085/frontend_smart_tv_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

