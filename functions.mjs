import * as readline from 'node:readline/promises';  // This uses the promise-based APIs for Node's native readline
import { stdin as input, stdout as output } from 'node:process';
import names from "./name-fragments.json" assert {type: "json"}
import fs from "node:fs/promises";

const races = names.races;


//We want to have the user select options for generating the names in the future, but for now
//we'll just ask them their name and spit it back out at them.
//Every type of option we want to select - ie: races, syllables, etc should be passed in as a variable so we can modify their values.

function _raceNameGrabber(index) {
    return races[index];
}

function _inputCheck(input) {

    if (!Number.isNaN(parseInt(input))) {   //If we parse int on input, and it is NOT NaN, then it is a number, and we return true;
        return true;
    }
    else {
        return false;
    }
}

export async function AskWhatToDo() {
    while(true){
        const rl = readline.createInterface({input, output});
        let inputIsValid;
        let useCase;
        let options = ["Modify Data", "Use the Program", "Exit"]
        console.table(options);
        await rl.question("Type the corresponding index for what you would like this time around.\n")
        .then((input) => {
            inputIsValid = _inputCheck(input)
            if(inputIsValid){
                let selectedOption = options[parseInt(input)]
                if(selectedOption !== undefined){
                    useCase = selectedOption;
                }
            }
            else{
                console.log("Please select a valid option.\n")
            }
        })
        .then(() => rl.close())

        if(useCase !== undefined){
            return useCase;
        }
    }
}

export async function SelectOptions() {
    let index;
    let inputIsValid = false;

    console.log("Here is a list of races for which you can generate a name for.");
    console.table(races);

    while (true) {
        const rl = readline.createInterface({ input, output });
        await rl.question("Please enter the index of the race you would like to generate names for.\n").then((input) => {
            inputIsValid = _inputCheck(input);
            if (inputIsValid) {
                index = parseInt(input);
                const race = _raceNameGrabber(index);
                if (race !== undefined) {
                    console.log("You selected: " + race + "\n");
                }
                else {
                    console.log(`No race corresponds to input: ${input}\n`)
                    inputIsValid = false;
                }
            }
            else {
                console.log("This is not a valid number! Enter an integer.\n")
            }
        })
            .then(() => rl.close())

        if (inputIsValid) {
            break
        }
    }

    return index;
}

export async function SelectMaxSyllables() {
    let max;
    let enteredValidNumber = false;

    while (true) {
        const rl = readline.createInterface({ input, output });
        await rl.question("Please input the MAXIMUM NUMBER of syllables for your desired name. Minimum 1.\n")
            .then((input) => {
                enteredValidNumber = _inputCheck(input)
                if (enteredValidNumber) {
                    max = parseInt(input);
                }
                else {
                    console.log("This is not a valid number! Enter an integer.\n")
                }

            })
            .then(() => rl.close())
        if (max !== undefined) {
            break;
        }
    }

    if (max <= 0) {
        max = 1;
    }
    return max;
}

export async function NumberOfNames(){
    let max;
    let enteredValidNumber;

    while(true){
        const rl = readline.createInterface({ input, output });
        await rl.question("Please input the desired number of names to randomly generate.\n")
        .then((input) => {
            enteredValidNumber = _inputCheck(input);
            if(enteredValidNumber){
                max = parseInt(input)
            }
            else{
                console.log("This is not a valid number! Enter an integer.\n")
            }
        })
        .then(() => rl.close())
        if(max !== undefined){
            break;
        }
    }

    if(max <= 0){
        max = 1
    }
    return max;
}

export async function GoAgain(numberOfNames, raceIndex){
    let response;
    while(true){
        const rl = readline.createInterface({ input, output });
        await rl.question(`Would you like to generate ${numberOfNames} more ${_raceNameGrabber(raceIndex)} names? Y/N\n`)
        .then((input) => {
            if(input.toLowerCase() === "y"){
                response = true;
            }
            if(input.toLowerCase() === "n"){
                response =  false;
            }
            else{
                console.log("Please enter 'y' or 'n'\n")
            }
        })
        .then(() => rl.close())
        if(response === true){
            return true;
        }
        if(response === false){
            console.log("Goodbye!")
            return false;
        }
    }
    
}

//We need to be able to put the names into a table to display them.
//We also want to honor the user's requests for the values they entered
//Max number of names will be the length of the array we output, and we'll use it in our loop.
//If we want to not have duplicate names, we don't increment i when a duplicate name is found in the array.
export function GenerateNames(preferredRaceIndex, maxSyllables, numberOfNames, nameFragments){
    console.log("Starting to generate names. Please be patient.")
    let names = [];//Initialize an empty array

    for(let i = 0; i < numberOfNames;){
        //We need to intialize some sort of randomizer
        //Lets store the objects we grab from the json file into a temporary array to access the syllable count of the objects.
        let firstFragmentNotFound = true; // used for loop
        const tempNameFragmentHolder = [];

        while(firstFragmentNotFound === true){
            const firstFragmentIndex = Math.floor(Math.random() * nameFragments.firstNameFrontFragments.length)//We will always generate at least 1 fragment.
            const firstFragment = nameFragments.firstNameFrontFragments[firstFragmentIndex]
            if(!(firstFragment.syllables > maxSyllables) && firstFragment.race === _raceNameGrabber(preferredRaceIndex)){
                tempNameFragmentHolder.push(firstFragment);
                firstFragmentNotFound = false;
                break;
            }
        }
        if(tempNameFragmentHolder[0].syllables < maxSyllables){//If there are still available syllables, make a second fragment
            let currentSyllables = tempNameFragmentHolder[0].syllables;
            let secondFragmentNotFound = true;
            let i = 0;
            while(secondFragmentNotFound && i < 10){
                const secondFragmentIndex = Math.floor(Math.random() * nameFragments.firstNameMiddleFragments.length)
                const secondFragment = nameFragments.firstNameMiddleFragments[secondFragmentIndex];

                if((secondFragment.syllables + currentSyllables ) <= maxSyllables && secondFragment.race === _raceNameGrabber(preferredRaceIndex)){
                    tempNameFragmentHolder.push(secondFragment)
                    break;
                }

                i++;
            }
        }

        //loop through the temporary array and combine name fragments, then push the name to the names array
        //Since we are only doing 2 fragments right now, we can simply add them without really looping. - If we add more, we will need to loop.
        if(tempNameFragmentHolder[1] !== undefined){
            names.push(tempNameFragmentHolder[0].fragment + tempNameFragmentHolder[1].fragment);
        }
        else{
            names.push(tempNameFragmentHolder[0].fragment)
        }
        console.log("Percent complete: " + Math.floor(((i + 1)/numberOfNames)*100) + "%")
        i++;
    }
    console.table(names);
    return names;
}

export async function ModifyData(){
    const options = ["Add new race", "Delete race", "Add name fragments", "Go Back"];
    let selectedValidOption = false;
    let selectedOption;
    while(!selectedValidOption){
        console.table(options)
        const rl = readline.createInterface({ input, output });
        await rl.question("Select an option.").then((input) => {
            const inputIsValid = _inputCheck(input);
            if(inputIsValid){
                selectedOption = options[parseInt(input)]
                if(selectedOption === undefined){
                    console.log("Please select an option that exists.\n")
                }
                else{
                    selectedValidOption = true;
                }
            }
            else{
                console.log("Please enter the number that corresponds to the option you wish to select.\n")
            }
        })
        .then(() => rl.close())
    }
    switch(selectedOption){
        case "Add new race": {

        }
        case "Delete race": {

        }
        case "Add name fragments":{

        }
        case "Go Back": {
            break;
        }
    }

}