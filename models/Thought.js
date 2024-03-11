
const { Schema, model, Types } = require('mongoose');


const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => timestamp.toLocaleString(),
  },
}, {
  toJSON: {
    getters: true,
  },
  _id: false, 
});

const thoughtSchema = new Schema({

  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => timestamp.toLocaleString(), // Example getter, adjust according to needs
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reactions: [{
    type: Schema.Types.ObjectId, // Reference to the Reaction model (if you have one)
    ref: 'Reaction', 
  }], // Embed the reactionSchema here
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
