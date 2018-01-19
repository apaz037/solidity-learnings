const express = require('express');
const helmet = require('helmet');
const Web3 = require('web3');
const contractAddress = undefined;
const abi = [{"constant":false,"inputs":[{"name":"prizeId","type":"uint256"},{"name":"geohash","type":"bytes10"},{"name":"_metadata","type":"string"}],"name":"placePrize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"prizeId","type":"uint256"},{"name":"geohash","type":"bytes10"}],"name":"claimPrize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"prizes","outputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"geohash","type":"bytes10"},{"name":"metadata","type":"string"},{"name":"placedAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const app = express();
const port = process.env.PORT || 8801;

app.use(helmet());

app.get('/', (req, res) => {
var html = "<HTML><HEAD><TITLE>Webthereum Tutorial</TITLE></HEAD><BODY>";
  html += "<FORM action='prize'><SELECT name='prizeId'>";
  for (var i=1; i<=10; i++) {
    html += "<OPTION>"+i;
  }
  html += "</SELECT><INPUT type='submit'></FORM>";
  html += "</BODY></HTML>";
  res.send(html);});

// display prize data, if any
app.get('/prize', (req, res) => {
    get_prize_data(req.query.prizeId, function(err, response) {
        if (err) {
            response.json( { "err": err } );
        } else {
            res.json( {"res": response } );
        }
    });
});

// error handling, for now just console.log
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something happened" + JSON.stringify(err));
})

app.listen(port, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }
    console.log(`server is listening on port ${port}`);
});

function get_prize_data(prizeId, callback) {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
    var contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods.prizes(prizeId).call(function(err, res) {
        if (err) {
            console.log('error', err);
            callback(err, null);
        } else {
            console.log('result', res);
            callback(null, result);
        }
    })
    .catch(function(err) {
        console.log('call error', err);
        callback(err, null);
    });
};