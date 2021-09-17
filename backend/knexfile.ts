// Update with your config settings.
import { Knex } from 'knex';

interface IKnexConfig {
    [key: string]: Knex.Config;
}


const configs: IKnexConfig = {

  development: {
    client: "pg",
    connection: {
      database: "agrupador",
      user: "docker",
      password: "agrupador",
      host: "host.docker.internal"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`
    }
  },

  test: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`
    }
  }

};

export default configs;
