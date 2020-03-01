
const express = require("express");
const path = require("path");
const fs = require('fs');
const jsonNotes = fs.readFileSync('./db/db.json')
const notes = JSON.parse(jsonNotes);
console.log(notes);
//const notes = require('./public/assets/js/index');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

app.get('/api/notes', (req,res) =>{
    res.send(readJson());
});


app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const jsonList = readJson();
  jsonList.push(newNote);
  writeJson(JSON.stringify(jsonList,null,2));
  
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


  function readJson() {
    const jsonList = fs.readFileSync(path.join(__dirname, '/db/db.json'))
    let noteList = JSON.parse(jsonList);
    return noteList
  }

  function writeJson(data){
      fs.writeFile(path.join(__dirname, '/db/db.json'), data, complete);
      function complete(err){
        if (err) throw err;
        console.log("Notes list has been updated!")
      }
        
  }