var jwt = require('jsonwebtoken');

module.exports = function() {
    return function(req, res, next) {
        var token = req.body.token || req.query.token || req.header['x-access-token'] || req.get('Authorization');
        if (token) {
            console.log('a token found');
            jwt.verify(token, 'secretKey', function (err, decoded) {
                if (err) {
                    return res.status(401).send('Failed to authenticate');
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).send('No token provided.');
        }
    }
}