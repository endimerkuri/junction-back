export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    name: process.env.DB_NAME || 'junction',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '60s',
  },
  refreshToken: {
    validityInDays:
      parseInt(process.env.REFRESH_TOKEN_VALIDITY_IN_DAYS, 10) || 7,
  },
});
