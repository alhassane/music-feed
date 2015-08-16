module.exports = {
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        charset: 'utf8'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
