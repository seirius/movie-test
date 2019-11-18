const gulp = require('gulp');
const run = require('gulp-run');
const nodemon = require('gulp-nodemon');

gulp.task('gen-migration', () => {
    return run('ts-node ./node_modules/typeorm/cli.js migration:generate -n Migration').exec();
});

gulp.task('run-migration', () => {
    return run('ts-node ./node_modules/typeorm/cli.js migration:run').exec();
});

gulp.task('deploy', (done) => {
    nodemon({
        script: 'src/app.ts',
        done
    });
});