import names from "./name-fragments.json" assert {type: "json"}
import { GenerateNames, NumberOfNames, SelectMaxSyllables, SelectOptions } from "./functions.mjs";

async function main(){
    let preferredRaceVar;
    let maximumSyllablesVar;
    let numberOfNames;

    //Functions that asks for user input
    preferredRaceVar = await SelectOptions();
    maximumSyllablesVar = await SelectMaxSyllables();
    numberOfNames = await NumberOfNames();
    console.log("Your preferred values have been saved for this session and will be used to generate names.")
    //After input, the randomizer function, which takes our preferred race, max syllables, number of names, and the names json as parameters
    GenerateNames(preferredRaceVar, maximumSyllablesVar, numberOfNames, names)
}

main();