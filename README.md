# Como Estas Fastify REST layer

This module is used for the Como Estas On Premise versión. If you want implement Como Estas in a Public Cloud environment this links can be useful for you:

- [Como Estas - AWS Serverless](https://github.com/quedate-en-casa/comoestas-serverless)
- [Como Estas - AWS Terraform](https://github.com/quedate-en-casa/comoestas-serverless)
- [Como Estas - AWS DynamoDB](https://github.com/quedate-en-casa/comoestas-serverless)

## Requirements

To develop in this project you need `Docker` (basically is needed for integration tests with testcontainers), `Node.js` and `Yarn`.

## Getting started

To use test this project you must link the `comoestas-core` and `comoestas-mongodb` package.

First, clone the core and mongodb repositories and link them.

```shell
git clone https://github.com/quedate-en-casa/comoestas-core.git
cd comoestas-core
yarn link
git clone https://github.com/quedate-en-casa/comoestas-mongodb.git
cd comoestas-mongodb
yarn link
```

Then, link the `core` and `mongodb` packages to your local project.

```shell
yarn link comoestas-core
yarn link comoestas-mongodb
```

To check if your local environment work's run `yarn test`.

## TODO

- [ ] Add validations
- [ ] Refactor fastify routes configuration
- [ ] Refactor integrations test
- [ ] Add continous integration
- [ ] Add more documentation