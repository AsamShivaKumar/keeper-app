require("dotenv").config();
const exp = require("express");
// const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");

const app = exp();
// app.use(bodyParser.urlencoded({extended: true}));
app.use(exp.json());
app.use(cors());

mongoose.connect("mongodb+srv://ask:" + process.env.ATLAS_PASS + "@cluster0.pi81t.mongodb.net/keeperData")

const userSchema = new mongoose.Schema({
      username: String,
      password: String
});

const noteSchema = new mongoose.Schema({
      username: String,
      title: String,
      content: String
});

const User = new mongoose.model("User",userSchema);
const Note = new mongoose.model("Note", noteSchema);

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

app.use(exp.static(path.resolve(__dirname, "./client/build")));

app.post("/", function(req,res){
    
    User.findOne({username: req.body.userName}, function(err,user){
         if(err){
             res.json({done: false});
         }else{
             if(user){
                bcrypt.compare(req.body.password,user.password, function(err,result){
                    if(err){
                      res.json({done: false})
                    }else if(result) {
                      Note.find({ username: user.username}, function(err,notesArr){
                           if(err){
                               res.json({done: false});
                           }else{
                               const response = {
                                   done: true,
                                   notes: notesArr,
                                   user: user.username
                               };
                               res.json(response);
                           }
                      });
                    }else{
                        res.json({done: false})
                    }
             });
             }else{               
                 bcrypt.hash(req.body.password,10,function(err,bHash){
                        if(err){
                            res.json({done: false});
                        }else{
                            const newUser = new User({
                                  username: req.body.userName,
                                  password: bHash
                            });
                            newUser.save();
                            res.json({done: true, notes: []});
                        }
                 });
             }
         }
    });
});

app.post("/newNote", function(req,res){
    
    console.log(req.body);
    console.log(req.body.username);

    const newNote = new Note({
        username: req.body.username,
        title: req.body.title,
        content: req.body.content
    });

    newNote.save();
    res.json({done: true});
});

app.post("/deleteNote", function(req,res){

    Note.deleteMany({ title: req.body.title, content: req.body.content},function(err){
        if(err) res.json({done: true});
        else res.json({done: true});
    });
});

app.listen(process.env.port || 5000, function(){
    console.log("Server started");
});