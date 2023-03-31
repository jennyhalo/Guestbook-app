// Otetaan express moduuli käyttöön
const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
// Määritellään portti
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

// Tarjoillaan sisältöä public-hakemiston alta: mm.CSS ja images
app.use(express.static("./public"));

// middleware to parse the body of a request as JSON
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
// Lomakkeen sisällön lähetys paikalliseen json-tiedostoon
app.post("/newmessage", function (req, res) {
  var data = require("./public/data.json");

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

  console.log(id);

  data.push({
    id: idstr,
    username: req.body.username,
    country: req.body.country,
    date: new Date(),
    message: req.body.message,
  });

  var jsonStr = JSON.stringify(data);

  fs.writeFile("./public/data.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("it is saved");
  });
  // uudelleenohjataan käyttäjä guestbook sivulle viestin lähettämisen jälkeen
  res.redirect("/guestbook");
});

// renderöi ajaxmessage
app.get("/ajaxmessage", function (req, res) {
  res.render("ajaxmessage");
});
app.post("/ajaxmessage", (req, res) => {
  res.json([
    {
      username_received: req.body.username,
      country_received: req.body.country,
      message_received: req.body.message,
    },
  ]);
});

// 404
app.get("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); // palvelin kuuntelee joko pilvipalvelun porttia tai paikallista porttia nro 3000
