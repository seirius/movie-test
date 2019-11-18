import { Server } from '@overnightjs/core';
import { json, urlencoded } from 'body-parser';
import { createConnection } from 'typeorm';
import { MovieController } from './services/movies/MovieController';

export class TheaterServer extends Server {

    public static readonly port = 3000;

    public async start(): Promise<void> {
        this.app.use(json());
        this.app.use(urlencoded({extended: true}));
        await createConnection();
        this.addControllers([
            new MovieController(),
        ]);
        this.app.listen(TheaterServer.port, () => console.log(`Theater listenning on ${TheaterServer.port}`));
    }

}