//agrego express-validator//
const{check}=require('express-validator');



const validationForm=[
   /* check('name')
   .notEmpty().withMessage('*Ingrese su nombre y apellido completos').bail().isLength({min:5}).withMessage('*El nombre debe ser mas largo'),

    check('user')
        .notEmpty().withMessage('*Debe ingresar su casilla de correo electrónico').bail()
        .isEmail().withMessage('*Ingrese un email válido'),*/

    check('pass')
    .notEmpty().withMessage('*Debes completar la contraseña').bail()
    .isLength({min:8}).withMessage('La contraseña debe contener como mínimo 8 carácteres'),

    check('avatar').custom((value, { req }) => {
        const file = req.file;
        if (!file) {
            throw new Error('Debes subir una imagen de perfil');
        } else if (!file.mimetype.includes("avatar")) {
            throw new Error('Subir una imagen valida');
        } else {
            return true
        }
    })
           
]

module.exports = validationForm;