import fs from "fs";

export const getFeatureList = () => fs.readdirSync("./src/features");
