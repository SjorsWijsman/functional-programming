/*
    Fetch from local dataset
*/
const data = require("./data/data.js").data;

/*
    lievelingsKeuken
*/
// Haal lievelingskeuken kolom uit data
let keukenData = data.map(entry => entry.lievelingsKeuken);


// Data naar lowercase
keukenData = keukenData.map(entry => entry.toLowerCase());


// Haal elk woord in verdwijderList uit de keukenData
const verwijderList = ["keuken", "eten"]
verwijderList.forEach(woord => {
  keukenData = keukenData.map(entry => entry.replace(woord, ""))
})


// Split lievelingskeuken entries
const splitTekens = [",", ".", ";", "&"];
keukenData = keukenData.map(entry => splitString(entry, splitTekens));

// Split string op meerdere delimiters
function splitString(string, delimiters = [",", ".", ";"]) {
  for (delimiter of delimiters) {
    // Split op delimiter en rejoin naar string
    string = string.split(delimiter).join(",");
  }
  // Split op "," om weer een lijst te maken & trim spaces
  const result = string.split(",").map(entry => entry.trim());
  return result;
}


// Lijst van alle keukens
const keukenList = {
  "arab": "arabisch",
  "arge": "argentijns",
  "azia": "aziatisch",
  "azie": "aziatisch",
  "asia": "aziatisch",
  "balk": "balkan",
  "chin": "chinees",
  "colo": "colombiaans",
  "enge": "engels",
  "grie": "grieks",
  "holl": "hollands",
  "indo": "indonesisch",
  "indi": "indisch",
  "ital": "italiaans",
  "japa": "japans",
  "kore": "koreaans",
  "maro": "marokkaans",
  "medi": "mediterraans",
  "mexi": "mexicaans",
  "oost": "oosters",
  "spaa": "spaans",
  "stre": "streetfood",
  "suri": "surinaams",
  "thai": "thais",
  "viet": "vietnamees",
}

keukenData = keukenData.map(entry => maakValideKeukenNaam(entry));

// Check & valideer keuken type
function maakValideKeukenNaam(entry) {
  let newEntry = []

  // Loop door alle keukens heen in de entry
  for (keuken of entry) {
    let checkIfReturned = false;
    const eersteVierLetters = keuken.substring(0, 4).toLowerCase();
    if (keukenList[eersteVierLetters]) {
      newEntry.push(keukenList[eersteVierLetters]);
      checkIfReturned = true;
    }
    // Feedback om misschien deze keuken toe te voegen
    // else if (!checkIfReturned) {
    //   newEntry.push("Onbekende keuken: " + keuken);
    // }
  }
  return newEntry
}

const italiaanseKeukens = keukenData.filter(entry => entry.includes("italiaans")).length;
