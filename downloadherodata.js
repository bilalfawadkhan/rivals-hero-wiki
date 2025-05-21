const fs = require('fs');
const path = require('path');
const cheerios = require('cheerio');
const axios = require('axios');

// List of heroes
const heroes = [
    { hero_name: "Adam Warlock"},
    { hero_name: "Black Panther"},
    { hero_name: "Black Widow"  },
    { hero_name: "Captain America"},
    { hero_name: "Cloak & Dagger"},
    { hero_name: "Doctor Strange" },
    { hero_name: "Emma Frost" },
    { hero_name: "Groot"},
    { hero_name: "Hawkeye"},
    { hero_name: "Hela"},
    { hero_name: "Hulk"},
    { hero_name: "Human Torch"},
    { hero_name: "Invisible Woman"},
    { hero_name: "Iron Fist" },
    { hero_name: "Iron Man" },
    { hero_name: "Jeff the Land Shark"},
    { hero_name: "Loki"},
    { hero_name: "Luna Snow"},
    { hero_name: "Magik" },
    { hero_name: "Magneto"},
    { hero_name: "Mantis"},
    { hero_name: "Mister Fantastic" },
    { hero_name: "Moon Knight" },
    { hero_name: "Namor"},
    { hero_name: "Peni Parker"},
    { hero_name: "Psylocke" },
    { hero_name: "Rocket Raccoon" },
    { hero_name: "Scarlet Witch"},
    { hero_name: "Spider-Man" },
    { hero_name: "Squirrel Girl"},
    { hero_name: "Star-Lord"},
    { hero_name: "Storm"},
    { hero_name: "The Punisher" },
    { hero_name: "The Thing" },
    { hero_name: "Thor"},
    { hero_name: "Venom"},
    { hero_name: "Winter Soldier" },
    { hero_name: "Wolverine"}
]

const spells = {}; // Main object

let spellCount = 1;

function addSpell(name, description, key, attributesArray, isPassive = false) {
  const spellKey = `spell${spellCount++}`;

  spells[spellKey] = {
    name: name,
    description: description,
    key: key, // key that is pressed (e.g. Q, E, R, etc.)
    passive: isPassive, // true/false
    attributes: attributesArray
  };
}

const getdata = async (url) => {
    try{
    const response = await axios.get(url);
    const $ = cheerios.load(response.data);
    // console.log($('.mw-page-title-main').text());
    const skillTable = $('#mw-content-text > div > table.wikitable.skill-table > tbody');
    const skillRows = skillTable.find('tr');
    console.log($(skillRows[0]).text().trim());
    skillRows.each((index,row) => {
        const innercounter = 0;
        // if(index === 0) return; // Skip header row
        if(innercounter%4 != 0 ){
            console.log($(row).text().trim());
            return true;

        }

    })
 
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }

    
    // const data = await response.data
    // const $ = cheerios.load(response);
}

getdata('https://marvelrivals.fandom.com/wiki/Adam_Warlock')

const downloadData = async () => {


}
