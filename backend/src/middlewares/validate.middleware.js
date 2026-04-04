export function validateSchema(Schema) {
  return function validate(req, res, next) {
    try {
      const data = req.body;
      const validatedData  = Schema.parse(data);
      req.body = validatedData
      next()

    } catch (error) {
      return res.status(400).send({
        message: error.issues?.[0]?.message || "Invalid request data",
        success: false
      })
    }
  };
}
