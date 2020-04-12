FROM node:latest
WORKDIR /var/www/html

# Copying our package.json containing all the necessary dependencies
COPY package.json /var/www/html/package.json

# Installing Gulp, BrowserSync and other necessary packages
RUN npm i

# Copy all the Gulp related files
COPY gulp ./gulp
COPY ./gulpfile.js ./gulpfile.js

EXPOSE 3000
EXPOSE 3001

CMD ["npm run watch"]