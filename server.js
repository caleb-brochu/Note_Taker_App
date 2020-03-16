
const express = require("express");
const path = require("path");
const fs = require('fs');
const shortid = require('shortid');
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
  req.body.id = shortid.generate();
  const jsonList = readJson();
  jsonList.push(newNote);
  res.send(writeJson(jsonList));
  
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

app.delete("/api/notes/:id", function(req, res) {
  const deleted = req.params.id;
  let list = readJson()

      const newList = list.filter(function(el){
          return el.id != deleted;
      })

      res.send(writeJson(newList));
});
  

  function readJson() {
    const jsonList = fs.readFileSync(path.join(__dirname, '/db/db.json'))
    let noteList = JSON.parse(jsonList);
    return noteList
  }

  function writeJson(data){
      fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(data, null, 2), complete);
      function complete(err){
        if (err) throw err;
        console.log("Notes list has been updated!")
      }
        
  }