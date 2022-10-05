export const ipMiddleware = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (ip) {
    req._ip = ip;
  }
  next();
};
