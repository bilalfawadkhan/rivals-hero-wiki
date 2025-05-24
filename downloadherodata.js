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

function addSpell(name, description, key, attributesArray,img) {
  const spellKey = `spell${spellCount++}`;
  spells[spellKey] = {
    key: key,// key that is pressed (e.g. Q, E, R, etc.)
    img:img, 
    name: name,
    description: description,
    attributes: attributesArray
  };
}


function stringifyAttributesOneLine(obj) {
  // First stringify with indent 2 spaces
  let jsonStr = JSON.stringify(obj, null, 2);

  // Use regex to replace objects inside attributes array with single-line versions
  // Matches { ... } inside attributes array and removes newlines and extra spaces inside them
  jsonStr = jsonStr.replace(/(\{\n\s+"label\d*": "[^"]+",\n\s+"value": "[^"]+"\n\s+\})/g, (match) => {
    // Remove newlines and extra spaces inside matched object
    return match
      .replace(/\n\s+/g, ' ')   // replace newlines+spaces with single space
      .replace(/,\s+/g, ', ');  // ensure comma spacing is correct
  });

  return jsonStr;
}



const getdata = async (url) => {
    try{

    const response = await axios.get(url);
    const $ = cheerios.load(response.data);
    // console.log($('.mw-page-title-main').text());
    const skillTable = $('#mw-content-text > div > table.wikitable.skill-table > tbody');
    const skillRows = skillTable.find('tr');
    let innercounter = 1;
    let isAttack = true
    let attorAb = ['Normal Attacks', 'Spell'];

    let name = '';
    let description = '' ;
    let key = '';
    let img1 = ''
    let attrib = []
    let firstfalse = false;


    skillRows.each((index,row) => {
        if(index === 0){ return; }

        if($(row).find('td').length === 3){ // First Identifier conditon of 3 TD
        if(firstfalse){
        addSpell(name, description, key, attrib,img1)
          name = '';
         description = '' ;
         key = '';
         img1 = '';
         attrib = [];
        }
        firstfalse = true;
        console.log('--------New Spell----')
         $(row).find('td').each((i, el) => {
            if($(el).text().trim().length > 0){
            console.log($(el).text());
            name = $(el).text();
            if($(el).text().trim().length < 1){
                key = $(el).text();
                }
            }

            else{
            const img = $(el).find('img');
                if (img.length > 0) {

                        if(img.attr('alt')){
                            key = img.attr('alt')
                            console.log('Image alt:', img.attr('alt'));
                        }
                        else{
                            img1 = ''
                            console.log('Spell alt:', 'None');
                        }
                    }
                }
        });
            }
            let  count= 0;
        if($(row).find('small').length > 0){ // Second Identifuer Condition in the Page
        //    console.log("Small here")
           let lablecount = 1;
           firstfalse = true;
            $(row).find('td').each((i, td) => {
                count++;
                const small = $(td).find('small')

                $(small).children().each((k,ch) => { 
                if($(ch).is('i') && $(ch).text().length > 0) {
                    description = $(ch).text().trim();
                  console.log('Descirption:',description) 
                }       
                  
                if( $(ch).is('p')){
                    let text =  $(ch).text().trim()
                   console.log(text)
                  if(/-(.+)/.test(text)){
                            let parts = text.split(/-(.+)/);
                            attrib.push({
                            [`label${lablecount++}`] : parts[0].trim(),
                            value : parts[1].trim()
                            }) 
                        }
                }
                });
                if(/⚬/.test($(td).children('p').text())){
                const pEl = $(td).children('p').text() // extracting Special Effect Data
                console.log(pEl);
                const sPart = pEl.split(/⚬(.+)/);  
                attrib.push({[`label${lablecount++}`]:sPart[0].trim(),
                            value : sPart[1].trim()
                            });
                        }


            });

        }
    });
 
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    
    // const data = await response.data
    // const $ = cheerios.load(response);
    const dataDir = path.join(process.cwd(), 'public', 'data');
    const filePath = path.join(dataDir, `${'Adam_Warlock'}.json`);

    if(!fs.existsSync(filePath)){

    const formattedJson = stringifyAttributesOneLine(spells)
    fs.writeFileSync(filePath, formattedJson, 'utf8');
    console.log('✅ spells.json has been created.');
} else {
  console.log('⚠️ spells.json already exists. Not overwriting.');
}
}

getdata('https://marvelrivals.fandom.com/wiki/Adam_Warlock')

const downloadData = async () => {


}
