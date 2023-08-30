import names from "./name-fragments.json" assert {type: "json"}
import { AskWhatToDo, GenerateNames, GoAgain, NumberOfNames, SelectMaxSyllables, SelectOptions } from "./functions.mjs";

async function main() {
    let preferredRaceVar;
    let maximumSyllablesVar;
    let numberOfNames;
    let endLoop = false;


    while(!endLoop){
        switch (await AskWhatToDo()) {
            case 'Use the Program': {
                //Functions that asks for user input
                preferredRaceVar = await SelectOptions();
                maximumSyllablesVar = await SelectMaxSyllables();
                numberOfNames = await NumberOfNames();
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
                console.log("This is soon to be implemented.")
                break;
            }
            case 'Exit': {
                console.log("See you again soon.")
                endLoop = true;
                break;
            }
        }
    }
}

main();