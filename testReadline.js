const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Type something: ", (answer) => {
  console.log(`You typed: ${answer}`);
  rl.close();
});

