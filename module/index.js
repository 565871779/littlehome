const express = require('express');
const router = express.Router();
router.get('/', function(req,res){
	let data = {};
	data.uname = req.session.uname;
	data.admin = req.session.admin;
	let sql = "SELECT * FROM tie WHERE `status` = 1 ORDER BY lastreplaytime; ";
	conn.query(sql,function(err,results){
		data.clist = results;
		
		
    	res.render('./home',data);});
	
	})
	
	


module.exports = router;