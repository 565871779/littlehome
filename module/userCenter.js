const express = require('express');
const router = express.Router();
router.get('/', function(req,res){
	let data = {};
	data.uname = req.session.uname;
	let sql = "SELECT * FROM tie WHERE `status` = 1 ORDER BY lastreplaytime; ";
	conn.query(sql,function(err,results){
		data.clist = results;	
    	res.render('./userCenter',data);});
})
module.exports = router;