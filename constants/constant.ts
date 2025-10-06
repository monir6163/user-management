export const tokenTime = {
  accessTokenExpires: Date.now() + 5 * 60 * 1000, // 15 minutes in milliseconds
  refreshTokenExpires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  jwtMaxAge: 60 * 5, // 15 minutes in seconds
  sessionMaxAge: 60 * 5, // 15 minutes in seconds
};
