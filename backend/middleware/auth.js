const jwt = require("jsonwebtoken");

function authMiddleware(req, _res, next) {
  const authorization = req.headers.authorization || (req.query.token ? `Bearer ${req.query.token}` : undefined);

  if (!authorization) {
    return next();
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    return next();
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
  } catch (error) {
    return next({
      statusCode: 401,
      message: "Invalid authentication token"
    });
  }

  return next();
}

module.exports = authMiddleware;
