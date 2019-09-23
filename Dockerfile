FROM node:11-alpine

WORKDIR /usr/src/app

# environment vars must be included in dockerfile

ARG NODE_ENV=production
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /usr/src/app

# silent so we don't have to watch the whole thing download everytime
RUN npm install --silent 
RUN npm run heroku-postbuild

# Start application
CMD ["npm", "start"]