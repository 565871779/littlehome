const express = require('express');
const router = express.Router();

router.post("/",function(req,res){
	
	let sql = "INSERT INTO tie (uid,title,content,releasetime,lastreplaytime,tnum,lastuser,tuname) VALUES (?,?,?,?,?,?,?,?)"
	data1 = [req.session.uid,req.body.title,req.body.content,new Date().toLocaleString(),new Date().toLocaleString(),1,req.session.uname,req.session.uname]
	conn.query(sql,data1,function(err,results){
		if(err){
			res.json({r:"db_err"});
			return;
		}
		
		res.json({r:"ok"});
		
	});
	
	
	
})
router.post("/del",function(req,res){
	
	let sql = "UPDATE tie SET  status = 0 WHERE tid = ? "
	conn.query(sql,req.body.tid,function(err,reslut){
		if(err){
			res.json({r:"db_err"});
			return;
		}
		res.json({r:"ok"})
		
	})
	
	
})
router.post("/dig",function(req,res){
	
	let sql = "UPDATE tie SET  digest = 1 WHERE tid = ? "
	conn.query(sql,req.body.tid,function(err,reslut){
		if(err){
			res.json({r:"db_err"});
			return;
		}
		res.json({r:"ok"})
		
	})
	
	
})
router.post("/digcancel",function(req,res){
	
	let sql = "UPDATE tie SET  digest = 0 WHERE tid = ? "
	conn.query(sql,req.body.tid,function(err,reslut){
		if(err){
			res.json({r:"db_err"});
			return;
		}
		res.json({r:"ok"})
		
	})
	
	
})
module.exports = router;