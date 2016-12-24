var express = require('express'),
    router = express.Router(),
    crypto = require('crypto'),
    User = require('../models/user.js');



router.post("/updateUser", function (req, res) {
  User.updateUser(req.body.id, function (err, result) {
    if (err) return res.send({ "error": 403, "message": "数据库异常!" });
    res.send({ "success": true });
  });
});

router.get("/queryUser",function(req,res) {
   var page = new Page({
        page: req.query.page ? parseInt(req.query.page) : 0,
        size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
    })
     User.queryUser(page, function (err, data) {
      if (err) return res.send({ "error": 403, "message": "数据库异常!" });
      User.countUser(function (err, result) {
         if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            page.count = result.count;
            page.data = data;
            res.send(page);
       });
    });
});

module.exports = router;
