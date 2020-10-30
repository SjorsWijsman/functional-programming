/*
    Fetch from local dataset
*/
const data = require("./data/data.js").data;

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
