const db=require('../database/models')


db.User.findAll()
.then((resultado)=>{
    console.log(resultado)
})

