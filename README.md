#Scalene Case 3

###Use case: Move Applications to Cloud
MEAN version of "Scalene Expense Manager" application available for deploying in Helion Stackato environment.

##Sub-projects
###Scalene server
Branch name: ***server***

####Deploy instructions
1. `stackto target`
2. `stackato login`
3. `stackato push`

###Scalene client
Branch name: ***ui***

####Deploy instructions
1. `stackto target`
2. `stackato login`
3. `stackato push --no-prompt --env SERVER_URI='[scalene-server-uri]'`

###Scalene mobile
Branch name: ***mobile***

Node.js application representing how Scalene Expense Manager can be implemented for mobile phones.

####Deploy instructions

1. Use "PROVIDER" environment variable to configure provider title
2. Push to stackato.

###DB data
Branch name: ***dbdata***

Application that populates Scalene db with data.

####Deploy instructions
1. Open manifest.yml. 
2. Update IMAGE_SERVER_URL so it will point to your stackato scalene server deployment.
3. Make sure that mongo db service has the same name as for the scalene server
4. Deploy data to stackato
5. Server will connect to mongo and deploy data
6. Delete dbdata server from stackato

###Scalene .NET
Branch name: ***net***

Demo showing how to deploy and run .net applications in stackato.

####Deploy instructions

1. Go to the PublicBinaries folder.
2. Run `stackato push -n --stack win2012r2 --buildpack dotnet`
3. Use "Provider" environment variable to configure provider title
4. Use "CaseServer" to specify the back-end server
5. All configuration parameters are available in the web.config file

###Scalene Python
Branch name: ***python***

####Deploy instructions
 
1. Log in to the docker hub
`sudo docker login`
 
2. Create docker image
`sudo docker build --no-cache -t ashemyakin/case-3-python .`
 
3. Upload image to the docker hub
`sudo docker push ashemyakin/case-3-python`
 
4. Upload docker to stackato
```
stackato push --no-prompt --docker-image ashemyakin/case-3-python --as case-3-python-docker \
                --env PROVIDER='stackato_python' \
                --env MYSQL_HOST='52.42.203.17' \
                --env MYSQL_USER='hpsa' \
                --env MYSQL_PASS='demo' \
                --env MYSQL_PORT='3306' \
                --env MYSQL_DB='hpsa_demo'
```
