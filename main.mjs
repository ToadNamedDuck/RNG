import { AskWhatToDo, GenerateNames, GoAgain, ModifyData, NumberOfNames, SelectMaxSyllables, SelectOptions } from "./functions.mjs";
import { readFile } from 'fs/promises';
async function main() {
    let preferredRaceVar;
    let maximumSyllablesVar;
    let numberOfNames;
    let endLoop = false;


    while(!endLoop){
        let names;
        await readFile("./name-fragments.json", "utf8").then((file) => names = JSON.parse(file))
        .then(async () => {
            switch (await AskWhatToDo()) {
                case 'Use the Program': {
                    //Functions that asks for user input
                    await SelectOptions().then((input) => {preferredRaceVar = input})
                    .then(async() => await SelectMaxSyllables().then((input) => {maximumSyllablesVar = input}))
                    .then(async() => await NumberOfNames().then((input) => {numberOfNames = input}))
                    console.log("Your preferred values have been saved for this session and will be used to generate names.")
                    //After input, the randomizer function, which takes our preferred race, max syllables, number of names, and the names json as parameters
                    //Loop until user says they don't want to generate any more names. Ask for input after the names are generated.
        
                    while (true) {
                        GenerateNames(preferredRaceVar, maximumSyllablesVar, numberOfNames, names)
                        const goAgain = await GoAgain(numberOfNames, preferredRaceVar);
                        if (!goAgain) {
                            break;
                        }
                    }
                    break;
                }
                case 'Modify Data': {
                    await ModifyData();
                    break;
                }
                case 'Exit': {
                    console.log("See you again soon.")
                    endLoop = true;
                    break;
                }
            }
        })
    }
}

main();