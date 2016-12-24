var db = require('./db.js');
function User(user) {
	this.id=user.id;
	this.username = user.username;
	this.password = user.password;
	this.mobile = user.mobile;
	this.isDelete=user.isDelete;
};
User.queryUser = function (page, callback) {
	var selectSql = 'select * from user ';
	selectSql  += " LIMIT ?,?";
	db.query(selectSql, [(page.page - 1) * page.size,page.size], function (err, result) {
		if (err) {
			return callback(err);
		}
		var data=result;
		callback(err, data);
	});
};
User.countUser = function (callback) {
  var selectSql = 'SELECT count(id) as count FROM user ';
  db.query(selectSql, function (err, result) {
    if (err) {
      return callback(err);
    }
    var data = result[0];
    callback(err, data);
  });
};
User.updateUser= function (id, callback) {
	var selectSql = 'UPDATE user SET isDelete =0 WHERE id=?';
	db.query(selectSql, [id], function (err, result) {
		if (err) {
			return callback(err);
		}
		callback(err, result);
	});
};
module.exports = User;
