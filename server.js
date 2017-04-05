var express = require('express');
var app = express();
var mongoose = require ('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/CodeReviewAppTest');

var testSchema = mongoose.Schema({
  text:{
    type:String
  }
})
var Test = mongoose.model('Test',testSchema);


app.get('/',function(req,res){
  var newText = new Test({text:'hello!'});
  newText.save().then(res.send('hello was saved to database'))
})

app.get('/message',function(req,res){
  Test.find({}).then(function(response){
    res.json(response)
  })
})

app.listen(process.env.PORT,function(){
  console.log('server running')
});
