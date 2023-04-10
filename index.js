const fs = require("fs");
const rl = require("readline");
const path = require("path");

const clean = require("./lib/cleaner");
const parse = require("./lib/parser");
const transform = require("./lib/transformer");
const stringify = require("./lib/stringifier");
const format = require("./lib/formatter");

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Clean-up and transform SVG into valid JSX.
 * @param {string} svg SVG string
 * @param {Object} config Output component type and Prettier options.
 * @returns {string}
 */
async function transformer(svg, config = {}, file) {
  const cleaned = await clean(svg, config);
  const parsed = parse(cleaned.data);
  const transformed = transform(parsed);
  const morphed = stringify(transformed);
  const formatted = format(morphed, config, file);
  return formatted;
}

let pathToSvgs = "";
let outputPath = "";

async function main() {
  readline.question("src path (absolute):", (userInput) => {
    // /Users/jake/Downloads/iconic-pro/svgs
    pathToSvgs = userInput;
    readline.question("output file (absolute):", async (userInput) => {
      // /Users/jake/Desktop/icons.tsx
      outputPath = userInput;
      readline.write("processing...");
      let bufferForOutput = "";
      const files = fs.readdirSync(pathToSvgs);
      await Promise.all(
        files.map(async (file) => {
          if (path.extname(file) === ".svg") {
            const svgContent = fs.readFileSync(`${pathToSvgs}/${file}`, "utf8");
            const svgConverted = await transformer(svgContent, {}, file);
            bufferForOutput += svgConverted;
          }
        })
      );
      fs.writeFile(outputPath, bufferForOutput, "utf8", (err) => {
        if (err) console.log(err);
        readline.write("\ndone...");
        readline.close();
      });
    });
  });
}

main();
