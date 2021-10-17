module.exports=(sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        user:{
            type: dataTypes.STRING,
            allowNull: false
        },
        pass:{
            type: dataTypes.STRING,
            allowNull: false
        },
        name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        rol:{
            type:dataTypes.CHAR,
            allowNull: false
        }
        
    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);
    return User
}