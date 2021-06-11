# pizza 🍕

## What's going on here?
- [Environment Setup 📦](#environment-setup-)
- [Docker Setup 🐳](#docker-setup-)
- [Database Setup 🛠](database-setup-)
- [Launch 🚀](#launch-)
- [Health Check 🏥](#health-check-)

## Environment Setup 📦
Default config to be sync with `./.vscode/launch.json` is to put `.env` under `./.env/` folder. Here the required environment list:

```
NODE_ENV
APP_NAME
APP_PORT
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
REDIS_HOST
REDIS_PORT
REDIS_PASSWORD
REDIS_DB
AUTH0_DOMAIN
NATS_SERVER
NATS_PORT
```

## Docker Setup 🐳
By default we use `Postgres` and `NATS`. You can configure with your own Database but dont forget to change DBMS `type` under `./ormconfig.ts` file.

```bash
$ docker network create krenolc-network
$ docker create --name postgres-krenolc --network krenolc-network -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:9.6.22-alpine
$ docker container create --name redis-krenolc --network krenolc-network -p 6379:6379 redis:6.2.3-alpine
$ docker container start postgres-krenolc
$ docker container start redis-krenolc
```

## DB Setup 🗄
### DB Creation 💾

Create the DB with the same name as you put on `DB_NAME` environment.

```bash
$ docker exec -it postgres-krenolc bash
$ psql
$ CREATE DATABASE dbname;
$ \l
```
### DB Migration 🔃

Pointing `ENV_PATH` with your `.env` file to running the DB Migration
```bash
$ ENV_PATH=.env/someenv.env yarn db:sync
$ ENV_PATH=.env/someenv.env yarn db:migrate
```

## Launch 🚀
### Running pizza 🏃🍕

Run app using `yarn`

```bash
$ ENV_PATH=.env/someenv.env yarn start
```

### Debug pizza 🕵️‍♂️🍕

Debug app using `yarn`

```bash
$ yarn debug
```

Debug app using VsCode Debugger Tool

- Press `F5`
- Choose your `.env` file
- Done!

## Health Check 🇨🇭

```bash
$ curl HOST:PORT/api/health-check
```
