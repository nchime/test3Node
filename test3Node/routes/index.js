/*
 * GET home page.
 */

var mysql = require('mysql');


var client = mysql.createConnection({
	host : '128.199.253.76', 
	user: 'root', 
	password : 'chime1234', 
	database : 'chimedb'
});



var DummyDB = (function() {

	var DummyDB = {};
	var storage = [];
	var count = 1;

	/*
	 * 
	 * dummy DB 데이터 조회
	 */

	DummyDB.get = function(id) {

		for ( var i in storage) {

			if (storage[i] == id) {
				return storae[i];
			} else {
				return storage;
			}
		}

	};

	/*
	 * 
	 * dummy DB 등록
	 */
	DummyDB.insert = function(data) {
		data.id = count++;
		storage.push(data);

		return data;
	};

	return DummyDB;

})();

exports.index = function(req, res) {

	console.log("=======> index =============");

	console.log(req.cookies);

	if (req.cookies.auth) { // 인증이 되면
		res.render('index', {
			title : 'Express'
		});
	} else {
		res.redirect('/login');
	}
};

exports.login = function(req, res) {

	console.log("=======> login =============");

	res.render('login', {
		title : '로그인 해주세요'
	});
};

/*
 * 로그인 처리
 * 
 */
exports.loginProcess = function(req, res) {

	console.log("=======> loginProcess =============");

	var login = req.param('inputEmail');
	var passwd = req.param('inputPassword');

	// 로그인 성공
	if (login == 'test' && passwd == 'test') {
		res.cookie('auth', true);
		res.redirect('/');
	} else {
		res.redirect('/login');
	}

};

/*
 * 로그아웃
 */
exports.logout = function(req, res) {

	console.log("=======> logout =============");

	res.clearCookie('auth');

	console.log(req.cookies);
	res.redirect('/');
};

/*
 * 가입자 등록
 */
exports.regist = function(req, res) {

	console.log("=======> regist =============");

	// 등록화면 View 연결
	res.render('regist', {
		title : '가입자 등록정보를 입력하세요'
	});
};

/*
 * 가입자 등록 프로세스
 */
exports.registProcess = function(req, res) {

	console.log("=======> registProcess =============");

	var loginID = req.param('inputEmail');
	var name = req.param('inputName');
	var passWD = req.param('inputPassword');

	console.log('====>' + loginID + ' ' + name + ' ' + passWD);

	if (loginID && name && passWD) {

		DummyDB.insert({
			loginID : loginID,
			name : name,
			passWD : passWD,
		});
		console.log(DummyDB.get());

	} else {
		throw new Error('Error Occurred!!');
	}

	res.redirect('/');
};

/*
 * Mysql DB Test
 */
exports.mysqltest = function(req, res) {

	console.log("=======> mysqltest =============");

	client.query('use chimedb');
	client.query('select * from api_log_tb', function(error, result, fields) {
		if (error) {
			console.log('db Error!!!');
		} else {
			console.log(result);
		}
	}

	);
	
	res.send('/<script>alert(\'조회되었습니다\')</script>');  

	// res.redirect('/');
};


/*
 * Mysql DB Test
 */
exports.mysqlRegistTest = function(req, res) {

	console.log("=======> mysqlRegistTest =============");
	
	insertDB_API_Query();


	// res.redirect('/');
};


function insertDB_API_Query() {   

	client.query('insert into api_log_tb(code_nm, regi_date, info_fd) values(\'T00001\', now(), unix_timestamp(now()))', function(error, result, fields) {
		if (error) {
			console.log('db Error!!!');
		} else {
			console.log(result);
		}
	}
	);

	
} 


/*
 * 
 * 사용된 모듈을 재활용하기 위한 예제 
 * 반복 사용이 예상되는 모듈은 따로 분리
 */
exports.mysqlRegistTest100 = function(req, res) {

	console.log("=======> mysqlRegistTest100 =============");
	
		for (var int = 0; int < 10; int++) {
			insertDB_API_Query(); 
		}
	
};



