export const notFound = (req, res, next) => {
  const error = new Error(`Маршрут не найден: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Не корректный формат ID";
  }
  console.error(`[Ошибка] ${statusCode} - ${message}`);

  res.status(statusCode).json({ message });
};
