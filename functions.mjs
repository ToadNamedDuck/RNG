import * as readline from 'node:readline/promises';  // This uses the promise-based APIs for Node's native readline
import { stdin as input, stdout as output } from 'node:process';

const races = [
    "Human",
    "Dwarf"
]


const rl = readline.createInterface({ input, output });
//We want to have the user select options for generating the names in the future, but for now
//we'll just ask them their name and spit it back out at them.
//Every type of option we want to select - ie: races, syllables, etc should be passed in as a variable so we can modify their values.

function _raceNameGrabber(index) {
    return races[index];
}

export async function SelectOptions(){
    let index;
    console.log("Here is a list of races for which you can generate a name for.");
    console.table(races)
    await rl.question("Please enter the index of the race you would like to generate names for.").then((input) => {
        index=parseInt(input);
        console.log(_raceNameGrabber(index))
    })
    .then(() => rl.close())

    return index;
}