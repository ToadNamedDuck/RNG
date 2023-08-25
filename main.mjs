import names from "./name-fragments.json" assert {type: "json"}
import { NumberOfNames, SelectMaxSyllables, SelectOptions } from "./functions.mjs";

async function main(){
    let preferredRaceVar;
    let maximumSyllablesVar;
    let numberOfNames;

    //Functions that asks for user input
    preferredRaceVar = await SelectOptions();
    maximumSyllablesVar = await SelectMaxSyllables();
    numberOfNames = await NumberOfNames();
    //After input, the randomizer function, which takes our preferred race, max syllables, number of names, and the names json as parameters
}

main();