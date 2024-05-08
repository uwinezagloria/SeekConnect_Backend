import express from "express";
import mongoose from "mongoose";
import config from "./config/index.js";
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 7001;

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
  // Middleware
app.use(express.json());

// Routes
app.use('/auth', userRoutes);
// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve Swagger UI
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});