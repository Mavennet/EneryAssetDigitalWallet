# Emission Server
This server application provides the REST API to the emission web wallet

Tech stack:\
Nest.js - framework for REST API server\
Mongoose - framework for connecting to MongoDB

Modules:\
Settings - Handles the single record for the applicaiton settings\
Oracle - Handles records for available offset token contracts\
Emission - Handles records for representing the deployed NFTs\
Wallet - Handles records for tracking the offset tokens transfered to the NFTs\
Retire - Handles records to represent the activity of retiring tokens

MongoDB:\
This application stores dat ain MongoDB.

To run Mongo for this server:\
```bash
docker pull mongo:latest
docker run -d --name mongodb -p 27017:27017 mongo
```

You can run Compass to view/edit the data in the documents

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
