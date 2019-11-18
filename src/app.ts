import { TheaterServer } from './TheaterServer';

function run(): void {
    try {
        new TheaterServer().start();
    } catch (error) {
        console.error(error);
    }
}

run();