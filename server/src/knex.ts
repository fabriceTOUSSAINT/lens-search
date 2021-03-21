// TODO: figure out how to spin up postgres image to connect to
const knexConfig: any = {
  client: process.env.KNEX_CLIENT,
  debug: process.env.NODE_ENV === 'development',
  connection: {
    host: process.env.KNEX_HOST,
    user: process.env.KNEX_USER,
    password: process.env.KNEX_PW,
    database: process.env.KNEX_DB,
  },
};

export default knexConfig;
