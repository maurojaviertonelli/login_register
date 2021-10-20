const express = require('express');
const app = express();
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const methodOverride=require('method-override');




app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static('/public'));

app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo");
});

app.set('view engine', 'ejs');
app.set('views','./src/views');

//-----dotenv
const dotenv= require('dotenv')
dotenv.config({path:'./.env'})

//--bcryptjs
const bcryptjs=require('bcryptjs')
//--session
const session= require('express-session')
app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}))

//app.use(userLoggedMiddleware);

app.use(express.urlencoded({extended:false}));
app.use(express.json());






const usersRoutes = require('./src/routes/usersRoutes');
const indexRoutes = require('./src/routes/indexRoutes');
const apiRoutes = require('./src/routes/apiRoutes');


app.use(methodOverride('_METHOD'));
app.use('/',usersRoutes)
app.use('/',indexRoutes)
app.use('/api', apiRoutes)
