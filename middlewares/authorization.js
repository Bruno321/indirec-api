const jwt = require('jsonwebtoken');
require("dotenv").config();
const tokenKey = process.env.PORT || 'debugKey'

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).json({
            ok: false,
            message: 'No cuentas con los permisios necesarios.'
        });
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(403).json({
            ok: false,
            message: 'No cuentas con los permisios necesarios.'
        });
    }
    
}