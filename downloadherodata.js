const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');

// ✅ Embedded heroes list
const heroes = [

  { name: "Cloak_%26_Dagger", type: "Strategist" },
  { name: "Emma_Frost", type: "Vanguard" },
  { name: "Hulk", type: "Vanguard" },
  { name: "Magik", type: "Duelist" },

];

// ✅ Helper to stringify attributes in one line
function stringifyAttributesOneLine(obj) {
  let jsonStr = JSON.stringify(obj, null, 2);
  jsonStr = jsonStr.replace(/(\{\n\s+"label\d*": "[^"]+",\n\s+"value": "[^"]+"\n\s+\})/g, (match) => {
    return match.replace(/\n\s+/g, ' ').replace(/,\s+/g, ', ');
  });
  return jsonStr;
}

// ✅ Main function to fetch and save hero spell data
const getdata = async (heroName) => {
  try {
    const url = `https://marvelrivals.fandom.com/wiki/${heroName}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const skillTable = $('#mw-content-text > div > table.wikitable.skill-table > tbody');
    const skillRows = skillTable.find('tr');

    const spells = {};
    let spellCount = 1;

    function addSpell(name, description, key, attributesArray, img) {
      const spellKey = `spell${spellCount++}`;
      spells[spellKey] = {
        key: key,
        img: img,
        name: name,
        description: description,
        attributes: attributesArray
      };
    }

    let firstfalse = false;
    let name = '', description = '', key = '', img1 = '', attrib = [];

    skillRows.each((index, row) => {
      if (index === 0) return;

      if ($(row).find('td').length === 3) {
        if (firstfalse) {
          addSpell(name, description, key, attrib, img1);
          name = ''; description = ''; key = ''; img1 = ''; attrib = [];
        }
        firstfalse = true;

        $(row).find('td').each((i, el) => {
          const text = $(el).text().trim();
          if (text.length > 0) {
            name = text;
          } else {
            const img = $(el).find('img');
            if (img.length > 0 && img.attr('alt')) {
              key = img.attr('alt');
            }
          }
        });
      }

      if ($(row).find('small').length > 0) {
        $(row).find('td').each((i, td) => {
          const small = $(td).find('small');
          small.children().each((k, ch) => {
            if ($(ch).is('i') && $(ch).text().length > 0) {
              description = $(ch).text().trim();
            }
            if ($(ch).is('p')) {
              let text = $(ch).text().trim();
              if (/(.+)-(.+)/.test(text)) {
                let parts = text.split(/-(.+)/);
                attrib.push({ label: parts[0].trim(), value: parts[1].trim() });
              }
            }
          });

          if (/⚬/.test($(td).children('p').text())) {
            const pEl = $(td).children('p').text();
            const sPart = pEl.split(/⚬(.+)/);
            attrib.push({ label: sPart[0].trim(), value: sPart[1].trim() });
          }
        });
      }
    });

    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

    const fileName = `${heroName}.json`;
    const filePath = path.join(dataDir, fileName);
    const formattedJson = stringifyAttributesOneLine(spells);
    fs.writeFileSync(filePath, formattedJson, 'utf8');
    console.log(`✅ ${fileName} created.`);

  } catch (error) {
    console.error(`❌ Error fetching data for ${heroName}:`, error.message);
  }
};

// ✅ Loop through all heroes and fetch data
(async () => {
  for (const hero of heroes) {
    console.log(`Processing: ${hero.name} (${hero.type})`);
    await getdata(hero.name);
  }
})();
