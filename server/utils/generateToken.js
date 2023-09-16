import jwt from "jsonwebtoken";

const generateToken = (res, userId, cookieName = "jwt") => {
  try {
    console.log("jwtToken==>", process.env.JWT_SECRET);
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Set the JWT as a cookie
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });
  } catch (error) {
    console.error("Error generating token:", error);
    // Handle the error here (e.g., send an error response)
  }
};

export default generateToken;
