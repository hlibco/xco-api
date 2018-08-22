# XCO-API

> This API exposes a private route to filter and return the Provider Summary of the Top 100 Diagnosis Related Groups.

API Url: [https://api.xcoproject.com/](https://api.xcoproject.com/)

API Documentation: [https://api.xcoproject.com/swagger](https://api.xcoproject.com/swagger)

## Requirements

1. Git >= 2.14.3
2. Yarn >= 1.94
3. MariaDB >= 10.2.12 (or MySQL >= 8.0)

## Installation

Checkout this project and follow the steps below inside the project folder.

1. Install dependencies:

```sh
$ yarn install
```

2. Create a `.env` file in the root of this project with the environment variables listed on `.env-template`:

```sh
HOSTNAME=localhost
PORT=3000

# Database
# --------
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=xco
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
```
3. Create a **MariaDB** (or MySQL) database with the properties you specified in the `.env` file

4. Import the file [data/db.sql]('data/db.sql') file into the database

5. Start (it runs Nodemon in watch mode)

```sh
$ yarn start
```

## Tests

This project has **1 unit test** [format.spec.ts]('./src/utils/format.spec.ts') and **2 integration tests** [/e2e]('./e2e')

The integration tests in this case ensure that:

- A registered user gets an authorization token
- An unregistered user doesn't get an authorization token
- A request to `/providers` with a valid authorization, succeeds
- A request to `/providers` without an authorization or invalid authorization, fails

**Unit Test**
```sh
$ yarn test
```

**End-to-end Test (e2e)**
```sh
$ yarn test:e2e
```

**Test Coverage**
```sh
$ yarn test:cov
```

## Production

Before deploying the application to production, follow the steps:

1. Setup the environment variables in the server/PaaS. Use the `.env-template` as a guide. However, some variables in the `.env-template` are not required, since they are hard-coded in the [`config.service`]('src/modules/auth/auth.service.ts').

2. Setup the CI environment with the deployment key of the production environment.

## CI

There is a **CI/CD** pipeline configured using [`CircleCI`]('https://circleci.com'). Whenever a new commit is pushed to the `master` branch, the pipeline runs the following:

- unit tests
- e2e tests
- lint
- build
- deploy (Heroku)

It's required to setup the CI environment with the credentials to deploy to Heroku.

To validate the [.circleci/config.yml]('.circleci/config.yml') follow this guide: https://circleci.com/docs/2.0/local-cli/
```sh
# It's required to have Docker installed
$ yarn circleci
```

## Deploy

The CI/CD pipeline is configured to deploy to Heroku.

## API Documentation

Navigate to `http://localhost:3000/swagger` to see the API Documentation using Open API (Swagger).

## Authentication

The request to the `/providers` endpoint requires authentication. Make a post request to `/auth/token` to issue an authorization token for a pre-registered user with the following credentials:

```json
{
  "username": "pablo",
  "password": "picasso"
}
```

## Response Fields

Send a list of fields `/providers?fields=field1,field2` you want in the response.

In case the field does not exist in the provider object, it will not be part of the response.

If the query `fields` does not exist, all available properties will be returned.

---

## Technical Choices

### Which Framework to Use?

| Framework  | Pros                                  | Cons                  |
|------------|---------------------------------------|-----------------------|
| *None*     | Flexibility                           | Reinvent the wheel    |
| Express    | Flexibility, Stable, Community        | Not designed for APIs |
| Micro.js   | Small # of dependencies, Quick to use | Support               |
| Restify    | Designed for APIs                     | Learning curve        |
| Hapi       | Designed for APIs, Community          | Complexity            |
| **NestJS** | Designed for APIs, Development Speed  | Community             |

Other frameworks such as Koa and Fastify were put aside and not considered in the evaluation.

My choice was `NestJS`. Mostly because it enforces great architecture, follows good design principles and I'd use this project to learn a new framework.

By the way, NestJS uses Express under the hood. It means we get all the benefits of Express, without the down sides.


### How to Authenticate Our Users?

| Method                          | Pros                         | Cons                   |
|---------------------------------|------------------------------|------------------------|
| OAuth (Facebook/Twitter/Github) | Delegate password management | Dependency, Complexity |
| SAML                            | Flexibility                  | Complexity             |
| SMS Passwordless                | Security                     | Dependency, Complexity |
| **Login/Password**              | Simplicity                   | Vunerablility          |

Given the the requirements and assuming this project will be used with a sole purpose of demonstration, I decided to not over-engineer the authentication process and choose the `Login/Password` strategy.

#### Where to Store the Credentials?

A common approach is to store the `username` and `password` in the `users` table. However, it comes with some drawbacks:

- It's not extensible. If the requirements change and multiple identity providers are accepted, a major refactory in the application will be required.

- It's hard to keep track of changes in the credentials.

I decided to have a table called `credentials` dedicated to store `username` and `password` for each user in a relationship of **1:n**. By doing this, a minor refactory will take place when new identity providers are added (eg.: Adding `access_token` and `refresh_token`).

#### Authorization - JSON Web Token (JWT)

To get access to the private route `/providers`, the client needs to exchange their credentials (Username/Password) to an authorization token in the route `/auth/token`.

This token needs to be included in the header of the requests to private routes as described below.

```json
{
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```
The authorization token must be prepended with the scheme `Bearer`.

### Seed Data

There were 3 fields (columns) in the CSV storing monetary value. My approach was to convert them to integers when storing in the database. By doing this, the monetary amount store is in **cents** instead of **dollars**. The benefits:
- Flexibility to run queries using mathematical operators (>, <, >=, <=)
- Simplicity to convert the output to other currencies

Why not using the Float or Decimal data type? Due to floating point issues, it's not recommended to store monetary data as float/decimal in MariaDB/MySQL.


### Query Parameters Validation

It's a good practice to validate all input. However, there is a room for dual interpretation in here.

Should we consider `input` the data that will be used by the system or all data in the incoming request?

I'm again trying to not over-engineer this project and taking a balanced approach. For example, the request `/providers?country=us` **will throw** a *400 Bad Request*, since `country` is not a valid query param. However, the request `/providers?fields=country` **will not** throw a *422 Unprocessable Entity*.

### Resultset Limit & Sorting

Currently, there is a **hard limit of 50 elements** in the response of the `/providers` endpoint. This limit can be increased in the future and a pagination mechanism can be implemented.

The resultset is sorted by **provider name ASC**.

### Naming

Why did I create a database table with such a long name? `provider_summary_for_the_top_diagnosis_related_groups`

1. It's intuitive
2. It's flexible enough to store the Provider Summary for the *Top K* Diagnosis Related Groups
*(The field **top_drg** identifies the Top K)*

---

## Misc

### Exceptions

The `/providers` endpoint does not throw a `Bad Request` in case the client sends query params not documented. However, it does throw a `Bad Request` if the documented query params are received with invalid data.
