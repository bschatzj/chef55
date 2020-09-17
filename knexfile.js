module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/development',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/testing',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/production'
    },
    useNullAsDefault: true
  }
}