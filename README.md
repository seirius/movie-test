# movie-test

## Local deploy

Execute `npm install`, run the docker compose file with `docker-compose -f compose.dev.yml up` and deploy the application by running `npm start`.

It should print something like this in the console:

```
Setting up controller MovieController
Setting up controller UserController
Setting up controller LoginController
Theater listenning on 3000, swagger on: http://localhost:3000/swagger
```

## Managment

Since you can only consult movies without an account you need one to create, update and delete (movies and users).
By default the app creates or updates a root user with a random password.
You can get the password by looking in the console for something like this: <br>
`[2019-11-20T18:17:15.096Z]: root password: ac4209f4-cd6a-47c8-b400-1abe7e48e4b0`

username: `root` <br>
password: the uuid from console

## Swagger

You can check the api documentation once the server is running at `/swagger`.