import * as readline from 'node:readline/promises';  // This uses the promise-based APIs for Node's native readline
import { stdin as input, stdout as output } from 'node:process';

const races = [
    "Human",
    "Dwarf"
]


//We want to have the user select options for generating the names in the future, but for now
//we'll just ask them their name and spit it back out at them.
//Every type of option we want to select - ie: races, syllables, etc should be passed in as a variable so we can modify their values.

function _raceNameGrabber(index) {
    return races[index];
}

export async function SelectOptions(){
    const rl = readline.createInterface({ input, output });
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

function _inputCheck(input){

        if(!Number.isNaN(parseInt(input))){   //If we parse int on input, and it is NOT NaN, then it is a number, and we return true;
            return true;
        }
        else{
            return false;
        }
    }

export async function SelectMaxSyllables(){
    let max;
    let enteredValidNumber = false;

    while(true){
        const rl = readline.createInterface({ input, output });
        await rl.question("Please input the MAXIMUM NUMBER of syllables for your desired name.")
        .then((input) => {
            enteredValidNumber = _inputCheck(input)
                if(enteredValidNumber){
                    max = parseInt(input);
                }
                else{
                    console.log("This is not a valid number! Enter an integer.")
                }

        })
        .then(() => rl.close())
        if(max !== undefined){
            break;
        }
    }

    return max;
}