FROM node:13.1.0-alpine

WORKDIR /usr/src/app

COPY ./src ./src
COPY ./migrations ./migrations
COPY ./gulpfile.js ./
COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./resources ./resources
COPY ./docker-run-script.sh ./

RUN npm install -g gulp -g typescript && npm install
RUN tsc

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN chmod +x docker-run-script.sh

EXPOSE 3000/tcp

ENTRYPOINT [ "./docker-run-script.sh" ]

