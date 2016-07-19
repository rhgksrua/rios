# rios
Ticket System

## Development

Clone this repository

Run `npm install`.

MongoDB needs to run before running the server.  For c9.io, follow instructions
[here](https://community.c9.io/t/setting-up-mongodb/1717).

Then

> Run `node server.js` or `npm start`.
> * If you run `node server.js` or `npm start`, you need to make sure environment variable `NODE_ENV` is `development`.
>
> Run `webpack` or `webpack --watch` to monitor changes.

OR

> Run `npm run webpack` or `npm run webpack:watch` to monitor changes.
> * If developing on windows add `win:` before the scripts above, e.g `npm run win:webpack`



## Notes

* Running on node version v4.4.5
* `bundle.js` (transpiled client js file) is not being tracked.  You have to run `webpack` to generate your own.

## TODO

### Client Side Request Forms

1. React Component
    * Submit form
        * Need validate requests. i.e. cannot send empty requests or user is not logged in.
    * Create required actions and action types (react redux).
    * Add action types to reducers (react redux).
    * Fetch user saved templates.

2. Server endpoint (receive requests)
    * Create mongoose schema that describes user requests.
    * Receive requests and save them to database.
        * Need to authenticate users before accepting requests.
    * Return success or error message back to client as JSON.





