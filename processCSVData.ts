import * as Papa from "papaparse";
import * as fs from "fs";

// Converts the data to JSON so that we can bundle it and read inside the browser

const LAST_MONTH_PATH = "./last-month.csv";
const CURRENT_MONTH_PATH = "./current-month.csv";

const lastMonthRawCSV = fs.readFileSync(LAST_MONTH_PATH, "utf-8");
const currentMonthRawCSV = fs.readFileSync(CURRENT_MONTH_PATH, "utf-8");

const lastMonthParse = Papa.parse(lastMonthRawCSV, { header: true });
const currentMonthParse = Papa.parse(currentMonthRawCSV, { header: true });

if (!fs.existsSync("dist")) fs.mkdirSync("dist");
fs.writeFileSync("dist/last-month.json", JSON.stringify(lastMonthParse));
fs.writeFileSync("dist/current-month.json", JSON.stringify(currentMonthParse));
