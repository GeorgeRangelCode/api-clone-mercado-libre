const express = require("express");
const cors = require("cors");
const { getItems, getItem } = require("./api/service");
const config = require("./config");

const app = express();

app.use(cors());

app.get("/api/items", (req, res) => {
  getItems(req.query.q)
    .then((items) => res.json(items))
    .catch((error) => res.status(500).send(error));
});

app.get("/api/items/:id", (req, res) => {
  getItem(req.params.id)
    .then((item) => res.json(item))
    .catch((error) => res.status(error.status).send(error));
});

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});
