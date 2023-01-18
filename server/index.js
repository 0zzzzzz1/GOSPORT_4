const express = require('express');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,  // 限制 2 MB
  },
  // fileFilter (req, file, callback) {  // 限制檔案格式為 image
  //   if (!file.mimetype.match(/^image/)) {
  //     callback(new Error().message = '檔案格式錯誤');
  //   } else {
  //     callback(null, true);
  //   }
  // }
});
const app = express();
const bodyParser = require('body-parser');
// 使用express
app.listen(3001, () => {
  console.log('ok, server is running on port 3001')
})
// port號3001 啟動server時提式ok, server is running on port 3001


//阿柯聊天室

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET,POST"],
  }
})
//建立連線
var owndata = [{message:"1"}]
var datas = [
  { message: "2" },{username:[0].username}
]
io.on("connection", (socket) => {
  
  // onlineCount++;
  //   // 發送人數給網頁
  //   io.emit("online", onlineCount);
 
  //   socket.on("greet", () => {
  //       socket.emit("greet", onlineCount);
  //   });
 
  //   socket.on('disconnect', () => {
  //       // 有人離線了，扣人
  //       onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
  //       io.emit("online", onlineCount);
  //   });


  console.log(`User Connected:${socket.id}`);
  //socket.on(“監聽來自client 的send_mesg事件名稱”, callback)
  // io.emit("receive_message",datas);
// socket.on("send_mesg1", (data) => {
//   owndata.push(data);
//   socket.emit('gobackMessage', data)})
//   console.log(owndata);

// socket.on("send_mesg", (data) => {
//   datas.push(data);
//   console.log(datas);
//   socket.broadcast('gobackMessageall', datas)});
  // socket.on("send_mesg", (data1) => {
  // //   //       //socket.emit(“對當前連線的所有 Client 發送的事件名稱”, data)

  //   // console.log(data);
  //   // console.log(datas);
  //   owndata.push(data1)
  //   // io.emit("receive_message",datas);
  //   socket.broadcast('receive_message1', owndata)
  //   // socket.broadcast.emit("receive_message",datas);
  //   // io.emit("receive_message",datas);
  //   // socket.broadcast 自己收不到自己
  //   // socket.broadcast.emit("receive_message", datas);
  //   // io.emit("receive_message", datas);
  //   // io.sockets.socket(socket.id).emit([data]);
  // })

  socket.on("send_mesg", (data) => {
  //   //       //socket.emit(“對當前連線的所有 Client 發送的事件名稱”, data)

    // console.log(data);
    console.log(data);
    datas.push(data)
    // io.emit("receive_message",datas);
    socket.emit('receive_message', datas)


    owndata.push(data)
    socket.broadcast('receive_message1', owndata)

    // socket.broadcast.emit("receive_message",datas);
    // io.emit("receive_message",datas);
    // socket.broadcast 自己收不到自己
    // socket.broadcast.emit("receive_message", datas);
    // io.emit("receive_message", datas);
    // io.sockets.socket(socket.id).emit([data]);
  })
})

server.listen(3002, () => {
  console.log('ok, server is running on port 3002');
})
//阿柯聊天室

const cors = require('cors');
app.use(cors());
// 使用cors
const mysql = require('mysql');
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "gosport",
  port: 3306,
  useConnectionPooling: true,
});

process.on('uncaughtException', function (err) {
  if (err.code == "PROTOCOL_CONNECTION_LOST") {
    mysql.restart();
  }
});

// db.getConnection(function(err, connection) {
//   connection.query( 'SELECT * FROM user', function(err, rows) {

//     console.log(db._freeConnections.indexOf(connection)); // -1

//     connection.release();

//     console.log(db._freeConnections.indexOf(connection)); // 0

//  });
// });

// 連接mysql
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// 使用json格式回傳
//  client測試
app.post('/create', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const userimg = req.body.userimg;
  const tel = req.body.tel;
  db.query(
    "INSERT INTO user (email,password,username,userimg,tel) VALUES (?,?,?,?,?)",
    [email, password, username, userimg, tel],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("value Inserted");
      }
    }
  );
})
app.post('/create1', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO user (email,password) VALUES (?,?)",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("value Inserted");
      }
    }
  );
})
app.post('/sigh', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "INSERT INTO user (email,password) VALUES (?,?)",
    [email, password,],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("value Inserted");
      }
    }
  );
})
//  client測試
app.post("/employee", (req, res) => {
  db.query("SELECT * FROM user where userid = 1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// user頭像更改
app.post("/userupdate", upload.single('image'), (req, res) => {
  const name = req.body.name;
  console.log(name);
  console.log(req.file.buffer);
  db.query("UPDATE user SET userimg=? where userid =?"
    , [req.file.buffer, name], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

// 租場地搜尋
app.post("/rentside", (req, res) => {
  const type = req.body.type;
  const starttime = req.body.starttime;
  const endtime = req.body.endtime;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const county = req.body.county;
  const area = req.body.area;
  const text = req.body.text;
  const park = `${req.body.park}`;
  const bath = `${req.body.bath}`;
  const baulk = `${req.body.baulk}`;
        console.log(type);
        console.log(starttime);
        console.log(endtime);
        console.log(startdate);
        console.log(enddate);
        console.log(county);
        console.log(area);
        console.log(bath);
        console.log(park);
        console.log(baulk);
        console.log(text);
  db.query(`SELECT * FROM side WHERE reservedate BETWEEN ? AND ? AND sidetype = ? AND  
  weekstarttime BETWEEN  ? AND ? AND county =? AND area =? AND (sidename LIKE ? OR adress LIKE ?)`
  // AND bath = ? AND park=? AND baulk=?`
  ,[startdate,enddate,type,starttime,endtime,county,area,text,text], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// 租場地查看更多
app.post("/rentsideedit", (req, res) => {
  const sideid = req.body.sideid;
  db.query("SELECT * FROM side where sideid = ?"
    , [sideid], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
// 租場地詳細頁面
app.post("/rentsidemore", (req, res) => {
  const sideid = req.body.sideid;
  db.query("SELECT * FROM side where sideid = ?"
    , [sideid], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
// 後台零打搜尋
app.post("/zeroda", (req, res) => {
  const starttime1 = req.body.starttime1;
  const endtime1 = req.body.endtime1;
  const ball1 = req.body.ball1;
  const zerodainput = req.body.zerodainput;
  if (zerodainput === '') {
    db.query("SELECT * FROM userarticle_zeroda where date BETWEEN ? AND ? AND ballgames = ?"
      , [starttime1, endtime1, ball1], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  } else {
    db.query("SELECT * FROM userarticle_zeroda where date BETWEEN ? AND ? AND ballgames = ? AND content LIKE ?"
      , [starttime1, endtime1, ball1, zerodainput], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  }
});
// 後台零打編輯
app.post("/zerodada", (req, res) => {
  const articleid_zeroda = req.body.articleid_zeroda;
  db.query("SELECT * FROM userarticle_zeroda where articleid_zeroda = ?"
    , [articleid_zeroda], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
// 後台零打編輯儲存
app.post("/zerodaupdate", (req, res) => {
  const zerodafieldname = req.body.zerodafieldname;
  const zerodacounty = req.body.zerodacounty;
  const zerodaarea = req.body.zerodaarea;
  const zerodaaddress = req.body.zerodaaddress;
  const zerodadate = req.body.zerodadate;
  const zerodastarttime = req.body.zerodastarttime;
  const zerodaendtime = req.body.zerodaendtime;
  const zerodalevel = req.body.zerodalevel;
  const zerodacost = req.body.zerodacost;
  const zerodacontent = req.body.zerodacontent;
  const articleid_zeroda = req.body.articleid_zeroda;
  const number1 = req.body.number1;
  db.query("UPDATE userarticle_zeroda SET content=?,starttime=?,endtime=?,date=?,county=?,area=?,fieldname=?,address=?,cost=?,level=?,number = ? where articleid_zeroda = ?"
    , [zerodacontent, zerodastarttime, zerodaendtime, zerodadate, zerodacounty, zerodaarea, zerodafieldname, zerodaaddress, zerodacost, zerodalevel, number1, articleid_zeroda], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
// 後台零打刪除
app.post("/zerodadelete", (req, res) => {
  const articleid_zeroda = req.body.articleid_zeroda;
  db.query("DELETE from userarticle_zeroda where articleid_zeroda = ?"
    , [articleid_zeroda], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
// 後台球隊搜尋
app.post("/team", (req, res) => {
  const teamstartday = req.body.teamstartday;
  const teamendday = req.body.teamendday;
  const teamtype = req.body.teamtype;
  const location = req.body.location;
  if (location == '') {
    db.query("SELECT * FROM teamevent where startdate >= ? AND enddate <= ? AND type = ?"
      , [teamstartday, teamendday, teamtype], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  } else {
    db.query("SELECT * FROM teamevent where startdate >= ? AND enddate <= ? AND type = ? AND location LIKE ?"
      , [teamstartday, teamendday, teamtype, location], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      }
      
    });
    // 後台球隊編輯
    app.post("/teamedit", (req, res) => {
      const teameventid = req.body.teameventid;
      db.query("SELECT * FROM teamevent where teameventid = ?"
      ,[teameventid], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    // 後臺球隊顯示會員頭像
    app.post("/teameventuser", (req, res) => {
      const teameventid = req.body.teameventid;
      db.query(`SELECT * FROM (teamevent inner join teameventuser 
        on teamevent.teameventid = teameventuser.teameventid AND teamevent.teameventid=?) inner JOIN
        user 
        on teameventuser.userid = user.userid`
      ,[teameventid], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    // 後臺球隊編輯儲存   有圖片
    app.post("/teamupdate",upload.single('teamfile'), (req, res) => {
      const teamstartdate = req.body.teamstartdate;
      const teamenddate = req.body.teamenddate;
      const teamstarttime = req.body.teamstarttime;
      const teamendtime = req.body.teamendtime;
      const teamtype2 = req.body.teamtype2;
      const teamtitle = req.body.teamtitle;
      const teamlocation = req.body.teamlocation;
      const teampay = req.body.teampay;
      const teamtext = req.body.teamtext;
      const teameventid = req.body.teameventid;
      console.log(`${teamtitle}`);
      db.query("UPDATE teamevent SET startdate =?,enddate=?,starttime =?,endtime=?,type=?, title =?,location=?,pay=?,text=?,teameventimg=?  where teameventid=?"
      ,[teamstartdate,teamenddate,teamstarttime,teamendtime,teamtype2,teamtitle,teamlocation,teampay,teamtext,req.file.buffer,teameventid], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    // 後臺球隊編輯儲存   沒圖片
    app.post("/teamupdate2",upload.array(), (req, res) => {
      const teamstartdate = req.body.teamstartdate;
      const teamenddate = req.body.teamenddate;
      const teamstarttime = req.body.teamstarttime;
      const teamendtime = req.body.teamendtime;
      const teamtype2 = req.body.teamtype2;
      const teamtitle = req.body.teamtitle;
      const teamlocation = req.body.teamlocation;
      const teampay = req.body.teampay;
      const teamtext = req.body.teamtext;
      const teameventid = req.body.teameventid;
      db.query("UPDATE teamevent SET startdate =?,enddate=?,starttime =?,endtime=?,type=?, title =?,location=?,pay=?,text=? where teameventid=?"
      ,[teamstartdate,teamenddate,teamstarttime,teamendtime,teamtype2,teamtitle,teamlocation,teampay,teamtext,teameventid], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    // 後台球隊刪除
    app.post("/teamdelete", (req, res) => {
      const teameventid = req.body.teameventid;
      db.query("DELETE from teamevent where teameventid = ?"
      ,[teameventid], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    // 後台轉租刪除
    app.post("/rentdelete", (req, res) => {
      const articleid_sublet = req.body.articleid_sublet;
      db.query("DELETE from userarticle_sublet where articleid_sublet = ?"
      ,[articleid_sublet], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    //搜尋轉租 
    app.post("/rent", (req, res) => {
      const renttime = req.body.renttime;
      const renttime1 = req.body.renttime1;
      const rentselectcounty = req.body.rentselectcounty;
      const rentselectarea = req.body.rentselectarea;
      const fieldname = req.body.fieldname;
      if(fieldname=='' && renttime && renttime1 ){
        db.query("SELECT * FROM userarticle_sublet where date BETWEEN ? AND ? AND area = ? AND county =?"
        ,[renttime,renttime1,rentselectarea,rentselectcounty], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      }else if(fieldname && renttime && renttime1 ){
        db.query("SELECT * FROM userarticle_sublet where date BETWEEN ? AND ? AND area = ? AND county =? AND fieldname LIKE ?"
        ,[renttime,renttime1,rentselectarea,rentselectcounty,fieldname], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      }else if(fieldname=='' && !renttime ){
        db.query("SELECT * FROM userarticle_sublet where area = ? AND county =? "
        ,[rentselectarea,rentselectcounty], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      }
    });
    // 轉租編輯
    app.post("/rentedit", (req, res) => {
      const articleid_sublet = req.body.articleid_sublet;
      db.query("SELECT * FROM userarticle_sublet where articleid_sublet = ?"
      ,[articleid_sublet], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
// 轉租儲存
app.post("/rentupdate", (req, res) => {
  const articleid_sublet = req.body.articleid_sublet;
  const rentcontent = req.body.rentcontent;
  const rentstarttime = req.body.rentstarttime;
  const rentendtime = req.body.rentendtime;
  const rentdate = req.body.rentdate;
  const rentcounty = req.body.rentcounty;
  const rentarea = req.body.rentarea;
  const rentfieldname = req.body.rentfieldname;
  const rentaddress = req.body.rentaddress;
  const rentcost = req.body.rentcost;
  const number2 = req.body.number2;
  console.log(`後端${number2}`);
  db.query("UPDATE userarticle_sublet SET content=?,starttime=?,endtime=?,date=?,county=?,area=?,fieldname=?,address=?,cost=?,amount=?  where articleid_sublet=?"
    , [rentcontent, rentstarttime, rentendtime, rentdate, rentcounty, rentarea, rentfieldname, rentaddress, rentcost, number2, articleid_sublet]
    , (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
// ===============後臺場地查詢========================================
app.post("/backsidesearch", (req, res) => {
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const type = req.body.type;
  const text = req.body.text;
  if(text === ''){
    db.query("SELECT * FROM `side` WHERE addday BETWEEN ? AND ? AND sidetype = ?"
    ,[startdate,enddate,type], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }else{
    db.query("SELECT * FROM `side` WHERE addday BETWEEN ? AND ? AND sidetype = ? AND sidename LIKE ?"
    ,[startdate,enddate,type,text], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
});
// 後臺場地編輯畫面
app.post("/backsideedit ", (req, res) => {
  const sideid =req.body.sideid;
  db.query(`SELECT * FROM (side inner join sidedevice 
    on side.sideid = sidedevice.sideid AND side.sideid=?) inner JOIN
    sidetime 
    on side.sideid = sidetime.sideid AND side.sideid=?`
    , [sideid,sideid]
    , (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});




























// 登入資料
app.post("/userinfo", (req, res) => {
  const account = req.body.account;
  const password = req.body.password
  db.query("SELECT * FROM user WHERE email = ? AND password =?", [account, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });
});
app.post("/userinfo1", (req, res) => {
  const account = req.body.account;
  db.query("SELECT * FROM user WHERE email = ? ", [account], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });
});
// 興建個資 給予徽章
app.post("/selfbuildbadge", (req, res) => {
  const userid = req.body.userid;
  db.query("INSERT INTO `userbadge`(`userid`, `badgeid`) VALUES ( ? ,'1')", [userid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });
});
// 興建個資 初始用戶資料
app.post("/selfbuildinfo", upload.single('image'), (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  // const userimg = req.body.userimg;
  const tel = req.body.tel;
  const userdescribe = req.body.userdescribe;
  const badminton = req.body.badminton
  const tabletennis = req.body.tabletennis;
  const volleyball = req.body.volleyball;
  const userId = req.body.userid;
  const usebadge = req.body.usebadge;
  console.log(req.file.buffer)
    db.query(" UPDATE `user` SET `email`= ? ,`password`= ? ,`username`= ? ,`userimg`= ? ,`tel`= ? ,`userdescribe`= ? ,`activeTime`='0hr',`badminton`= ? ,`tabletennis`= ? ,`volleyball`= ? ,`usebadge`= ?  WHERE `userid`= ?",
      [email, password, username, req.file.buffer, tel, userdescribe, badminton, tabletennis, volleyball, usebadge ,userId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
});
//觀看個人資料
app.post("/selfinfo", (req, res) => {
  const account = req.body.account;
  db.query(" SELECT * FROM user,userteam,userbadgeimg,userbadge  WHERE email = ? AND user.userid = userteam.userid = userbadge.userid AND userbadge.badgeid = userbadgeimg.badgeid", [account], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
app.post("/self", (req, res) => {
  const id = req.body.userid;
  db.query(" SELECT * FROM `user` WHERE user.userid = ?;", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
app.post("/selfbadge", (req, res) => {
  const id = req.body.userid;
  db.query(" SELECT * FROM userbadge , userbadgeimg WHERE userbadge.userid = ? AND userbadge.badgeid = userbadgeimg.badgeid;", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
}); app.post("/selfteam", (req, res) => {
  const id = req.body.userid;
  db.query(" SELECT * FROM userteam WHERE userteam.userid = ?;", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});

//更新個人資料 有改照片
app.post("/selfalter", upload.single('image'), (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  // const userimg = req.body.userimg;
  const tel = req.body.tel;
  const userdescribe = req.body.userdescribe;
  const badminton = req.body.badminton
  const tabletennis = req.body.tabletennis;
  const volleyball = req.body.volleyball;
  const userId = req.body.userid;
  const usebadge = req.body.usebadge;
  console.log(req.file.buffer)
    db.query(" UPDATE `user` SET `email`= ? ,`password`= ? ,`username`= ? ,`userimg`= ? ,`tel`= ? ,`userdescribe`= ? ,`badminton`= ? ,`tabletennis`= ? ,`volleyball`= ? ,`usebadge`= ?  WHERE `userid`= ?",
      [email, password, username, req.file.buffer, tel, userdescribe, badminton, tabletennis, volleyball, usebadge ,userId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
});
//更新個人資料 沒改照片
app.post("/selfalterwithoutpic", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  // const userimg = req.body.userimg;
  const tel = req.body.tel;
  const userdescribe = req.body.userdescribe;
  const badminton = req.body.badminton
  const tabletennis = req.body.tabletennis;
  const volleyball = req.body.volleyball;
  const userId = req.body.userid;
  db.query(" UPDATE `user` SET `email`= ? ,`password`= ? ,`username`= ? ,`tel`= ? ,`userdescribe`= ? ,`badminton`= ? ,`tabletennis`= ? ,`volleyball`= ? WHERE `userid`= ?",
      [email, password, username,  tel, userdescribe, badminton, tabletennis, volleyball, userId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
});

//會員訂單搜尋 進行中
app.post("/ordering", (req, res) => {
  const userid = req.body.userid;
  const starttime = req.body.stratFind;
  const endtime = req.body.endFind;
  db.query("SELECT * FROM `userorder` WHERE now() BETWEEN startdate AND enddate AND orderdate BETWEEN ? AND ? AND userid = ? AND flag = '成立'",
    [starttime, endtime, userid], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }

    });
});
//會員訂單搜尋 未來
app.post("/orderfutrue", (req, res) => {
  const userid = req.body.userid;
  const starttime = req.body.stratFind;
  const endtime = req.body.endFind;
  db.query("SELECT * FROM `userorder` WHERE now() < startdate AND orderdate BETWEEN ? AND ? AND userid = ? AND flag = '成立'",
    [starttime, endtime, userid], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }

    });
});
app.post("/cancelOrder", (req, res) => {
  const orderid = req.body.orderid;
  db.query("UPDATE `userorder` SET `flag`='不成立' WHERE `orderid`= ? ",
    [orderid], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
//會員訂單搜尋 結束
app.post("/orderend", (req, res) => {
  const userid = req.body.userid;
  const starttime = req.body.stratFind;
  const endtime = req.body.endFind;
  db.query("SELECT * FROM `userorder` WHERE now() > enddate AND orderdate BETWEEN ? AND ? AND userid = ? AND flag = '成立'",
    [starttime, endtime, userid], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }

    });
});
//會員訂單搜尋 不成立
app.post("/orderfalse", (req, res) => {
  const userid = req.body.userid;
  const starttime = req.body.stratFind;
  const endtime = req.body.endFind;
  db.query("SELECT * FROM `userorder` WHERE orderdate BETWEEN ? AND ? AND userid = ? AND flag = '不成立'",
    [starttime, endtime, userid], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }

    });
});
//會員零打文章搜尋
app.post("/findzoro", (req, res) => {
  const userid = req.body.userid;
  const starttime = req.body.stratDate;
  const endtime = req.body.endDate;
  db.query("SELECT * FROM `userarticle_zeroda` WHERE userid = ? AND date BETWEEN ? AND ?", [userid, starttime, endtime], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//取得零打報名人
app.post("/followsublet", (req, res) => {
  const articleid_sublet = req.body.articleid_sublet;
  db.query(" SELECT * FROM `follow_sublet`,`user` WHERE follow_sublet.articleid_sublet = ? AND follow_sublet.userid = user.userid",
   [articleid_sublet], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//取得零打報名人
app.post("/followzeroda", (req, res) => {
  const articleid_zeroda = req.body.articleid_zeroda;
  db.query(" SELECT * FROM `follow_zeroda`,`user` WHERE follow_zeroda.articleid_zeroda = ? AND follow_zeroda.userid = user.userid",
   [articleid_zeroda], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//會員轉租文章搜尋
app.post("/findsub", (req, res) => {
  const userid = req.body.userid;
  const starttime = req.body.stratDate;
  const endtime = req.body.endDate;
  db.query("SELECT * FROM `userarticle_sublet` WHERE userid = ? AND date BETWEEN ? AND ?", [userid, starttime, endtime], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// 取得承租文章留言數
app.post("/countsub", (req, res) => {
  const articleid = req.body.articleid;
  db.query("SELECT count(*)as a FROM articlemessage_sublet WHERE `articleid_sublet`= ?", [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
// 取得零打文章留言數
app.post("/countzero", (req, res) => {
  const articleid = req.body.articleid;
  db.query("SELECT count(*)as a FROM articlemessage_zeroda WHERE `articleid_zeroda`= ?", [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
// 刪除轉租已新增文章
app.post("/delesublet", (req, res) => {
  const articleid = req.body.articleid_sublet;
  db.query("DELETE FROM `userarticle_sublet` WHERE articleid_sublet = ? ", 
  [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
// 刪除零打已新增文章
app.post("/delezeroda", (req, res) => {
  const articleid = req.body.articleid_zeroda;
  db.query("DELETE FROM `userarticle_zeroda` WHERE articleid_zeroda = ? ", 
  [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
// 新增零打已刪除文章
app.post("/insertdelezeroda", (req, res) => {
  const articleid = req.body.articleid_zeroda;
  db.query("INSERT INTO `delete_zeroda`(`articleid_zeroda`, `userid`, `content`, `ballgames`, `starttime`, `endtime`, `date`, `county`, `area`, `fieldname`, `address`, `cost`, `level`, `number`) SELECT * from userarticle_zeroda WHERE articleid_zeroda = ? ", 
  [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
// 新增轉租已刪除文章
app.post("/insertdelesublet", (req, res) => {
  const articleid = req.body.articleid_sublet;
  db.query("INSERT INTO `delete_sublet`(`articleid_sublet`, `userid`, `content`, `ballgames`, `starttime`, `endtime`, `date`, `county`, `area`, `fieldname`, `address`, `cost`, `level`, `amount`) SELECT * from userarticle_sublet WHERE articleid_sublet = ? ", 
  [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
//會員轉租已刪除文章搜尋
app.post("/finddelesub", (req, res) => {
  const userid = req.body.userid;
  const starttime = req.body.stratDate;
  const endtime = req.body.endDate;
  db.query("SELECT * FROM `delete_sublet` WHERE userid = ? AND date BETWEEN ? AND ?", [userid, starttime, endtime], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//會員零打已刪除文章搜尋
app.post("/finddelezoro", (req, res) => {
  const userid = req.body.userid;
  const starttime = req.body.stratDate;
  const endtime = req.body.endDate;
  db.query("SELECT * FROM `delete_zeroda` WHERE userid = ? AND date BETWEEN ? AND ?", [userid, starttime, endtime], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// 重建零打已新增文章
app.post("/insertzeroda", (req, res) => { 
  const articleid = req.body.articleid_zeroda;
  db.query("INSERT INTO `userarticle_zeroda`(`articleid_zeroda`, `userid`, `content`, `ballgames`, `starttime`, `endtime`, `date`, `county`, `area`, `fieldname`, `address`, `cost`, `level`, `number`) SELECT * from delete_zeroda WHERE articleid_zeroda = ? ", 
  [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
// 重建轉租以新增文章
app.post("/insertsub", (req, res) => { 
  const articleid = req.body.articleid_sublet;
  db.query("INSERT INTO `userarticle_sublet`(`articleid_sublet`, `userid`, `content`, `ballgames`, `starttime`, `endtime`, `date`, `county`, `area`, `fieldname`, `address`, `cost`, `level`, `amount`) SELECT * from delete_sublet WHERE articleid_sublet = ? ", 
  [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
// 刪除轉租已刪除文章
app.post("/deledelesublet", (req, res) => {
  const articleid = req.body.articleid_sublet;
  db.query("DELETE FROM `delete_sublet` WHERE articleid_sublet = ? ", 
  [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});
// 刪除零打已刪除文章
app.post("/deledelezeroda", (req, res) => {
  const articleid = req.body.articleid_zeroda;
  db.query("DELETE FROM `delete_zeroda` WHERE articleid_zeroda = ? ", 
  [articleid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});

// 芝｜Basic 查
app.post('/basicsearch', (req, res) => {
  const userid = req.body.userid; // 會員
  const teamid = req.body.teamid; // 球隊
  db.query(
    `SELECT tname,sidename, week,type,level,teamimg,fee,text,starttime,endtime,county,area,teamimgpath,teamimg
    FROM userteam, team 
    where userteam.teamid=team.teamid and userteam.userid=? and userteam.teamid=?`,
    [userid, teamid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// 芝｜Basic 更新 有圖
app.post("/basicupdate",upload.single('teamfile'), (req, res) => {
  const tname = req.body.tname;
  const sidename = req.body.sidename;
  const week = req.body.week;
  const starttime = req.body.starttime;
  const endtime = req.body.endtime;
  const type = req.body.type;
  const level = req.body.level;
  const fee = req.body.fee;
  const text = req.body.text;
  const teamfile = req.file.buffer; // img
  const teamid = req.body.teamid; // 球隊
  db.query(`
      UPDATE team 
      SET tname=?, sidename=?, week=?, starttime=?, endtime=?, type=?, level=?, fee=?, text=?, teamimg=?
      where teamid=?;`,
    [tname, sidename, week, starttime, endtime, type, level, fee, text, teamfile, teamid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
// 芝｜Basic 更新 無圖
app.post("/basicupdate2", (req, res) => {
  const tname = req.body.tname;
  const sidename = req.body.sidename;
  const week = req.body.week;
  const starttime = req.body.starttime;
  const endtime = req.body.endtime;
  const type = req.body.type;
  const level = req.body.level;
  const fee = req.body.fee;
  const text = req.body.text;
  const teamid = req.body.teamid; // 球隊
  db.query(`
        UPDATE team 
        SET tname=?, sidename=?, week=?, starttime=?, endtime=?, type=?, level=?, fee=?, text=?
        where teamid=?;`,
    [tname, sidename, week, starttime, endtime, type, level, fee, text, teamid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

// 芝｜Member 抓隊長img
app.post('/teamleader', (req,res)=>{
  const teamid = req.body.teamid;
  db.query(
      `SELECT userimg ,user.userid
      FROM teamuser,user
      where user.userid = teamuser.userid and teamid=? and leader=1;`,
      [teamid],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  // 芝｜Member 抓成員img
  app.post('/teammember', (req,res)=>{
    const teamid = req.body.teamid;
    db.query(
        `SELECT user.userid,userimg
        FROM teamuser,user
        where user.userid = teamuser.userid and teamid=?;`,
        [teamid],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
  });
    // 芝｜Member 抓 未審核成員img
    app.post('/teampendingimg', (req,res)=>{
      const teamid = req.body.teamid;
      db.query(
          `SELECT teampendinguser.userid,userimg,username,type as 'teamtype',badminton,tabletennis,volleyball
          FROM teampendinguser,user,team
          where teampendinguser.userid = user.userid and teampendinguser.teamid=1
          ORDER BY teampendinguser.userid;`,
          [teamid],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
    });

    // 芝｜Member 拒絕 未審核成員
    app.post('/teampendingreject', (req,res)=>{
      const teamid = req.body.teamid;
      const userid = req.body.userid;
      db.query(
          `SELECT teampendinguser.userid,userimg,username,type as 'teamtype',badminton,tabletennis,volleyball
          FROM teampendinguser,user,team
          where teampendinguser.userid = user.userid and teampendinguser.teamid=1
          ORDER BY teampendinguser.userid;`,
          [teamid],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
    });

    // 芝｜Pay 依日期區間 搜尋文章
    app.post('/teamdate', (req,res)=>{
      const pathend = req.body.pathend;
      const userid = req.body.userid;
      const teamid = req.body.teamid;
      const startdate = req.body.startdate;
      const enddate = req.body.enddate;
      db.query(
          `SELECT date 
          FROM ?
          WHERE date BETWEEN ? AND ? AND userid=? and teamid=?`,
          [pathend,startdate,enddate,userid,teamid],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
    });

//------------------
// 交流零打搜尋
app.post('/searchzero', (req, res) => {
  const ballgameszero = req.body.ballgameszero;
  const startdatezero = req.body.startdatezero;
  const enddatezero = req.body.enddatezero;
  const starttimezero = req.body.starttimezero;
  const endtimezero = req.body.endtimezero;
  const costzero = req.body.costzero;
  const countyzero = req.body.countyzero;
  const areazero = req.body.areazero;
  const zerolevel = req.body.zerolevel;
  // const zeroinput = req.body.zeroinput;
  console.log(ballgameszero, startdatezero, enddatezero, starttimezero, endtimezero, costzero, countyzero, areazero, zerolevel)
  db.query(
    `SELECT * FROM userarticle_zeroda, user 
    WHERE userarticle_zeroda.userid = user.userid
    AND ballgames = ? AND startdate >= ? AND enddate <= ?
    AND starttime >= ? AND endtime <= ? AND cost <= ? AND county = ? AND area = ? AND level = ?`,
    [ballgameszero, startdatezero, enddatezero, starttimezero, endtimezero, costzero, countyzero, areazero, zerolevel],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//交流轉租搜尋
app.post('/rentsearch', (req, res) => {
  const ballgamesrent = req.body.ballgamesrent;
  const countyrent = req.body.countyrent;
  const arearent = req.body.arearent;
  const startdaterent = req.body.startdaterent;
  const enddaterent = req.body.enddaterent;
  const starttimerent = req.body.starttimerent;
  const endtimerent = req.body.endtimerent;
  const fieldnamerent = req.body.fieldnamerent;
  const costrent = req.body.costrent;
  const numberrent = req.body.numberrent;

  console.log(ballgamesrent, countyrent, arearent, startdaterent, enddaterent, starttimerent, endtimerent, costrent, numberrent, fieldnamerent)
  if (fieldnamerent == '') {
    db.query(
      `SELECT * FROM userarticle_sublet, user 
    WHERE userarticle_sublet.userid = user.userid
    AND ballgames = ? AND county = ? AND area = ? AND startdate >= ?
    AND enddate <= ? AND starttime >= ? AND endtime <= ? 
    AND cost <= ? AND amount <= ? `,
      [ballgamesrent, countyrent, arearent, startdaterent, enddaterent, starttimerent, endtimerent, costrent, numberrent],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT * FROM userarticle_sublet, user 
    WHERE userarticle_sublet.userid = user.userid
    AND ballgames = ? AND county = ? AND area = ? AND startdate >= ?
    AND enddate <= ? AND starttime >= ? AND endtime <= ? 
    AND cost <= ? AND amount <= ? AND fieldname LIKE ?`,
      [ballgamesrent, countyrent, arearent, startdaterent, enddaterent, starttimerent, endtimerent, costrent, numberrent, fieldnamerent],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }

})

//交流球隊搜尋
app.post('/teamsearch', (req, res) => {
  const ballgamesteam = req.body.ballgamesteam;
  const countyteam = req.body.countyteam;
  const areateam = req.body.areateam;
  const weekteam = req.body.weekteam;
  const starttimeteam = req.body.starttimeteam;
  const endtimeteam = req.body.endtimeteam;
  const tnameteam = req.body.tnameteam;
  const levelteam = req.body.levelteam;
  const costteam = req.body.costteam;

  console.log(ballgamesteam, countyteam, areateam, weekteam, starttimeteam, endtimeteam, costteam, levelteam, tnameteam);
  if (tnameteam == "") {
    db.query(
      `SELECT * FROM team
    WHERE type = ? AND county = ? AND area = ? AND week = ?
    AND starttime >= ? AND endtime <= ? AND fee < ? AND level = ?`,
      [ballgamesteam, countyteam, areateam, weekteam, starttimeteam, endtimeteam, costteam, levelteam],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }else {
    db.query(
      `SELECT * FROM team
    WHERE type = ? AND county = ? AND area = ? AND week = ?
    AND starttime >= ? AND endtime <= ? AND fee < ? AND level = ? AND tname LIKE ?`,
      [ballgamesteam, countytaem, areateam, weekteam, starttimeteam, endtimeteam, costteam, levelteam, tnameteam],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }

})

//交流零打新增
app.post('/zerocreate', (req, res) => {
  const fieldnameczero = req.body.fieldnameczero;
  const useridczero = req.body.useridczero;
  const ballgamesczero = req.body.ballgamesczero;
  const countyczero = req.body.countyczero;
  const areaczero = req.body.areaczero;
  const addressczero = req.body.addressczero;
  const startdateczero = req.body.startdateczero;
  const enddateczero = req.body.enddateczero;
  const starttimeczero = req.body.starttimeczero;
  const endtimeczero = req.body.endtimeczero;
  const levelczero = req.body.levelczero;
  const numberczero = req.body.numberczero;
  const costczero = req.body.costczero;
  const contentczero = req.body.contentczero;

  console.log(useridczero,fieldnameczero,ballgamesczero,countyczero,areaczero,addressczero,startdateczero,enddateczero,starttimeczero
    ,endtimeczero,levelczero,numberczero,costczero,contentczero)
  db.query(
    `INSERT INTO userarticle_zeroda (fieldname, userid, ballgames, county, area, address, startdate, enddate, starttime, endtime, level, number, cost, content) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [fieldnameczero,useridczero,ballgamesczero,countyczero,areaczero,addressczero,startdateczero,enddateczero,starttimeczero,endtimeczero,levelczero,numberczero,costczero,contentczero],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})

//交流轉租新增
app.post('/rentcreate',(req, res) => {
  const useridcrent = req.body.useridcrent;
  const fieldnamecrent = req.body.fieldnamecrent;
  const ballgamescrent = req.body.ballgamescrent;
  const countycrent = req.body.countycrent;
  const areacrent = req.body.areacrent;
  const addresscrent = req.body.addresscrent;
  const startdatecrent = req.body.startdatecrent;
  const enddatecrent = req.body.enddatecrent;
  const starttimecrent = req.body.starttimecrent;
  const endtimecrent = req.body.endtimecrent;
  const numbercrent = req.body.numbercrent;
  const costcrent = req.body.costcrent;
  const contentcrent = req.body.contentcrent;

  console.log(useridcrent,fieldnamecrent,ballgamescrent,countycrent,areacrent,addresscrent,startdatecrent,
    enddatecrent,starttimecrent,endtimecrent,numbercrent,costcrent,contentcrent)

  db.query(
    `INSERT INTO userarticle_sublet (articleid_sublet, userid, fieldname, ballgames, county, area, address, startdate, 
    enddate, starttime, endtime, amount, cost ,content)
    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [useridcrent,fieldnamecrent,ballgamescrent,countycrent,areacrent,addresscrent,startdatecrent,
      enddatecrent,starttimecrent,endtimecrent,numbercrent,costcrent,contentcrent],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})

