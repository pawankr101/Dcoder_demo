# From ubuntu:latest
# MAINTAINER pawan.akshay@gmail.com
# RUN apt-get update
# RUN apt-get -qq -y install curl
# RUN curl -sL https://deb.nodesource.com/setup_12.x
# RUN apt-get install -y nodejs build-essential
# RUN curl -L https://www.npmjs.com/install.sh | sh
# RUN node -v
# RUN npm -v
# RUN npm install -g nodemon
# COPY ./package.json dockerdir/
# RUN cd dockerdir && npm install
# COPY . dockerdir/
# WORKDIR dockerdir/
# CMD ["npm", "run", "buildandrun"]
# # RUN cd dockerdir && npm run buildandrun

FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm", "run", "buildandrun"]