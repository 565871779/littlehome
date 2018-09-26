const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
	let data = req.query.tid;
	let sql1 = `SELECT * FROM tie INNER JOIN user on tie.uid=user.uid where tid = ?`
	let sql2 = `SELECT * FROM replay r INNER JOIN user u on r.uid=u.uid where tid = ?`;
	//非阻塞操作,应该在成功后的回调函数里写其他操作
	conn.query(sql2,data,function(err,results){
		conn.query(sql1,data,function(err1,result){
				let numb = 1;
				let redata = {};
				redata.numb = numb ;
				redata.tie = result;
				redata.uname = req.session.uname;
				redata.admin = req.session.admin;
				redata.uhead = req.session.uhead;
				console.log(results);
				redata.commen = results;
				res.render('./comment',redata);
				//设置评论楼层数,楼主默认是第一楼
				
			})
		})
	})


router.post('/publish',(req,res)=>{
	if(!req.session.uid){
		res.json({r:"No one"});
		return;
	}
	let sql = "INSERT INTO replay (uid,recontent,tid,uhead,replaytime,uname) VALUES (?,?,?,?,?,?)"
	data1 = [req.session.uid,req.body.content,req.body.tid,req.body.uhead,new Date().toLocaleString(),req.session.uname];
	let sql2 = `update tie set tnum=tnum+1,lastuser=?,lastreplaytime=? where tid=?;`;
	conn.query(sql,data1,function(err1,results){
		if(err1){
			res.json({r:"db_err"});
			console.log(err);
			return;
		}
	
	conn.query(sql2,[req.session.uname,new Date().toLocaleString(),req.body.tid],function(err2,result3){
			if(err2){
				console.log(err2);
				return;
			}
		res.json({r:"ok"});
	});
	})
})
module.exports = router;