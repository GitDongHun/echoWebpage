var express = require("express");
var path = require('path');
var static = require('serve-static');
var session = require('express-mysql-session');
var request = require('request');
var db = require('./db/sqldb.js');
var morgan = require("morgan");
require('./api/v1/function/jkh_group.js');
var jkh_function = require('./api/v1/function/jkh_function');
var jkh = require('./api/v1/function/jkh_config');

const users = require('./api/v1/user');
const admin = require('./api/v1/admin');
const app = express();
//-------------------------------//
//-------------------------------//
//-------------------------------//

// var MySQLStore = require("express-mysql-session")(session);
// var db_info = db.getConnection();
// var sessionStore = new MySQLStore(db_info);
// app.use(
// 	session({
// 		key: "session_cookie_name#@",
// 		secret: "session_cookie_secret",
// 		store: sessionStore,
// 		resave: false,
// 		saveUninitialized: true,
// 	})
// );//세션 생성
//app.use(cookieParser());//쿠키 생성

//-----------------------------------//
//-----------------------------------//
//-----------------------------------//
app.use(morgan('dev',{stream: jkh_function.logstream}))//로그파일로 관리 함
app.get('/',(req,res)=>{
	const str = '제성덕 여기가 진입점인데 바봉';
	return res.send(str);
})
//var expressErrorHandler = require('express-error-handler');
app.use('/api/v1/user/', users); //사용자
app.use('/api/v1/admin', admin); //관리자
//app.use('/',require()); //etc
app.listen(jkh.config.app.port, jkh.config.app.host, () => {
	/*//var msg = new Webhook.MessageBuilder().setText("dddd"
	//Hook.info("NODE_SERVER","Info");
	//jkh_function.sendMessage('info','node.js server start !!');
	//console.log('dd');*/
	let str = `http://${jkh.config.app.host}:${jkh.config.app.port}/`
	console.log('start server');
	jkh_function.webhook('info', `${jkh_function.date_time()}node.js server starting!!`);
	jkh_function.webhook('info', str);

});

