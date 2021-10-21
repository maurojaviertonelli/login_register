//agrego express-validator//
const{check}=require('express-validator');
const { Router } = require('express');

//Validacion para el registro hacer lo mismo q con multer crear archivo en middleware de validacion y luego requerirlo aca//
const validationFormSignUp=[
    check('user')
    .notEmpty().withMessage('*Debe ingresar su casilla de correo electrónico').bail()
    .isEmail().withMessage('*Ingrese un email válido'),

    check('name')
   .notEmpty().withMessage('*Ingrese su nombre y apellido completos').bail()
   .isLength({min:5}).withMessage('*El nombre debe ser mas largo'),

    check('pass')
    .notEmpty().withMessage('*Debes completar la contraseña').bail()
    .isLength({min:8}).withMessage('La contraseña debe contener como mínimo 8 carácteres'),

    check('avatar')
    .custom((value,{ req })=>{
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

module.exports = validationFormSignUp;