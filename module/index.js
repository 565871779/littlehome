const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
	let data = {};
	data.uname = req.session.uname;
	data.admin = req.session.admin;
	
	let sql = "SELECT * FROM tie WHERE `status` = 1 ORDER BY lastreplaytime DESC; ";
	conn.query(sql,function(err,results){
		data.clist = results;	
    	res.render('./home',data);});
	})
//退出功能
router.get('/tuichu',function(req,res){
		let data={};
		req.session.uname=0;//当用户退出的时候，清空session
//		console.log(req.session.uname);
//清空session后展示首页，重新获取数据库里面的首页上面相关值
		let sql = "SELECT * FROM tie WHERE `status` = 1 ORDER BY lastreplaytime;";
		conn.query(sql,function(err,results){
		data.clist = results;
		data.uname = req.session.uname;
		data.admin = req.session.admin;
		data.uhead = req.session.uhead;
    	res.render('./home',data);
		});
})

//精品展示
router.get('/digest',(req,res)=>{
		let sql = "SELECT * FROM tie WHERE `status` = 1 AND digest = 1 ORDER BY lastreplaytime DESC; ";
		conn.query(sql,(err,results)=>{
		let data={};
		//设置当前跳转的页面
		data.dig = 1;
		data.clist = results;
		data.uname = req.session.uname;
		data.admin = req.session.admin;
		data.uhead = req.session.uhead;
    	res.render('./home',data);
		});
})

module.exports = router;