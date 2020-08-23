# Como Estas Fastify REST layer

This module is used for the Como Estas On-Premise version. If you want to implement Como Estas in a Public Cloud environment, use the following links:

- [Como Estas - AWS Serverless](https://github.com/quedate-en-casa/comoestas-serverless)
- [Como Estas - AWS Terraform](https://github.com/quedate-en-casa/comoestas-serverless)
- [Como Estas - AWS DynamoDB](https://github.com/quedate-en-casa/comoestas-serverless)

## Requirements

To develop over this project you need `Docker` (basically, it is needed for integration tests with testcontainers), `Node.js` and `Yarn`.

## Getting started

To use-test this project you must link the `comoestas-core` and `comoestas-mongodb` package.

First, clone the core and mongodb repositories and then link them.

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

To check whether your local environment is working run `yarn test`.

## TODO

- [ ] Add validations
- [ ] Add security
- [ ] Refactor fastify routes configuration
- [ ] Refactor integrations test
- [ ] Add continous integration
- [ ] Add more documentation
- [ ] Format output dates
- [ ] Replace `request` package with `fastify.inject` method in integration tests and remove them from dev dependencies.
