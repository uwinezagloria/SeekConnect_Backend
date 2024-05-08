import dotenv from "dotenv";
dotenv.config();

export default {
  MONGODB_URI: process.env.MONGODB_URI,
  port: process.env.PORT
};
