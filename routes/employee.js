var express = require('express'),
    router = express.Router(),
    crypto = require('crypto'),
    Employee = require('../models/employee.js');


router.post("/login", function (req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  Employee.getUserByName(req.body.username, function (err, result) {
    if (!result) return res.send({ "error": 403, "message": "用户名不存在! " });
    if (result.password != password) return res.send({ "error": 403, "message": "密码错误！" });
    req.session.employee = result;
    console.log(req.session.employee);
    res.send({ "success": true });
  });
});

router.get("/logout",function(req,res) {
    req.session.employee=null;
    res.send({ "success": true });
});
module.exports = router;
