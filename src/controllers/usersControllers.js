const bcryptjs=require('bcryptjs')
const db = require('../database/models');

const userControllers={
    login:(req,res)=>{
        res.render("login")
    },
    register:(req,res)=>{
        res.render("register")
    },
    registerPost:async(req,res)=>{
        const user = req.body.user;
        const name = req.body.name;
        const rol = req.body.rol;
        const pass = req.body.pass;
        let passwordHash = await bcryptjs.hash(pass,8)
        db.User.create({
            user: user,
            name: name,
            rol: rol,
            pass: passwordHash
        })
        .then(()=>{
            res.render('register',{
                alert:true,
                alertTitle: "Registration",
                alertMessage:"¡Successful Registration",
                alertIcon:'success',
                showConfirmButton:false,
                timer: 1500,
                ruta:''
            })
        })
        .catch(err=>{
            console.error(err)
        })
       

    }
}

module.exports=userControllers