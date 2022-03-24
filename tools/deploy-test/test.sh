#!/bin/bash

set -e

docker run -itd -v \
	$(PWD)/out:/usr/share/nginx/html \
	-p 8123:80 \
	--name deploy-test \
	nginx:1.21.6-alpine

# just dummy smoke test, TODO: add real tests
curl localhost:8123 | grep 'Alman Akka' > /dev/null

docker stop deploy-test
docker rm deploy-test

