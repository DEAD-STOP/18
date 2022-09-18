const { Schema, model } = require('mongoose');
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
