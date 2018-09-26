const express = require('express');
const router = express.Router();
router.get('/', function(req,res){
	
	async.series({
         tnum:function (callback) {
            let sql = 'SELECT COUNT(uid) as tienum FROM tie WHERE uid = ?';
            conn.query(sql,req.session.uid,(err, results)=>{
            	if(err){
            		console.log(err);
            	}
                callback(null, results[0].tienum);
            });
        },
         repalynum: function (callback) {
             let sql = 'SELECT COUNT(*) AS repalynum FROM replay WHERE uid = ?;';
             conn.query(sql,req.session.uid,(err, results) => {
             	if(err){
            		console.log(err);
            	}
             		
                 callback(null, results[0].repalynum);
             });
         },
         hotties:function(callback){
         	let sql = "SELECT * FROM tie WHERE status = 1 ORDER BY tnum desc;";
         	conn.query(sql,(err,results)=>{
         		if(err){
         			console.log(err);
         		}
         		callback(null, results);
         	});
         }
   }, (err, result) => {
		let data = {};
		data.count = (result.tnum*1 )+ (result.repalynum*1);
		data.uname = req.session.uname;
		data.uid = req.session.uid;
		data.uhead = req.session.uhead;
		let sql = "SELECT * FROM user WHERE uid = ?";
		let sql2 = "SELECT * FROM fans WHERE uid1 = ?";
		let sql3 = "SELECT * FROM fans WHERE uid2 = ?";
		let sql4 = "SELECT COUNT(*) AS gznum FROM fans WHERE uid1 = ?"
		let sql5 = "SELECT COUNT(*) AS fansnum FROM fans WHERE uid2 = ?"
		conn.query(sql,req.session.uid,function(err,results){
			conn.query(sql2,req.session.uid,function(err,guanzhu){
				conn.query(sql3,req.session.uid,function(err,fans){
					conn.query(sql4,req.session.uid,function(err,gznum){
						conn.query(sql5,req.session.uid,function(err,fansnum){
							data.gznum = gznum[0].gznum;
							data.guanzhu = guanzhu;
							data.fansnum = fansnum[0].fansnum;
							data.fans = fans;
							data.user = results;
							data.hotties = result.hotties;
							console.log(data)	
							let brithday = data.user[0].brithday.getTime();
							let now = new Date().getTime();
							let age = now - brithday;
							data.age = age/365/24/3600/1000;
							data.age = data.age.toFixed(1);
					    	res.render('./userCenter',data);
						}
						);
						})
					})
					
					
				})
			})
		//let num=(result.tnum*1 )+ (result.repalynum*1);
		
   });  
})
module.exports = router;
