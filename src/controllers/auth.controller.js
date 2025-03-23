import * as userModel from "@models/auth.model.js";

//Implement Sign-up Logic
const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const { token, customer } = await userModel.createAccount({
      fullName,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: {
        token,
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Implement Sign-In Logic
const signIn = async (req, res, next) => {
  try {
    //Deconstruct the json form from body
    const { email, password } = req.body;

    const { token, customer } = await userModel.signInAccount({
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Customer signed in successfully",
      data: {
        token,
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Implement Sign-Out Logic
const signOut = async (req, res, next) => {
  try {
    // Get the authentication token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is provided, return an error
    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401; // 401 -> Unauthorized
      throw error;
    }

    // Return a success response
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, signOut };
