require("rootpath")();
import express from "express";
import cors from "cors";
import { AppDataSource } from "./_helpers/db"; // Import database connection
import userRoutes from "./users/user.controller"; // Import routes
import errorHandler from "./_middleware/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ensure database is connected before starting the server
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");

        // API routes
        app.use("/users", userRoutes);

        // Global error handler
        app.use(errorHandler);

        // Start server
        const port = process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
        app.listen(port, () => console.log(`Server listening on port ${port}`));
    })
    .catch((error) => console.error("Database connection error:", error));