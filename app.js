/*各种模块 */
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.async = require('async');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const multer = require('multer');
/* 模块引用部分结束位置 */
const app = express();
//定义各种参数
let hostname = 'http://localhost:8088';
let secret = 'xiaojia.www.one';
// 启用中间件
app.use(bodyParser.urlencoded({extended: true}));//表单数据类型
app.use(cookieParser(secret));
//模板引擎设置
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
//数据库连接
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:3306,
    database:'smllhome'
});
conn.connect();
//启用session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized: true,
    cookie: {maxAge:30*24*3600*1000}
}));

//文件上传
const diskstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    filename: function (req, file, cb) {
        let filename = new Date().valueOf() + '_' +  Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
        cb(null, filename)
    }
});
const upload = multer({storage: diskstorage});
// 验证码图片
app.get('/coder', (req, res) => {
    var captcha = svgCaptcha.create({noise:4,ignoreChars: '0o1i', size:1,background: '#cc9966',height:35, width:80});
	req.session.coder = captcha.text;
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.status(200).send(captcha.data);
    
});

// 上传图片接口
app.post('/uploads', upload.array('images', 1000), (req ,res)=>{
    console.log(req.files);
    let data = [];
    for (const ad of req.files) {
        //把反斜线转成斜线，防止各种转义引起的路径错误
        let path = hostname + "/"+ ad.path.replace(/\\/g, '/');
        data.push(path);
    }
    res.json({
        "errno": 0,
        "data": data
    });
});
//方便测试---后面要删除
// app.use(function(req ,res, next){
//     req.session.aid = 1;
//     req.session.username = '管理员';
//     next();
// });

//子路由

//管理员用户登录
app.use('/login', require('./module/login'));

//注册界面子路由
app.use('/register',require('./module/register'));

//首页 直接访问时也相当于访问首页
app.use('/index', require('./module/index'));
app.use('/', require('./module/index'));

//首页搜索子路由
app.use('/search',require('./module/search'));

//评论子路由
app.use('/comment',require('./module/comment'));

//个人中心
app.use('/userCenter', require('./module/userCenter'));

//发帖
app.use('/publish', require('./module/publish'));

//个人中心资料编辑
app.use('/edit',require('./module/edit'))

//静态资源托管
app.use('/uploads', express.static('uploads'));
app.use(express.static('static'));

app.listen(8088, () => {
    console.log('成功启动...');
});
