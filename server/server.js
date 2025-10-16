const express = require("express");
const app = express();
const cors = require("cors");
const corseOptions = {
    origin: ["https://localhost:5173"],};

app.use(cors(corseOptions));

app.get("/api", (req, res) => {
    res.json({"fruits": ["appple", "orange", "banana"]});
})

app.listen(5173, () =>{
    console.log("Server started on port 5173")
})