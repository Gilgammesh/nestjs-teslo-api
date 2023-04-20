export const AppConfig = () => ({
  environment: process.env['NODE_ENV'],
  appPort: +process.env['PORT'],
  hostApi: process.env['HOST_API'],
  dbPostgresHost: process.env['DB_POSTGRES_HOST'],
  dbPostgresPort: +process.env['DB_POSTGRES_PORT'],
  dbPostgresName: process.env['DB_POSTGRES_NAME'],
  dbPostgresUser: process.env['DB_POSTGRES_USER'],
  dbpostgresPassword: process.env['DB_POSTGRES_PASSWORD'],
  appGlobalPrefix: 'api',
  jwtSecret: process.env['JWT_SECRET'],
  jwtExpiresIn: '2h',
  // jwtExpiresIn: '1s',
  defaultPage: 1,
  defaultOffset: 10
});
