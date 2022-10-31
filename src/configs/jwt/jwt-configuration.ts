const jwtConfiguration = () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    authExpirationMinutes: process.env.JWT_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  },
});

export default jwtConfiguration;
