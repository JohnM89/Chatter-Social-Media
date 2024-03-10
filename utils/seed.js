const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { reaction, user, thought } = require('./data');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create users
  const users = user.map(userName => ({
    username: userName,
    email: `${userName.toLowerCase().replace(/\s+/g, '')}@example.com`
  }));

  await User.create(users);
  console.log('Users inserted');

  const createdUsers = await User.find();
  const thoughtsData = thought.map(thoughtText => {
    const userSample = getRandomArrItem(createdUsers);
    const sampledUsername = userSample.username; 
    return {
      thoughtText,
      username: sampledUsername,
      reactions: [{
        reactionBody: getRandomArrItem(reaction),
        username: sampledUsername, 
      }]
    };
  });

  await Thought.create(thoughtsData);
  console.log('Thoughts inserted');

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
