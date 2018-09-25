const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
	res.render('./register');
});
router.post('/',(req,res)=>{
	let data = req.body;
	if(data.coder.toLowerCase()!=req.session.coder.toLowerCase()){
		res.json({r:'coder is wrong'});
		return;
	}
	let sql2 = "SELECT * FROM user where uname = ?";
	conn.query(sql2,data.username,function(err,results){
		if(err){
			res.json({r:"数据库错误"})
			return;
		}
		if(results.length){
			res.json({r:"user_existed"})
			return;
		}else{
			let sql = "INSERT INTO user (uname,usex,utel,password,brithday) values (?,?,?,?,?)";
			let data1 = [data.username,data.sex,data.tel,data.password,new Date().toLocaleString()]
			conn.query(sql,data1,function(err,results){
			if(err){a
			console.log(err);
			return;
			}
			let sql2 = "SELECT * FROM user where uname = ?";
			conn.query(sql2,data.username,function(err,result){
				req.session.uid = result[0].uid;
        		req.session.uname = result[0].uname;
        		req.session.uhead = '/img/timg.gif';
        		req.session.admin = result[0].admin;
        		res.json({r:'ok'});
			})
		})
		
		}	
	})
});

module.exports = router;