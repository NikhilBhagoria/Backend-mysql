const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = {};
for (const key in result.error.flatten().fieldErrors) {
  formattedErrors[key] = result.error.flatten().fieldErrors[key][0];
}
    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }

  req.body = result.data;
  next();
};

module.exports = validate;