const express = require('express');
const router = express.Router();

//用户登录成功，发起请求
router.get('/', function(req, res) {
	//首页的分页功能
	let pagenum = 10;
    let page = req.query.page ? req.query.page : 1;
    (page < 1) && (page = 1);
    //非阻塞，同步操作，返回对象，
    async.series({
        nums: function (callback) {
            let sql = 'SELECT COUNT(tid) AS nums FROM tie';
            conn.query(sql, (err, result) => {
                let totalpage = Math.ceil(result[0].nums / pagenum);
                if (page > totalpage) {
                    page = totalpage;
                }
                callback(null, result[0].nums);
            });
        },
        lists: function (callback) {
            let sql = 'SELECT * FROM tie WHERE `status` = 1 ORDER BY lastreplaytime DESC LIMIT ?, ?;';
            conn.query(sql, [pagenum * (page - 1), pagenum], (err, results) => {
                callback(null, results);
            });
        }
    }, (err, data) => {
    	//保存session信息
    	data.uname = req.session.uname;
    	data.admin = req.session.admin;
    	data.clist = data.lists;
        data.page = page;
        data.totalpage = Math.ceil(data.nums / pagenum);
        let showpage = 5;
        let start = page - (showpage - 1) / 2;
        let end = page * 1 + (showpage - 1) / 2;
        if (start < 1) {
            start = 1;
            end = start + showpage - 1;
        }
        if (end > data.totalpage) {
            end = data.totalpage;
            start = end - showpage + 1;
            if (start < 1) {
                start = 1;
            }
        }
        data.start = start;
        data.end = end;
//      console.log(data);
        res.render('./home', data);
    });
    
})
//退出功能
router.get('/tuichu',function(req,res){
		let data={};
		req.session.uname=0;//当用户退出的时候，清空session
//		console.log(req.session.uname);
//清空session后展示首页，重新获取数据库里面的首页上面相关值
		let pagenum = 10;
    let page = req.query.page ? req.query.page : 1;
    (page < 1) && (page = 1);
    async.series({
        nums: function (callback) {
            let sql = 'SELECT COUNT(tid) AS nums FROM tie';
            conn.query(sql, (err, result) => {
                let totalpage = Math.ceil(result[0].nums / pagenum);
                if (page > totalpage) {
                    page = totalpage;
                }
                callback(null, result[0].nums);
            });
        },
        lists: function (callback) {
            let sql = 'SELECT * FROM tie WHERE `status` = 1 ORDER BY lastreplaytime DESC LIMIT ?, ?;';
            conn.query(sql, [pagenum * (page - 1), pagenum], (err, results) => {
                callback(null, results);
            });
        }
    }, (err, data) => {
    	data.uname = req.session.uname;
    	data.admin = req.session.admin;
    	data.clist = data.lists;
        data.page = page;
        data.totalpage = Math.ceil(data.nums / pagenum);
        let showpage = 5;
        let start = page - (showpage - 1) / 2;
        let end = page * 1 + (showpage - 1) / 2;
        if (start < 1) {
            start = 1;
            end = start + showpage - 1;
        }
        if (end > data.totalpage) {
            end = data.totalpage;
            start = end - showpage + 1;
            if (start < 1) {
                start = 1;
            }
        }
        data.start = start;
        data.end = end;
//      console.log(data);
        res.render('./home', data);
    });
})
//精品展示
router.get('/digest',(req,res)=>{
	let pagenum = 10;
    let page = req.query.page ? req.query.page : 1;
    (page < 1) && (page = 1);
    async.series({
        nums: function (callback) {
            let sql = 'SELECT COUNT(tid) AS nums FROM tie';
            conn.query(sql, (err, result) => {
                let totalpage = Math.ceil(result[0].nums / pagenum);
                if (page > totalpage) {
                    page = totalpage;
                }
                callback(null, result[0].nums);
            });
        },
        lists: function (callback) {
            let sql = "SELECT * FROM tie WHERE `status` = 1 AND digest = 1 ORDER BY lastreplaytime DESC; ";
            conn.query(sql, [pagenum * (page - 1), pagenum], (err, results) => {
                callback(null, results);
            });
        }
    }, (err, data) => {
    	data.uname = req.session.uname;
    	data.admin = req.session.admin;
    	data.clist = data.lists;
        data.page = page;
        data.totalpage = Math.ceil(data.nums / pagenum);
        let showpage = 5;
        let start = page - (showpage - 1) / 2;
        let end = page * 1 + (showpage - 1) / 2;
        if (start < 1) {
            start = 1;
            end = start + showpage - 1;
        }
        if (end > data.totalpage) {
            end = data.totalpage;
            start = end - showpage + 1;
            if (start < 1) {
                start = 1;
            }
        }
        data.start = start;
        data.end = end;
//      console.log(data);
        res.render('./home', data);
    });
		
})
//首页弹出框的粉丝
router.post('/fans',(req,res)=>{
	let duid = req.body.duid;
	let uid1 = req.session.uid;
	let sql1 = "select * from user where uid = ?;";
	let sql2 = "SELECT uid2 FROM fans WHERE uid1 = ? and uid2 = ?;";
	conn.query(sql1,duid,(err,result)=>{
		conn.query(sql2,[uid1,duid],(err,results)=>{
			console.log(result[0],results);
			if(err){
				console.log(err);
			}
			res.json({arr:result[0],arr1:results});
		})
	})
})
//关注用户操作
router.post('/guanzhu',(req,res)=>{
	if(!req.session.uid){
		res.json({r:"nouid"});
		return;
	}
	let guid = req.body.guid;
	let guidhead = req.body.guidhead;
	let uid1 = req.session.uid;
	let uidhead = req.session.uhead;
	let data = [uid1,guid,uidhead,guidhead];
	let sql1 = "INSERT into fans (uid1,uid2,uid1head,uid2head) VALUES (?,?,?,?);";
	conn.query(sql1,data,function(err,result){
		if(err){
			console.log(err);
			res.json({r:"db_err"});
			return;
		}
		res.json({r:"ok"});
	})
})

//跳转到视频界面的请求处理
router.get("/video", (req, res) => {
	let sql = "SELECT * FROM tie WHERE `status` = 1 AND digest = 1 ORDER BY lastreplaytime DESC; ";
	conn.query(sql, (err, results) => {
		let data = {};
		data.dig = 1;
		data.clist = results;
		data.uname = req.session.uname;
		data.admin = req.session.admin;
		data.uhead = req.session.uhead;
		res.render('./video', data);	});})

//跳转到图片的路由处理
router.get("/img1", (req, res) => {
	let sql = "SELECT * FROM tie WHERE `status` = 1 AND digest = 1 ORDER BY lastreplaytime DESC; ";
	conn.query(sql, (err, results) => {
		let data = {};
		data.dig = 1;
		data.clist = results;
		data.uname = req.session.uname;
		data.admin = req.session.admin;
		data.uhead = req.session.uhead;
		res.render('./img1', data);	});})


//取消关注用户操作
router.post('/cancel',(req,res)=>{
	let cuid = req.body.cuid;
	let uid1 = req.session.uid;
	let data = [uid1,cuid];
	let sql1 = "delete from fans where uid1 = ? and uid2 = ?;";
	conn.query(sql1,data,function(err,result){
		if(err){
			console.log(err);
			res.json({r:"db_err"});
			return;
		}
		res.json({r:"ok"});
	})
})

module.exports = router;