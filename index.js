const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
// setup static and middleware
app.use(express.static('./public'))
app.get('/newmessage.html', function (req, res) {
    res.sendFile( __dirname + "/" + "newmessage.html" );
 })

 app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })
// 404
app.all('*',(req,res)=>{
    res.status(404).send('resource not found')
})



.listen(port); // palvelin kuuntelee joko pilvipalvelun porttia tai paikallista porttia nro 3000