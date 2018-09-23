const express = require('express');
const router = express.Router();

	router.get('/', function(req,res){
    res.render('./login');});

router.post("/login",function(req,res){
    let d = req.body;
      //首先验证验证码
      console.log(req.session.coder);
    if(d.coder.toLowerCase() != req.session.coder.toLowerCase()){
    	
        res.json({r:'coder_err'});
        return ;
    }
    //进行数据验证
//  if(d.username.length==11){
//  	let sql = 'SELECT * FROM user WHERE  utel = ?';
//  	
//  }else{let sql = 'SELECT * FROM user WHERE  uname = ?';}
    let sql = 'SELECT * FROM user WHERE  uname = ?'
    conn.query(sql, d.username, (err, result)=>{
        //账号是不是存在
        if(!result.length){
            res.json({r:'u_not'});
            return ;
        }
        //判断密码是否正确
        if(d.pwd != result[0].password){
            res.json({r:'p_err'});
            return ;
        }
        //登录成功
        //保存session信息
        req.session.uid = result[0].uid;
        req.session.uname = result[0].uname;
        req.session.uhead = result[0].uhead;
        req.session.admin = result[0].admin;
        
        //更新状态 
         //res.render('./home');
        res.json({r:'ok'});
    });
})
module.exports = router;
