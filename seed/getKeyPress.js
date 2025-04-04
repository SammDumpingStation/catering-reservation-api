// Simple function to get a single character input
export default function getKeyPress(question) {
  return new Promise((resolve) => {
    // Use process.stdout.write to keep cursor on same line
    process.stdout.write(question);

    // Configure stdin for single keypress
    process.stdin.setRawMode(true);
    process.stdin.resume();

    // Listen for keypress
    process.stdin.once("data", (data) => {
      const key = data.toString().toLowerCase();

      // Return stdin to normal mode
      process.stdin.setRawMode(false);
      process.stdin.pause();

      // Print the key pressed and move to next line
      console.log(key);
      resolve(key);
    });
  });
}
