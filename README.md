# XCO-API

## Requirements

1. Git
2. Yarn

## Installation

Checkout this project and follow the steps below inside the project folder.

1. Install dependencies:

```
yarn install
```

2. Create a `.env` file in the root of this project with the environment variables listed on `.env-template`:

3. Create a **MariaDB** (or MySQL) database with the properties you specified in the `.env` file

4. Run the database migrations

```
yarn db:migration
```

5. Import the file `data.sql` file into the database

6. Start (it runs Nodemon in watch mode)

```
yarn start
```

## Production

Before deploying the application to production, follow the steps:

1. Setup the environment variables in the server/PaaS. Use the `.env-template` as a guide. However, some variables in the `.env-template` are not required, since they are hard-coded in the [`config.service`]('src/modules/auth/auth.service.ts')

## CI

There is a **CI/CD** pipeline configured using [`CircleCI`]('https://circleci.com'). Whenever a new commit is pushed to the `master` branch, the pipeline runs the following:

- unit tests
- e2e tests
- lint
- build
- deploy (Heroku)

It's required to setup the CI environment with the credentials to deploy to Heroku.

## Deploy

The CI/CD pipeline is configured to deploy to Heroku.

## Bonus

### Documentation

Navigate to `http://localhost:3000/swagger` to see the API Documentation using Open API (Swagger).

### Authentication

The request to the `/providers` endpoint requires authentication. Make a post request to `/auth/token` to issue an authorization token for a pre-registered user with the following credentials:

```json
{
  "username": "pablo",
  "password": "picasso"
}
```

### Response Fields

Send a list of fields `/providers?fields=field1,field2` you want in the response.

In case the field does not exist in the provider object, it will not be part of the response.

If the query `fields` does not exist, all available properties will be returned.

---

## Technical Choices

### Which Framework to Use?

| Framework  | Pros                                  | Cons                  |
|------------|---------------------------------------|-----------------------|
| None       | Flexibility                           | Reinvent the wheel    |
| Express    | Flexibility, Stable, Community        | Not designed for APIs |
| Micro.js   | Small # of dependencies, Quick to use | Support               |
| Restify    | Designed for APIs                     | Learning curve        |
| Hapi       | Designed for APIs, Community          | Complexity            |
| NestJS (*) | Designed for APIs, Development Speed  | Community             |

Other frameworks such as Koa and Fastify were put aside and not considered in the evaluation.

My choice was `NestJS`. Mostly because it enforces great architecture, follows good design principles and I'd use this project to learn a new framework.

By the way, NestJS uses Express under the hood. It means we get all the benefits of Express, without the down sides.


### How to Authenticate Our Users?

| Method                          | Pros                         | Cons                   |
|---------------------------------|------------------------------|------------------------|
| Login/Password (*)              | Simplicity                   | Vunerablility          |
| OAuth (Facebook/Twitter/Github) | Delegate password management | Dependency, Complexity |
| SAML                            | Flexibility                  | Complexity             |
| SMS Passwordless                | Security                     | Dependency, Complexity |


Given the time constraint and the basic needs of the requirements, I decided to not over-engineer the authentication process and choose the `Login/Password` strategy.

#### Where to Store the Credentials?

A common approach is to store the `username` and `password` in the `users` table. However, it comes with some drawbacks:

- It's not extensible. If the requirements change and multiple identity providers are accepted, a major refactory in the application will be required.

- It's hard to keep track of changes in the credentials.

I decided to have a table called `credentials` dedicated to store `username` and `password` for each user in a relationship of **1:n**. By doing this, a minor refactory will take place when new identity providers are added.

#### Authorization - JSON Web Token (JWT)

To get access to the private route `/providers`, the client needs to exchange their credentials (Username/Password) to an authorization token in the route `/auth/token`.

This token needs to be included in the header of the requests to private routes as described below.

```
{
  headers: {
    Authorization: Bearer <token>
  }
}
```


### Query Parameters Validation

It's a good practice to validate all input. However, there is a room for dual interpretation in here.

Should we consider `input` the data that will be used by the system or the data presented in the incoming request?

I'm again trying to not over-engineer this project and taking a balanced approach. For example, the request `/providers?country=us` **will throw** a *400 Bad Request*, since `country` is not a valid query param. However, the request `/providers?fields=country` **will not** throw a *422 Unprocessable Entity*.

---

## Tests

Tests play an important role in the software development world. It doesn't enforce program correctness, however, it gives confidence to the people working on a system that a newly introduced change has low chances to break other parts.

This project has **1 unit test** [format.spec.ts]('./src/utils/format.spec.ts') and **2 integration tests** [/e2e]('./e2e')

The integration tests in this case ensure that:

- A registered user gets an authorization token
- An unregistered user doesn't get an authorization token
- A request to `/providers` with a valid authorization, succeeds
- A request to `/providers` without an authorization or invalid authorization, fails

---

## Misc

### Exceptions

The `/providers` endpoint does not throw a `Bad Request` in case the client sends query params not documented. However, it does throw a `Bad Request` if the documented query params are received with invalid data.

### Sorting

All items in `/providers` are sorted by **name ASC**.

### Pagination

Not implemented yet. There is hard-coded limit to **100** items in the `/providers` route.

---

## Development

### Migrations

To generate the migration based on the entities:

```
yarn migration:generate --name <name>
```

To run the migrations:

```
yarn migration:run
```

## TO DO

- Create Heroku Dynos (api and app)
- Setup DNS (and subdomain)

- Add CI/CD
- Deploy to Heroku

- Create migrations
- Seed the DB with the test user

- Add pagination
