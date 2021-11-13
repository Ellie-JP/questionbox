//SQL
const express = require('express');
const mysql = require('mysql');
const app = express();


app.use(cors({ origin: true, credentials: true }));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '001144',
  database: 'list_app'
});

// app.get('/', (req, res) => {
//   res.render('top.ejs');
// });



//これでターミナルにSQL出力
connection.query(
    "SELECT * FROM items",
    (error,results)=>{
      console.log(results);
    });



//dataを内部で定義
    const data = {
      "squadName": "Doctor VC",
      "members": [
        {
          "name": "伊藤和子",
          "ID": 1,
          "Disease": "難病X",
          "medicine": "治療薬X",
          "FirstAid": "体を冷やさない",
          "NewestResults": "検査値Y=50"

        },
        {
          "name": "中村秀樹",
          "ID": 2,
          "Disease": "難病Y",
          "medicine": "治療薬Y",
          "FirstAid": "水を与えない",
          "NewestResults": "検査値Y=50"
        },
        {
          "name": "山田太郎",
          "ID": 3,
          "Disease": "難病Z",
          "medicine": "治療薬Z",
          "FirstAid": "日光を避ける",
          "NewestResults": "検査値Z=30"
        }
      ]
    }
//cors追加

    var cors = require('cors');
    const corsOptions = {
      origin: '*',
      optionsSuccessStatus: 200
    }



    // Access-Control-Allow-Origin: https://trusted-one.co.jp // CORS を許可する Origin を明示的にする
    // Access-Control-Allow-Credentials: true
//
app.get('/index',cors(corsOptions), (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new',cors(corsOptions), (req, res) => {
  res.render('new.ejs');
});


//登録
app.post('/create',cors(corsOptions), (req, res) => {
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {



      // 一覧画面にリダイレクト
      res.redirect("/index");

    }
  );
});




app.post('/delete/:id',cors(corsOptions), (req, res) => {
  // データベースのデータを削除する処理
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
      }
      );
});




app.get('/edit/:id', cors(corsOptions),(req, res) => {
  // 選択されたメモをデータベースから取得する
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});

    }
    );

});

//書き足し(SQLから持ってくる場合)



// connection.query(
//     "SELECT * FROM items",
//     (error,results)=>{
//       console.log(results);
//     });

// app.use(express.json())

//JSONで上のdataをとってきて、レスポンス待ちする関数
// function doGetRequest(req, res) {
//   connection.query(
//       "SELECT * FROM items",
//       (error,results)=>{
//         //resultsに取ってきたデータが入る
//         console.log(results);
//         //resultsをjson化する
//         res.json(results);
//       }
//     );
//   console.log(req);
// }
//doGetRequestのレスは[/]に紐づいて実行
// app.get('/', doGetRequest);


// function doPostRequest(req, res){
//   //console.log(req);
//   console.log(req.body);
//
//   res.json(mysql);
// }

//相手からのレスから必要なデータを取り出し、求められたデータをjson化して送る
// function doPostRequest(req, res){
  //相手から送られてきたものが見られる
  // console.log(req.body);
  // データベースのデータをidに基づいて取得してJson化する
//   connection.query(
//     'SELECT * FROM items WHERE id = ?',
//     [req.params.id],
//     (error, results) => {
//       res.json(results);
//       }
//       );
// }
//
// app.post('/', doPostRequest);

//ここまで









//SQLでなく上のデータを使う場合
//JSONで上のdataをとってきて、レスポンス待ち(待機)する関数
function doGetRequest(req, res) {
console.log(req);
res.json(data);
}

//doGetRequestのレスは[/]に紐づいて実行
app.get('/',cors(corsOptions), doGetRequest);

//相手からのレスから必要なデータを取り出し、求められたデータをjson化して送る
function doPostRequest(req, res){
//console.log(req);
//相手から送られてきたものが見られる
console.log(req.body);
res.json(data);
}

app.post('/',cors(corsOptions), doPostRequest);
//ここまで





app.listen(3001);
console.log("http://localhost:3001/index");
