
![Docker](./readme-assets/docker-logo.png)
![WordPress](./readme-assets/wp-logo.png)
![Gulp and SASS](./readme-assets/gulp-sass-logo.png)

# WordPress Docker Gulp
If you are one of those people who has to configure Gulp to compile SASS assets, concat and minify JS files, and Hot Reload for every single one of your WordPress projects, then this project is for you. On this project, we've utilized Docker to setup a container with latest version of WordPress and setup Gulp. All you need to do is, run `docker-compose up` on your terminal and it will fire up the docker running **Webserver to serve the WordPress** and **Node Server** to compile **SASS to CSS**, minify and concatenate JavaScript and to hot reload.

You can then access your site at the domain you've set in the `.env` file. For example, if you site the `SITE_URL` to be yourdomain.com, then accessin this URL on your browser will bring up the normal WordPress site without the hot reloading enabled. You can access the hot reloading enabled version of the site at http://yourdomain.com/:3000.

## Features
- Just worry about the things you are actually working with (`themes` and `plugins` folders from `wp-content`)
- Less configuration
- Comes with the PHPMyAdmin built-in, so you can manage the database
- You can benefit from what [BrowserSync](https://www.browsersync.io/) has to offer:
  - Hot reloading for JavaScripts and Style Injection for CSS changes
  - Mobile Debugging
  - Your scrolls, clicks, refresh and form actions are mirrored between different devices and browsersers
  - ..these are just a few to list, visit [BrowserSync](https://www.browsersync.io/) for more details

## Installing / Getting started

You may start by **cloning** this repo your machine. If you are working on an existing site, then copy the themes in to `src/themes/`, plugins into `src/plugins/` and the uploads into `src/uploads`. Also, if you have the Database SQL file, then place it inside the `src/initial-db` directory.

```shell
git clone https://github.com/suthanbala/wordpress-docker-gulp.git dev.yourdomain.com
git remote rm origin
```
The command above clones the repo to your machine, then disassociate the repo. You can then commit to your own repo.

You should now have the following structure:

```
dev.yourdomain.com
│   readme-assets
└───src
│   └───themes
│   └───plugins
│   └───uploads
│   └───initial-db
│   └───...
└───scripts
│   └───...
│   .env
│   docker-compose.yml
│   Dockerfile
│   ...
```

The work directory will be **src**.

## Development

### Built With
- [Docker](https://www.docker.com/)
- [WordPress](https://wordpress.org/)
- [BrowserSync](http://browsersync.io)
- [NodeJS](https://nodejs.org/)
- [SASS](https://sass-lang.com/)

### Pre-requisites
You must have [Docker](https://www.docker.com/) installed on your machine. Everything outlined in this project gets run within the Docker container. Docker will download them and install them into the container during the build process.

### Setup

You may want to add a `host` entry to your machine for the website you'll be creating. Run `sudo nano /etc/hosts`  in your terminal if you're on Unix/MacOS, or, open NotePad as administrator, then open `C:\Windows\System32\drivers\etc\hosts` if you're on Windows. Then  append the following line `127.0.0.1	yourdomain.com` to the hosts file. This will ensure, whenever you hit `yourdomain.com` on your machine, it points to your machine than going out to the internet.

```shell
git clone https://github.com/suthanbala/wordpress-docker-gulp.git dev.yourdomain.com
```

#### Setting the environment

Go into the working directory and update the `SITE_URL` in your `.env`. Make sure you add that domain to your host file [Instructions here](https://support.rackspace.com/how-to/modify-your-hosts-file/). Once that's done, in your terminal, run the following command to build the containers:
```
docker-compose build
```

Now that you have the toolkit ready, you need a skeleton theme to start . You can create one at [Underscores](http://underscores.me/), it comes pre-packaged with a lot of WordPress recommended presets, and all necessary templates, HTML5 markup, and even SASS. To get the SASS enabled theme, click on **Advanced Options**, then check the `_sassify` option. Download the theme, and extract it into the `src/themes/` directory.

Currently three directories are mounted into the projects:

- `src/themes/*` --> `wp-content/themes/`
- `src/plugins/*` --> `wp-content/plugins/`
- `src/uploads/*` --> `wp-content/uploads/`

#### Paths
Gulp is configured to watch for any JS and SCSS files within your themes. JS is split into two categories, one being the plugins, and the second being the app.js. We separated the plugins so they can be loaded first to the page. Then the app.js can utilize that.

The files must be placed like the following:
```
- themes
│   └───my-theme
    │   └───src
        │   └───sass
            │   └───styles.scss
            │   └───...
        │   └───js
            │   └───script1.js
            │   └───script2.js
                │   └───plugins
                    │   └───jquery.js
                    │   └───flexslider.js
    │   └───...
```

#### Working with SASS
The project is set to watch for any changes made to any sass files located in the directory **src/themes/yourtheme/src/sass/**. If you are using Underscores generated theme, then please move the `themename/sass` folder into `themename/src/sass`. Gulp watches and compiles the SASS from **src/themes/themename/src/sass/style.scss** to **src/themes/themename/style.css**.

If you have multiple scss files, be sure to import them into the `style.scss` using `@import` directive.

#### Working with JS
Please your Javascripts in the **src/themes/themename/src/js**. If it's a plugin, then place them in **src/themes/themename/src/js/plugins/**. Anything else can go directly in the **src/themes/themename/src/js**. 

This ensures we combine and concat all the plugins together and load them ahead of the `app.js`. When we load the `app.js`, we can be sure that all the plugins have been loaded.

Gulp is set to watch for any changes made in the **src/themes/yourtheme/src/js/*.js** folder and create a combined and minified  **src/themes/yourtheme/js/main.min.js**. Also, the **src/themes/yourtheme/src/js/plugins/*.js** folder and create a combined and minified  **src/themes/yourtheme/js/plugins.min.js**

#### Managing Database
The project comes with the PHPMyAdmin configured to connect to the MYSQL database without any credentials. You can access the PHPMyAdmin at [localhost:8080](http://localhost:8080).

### Deploying / Publishing

While developing a WordPress theme, you are only making changes to either theme and plugins folder. However, when you are ready to deploy, you need the WordPress core files and database.

Not to worry, we have that covered as well. You can run the `./scripts/export_all.sh` bash command. This will copy the WordPress core files and database SQL from the Docker container and place them in the `./build` folder.

You can then upload them to your server.

## Build
- To fully export the project, run the `export_all.sh` bash script located in the `scripts` folder. This will export all the source code and the SQL file into the `build` directory.
- If you just need the database, you can run the `/scripts/export_db.sh` Bash script. This will create a `db.sql` in the `build` directory.
- If you just need the source files to be exported, you can run the `/scripts/export_src.sh` Bash script. This will copy all the source code including the themes, and plugins with the proper WordPress structure in to `build/html` directory.