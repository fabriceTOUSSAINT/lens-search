// TODO: figure out how to spin up postgres image to connec to
const knexConfig: any = {
  client: 'pg',
  debug: false,
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'lens_search',
  },
}

export default knexConfig
