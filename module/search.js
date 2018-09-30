const express = require('express');
const router = express.Router();
router.get('/', function(req,res){
	let k = req.query.keyword;
	
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
            let sql = `SELECT * from tie  WHERE title like '%${k}%' AND status = 1`;
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
	
	
	
	
//	let data = {};
//	data.uname = req.session.uname;
//	data.admin = req.session.admin;
//	let k = req.query.keyword;
//	let sql = `SELECT * from tie  WHERE title like '%${k}%' AND status = 1`;
//	conn.query(sql,function(err,results){
//		data.clist = results;	
//		console.log(results)
//  	res.render('./home',data);});
	})
module.exports = router;