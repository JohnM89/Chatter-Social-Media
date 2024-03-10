const user = [
[
    "Sam Sung",
    "Saad Maan",
    "Chris Bacon",
    "Freda Kids",
    "Hugh Mungus",
    "Updog Nothing",
    "Ok Boomer",
    "Juan Direction",
    "Placeholder Name",
    "Something Inoffensive",
    "Shock Cavalry",
    "Heart Warmers",
    "Blake Money",
    "Chip Munk",
    "Cookie Facey",
    "Dorothy Tickler",
    "Everhard Persistent",
    "Gary Doodle",
    "Pearl Necklass",
    "James Wood",
    "See Tu-Morrow",
    "Milo Minutes",
    "Anna Log",
    "Tara Bull",
    "Carrie Oakey",
    "Robin Banks",
    "Sue Flay",
    "Barry Cades",
    "Terry Aki",
    "Cliff Hanger",
    "Paige Turner",
    "Russell Leaves",
    "Dinah Soar",
    "Ella Vator",
    "Holly Wood",
    "Justin Time",
    "Kenny Dewitt",
    "Lance Boyle",
    "Marty Graw",
    "Nina Speaks",
    "Elon Musk",
    "Mark Zuckerberg",
    "Jeff Bezos",
    "Bill Gates",
    "Steve Jobs",
    "Warren Buffet",
    "Larry Page",
    "Sergey Brin",
    "Tim Cook",
    "Sundar Pichai",
    "Emma Watson",
    "John Smith",
    "Jane Doe",
    "Emily Davis",
    "Michael Brown",
    "Sarah Lee",
    "David Wilson",
    "Laura Jones",
    "Brian Cox",
    "Rachel Green",
    "Bret McKenzie",
    "Jemaine Clement",
    "Andy Samberg",
    "Jorma Taccone",
    "Akiva Schaffer",
    "Dave Grohl",
    "Taylor Hawkins",
    "Nate Mendel",
    "Chris Shiflett",
    "Pat Smear",
    "Seth MacFarlane",
    "Matt Groening",
    "Dan Harmon",
    "Justin Roiland",
    "Adam Reed",
    "H. Jon Benjamin",
    "John DiMaggio",
    "Aaron McGruder",
    "Mike Tyson",
    "Chris Parnell",
    "Sarah Silverman",
    "Dave Chappelle",
    "John Mulaney",
    "Tina Fey"
]

];

const thought = [
    "Life is short. Smile while you still have teeth.",
    "The best way to predict the future is to invent it.",
    "If at first you don't succeed, then skydiving isn't for you.",
    "Change is not a four-letter word... but often your reaction to it is!",
    "To be is to do – Socrates. To do is to be – Sartre. Do Be Do Be Do – Sinatra.",
    "Happiness is not by chance, but by choice.",
    "I'm not arguing, I'm simply explaining why I'm right.",
    "The road to success is always under construction.",
    "I have not failed. I've just found 10,000 ways that won't work.",
    "Hard work never killed anyone, but why take the chance?",
    "Silence is golden. Duct tape is silver.",
    "Don't worry about the world ending today. It's already tomorrow in Australia.",
    "Be the change that you wish to see in the world.",
    "Always remember that you are unique – just like everyone else.",
    "People say nothing is impossible, but I do nothing every day.",
    "If you think you are too small to make a difference, try sleeping with a mosquito.",
    "I am on a seafood diet. I see food, and I eat it.",
    "Opportunity does not knock, it presents itself when you beat down the door.",
    "A clear conscience is a sure sign of a bad memory.",
    "I didn't fail the test. I just found 100 ways to do it wrong.",
    "Age is of no importance unless you're a cheese.",
    "Life is like a sewer – what you get out of it depends on what you put into it.",
    "The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
    "If you want to lift yourself up, lift up someone else.",
    "A day without sunshine is like, you know, night.",
    "Every moment is a fresh beginning.",
    "Never let your sense of morals prevent you from doing what is right.",
    "I'd agree with you, but then we'd both be wrong.",
    "The early bird might get the worm, but the second mouse gets the cheese.",
    "If you hit the target every time, it's too near or too big.",
    "I am so clever that sometimes I don't understand a single word of what I am saying.",
    "Reality is merely an illusion, albeit a very persistent one.",
    "It takes less time to do things right than to explain why you did it wrong.",
    "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
    "I could agree with you, but then we’d both be wrong."
]


const reaction = [
    "😀", "😂", "😍", "😢", "😡",
    "👍", "👎", "❤️", "🔥", "😮",
    "🎉", "💔", "🙏", "🤔", "😴",
    "🎂", "👏", "😱", "🤢", "🤯",
    "👽", "👻", "🍕", "🥑", "🚀",
    "💩", "🔮", "🎱", "🍍", "🦄",
    "🐙", "🍔", "🍣", "🌮", "🥨",
    "🧩", "🛸", "🧁", "🥳", "🤖",
    "👾", "🧠", "🐉", "🍆", "🔫",
    "🍦", "🧀", "🥐", "🌯", "🍭"
]


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUser = () =>
    `${getRandomArrItem(user[0])} ${getRandomArrItem(user[0])}`;

// Function to generate random assignments that we can add to student object.
const getRandomThought = () => {
  return {
    thoughtText: getRandomArrItem(thought),
    username: getRandomUser(), // Adjust as needed to fit your user identification system
    reactions: [{
      reactionBody: getRandomArrItem(reaction), // Assume single reaction for simplicity
      username: getRandomUser(), // This should be the username of the user reacting
    }],
  };
};

// Export the functions for use in seed.js
module.exports = { user, thought, reaction };