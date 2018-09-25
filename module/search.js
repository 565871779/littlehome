const express = require('express');
const router = express.Router();
router.get('/', function(req,res){
	let data = {};
	data.uname = req.session.uname;
	data.admin = req.session.admin;
	let k = req.query.keyword;
	let sql = `SELECT * from tie  WHERE title like '%${k}%' AND status = 1`;
	conn.query(sql,function(err,results){
		data.clist = results;	
		console.log(results)
    	res.render('./home',data);});
	})
module.exports = router;