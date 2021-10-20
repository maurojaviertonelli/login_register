const db = require('../database/models');

const APIController = {
    users: (req, res) => {
        db.User.findAll()
            .then(users => {
                const data = {}
                data.count = users.length;
                const newUsers = users.map(user => {
                    const newUser = {}
                    newUser.id = user.id;
                    newUser.name = user.name;
                    newUser.email = user.user;
                    newUser.avatar = user.avatar;
                    newUser.detail = `/users/detail/${user.id}`;
                    return newUser;
                })
                data.users = [...newUsers];
                JSON.stringify(data);
                res.send(data);
            })
            .catch(err => {
                res.send(err);
                throw err;
            });
    },
    usersDetail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                if (user) {
                    delete user.dataValues.password;
                    delete user.dataValues.user_type;
                    res.send(user);
                    return;
                }
                res.send({ msg: 'Usuario no encontrado', isData: false })
            })
            .catch(err => {
                res.send(err);
                throw err;
            });
    }

}

module.exports = APIController;