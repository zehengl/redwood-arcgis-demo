# redwood-arcgis-demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b1eb2a2-89d4-45b4-b1ae-64040dfc1ecf/deploy-status)](https://app.netlify.com/sites/redwood-arcgis-demo/deploys)

## Getting Started

### Setup

To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/api/functions/*`.

## Development

### Database

To create a development database:

```terminal
yarn redwood db up
```

This will read the schema definition in `api/prisma/schema.prisma` and generate a sqlite database in `api/prisma/dev.db`

If you've made changes to the schema run `yarn redwood db save` to generate a migration, and `yarn redwood db up` to apply the migration/ generate a new ORM client.
