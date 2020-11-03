#!/bin/bash
docker kill $(docker ps -q)
killall node
cd /root/masm && git stash && git checkout master && git pull
cd /root/assembler-submit-engine && git stash && git checkout master && git pull

cd /root/assembler-submit-engine  
nohup npm run start &