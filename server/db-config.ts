interface IConfig {
    database: object
}
let CONFIG: IConfig = {
    database: {
        user: 'postgres',
        host: '77.244.216.138',
        database: 'podrik',
        password: 'znkzslvj4g',
        port: 5432
    }
};
if (process.env.NODE_ENV === 'production') {
    CONFIG.database = {connectionString: process.env.DATABASE_URL};
}
module.exports = CONFIG;