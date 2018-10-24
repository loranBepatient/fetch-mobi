const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

const fetch = require("node-fetch");
const FormData = require("form-data");

const mobi = "https://dev-mobi-cordova.bepatientsolutions.com/rest/v2";

const getTodos = async url => await fetch(url);

const run = async () => {
  try {
    const todos = await getTodos(mobi).then(res => res.json());

    console.log(todos);
  } catch (error) {
    console.log("err", error);
  }
};

const user = { login: "admin@bepatient.mobi", password: "azerty.1" };

const setForm = user => {
  const form = new FormData();
  const keys = Object.keys(user);
  for (let key of keys) {
    form.append(key, user[key]);
  }
  return form;
};

const login = async url =>
  await fetch(`${url}/;login`, { method: "POST", body: setForm(user) });

login(mobi)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));

app.get("/graphql", (req, res) => {
  res.send("graphql");
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
