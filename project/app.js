//Packages..
var express=require('express');
var app=express();

var path=require('path');
var dotenv=require('dotenv');
var mongoose=require('mongoose');
var methodOverride=require('method-override')
var session=require('express-session');
var flash=require('connect-flash');
var bodyParser = require('body-parser');
var employeeRoutes=require('./routes/emp');

//Middleware

//Connecting Mongoose database
mongoose.connect('mongodb+srv://Admin-atishay:aadi123@cluster0-0rooc.mongodb.net/employees', {
   useNewUrlParser:true,
   useUnifiedTopology:true,
   useCreateIndex:true
});

app.use(methodOverride('_method'));
app.use(session({
     secret:"nodejs",
     resave:true,
     saveUninitialized:true
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());

app.use((req,res,next)=>{
      res.locals.success_msg=req.flash(('success_msg'));
      res.locals.error_msg = req.flash(('error_msg'));
      next();
});

app.use(employeeRoutes);
dotenv.config({path:'./config.env'});
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.set('view engine', 'ejs');



var port=process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
    console.log('Server started at port');
})