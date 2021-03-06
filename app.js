const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '210.125.31.247',
  port     : '3306',
  user     : 'test',
  password : 's1234',
  database : 'upright'
});
var id;
    connection.connect();
    
    
// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require('express');
const { send } = require('express/lib/response');
const { response } = require('express');

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express()

// 3000 포트로 서버 오픈
app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

// 이제 터미널에 node app.js 를 입력해보자.

// request 와 response 라는 인자를 줘서 콜백 함수를 만든다.
// localhost:3000 브라우저에 res.send() 내부의 문자열이 띄워진다.

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html")
    connection.query('SELECT id FROM upright.now_id', (error, rows, fields) => {
      if (error) throw error;
      console.log('User info is: ', rows[0].id); 
      id=rows[0].id;
    });
})

// localhost:3000/main 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/main', function(req,res) {
    res.sendFile(__dirname + "/public/generic.html")
})

app.use(express.static('public'))

app.post('/', function(req, res){
  var responseData = {};
  responseData.score = [];

    connection.query('SELECT gradient, turtle, eye, mouth FROM upright.habit_count where id=\''+id+'\'', function(err,rows,fields){
      //console.log(rows);
      if(err) throw err;
      if(rows[0]){
        responseData.result = "ok";
        rows.forEach(function(val){
          responseData.score.push(val.gradient);
          responseData.score.push(val.turtle);
          responseData.score.push(val.eye);
          responseData.score.push(val.mouth);
        })
      }
      else{
        responseData.result = "none";
        responseData.score = "";
      } 
    });
    connection.query('SELECT AVG(gradient)as gradient, AVG(turtle)as turtle, AVG(eye)as eye, AVG(mouth)as mouth FROM upright.habit_count', function(err,rows,fields){
      //console.log(rows);
      if(err) throw err;
      if(rows[0]){
        responseData.result = "ok";
        rows.forEach(function(val){
          responseData.score.push(val.gradient);
          responseData.score.push(val.turtle);
          responseData.score.push(val.eye);
          responseData.score.push(val.mouth);
        })
      }
      else{
        responseData.result = "none";
        responseData.score = "";
      }
      console.log(responseData.score);
      res.json(responseData)
    });
  });
  

app.get('/img1', function(req,res){
  var conn=mysql.createConnection({
    host     : '210.125.31.247',
    port     : '3306',
    user     : 'test',
    password : 's1234',
    database : 'upright'
  })
  conn.connect();
  var query=conn.query('select img from user_information where id=\''+id+'\' order by number desc',function(err,rows){
    if(err) throw err;
    res.type('png');
    if(rows[0]['img']!=null)
      res.send(rows[0]['img']);
  });
});

app.get('/correctionimg1', function(req,res){
  var conn=mysql.createConnection({
    host     : '210.125.31.247',
    port     : '3306',
    user     : 'test',
    password : 's1234',
    database : 'upright'
  })
  conn.connect();
  var query=conn.query('SELECT img FROM imglist where id=\''+id+'\' order by number desc',function(err,rows){
    if(err) throw err;
    res.type('png');
    if(rows[0]['img']!=null)
      res.send(rows[0]['img']);
  });
});

app.get('/correctionimg2', function(req,res){
  var conn=mysql.createConnection({
    host     : '210.125.31.247',
    port     : '3306',
    user     : 'test',
    password : 's1234',
    database : 'upright'
  })
  conn.connect();
  var query=conn.query('SELECT img FROM imglist where id=\''+id+'\' order by number desc',function(err,rows){
    if(err) throw err;
    res.type('png');
    if(rows[1]['img']!=null)
      res.send(rows[1]['img']);
  });
});

app.get('/correctionimg3', function(req,res){
  var conn=mysql.createConnection({
    host     : '210.125.31.247',
    port     : '3306',
    user     : 'test',
    password : 's1234',
    database : 'upright'
  })
  conn.connect();
  var query=conn.query('SELECT img FROM imglist where id=\''+id+'\' order by number desc',function(err,rows){
    if(err) throw err;
    res.type('png');
    if(rows[2]['img']!=null)
      res.send(rows[2]['img']);
  });
});

app.get('/correctionimg4', function(req,res){
  var conn=mysql.createConnection({
    host     : '210.125.31.247',
    port     : '3306',
    user     : 'test',
    password : 's1234',
    database : 'upright'
  })
  conn.connect();
  var query=conn.query('SELECT img FROM imglist where id=\''+id+'\' order by number desc',function(err,rows){
    if(err) throw err;
    res.type('png');
    if(rows[3]['img']!=null)
     res.send(rows[3]['img']);
  });
});

process.on('uncaughtException', (req,res,err) => {

  console.error("죽지마 ㅠㅠ");
  console.error(err);
  app.use(function(req, res) {
   res.status(500).send('서버오류가 발생하였습니다.');
  })
});
/*
app.use(function (err, req, res, next) {
  console.error("서버 오류 발생", err);
  res.status(500).send('서버오류가 발생하였습니다.');
});
*/
app.get('/correctionimg5', function(req,res){
  var conn=mysql.createConnection({
    host     : '210.125.31.247',
    port     : '3306',
    user     : 'test',
    password : 's1234',
    database : 'upright'
  })
  conn.connect();
  var query=conn.query('SELECT img FROM imglist where id=\''+id+'\' order by number desc',function(err,rows){
    if(rows.length>=4)
    {
      if(err) throw err;
      res.type('png');
      res.send(rows[4]['img']);
    }
    else{
      response.sendRedirect("/");
    }
    
  });
});


