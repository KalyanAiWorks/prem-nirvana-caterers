#!/bin/bash
cd /home/ubuntu/prem-nirvana-caterers
npm run build
cd dist
rm -f /home/ubuntu/prem-nirvana-dist.zip
zip -r /home/ubuntu/prem-nirvana-dist.zip .
scp -P 65002 /home/ubuntu/prem-nirvana-dist.zip u181586558@88.223.85.249:~/
ssh -p 65002 u181586558@88.223.85.249 "cd domains/premnirvanacaterers.com/public_html && rm -rf * && cd ~ && unzip -o prem-nirvana-dist.zip -d domains/premnirvanacaterers.com/public_html/ && rm prem-nirvana-dist.zip"
echo "Deployed to premnirvanacaterers.com"
