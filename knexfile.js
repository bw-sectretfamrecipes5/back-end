module.exports = {
  development: {
    client: 'sqlite3', 
    useNullAsDefault: true,
    connection: {
      filename: './src/database/users.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
};
