// Otetaan express moduuli käyttöön
const express = require("express");
// Tuodaan file system moduuli
const fs = require("fs");
// Luodaan express sovellus nimeltä "app"
const app = express();
// Otetaan body-parser -moduuli käyttöön
const bodyParser = require("body-parser");
// Määritellään portti
const port = process.env.PORT || 3000;
// Otetaan view engine käyttöön, koska se helpottaa reittien luomista
app.set("view engine", "ejs");
// Otetaan bodyParser käyttöön app-nimisessä express-sovelluksessa
app.use(bodyParser.urlencoded({ extended: true }));
// Haetaan node_moduleista JQuery, jotta sen saa lyhyemmällä kirjoituksella käyttöön ejs sivuilla
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
// Tarjoillaan staattista sisältöä public-hakemiston alta
app.use(express.static("./public"));
// Otetaan JSON parser käyttöön
app.use(express.json());

// renderöi etusivun
app.get("/", (req, res) => {
  res.render("index");
});
// renderöi guestbook sivun
app.get("/guestbook", (req, res) => {
  res.render("guestbook");
});
// renderöi newmessage sivun
app.get("/newmessage", (req, res) => {
  res.render("newmessage");
});
// renderöi ajaxmessage
app.get("/ajaxmessage", function (req, res) {
  res.render("ajaxmessage");
});

// Lomakkeen sisällön lähetys paikalliseen json-tiedostoon
app.post("/newmessage", function (req, res) {
  // haetaan paikallinen json-tiedosto
  var data = require("./public/data.json");
  // Luodaan jokaiselle uudelle objektille id, perustuen olemassa oleviin
  var id = 0;
  data.forEach((obj) => {
    Object.entries(obj).forEach(([key]) => {
      if (key === "id") {
        id++;
      }
    });
  });

  id++;
  var idstr = id.toString();
  // Varmistetaan, että id näkyy konsolissa
  console.log(id);
  // Nyt voidaan käyttää push toimintoa tiedon lähettämiseen json-tiedostoon
  data.push({
    id: idstr,
    username: req.body.username,
    country: req.body.country,
    date: new Date(),
    message: req.body.message,
  });
  // Muutetaan data JSON -muotoon
  var jsonStr = JSON.stringify(data);
  // Käytetään file system moduulia ja kirjoitetaan sen avulla JSON muotoista dataa data.json tiedostoon
  fs.writeFile("./public/data.json", jsonStr, (err) => {
    // Tarkistetaan virheiden varalta
    if (err) throw err;
    // Kun tiedot on onnistuneeti tallennettu, lähetetään konsoliin viesti
    console.log("it is saved");
  });
  // uudelleenohjataan käyttäjä guestbook sivulle viestin lähettämisen jälkeen
  res.redirect("/guestbook");
});

// Lähetetään ajaxmessage sivulle lomakkeesta saadut tiedot
app.post("/ajaxmessage", (req, res) => {
  res.json([
    {
      username_received: req.body.username,
      country_received: req.body.country,
      message_received: req.body.message,
    },
  ]);
});
// Jos päätyy sivulle jotai ei löydy, annetaan statuskoodi 404
app.get("*", (req, res) => {
  res.status(404).send("resource not found");
});
// Web-palvelimen luonti / palvelin kuuntelee joko pilvipalvelun porttia tai paikallista porttia nro 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
