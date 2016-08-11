##Scalene server
Branch name: server

##Scalene client
Branch name: ui

##Scalene mobile
Branch name: mobile

##DB data
Branch name: dbdata

##Scalene .NET
Branch name: net

##Scalene Python
Branch name: python

Installation instructions:
 
1. Log in to the docker hub
sudo docker login
 
2. Create docker image
sudo docker build --no-cache -t ashemyakin/case-3-python .
 
3. Upload image to the docker hub
sudo docker push ashemyakin/case-3-python
 
4. Upload docker to stackato
stackato push --no-prompt --docker-image ashemyakin/case-3-python --as case-3-python-docker \
                --env PROVIDER='stackato_python' \
                --env MYSQL_HOST='52.42.203.17' \
                --env MYSQL_USER='hpsa' \
                --env MYSQL_PASS='demo' \
                --env MYSQL_PORT='3306' \
                --env MYSQL_DB='hpsa_demo'
