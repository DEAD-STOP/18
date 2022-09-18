const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
          .sort({ createdAt: -1 })
          .then((thoughtData) => {
            res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    

};

module.exports = thoughtController;