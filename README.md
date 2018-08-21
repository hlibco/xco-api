# XCO-API

## Pagination

It is not implemented.

## Misc

The `/providers` endpoint does not throw a `Bad Request` in case the client sends query params not documented. However, it does throw a `Bad Request` if the documented query params are received with invalid data.
