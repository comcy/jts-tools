const fs = require("fs");

const arguments = process.argv;

// Commaned line arguments
const configJsonPath = arguments[2];
const packageJsonPath = arguments[3];

if (!configJsonPath || !packageJsonPath) {
  console.log(" Please provide command line parameters:");
  console.log(" \t [1]: Path to the configuration file");
  console.log(" \t [2]: Path to the local package.json to parse");
  console.log(
    " Sample: \n\t $ node validate-package-version.js ./package-name-validation.json  ./package.json "
  );
  process.exit(1);
}

// Read in file contents
const configJson = JSON.parse(fs.readFileSync(configJsonPath).toString());
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
const declaredPackages = configJson.packages;
const usedPackages = Object.entries(packageJson.dependencies);

// Crawl through packages
usedPackages.map(([package, version] = entry) => {
  declaredPackages.forEach((p) => {
    // DEBUG
    // console.log("Check package ", p.name);
    // console.log("Check package ", package);
    // console.log("Check version ", version);

    if (p.name === package) {
      console.log("\n ");
      console.log(" v-v-v-v-v-v-v-v-v MATCH v-v-v-v-v-v-v-v-v \n");
      console.log(" Package: ", p.name);
      console.log(" Version: ", version);

      if (p.allowedVersion === "stable") {
        console.log(
          ` Configuration: allowedVersion -> \"${p.allowedVersion}\"`
        );

        // REGEX: Stable version name
        const regex = /^(\d+\.)?(\d+\.)?(\*|\d+)$/gm;
        const res = version.match(regex);

        if (res) {
          console.log(" Stable version matched: ", res);
          console.log(" Work on ... \n");
          return;
        } else {
          console.log(" Non Stable version detected: ", version);
          console.log(" Exit with Error. \n");
          process.exit(1);
        }
      }
    }
  });
});
