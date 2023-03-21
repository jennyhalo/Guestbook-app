// Otetaan express moduuli käyttöön
const express = require('express');

const app = express();
const bodyParser = require("body-parser");
// Otetaan se käyttöön app-nimisessä express-sovelluksessa
app.use(bodyParser.urlencoded({ extended: true }));
// Määritellään portti
const port = process.env.PORT || 3000;
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
// Tarjoillaan sisältöä public-hakemiston alta
app.use(express.static('./public'))
// middleware to parse the body of a request as JSON
app.use(express.json());

app.post('/newmessage.html', (req, res) => {
    // destructure the request body
    let resData = {
        serverData: request.body,
    };
    console.log(resData)
})






app.get('/newmessage.html', function (req, res) {
    res.sendFile( __dirname + "/" + "newmessage.html" );
 })

// 404
app.all('*',(req,res)=>{
    res.status(404).send('resource not found')
})



.listen(port); // palvelin kuuntelee joko pilvipalvelun porttia tai paikallista porttia nro 3000