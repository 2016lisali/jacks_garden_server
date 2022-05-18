import { validationResult } from 'express-validator'

// validate middleware 
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

// validate schema for user routes
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

// validate schema for cart routes
export const createCartSchema = {
  userId: {
    notEmpty: true,
    isInt: {
      options: {
        min: 0,
      }
    },
    errorMessage: "userId can not be empty and must be an integer"
  }
}

export const createCartDetailsSchema = {
  cartId: {
    notEmpty: true,
    isInt: {
      options: {
        min: 1,
      }
    },
    errorMessage: "CartId can not be null and can only be an integer"
  },
  productId: {
    notEmpty: true,
    isInt: {
      options: {
        min: 1,
      }
    },
    errorMessage: "productId can not be null and can only be an integer"
  },
  quantity: {
    notEmpty: true,
    isInt: {
      options: {
        min: 1,
      }
    },
    errorMessage: "quantity can not be null and can only be an integer"
  }
}

// validate schema for products routes
export const createAndUpdateProductSchema = {
  productName: {
    notEmpty: true,
    escape: true,
    matches: /^[A-Za-z0-9 -]+$/,
    isLength: {
      max: 50
    },
    escape: true,
    errorMessage: "product name field cannot be empty and can only contain alphabet, numbers, space and -, the length can not be over 50"
  },
  category: {
    notEmpty: true,
    matches: { options: [/\b(?:indoor|outdoor|fruittree)\b/] },
    errorMessage: "category field cannot be empty, and can only be indoor/outdoor/fruittree"
  },
  productDescription: {
    notEmpty: true,
    escape: true,
    isLength: {
      max: 500
    },
    escape: true,
    errorMessage: "product description field can not be empty and can not over 500 characters"

  },
  productImage: {
    optional: true,
  },
  price: {
    notEmpty: true,
    isFloat: true,
    errorMessage: "price can not be empty, and can only be a number",
  },
  quantityInstock: {
    notEmpty: true,
    isInt: {
      options: {
        min: 0,
      }
    },
    errorMessage: "quantity can not be empty and must be integer."
  },
}

//validate schema for order routes 
export const createOrderSchema = {
  userId: {
    notEmpty: true,
    isInt: {
      options: {
        min: 0,
      }
    },
    errorMessage: "userId field cannot be empty and can only contain numbers"
  },
  orderDate: {
    notEmpty: true,
    isDate: true,
    errorMessage: "orderDate cannot be empty, and can only be date format"
  },
  orderAmount: {
    notEmpty: true,
    isInt: {
      options: {
        min: 0,
      }
    },
    errorMessage: "Order amount field can not be empty"
  },
  orderStatus: {
    notEmpty: true,
    matches: { options: [/\b(?:Paid)\b/i] },
    errorMessage: "Order status cannot be empty, and can only be string paid"
  },
  localPickup: {
    notEmpty: true,
    isBoolean: true,
    errorMessage: "localPickup can not be 0 (no) or 1 (yes)",
  },
  comments: {
    escape: true,
    optional: true,
    isLength: { max: 500 },
    errorMessage: "comments can not be over 500 characters."
  },
}

export const updateOrderStatusSchema = {
  orderStatus: {
    notEmpty: true,
    matches: { options: [/\b(?:paid|pending|completed)\b/i] },
    errorMessage: "Order status cannot be empty, and can only be string paid/pending/completed"
  }
}

export const createOrderDetailsSchema = {
  orderId: {
    notEmpty: true,
    isInt: {
      options: {
        min: 1,
      }
    },
    errorMessage: "orderId field cannot be empty and can only contain numbers"
  },
  productId: {
    notEmpty: true,
    isInt: {
      options: {
        min: 1,
      }
    },
    errorMessage: "productId field can not be empty and must bigger or equal than 1"
  },
  quantity: {
    notEmpty: true,
    isInt: {
      options: {
        min: 1,
      }
    },
    errorMessage: "quantity cannot be empty, and must bigger or equal than 1"
  },

  priceEach: {
    notEmpty: true,
    isFloat: {
      options: {
        min: 0.0,
      }
    },
    errorMessage: "priceEach cannot be empty, and can not be a negative number"
  },
}

export const createOrderBillingDetailsSchema = {
  orderId: {
    notEmpty: true,
    isInt: {
      options: {
        min: 1,
      }
    },
    errorMessage: "orderId field cannot be empty and can only contain numbers"
  },
  name: {
    notEmpty: true,
    isAlpha: true,
    errorMessage: "name field cannot be empty and can only contain alphabets"
  },
  email: {
    optional: true,
    // isEmail: true,
    errorMessage: "email can only be a valid email address"
  },

  phone: {
    optional: true,
  },

  line1: {
    notEmpty: true,
    errorMessage: "line1 can not be empty and can not over 45 characters",
  },
  line2: {
    optional: true,
    isLength: { max: 45 },
    errorMessage: "line 2 can not be over 45 characters."
  },
  city: {
    optional: true,
    isLength: { max: 20 },
    errorMessage: "city field can not be empty and can not be over 20 characters."
  },
  state: {
    notEmpty: true,
    isLength: { max: 20 },
    errorMessage: "state can not be empty and can not be over 20 characters."
  },
  postal_code: {
    notEmpty: true,
    isLength: { max: 10 },
    errorMessage: "postal_code can not be empty and can not be over 20 characters."
  }
}