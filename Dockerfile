# K.U.R.E.U.I.L
#
# VERSION v3-bundle
#

FROM ubuntu:16.04

# updates / installations

RUN apt-get update
RUN apt-get install build-essential -y checkinstall -y libssl-dev -y 
RUN apt-get install curl -y wget -y
RUN apt-get install git -y
RUN apt-get install nodejs -y npm -y
RUN (npm cache clean -f -y && npm install -g n && n stable)
RUN npm install -g @angular/cli

# get kureuil-web
COPY . /kureuil-web

#open port 4200
EXPOSE 4200

#install kureuil-web
RUN (cd /kureuil-web && npm install)

# start kureuil-web
CMD (cd /kureuil-web/ && npm run start)

