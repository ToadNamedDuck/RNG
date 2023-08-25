import names from "./name-fragments.json" assert {type: "json"}
import { SelectMaxSyllables, SelectOptions } from "./functions.mjs";

async function main(){
    let preferredRaceVar;
    let maximumSyllablesVar;
    //Functions that asks for user input
    preferredRaceVar = await SelectOptions();
    maximumSyllablesVar = await SelectMaxSyllables();
    //After input, the randomizer function
}

main();