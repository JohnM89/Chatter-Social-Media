
const { Schema, model, Types } = require('mongoose');
const { format } = require('date-fns');

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
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => format(timestamp, "yyyy-MM-dd HH:mm:ss"),
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
    get: (timestamp) => format(timestamp, "yyyy-MM-dd HH:mm:ss"),
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
 reactions: [reactionSchema]
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
