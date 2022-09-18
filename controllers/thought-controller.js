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
    createThought(req, res) {
        Thought.create(req.body)
          .then((thoughtData) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: thoughtData._id } },
              { new: true }
            );
          })
          .then((userData) => {
            if (!userData) {
              return res.status(404).json({ message: 'There is no User with this ID.' });
            }
    
            res.json({ message: 'Thought created!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
          .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'There is no User with this ID.' });
            }
            res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'There is no User with this ID.' });
            }
            return User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            );
          })
          .then((uderData) => {
            if (!uderData) {
              return res.status(404).json({ message: 'There is no User with this ID.' });
            }
            res.json({ message: 'Thought deleted!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

};


module.exports = thoughtController;