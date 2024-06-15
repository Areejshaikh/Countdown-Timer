#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import { validateHeaderValue } from "http";
import inquirer from "inquirer";
async function getInput() {
  const timeInput = await inquirer.prompt([
    {
      name: "timeIn",
      type: "number",
      message: "Enter Time in Seconds..?",
      validate: (input) => {
        if (isNaN(input)) {
          return "Please Enter a Valid Number!";
        } else if (input > 60) {
          return "Please Enter the Number Lass than 60!";
        } else {
          return true;
        }
      },
    },
  ]);

  return timeInput.timeIn;
}
function startTime(seconds: any) {
  const endTime = new Date().getTime() + seconds * 1000;

  const timer = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = endTime - currentTime;

    if (timeDifference <= 0) {
      console.log("Timer Has Expired");
      clearInterval(timer);
      process.exit();
    }

    const min = Math.floor(timeDifference / 1000 / 60);
    const sec = Math.floor((timeDifference / 1000) % 60);
    console.log(
      `${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`
    );
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    console.log("Timer Has Expired");
    process.exit();
  }, seconds * 1000);
}
(async () => {
  try {
    const inputTime = await getInput();
    startTime(inputTime);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
