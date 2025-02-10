const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    if (! authConfig) {
        next();
        return;
    }

    // get header
    const token = req.get(authConfig.header_name);
    if (token !== authConfig.api_key) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }
    next();
};
