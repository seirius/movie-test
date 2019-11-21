# movie-test

## Local deploy

For this you only need have installed `docker-compose` and `docker`. Just run `docker-compose -f compose.deploy.yml up` and the app will be deployed at `http://localhost:3000` with swagger at `/swagger`.

## Development deploy

Steps to run the environment in a local machine and for development uses:
 * Install all the node packages. Run `npm install` at the root level.
 * Startup the docker containers (mysql and redis). Run `docker-compose -f compose.dev.yml up` at the root level.
 * Run the application. It uses `gulp`, `nodemon` and `ts-node` so you should, atleast, have `gulp` and `ts-node` installed globally (`npm install -g gulp ts-node`). When all set up just run `npm start`.
 * There is migrations files that must be run before executing the app, but if you use `npm start` it will run the migration by itself before running the app. In case you need to run it by your self there is a task that do it `gulp run-migration`.


If all is correct, tt should print something like this in the console:
```
Setting up controller MovieController
Setting up controller UserController
Setting up controller LoginController
Theater listenning on 3000, swagger on: http://localhost:3000/swagger
```

## Build

For building you will need to have installed `typescript` globally (`npm install -g typescript`) and run `tsc` at the root level. The output source is at `lib` directory.

## Env

For configuring the application there is a `.env`.

## Managment

Since you can only consult movies without an account you need one to create, update and delete (movies and users).
By default the app creates or updates a root user with a random password.
You can get the password by looking in the console for something like this: <br>
`[2019-11-20T18:17:15.096Z]: root password: ac4209f4-cd6a-47c8-b400-1abe7e48e4b0`

username: `root` <br>
password: the uuid from console

## Swagger

You can check the api documentation once the server is running at `/swagger`.