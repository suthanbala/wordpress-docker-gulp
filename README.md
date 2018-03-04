
![Docker](./readme-assets/docker-logo.png)
![WordPress](./readme-assets/wp-logo.png)
![Gulp and SASS](./readme-assets/gulp-sass-logo.png)

# WordPress Docker Gulp
> If you are one of those people who has to configure Gulp to compile SASS assets, concat and minify JS files, and Hot Reload for every single one of your WordPress projects, then this project is for you. On this project, we've utilized Docker to setup a container with latest version of WordPress and setup Gulp. All you need to do is, run `docker-compose up wordpress` on your terminal and it will fire up the docker running Apache webserver to serve the WordPress and BrowserSync to hot reload. You can then access your site at the domain you've set in the `.env` file, e.g. yourdomain.com (this would be a normal WordPress site without the hot reloading enabled), you can access the hot reloading enabled version of the site at http://yourdomain.com/:3000.

## Features
- Just worry about the things you are actually modifying for development (`themes` and `plugins` folders from `wp-content`)
- Less configuration
- Comes with the PHPMyAdmin built-in, so you can manage the database
- You can benefit from what [BrowserSync](https://www.browsersync.io/) has to offer:
  - Hot reloading
  - Mobile Debugging
  - Your scroll, click, refresh and form actions are mirrored between browsers while you test.
  - ..these are just a few to list, visit [BrowserSync](https://www.browsersync.io/) for more details

## Installing / Getting started

You may start by cloning the directory to your machine. Naming the project as the domain name is a good practice.

```shell
git clone https://github.com/suthanbala/wordpress-docker-gulp.git dev.yourdomain.com
```

You should now have the following structure:

```
dev.yourdomain.com
│   readme-assets
└───src
│   └───themes
│   └───plugins
│   .env
│   docker-compose.yml
│   docker-entrypoint.sh
│   Dockerfile
│   gulpfile.js
│   package.json
│   README.md
```

The only location you will need to work are inside the **src** directory

## Configuration

`SITE_URL` in the .env file reflects the domain that you'll be working on. Make sure you add that domain to your host file.

Default Database configuration:

- Username: `root`
- Password: `example`

## Developing

### Built With
- [Docker](https://www.docker.com/)
- [WordPress](https://wordpress.org/)
- [BrowserSync](http://browsersync.io)
- [NodeJS](https://nodejs.org/)

### Prerequisites
You must have [Docker](https://www.docker.com/) installed on your machine. Everything outlined in this project gets run within the Docker container. Docker will download them and install them into the container during the build process.


### Setting up Dev

You may want to add a `host` entry to your machine, possibly with a prefix to avoid any conflicts may arise when going production. Run `sudo nano /etc/hosts`  in your terminal if you're on Unix/MacOS, or, open NotePad as administrator, then open `C:\Windows\System32\drivers\etc\hosts` if you're on Windows. Then  append the following line `127.0.0.1	dev.yourdomain.com` to the hosts file.

```shell
git clone https://github.com/suthanbala/wordpress-docker-gulp.git dev.yourdomain.com
```
Go into the directory and update the `SITE_URL`  in your `.env` file to the domain you're working on. Once that's done, in your terminal, run the following to build the container:
```
docker-compose build
```
Now that you have the toolkit ready, you need a skeleton theme to start . I normally start off here, [Underscores](http://underscores.me/), it comes pre-packaged with a lot of WordPress recommended presets, and all necessary templates, HTML5 markup, and even SASS. I recommend you go to [Underscores](http://underscores.me/), expand that advanced options, set the namespaces and most importantly check that `sassify` option. Download the theme, and extract it into the `src/themes/` directory.

Currently two directories are mounted into the projects:
`src/themes/*` --> `wp-content/themes/`
`src/plugins/*` --> `wp-content/plugins/`

#### Working with SASS
The project is set to watch for any changes made to any sass files located in the directory **src/themes/yourtheme/sass/** (if you are using Underscores generated theme, then all the SASS files are already in here), and re-compile the **style.scss** and output them into **src/themes/yourtheme/style.css**.

If you have multiple scss files, be sure to import them into the style.scss using `@import`.

#### Working with JS
Create a new folder called **src** folder in your **src/themes/yourtheme/js/**. Place all your JavaScript files in that folder (**src/themes/yourtheme/js/src/**).

The project is set to watch for any changes made in the **src/themes/yourtheme/js/src** folder and create a combined and minified  **src/themes/yourtheme/js/main.js**.

#### Managing Database
The project comes with the PHPMyAdmin configured to manage the site admin. You can access the PHPMyAdmin at [localhost:8080](http://localhost:8080).

### Deploying / Publishing

While developing a WordPress theme, you are only making changes to either theme and plugins folder. Essentially, when you go live, you need to install WordPress, then copy the theme and the plugins from the src directory into the wp-content folder on the server.

During this early phase in the tool, we do not have a sufficient way to do a database/assets export yet. They are coming soon though.

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).
