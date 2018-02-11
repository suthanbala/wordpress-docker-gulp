![Docker](./readme-assets/docker-logo.png)
![WordPress](./readme-assets/wp-logo.png)
![Gulp and SASS](./readme-assets/gulp-sass-logo.png)

# WordPress Docker Gulp
> If you are one of those people who has to configure Gulp to compile SASS assets, concat and minify JS files, and Hot Reload for every single one of your WordPress projects, then this project is for you. On this project, we've utilized Docker to setup a container with latest version of WordPress and setup Gulp. All you need to do is, run `docker-compose up wordpress` on your terminal and it will fire up the docker running Apache webserver to serve the WordPress and BrowserSync to hot reloadm. It will fire up

This docker image can be used for WordPress site development. When you build the container on your machine, we will download the latest Wordpress and put it into the web root folder (`/var/www/html` in our case)

## Installing / Getting started

You may start by cloning the directory to your machine

```shell
docker-compose build wordpress
```

Here you should say what actually happens when you execute the code above.

## Developing

### Built With
List main libraries, frameworks used including versions (React, Angular etc...)

### Prerequisites
What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/your/your-project.git
cd your-project/
packagemanager install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing
give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).


## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

## Tests

Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

## Style guide

Explain your code style and show how to check it.

## Api Reference

If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.


## Database

Explaining what database (and version) has been used. Provide download links.
Documents your database design and schemas, relations etc... 

## Licensing

State what the license is and how to find the text version of the license.
