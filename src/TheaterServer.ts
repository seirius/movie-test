import { Server } from '@overnightjs/core';
import { json, urlencoded } from 'body-parser';
import { createConnection } from 'typeorm';
import { MovieController } from './services/movies/Movie.controller';
import * as fileUpload from 'express-fileupload';
import { static as useStatic } from 'express';
import { UserController } from './services/users/User.controller';
import * as expressSession from 'express-session';
import * as cookieParser from 'cookie-parser';
import { initialize, session as passportSession } from 'passport';
import { LoginController } from './services/users/Login.controller';
import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';
import * as swagger from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
const RedisClient = createClient();
const RedisStore = connectRedis(expressSession);

const specs = swagger({
    apis: ['**/*.controller.ts'],
    swaggerDefinition: {
        info: {
            description: 'Theater API',
            title: 'Movie theater',
            version: '1.0.0',
        },
    },
});

export class TheaterServer extends Server {

    public static readonly port = 3000;

    constructor() {
        super(true);
    }

    public async start(): Promise<void> {
        this.app.use(json());
        this.app.use(urlencoded({extended: true}));
        this.app.use(fileUpload());
        this.app.use(expressSession({
            secret: '35bd804c-7225-4949-b767-56c7a8cc66e1',
            saveUninitialized: true,
            resave: false,
            name: 'redis_session_store',
            store: new RedisStore({
                host: 'localhost',
                port: 6379,
                client: RedisClient,
            }),
        }));
        this.app.use(cookieParser());
        this.app.use(initialize());
        this.app.use(passportSession());
        this.app.use('/images', useStatic('resources/images'));
        this.app.use(
            '/swagger',
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
        await createConnection();
        this.addControllers([
            new MovieController(),
            new UserController(),
            new LoginController(),
        ]);
        this.app.listen(TheaterServer.port, () => console.log(`Theater listenning on ${TheaterServer.port}, swagger on: http://localhost:${TheaterServer.port}/swagger`));
    }

}