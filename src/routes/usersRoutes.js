const express = require('express');
//const { get } = require('jquery');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const APIusers = require('../controllers/apiControllers');
const usersControllers = require('../controllers/usersControllers')
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validationFormSignUp = require('../middlewares/validationFormSignUpMiddleware');
const validationForm = require('../middlewares/validationFormMiddleware');

//const userLoggedMiddleware = require ('../middlewares/userLoggedMiddleware');
//Configuración MULTER para cargar imagenes en la vista
const multerDS = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/img/users_img'));    //Ruta donde almacenamos el archivo, si uso servidor puedo poner la ruta de mi servidor ejmplo www.miservidor.com
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let nameImage = Date.now()+path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, nameImage);         
    }
});
const uploadFile=multer({storage:multerDS});


router.get('/login',guestMiddleware,usersControllers.login)
router.post('/login',usersControllers.loginProcess)
//register routes
router.get('/register',guestMiddleware,usersControllers.register)
router.post('/register',uploadFile.single('avatar'),validationFormSignUp,usersControllers.registerPost)
//profile routes
router.get('/profile',authMiddleware,usersControllers.profile);
//create
router.get('/create',usersControllers.create);
router.post('/create',uploadFile.single('avatar'),usersControllers.createPost);
//--logout--//
router.get('/logout',usersControllers.logout);
// edit routes //
router.get('/editUser',usersControllers.edit);
router.put('/editUser/:id',validationForm,usersControllers.editPut);
// api //
//router.get('/',APIusers.users);
//router.get('/:id',APIusers.usersDetail);

module.exports=router
