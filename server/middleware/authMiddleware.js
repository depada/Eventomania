// const jwt = require("jsonwebtoken");
// const { adminData } = require("../dummyData.js");
import jwt from "jsonwebtoken";
import { adminData } from "../dummyData.js";

export const checkRole = (roles) => {
  return async (req, res, next) => {
    console.log("checkRole==>", req.cookies);
    let token;
    token = req.cookies.ajs_anonymous_id;
    console.log("token==>", token);
    if (token) {
      try {
        // const decoded = jwt.verify(
        //   token,
        //   "0ca9e9c4-be2c-4567-b0d7-9b2c69178f42"
        // );
        // console.log("decoded==>", decoded);
        const admin = adminData.find((admin) => admin._id === "admin1id");
        console.log("admin==>", admin);
        console.log("roles==>", roles);
        const adminRole = admin ? admin.role : null;
        if (admin && roles.includes(adminRole)) {
          next();
        } else {
          return res.status(401).send("Forbidden");
        }
      } catch (error) {
        return res.status(401).send("Not Authorized");
      }
    } else {
      return res.status(401).send("Not Authorized, No Token");
    }
  };
};
