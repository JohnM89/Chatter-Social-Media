const mongoose = require('mongoose');
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { reaction, user, thought, getRandomArrItem,  } = require('./data');


// Function to generate a random email based on username
const generateEmail = (username) => {
  const cleanedUsername = username.replace(/\s+/g, '').toLowerCase();
  return `${cleanedUsername}@example.com`;
};

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create users
  const users = user.map(username => ({
    username,
    email: generateEmail(username)
  }));

  // Insert users into the database
  const createdUsers = await User.create(users);
  console.log('Users inserted');

  // Create thoughts for each user
  const thoughtsData = [];

  createdUsers.forEach(user => {
    const numThoughts = Math.floor(Math.random() * 5) + 1; // Random number of thoughts per user
    for (let i = 0; i < numThoughts; i++) {
    thoughtsData.push({
      thoughtText: getRandomArrItem(thought),
      username: user._id,
      reactions: [{ // This assumes each thought starts with one reaction for simplification
        reactionBody: getRandomArrItem(reaction),
        username: user.username,
        reactionId: new mongoose.Types.ObjectId()
      }]
    });
  }
});

  // Insert thoughts data into the database
  await Thought.create(thoughtsData);
  
  console.log('Thoughts inserted');

  console.info('Seeding complete! 🌱');
  process.exit(0);
});

