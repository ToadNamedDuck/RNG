import names from "./name-fragments.json" assert {type: "json"}
import { SelectMaxSyllables, SelectOptions } from "./functions.mjs";

async function main(){
    let preferredRaceVar;
    let maximumSyllablesVar;
    //Function that asks for user input
    preferredRaceVar = await SelectOptions();
    console.log(preferredRaceVar);
    //After input, the randomizer function
    maximumSyllablesVar = await SelectMaxSyllables()
    console.log(maximumSyllablesVar);
}

main();