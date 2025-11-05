import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token && token.startWith("Bearer")) {
      token = token.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_Secret);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token failed", error: error.message });
  }
};

export default protect;
