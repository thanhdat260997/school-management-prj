var jwt_decode = require('jwt-decode');
var exec = require('child_process').exec;

function getUserInfoFromToken (req) {
  var token = req.body.token || req.query.token || req.header['x-access-token'] || req.get('Authorization');
  return jwt_decode(token);
}

exports.requireRole = function (roles) {
  return function (req, res, next) {
      const userRole = getUserInfoFromToken(req).isAdmin ? 'admin' : 'teacher';
      if (userRole && roles.includes(userRole)) {
          next();
      } else {
          res.status(403).send("Permission denied.");
      }
  }
}

exports.resizeImage = function (image) {
  var cmd = 'convert ' + image.src + 
  ' -resize ' + image.width + 'x' + image.height + '^' + 
  ' -gravity center -crop ' + image.width + 'x' + image.height + '+0+0 ' +
  image.dst;

  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.log(error);
    }
  });
}

exports.getUserInfoFromToken = getUserInfoFromToken;