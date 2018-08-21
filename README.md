# XCO-API

## Installation

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

## Misc

### Exceptions

The `/providers` endpoint does not throw a `Bad Request` in case the client sends query params not documented. However, it does throw a `Bad Request` if the documented query params are received with invalid data.

### Pagination

It is not implemented.

## TO DO

- Add e2e tests
- Add unit tests
- Add pagination
- Add CI/CD
- Deploy to Heroku
- Buy domain
- Setup DNS (and subdomain)
- Create migrations
- Seed the DB with the test user
