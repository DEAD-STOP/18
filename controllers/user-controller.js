const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
          .then((userData) => {
            res.json(userData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
}

module.exports = userController;