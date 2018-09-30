const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
	let data = {};
	data.uhead = req.session.uhead;
	data.uname = req.session.uname;
	
	res.render('./personal',data);
})

//修改基本信息
router.post('/update',(req,res)=>{
	let d = req.body;
	let sql = "UPDATE user set usex = ?,password=? WHERE uid = ?;";
	let data = [d.sex,d.password,req.session.uid];
	conn.query(sql,data,(err,results)=>{
		if(err){
			 res.json({r:'err'});
			 console.log(err);
			 return;
		}
		 res.json({r:'ok'});
	})
})

//修改头像
router.post("/head-img",(req,res)=>{
	console.log(req.body);
	let d = req.body;
	let data = [d.newhead,req.session.uid];
	console.log(d);
	let sql = "update user set uhead = ? where uid = ?;";
	conn.query(sql,data,(err,data)=>{
		if(err){
			res.json({r:"数据库错误"})
			console.log(err);
			return;
		}
		//修改当前的session值
		req.session.uhead = d.newhead;
		res.json({r:"ok"});
	})	
})
module.exports = router;