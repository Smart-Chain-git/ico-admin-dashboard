var express     = require('express');
var path        = require('path');
var $           = require('jquery');


//init app  
var app = express();  

//fetch data from the request  
app.use(express.urlencoded({extended:false}));  

//set the path of the jquery file to be used from the node_module jquery package  
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  

//set static folder(public) path  
app.use(express.static(path.join(__dirname+'/client')));  

//default page load  
app.get('/',(req,res)=>{  
  res.redirect('/task/home');  
});  

//routes  
app.use('/task',require('./routes/taskroute'));  

//assign port  
var port  = process.env.PORT || 3000;  
app.listen(port,()=>console.log('server run at port '+port));