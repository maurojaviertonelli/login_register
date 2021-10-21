const bcryptjs=require('bcryptjs')
const db = require('../database/models');
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const userControllers={
    login:(req,res)=>{
        res.render("login")
    },
    register:(req,res)=>{
        res.render("register")
    },
    profile: (req, res) => {
        res.render("profile", {
          pageTitle: "Perfil",
          id: req.params.id,
          user:req.session.userLogged
    
        });
      },
     
      
      
      logout:(req,res)=>{                          //metodo del logout
        req.session.destroy();
        return res.redirect('/')
      },
      create: (req, res) => {
        res.render('create', {
            pageTitle: 'Crear',
            
        });
    },
      createPost:async(req,res)=>{
        const user = req.body.user;
        const name = req.body.name;
        const rol = req.body.rol;
        const pass = req.body.pass;
        let passwordHash = await bcryptjs.hash(pass,8)
        let nombreImagen="/public/img/users_img/"+req.file.filename
        db.User.create({
            user: user,
            name: name,
            rol: rol,
            pass: passwordHash,
            avatar: nombreImagen
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

        
    return res.redirect("/");
  },
  edit: (req, res) => {
    res.render("editUser", {
      pageTitle: "Editar",
    });
  },
      editPut: (req, res) => {
        console.log(req.file);
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
          return res.render("editUser", {
            errors: resultValidation.mapped(),
            pageTitle: "Editar",
            oldData: req.body
            
          });
        }else{
          db.User.update(
            {
              pass:req.body.pass_new,
              avatar: "/public/img/users_img/"+req.file.filename
            },
            {
              where:{id:req.session.userLogged.id}
            }
          )
        }
      },
    registerPost:async(req,res)=>{
        const user = req.body.user;
        const name = req.body.name;
        const rol = req.body.rol;
        const pass = req.body.pass;
        let passwordHash = await bcryptjs.hash(pass,8)
        let nombreImagen="/public/img/users_img/"+req.file.filename
        db.User.create({
            user: user,
            name: name,
            rol: rol,
            pass: passwordHash,
            avatar: nombreImagen
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

        
    return res.redirect("/login");   

    },
    loginProcess:async(req,res)=>{
          let userToLogin=await db.User.findOne({ where: { user: req.body.user } });
          if(userToLogin){
            let isOkThePassword=bcryptjs.compareSync(req.body.pass,userToLogin.pass)
              if(isOkThePassword){
                delete userToLogin.pass;    
                req.session.userLogged=userToLogin
                return res.redirect('profile') 
            }
          }
          return res.render("users/login",{
            pageTitle:"Login",
            errors:{
              email:{
                msg:'Las credenciales son inválidas'
              }
            }
          });
         
      },
      getUsers:(req,res)=>{
        res.render('listUsers')
      },
      getUser:(req,res)=>{
        res.render('edit');
      }
}

module.exports=userControllers