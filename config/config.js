module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "school-administration-system",
    host: "localhost",
    port: "33306",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}