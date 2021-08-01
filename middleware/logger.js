function logger(req, res, next) {
    const formattedDate = new Date().toLocaleDateString("en-gb", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });

    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}: %c${formattedDate}`, "color: yellow");
    next();
};

module.exports = logger;