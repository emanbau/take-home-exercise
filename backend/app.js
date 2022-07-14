const express = require('express');
const { TeamMember } = require('./model');

const app = express();

app.use(express.json());

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

app.post('/create', async (req, res, next) => {
  console.log(req.body);
  const newUser = await TeamMember.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    title: req.body.title,
    story: req.body.story,
    favoriteColor: req.body.favoriteColor,
    photoURL: req.body.photoURL,
  })
  console.log(newUser.firstName);
  res.send('New user created!');
})

module.exports = app;
