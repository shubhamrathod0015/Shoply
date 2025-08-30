export const successResponse = (res, data, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    ...data,
  });
};

export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
