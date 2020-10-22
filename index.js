const fetch = require('node-fetch');



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



/*
    oogKleur
*/
// Haal oogkleur kolom uit data
let oogKleurData = data.map(entry => entry.oogKleur);

// Data naar uppercase
oogKleurData = oogKleurData.map(entry => entry.toUpperCase());


// Lijst van alle oogkleuren
oogKleurLijst = {
  "BLAUW": "#7BB3FA",
  "LICHTBLAUW": "#87CEFA",
  "BRUIN": "#693704",
  "GROEN": "#76CE09",
}

const validatedOogKleurData = oogKleurData.map(entry => valideerOogKleur(entry));

// Valideer oogkleur op hex, textueel en rgb
function valideerOogKleur(oogKleur) {
  // Verwijder spaties
  oogKleur = oogKleur.replace(/\s/g, "");

  // Verwijder hekje
  oogKleur = oogKleur.replace("#", "");

  // Valideer hex
  // https://mkyong.com/regular-expressions/how-to-validate-hex-color-code-with-regular-expression/
  if (/^([A-F0-9]{6}|[A-F0-9]{3})$/.test(oogKleur)) {
    return "#" + oogKleur;
  }

  // Valideer textuele kleur
  else if (oogKleurLijst[oogKleur]) {
    return oogKleurLijst[oogKleur];
  }

  // Valideer RGB
  else if (oogKleur.includes("RGB")) {
    oogKleurRGB = oogKleur.replace("RGB(", "").replace(")", "");
    let hexCode = "#";
    // Loop door RGB values heen
    for (kleur of splitString(oogKleurRGB)) {
      // Check of kleur binnen max rgb waarde valt
      if (kleur >= 0 && kleur <= 255) {
        // Convert kleur nummer naar hexwaarde
        hexCode += parseInt(kleur).toString(16);
      } else {
        return "invalide RGB: " + oogKleur;
      }
    }
    return hexCode;
  }

  else {
    return "idk wat deze kleur is: " + oogKleur;
  }
}

console.log(oogKleurData);
console.log(validatedOogKleurData);


/*
    Fetch from Online API
*/
// Available APIs
const apis = {
  Gekentekende_voertuigen: "http://opendata.rdw.nl/resource/m9d7-ebf2.json",
}

// Fetch from API
function fetchApi(api) {
  return fetch(apis[api])
    .then(res => res.json())
    .catch(err => { return err })
}

// Fetch "Gekentekende_voertuigen dataset"
// fetchApi("Gekentekende_voertuigen").then(res => {
//   if (!res.FetchError) {
//     console.log(res)
//   } else {
//     console.error(res);
//   }
// });
