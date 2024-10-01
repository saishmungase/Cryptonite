import express from "express";
import axios from "axios";
import http from "http";
import { WebSocketServer } from "ws";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const baseUrl = 'https://api.coingecko.com/api/v3/coins/';
var data = "";

app.use(express.static("static"));

app.use(bodyParser.urlencoded({ extended: true }));

var currency = 'usd';
app.set('view engine', 'ejs');
let l = []; 
let sym = '';
let symbol = ['$', '₹', '€', '£', '¥'];

function choose(comp){
    switch(comp){
        case 'usd' : return symbol[0];
                    break;
        case 'inr' : return symbol[1];
                    break;
        case 'eur' : return symbol[2];
                    break;
        case 'gbp' : return symbol[3];
                    break;
        case 'jpy' : return symbol[4];
                    break;
    }
}

const fetchData = async (curren) => {
    try {
        const lyrico = await axios.get(baseUrl+`/markets?vs_currency=${curren}&order=market_cap_desc&per_page=50&page=1&sparkline=false`);
        l = lyrico.data; // Update the data
    } catch (err) {
        console.log(err);
    }
};

fetchData('usd');
setInterval(()=>{
    fetchData(currency);
}, 100000);

wss.on("connection", (ws) => {
    console.log("Client Connected !");
    
    if (l) {
        ws.send(JSON.stringify(l));
    }

    ws.on("close", () => { 
        console.log("Client Is Disconnected !");
    });
});

app.get("/", (req, res) => {
    sym = choose('usd');
    res.render("index", { coin: l, symbolie : sym });
});

app.post("/cchange",async (req, res)=>{
    const selectedCurrency = req.body.type;
    currency = selectedCurrency
    await fetchData(selectedCurrency)
    sym = choose(selectedCurrency);
    res.render("index", { coin: l, symbolie : sym });
})

app.get('/info/:id',async (req, res)=>{
    data = req.params.id;
    try {
        const search = await axios.get(baseUrl + "/"+data);
        var serachData = search.data;
        console.log(serachData);
        res.render('info',{coin : serachData} );
    } catch (error) {
        console.log("Error");
        res.send("Cannot Provide The Data !")
    }
})

// Start the HTTP server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


