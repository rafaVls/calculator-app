const logger = require("./middleware/logger");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;
dotenv.config({ path: "./.env" });

if (process.env.NODE_ENV === "development") {
    app.use(logger);
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "src")));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));