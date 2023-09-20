# ToadNamedDuck's Random Name Generator

RNG, or Random Name Generator, is a Node.js powered command-line tool for generating random fantasy names for Tabletop, RPG, Online Games (such as World of Warcraft) and other fantasy applications (such as writing, LARPing, etc.)

Names are generated through the fragments located in ``name-fragments.json``, and each fragment has an associated: Race, Fragment, and Syllables.

# Races
Races are an easy way to organize groupings of names, and can be added and deleted as one desires. A race can be anything you desire - you could group names of: warships, airplanes, robots, elves, dwarves, humans, cats, dogs, whatever. Name fragments associated with one race will not show up when another is selected by the user.

# Fragments 
Fragments are the actual "pieces" of the names you wish to generate. If you wanted to randomize names for ships, prefixes would be the section you would put "SS" or "USS" or "HMS", or for other races, such as dwarves, you could put fragments like: "Dur", "Bun", or "Gim" - note that you don't put a whole name in one section unless it is just really short.

# Syllables
Name generation in RNG relies on syllables to determine which pieces do and don't get put together - sometimes, you just want to have a generated and pronounceable elf name, instead of something like "Verixstrallidundabun", which has about 7 syllables. By telling the program what your maximum amount of syllables for each name to generate is, you can avoid this problem altogether. Syllables in each fragment must also be set by the user.

# Getting started

*This application is built with recent versions of Node, and you may have to update your version of Node to get it to work properly. You can update Node [here](https://nodejs.org/en).*
***EVERY MENU IN THIS PROGRAM RELIES ON THE USER TO TYPE THE NUMBER OF THE OPTION TO SELECT IT.  0, 1, 2, 3, etc.***

 1. After you have cloned the repository to your desired location, you can run ``node main.mjs`` in a terminal in the same directory to start up the application. You will be presented with a menu.
 2. You will be presented 3 options on startup. They are as follows:
 3. ``Modify Data``, which allows the user to modify data for the program to use without having to touch a ``json`` file. This includes: ``Adding and Deleting Races``  as well as ``Adding and Deleting Name Fragments``.  This is how you can easily customize data for your uses, and changes made are available immediately in-app without having to restart the applicatio
 4. ``Use the Program``, which will have you select a race to generate a name for, and ask you how many syllables should be in the generated name, and how many names to generate at once. It will also ask you if you would like to generate more names with the same settings.
 5.  The last option is ``Exit``, which will simply exit and close to program.