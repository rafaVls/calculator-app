import { logger } from "./middleware/logger";
import express from "express";
import dotenv from "dotenv";
import path from "path";
const app = express();

const PORT = process.env.PORT || 5000;
dotenv.config({ path: path.join(__dirname, "../.env") });

if (process.env.NODE_ENV === "development") {
    app.use(logger);
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client")));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));