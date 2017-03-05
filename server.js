

console.log("here?")
var sql = require('mssql')
var express = require('express')
var cors = require('cors')
var path = require('path')
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/static/public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

function getPass() {
  var pass = 'GoHuskies!'
  if (!pass) {
    throw new Error('Missing PASSWORD environment variable')
  }
  return pass
}

function connectToDb() {
  var config = {
    user: 'Info445',
    password: getPass(),
    server: 'IS-HAY04.ischool.uw.edu',
    database: 'rocket_db'
  }
  return sql.connect(config)
}

/*
Returns the top 100 players in the DB
*/
function displayAllPlayers() {
  console.log("displaying top 100 Players");
  return new sql.Request().query(
    'SELECT TOP 100 username, fName, lName, email, levelID FROM dbo.Player ORDER BY playerID DESC');
}

function updatePlayerLevel(PPlayerID) {
    console.log("got in method")
    return new sql.Request().query('UPDATE Player SET username = isuck  WHERE PlayerID = ' + PPlayerID);
}

function deletePlayer(PPlayerID) {
  console.log("got in delete")
  return new sql.Request().query('DELETE Player WHERE PlayerID = ' + PPlayerID);  

}


//ROUTES
function makeRouter() {
    app.use(cors())  
    console.log("please");
    // frames
    app.get('/', function (req, res) {
      res.sendFile('/static/views/index.html', { root: __dirname })
    })

    app.get('/Players/all', function (req, res) {
      displayAllPlayers().then(function (data) {
        return res.json(data);
      });
    })

    app.post('/', function (req, res) {
      var PPlayerID = req.body.PlayerID
      var WhatToDo = req.body.whatToDo
      if(WhatToDo = 'updateLevel'){
        console.log("got to update")
        updatePlayerLevel(PPlayerID).then(function (data) {
          return res.json(data);
        });
      }
      if(WhatToDo = 'delete'){
        console.log("got to update")
        deletePlayer(PPlayerID).then(function (data) {
          return res.json(data);
        });
      }
    });
}

function startParty() {
  console.log("party");
  connectToDb().then(() => {
    makeRouter();
    app.listen(process.env.PORT || 3000);
  })
}
startParty()
