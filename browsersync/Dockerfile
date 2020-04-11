FROM node:latest
WORKDIR /var/www/html

# Copying our package.json containing all the necessary dependencies
COPY package.json /var/www/html/package.json

# Installing Gulp, BrowserSync and other necessary packages
RUN npm i

# Copy our Gulpfile containing the rules
COPY gulpfile.js /var/www/html/gulpfile.js

CMD ["gulp"]