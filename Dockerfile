FROM php:5.6-apache

RUN a2enmod rewrite

# install the PHP extensions we need
RUN apt-get update && apt-get install -y libpng12-dev libjpeg-dev && rm -rf /var/lib/apt/lists/* \
	&& docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr \
	&& docker-php-ext-install gd
RUN docker-php-ext-install mysqli

# upstream tarballs include ./wordpress/ so this gives us /usr/src/wordpress
RUN curl -o wordpress.tar.gz -SL https://wordpress.org/latest.tar.gz \
	&& tar -xzf wordpress.tar.gz --strip-components=1 -C /var/www/html/ \
	&& rm wordpress.tar.gz \
	&& chown -R www-data:www-data /var/www/html/

# Install the Node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs

WORKDIR /var/www/html

# Installing Gulp, BrowserSync and other Necessary packages
COPY package.json /var/www/html/package.json
RUN npm install -g browser-sync gulp --save-dev
RUN npm install gulp-sass gulp-concat gulp-rename gulp-uglify gulp-sourcemaps --save-dev

# Links the global packages
RUN npm link gulp
RUN npm link browser-sync

COPY docker-entrypoint.sh /entrypoint.sh
COPY gulpfile.js /var/www/html/gulpfile.js

# grr, ENTRYPOINT resets CMD now
ENTRYPOINT ["/entrypoint.sh"]

# CMD ["apache2-foreground && gulp"]
CMD ["apache2-foreground"]
