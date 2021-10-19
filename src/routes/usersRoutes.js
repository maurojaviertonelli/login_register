const express = require('express');
//const { get } = require('jquery');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const APIusers = require('../controllers/apiControllers');
const usersControllers = require('../controllers/usersControllers')
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
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

//agrego express-validator//
const{body}=require('express-validator');
const { Router } = require('express');

//Validacion para el registro hacer lo mismo q con multer crear archivo en middleware de validacion y luego requerirlo aca//
const validationFormSignUp=[
    body('user')
    .notEmpty().withMessage('*Debe ingresar su casilla de correo electrónico').bail()
    .isEmail().withMessage('*Ingrese un email válido'),
    body('name').notEmpty().withMessage('*Ingrese su nombre y apellido completos'),
    body('pass').isLength({min:5,max:15}).withMessage('*Ingrese contraseña válida (entre 5 y 15 caracteres)'),
    body('avatar').custom((value,{ req })=>{
        let file=req.file;
        let acceptedExtensions=['.png', '.webp', '.jpg'];
        if (!file){
            throw new Error('*Debe seleccionar su avatar');
        }else{
            let fileExtension=path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
       
        return true;
    })
]

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
//router.get('/editUser',usersControllers.edit);
//router.put('/editUser',usersControllers.editPut);
// api //
//router.get('/',APIusers.users);
//router.get('/:id',APIusers.usersDetail);

module.exports=router
