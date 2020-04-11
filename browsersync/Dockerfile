FROM node:latest
WORKDIR /var/www/html

# Copying our package.json containing all the necessary dependencies
COPY package.json /var/www/html/package.json
COPY helpers helpers

# Installing Gulp, BrowserSync and other necessary packages
RUN npm i

EXPOSE 3000
EXPOSE 3001

# Copy our Gulpfile containing the rules
COPY gulpfile.js /var/www/html/gulpfile.js

CMD ["gulp"]