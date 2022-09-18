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
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts')
          .then((userData) => {
            if (!userData) 
            {
              return res.status(404).json({ message: 'There is no User with this ID.' });
            }
            res.json(userData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    createUser(req, res) {
        User.create(req.body)
          .then((userData) => {
            res.json(userData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: req.body,
          },
          {
            runValidators: true,
            new: true,
          }
        )
          .then((userData) => {
            if (!userData) 
            {
              return res.status(404).json({ message: 'There is no User with this ID.' });
            }
            res.json(userData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((userData) => {
            if (!userData) 
            {
              return res.status(404).json({ message: 'There is no User with this ID.' });
            }

            return Thought.deleteMany({ _id: { $in: userData.thoughts } });
          })
          .then(() => {
            res.json({ message: 'User + thoughts deleted!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    // need create + delete route for friends 
}

module.exports = userController;