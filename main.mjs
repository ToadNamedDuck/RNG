import names from "./name-fragments.json" assert {type: "json"}
import { SelectOptions } from "./functions.mjs";

async function main(){
    let preferredRaceVar;
    let maximumSyllablesVar;
    //Function that asks for user input
    preferredRaceVar = await SelectOptions().then((index) => {preferredRaceVar = index;})
    //After input, the randomizer function
    
}

main();