import { validationResult } from 'express-validator'

export const createUserSchema = {
  firstName: {
    notEmpty: true,
    isAlpha: true,
    errorMessage: "firstName field cannot be empty and can only contain alphabet letters"
  },
  lastName: {
    notEmpty: true,
    isAlpha: true,
    errorMessage: "lastName field cannot be empty and can only contain alphabet letters"
  },
  isAdmin: {
    optional: true,
    isBoolean: true,
    errorMessage: "isAdmin field can only be 1 (yes) or 0 (no)"

  },
  email: {
    isEmail: true,
    errorMessage: "must be a valid email address"
  },
  password: {
    isStrongPassword: true,
    errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
  },
  confirmPassword: {
    notEmpty: true,
    errorMessage: "confirm password can not be empty."
  },
}

export const loginSchema = {
  email: {
    isEmail: true,
    errorMessage: "must be a valid email address"
  },
  password: {
    isStrongPassword: true,
    errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
  },
}

export const addMailingListSchema = {
  email: {
    isEmail: true,
    errorMessage: "must be a valid email address"
  }
}

export const updateUserSchema = {
  userId: {
    notEmpty: true,
    errorMessage: "userId field cannot be empty."
  },
  firstName: {
    optional: true,
    isAlpha: true,
    errorMessage: "firstName field can only contain alphabet letters"
  },
  lastName: {
    optional: true,
    isAlpha: true,
    errorMessage: "lastName field can only contain alphabet letters"
  },
  isAdmin: {
    optional: true,
  },
  email: {
    optional: true,
    isEmail: true,
    errorMessage: "must be a valid email address"
  },
  password: {
    optional: true,
    isStrongPassword: true,
    errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
  },
}

export const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: errors.array()
    });
  };
};