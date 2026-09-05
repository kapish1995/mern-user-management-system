function notFound(req, res, next) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid id format" });
  }

  if (err.name === "ValidationError") {
    const errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).json({ message: "Validation failed", errors });
  }

  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal server error" });
}

module.exports = { notFound, errorHandler };
