var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn"); //load it into the file and use it


/* GET games listing. */
router.get("/", async function (req, res, next) {
  try {
    const response = await db("SELECT * FROM game;");
    res.send(response.data);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const response = await db(`SELECT * FROM game WHERE id = ${id};`);
    res.send(response.data);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id/sum", async function (req, res) {
  try {
    const id = req.params.id;
    const response = await db(
      `SELECT SUM(result_points) AS total FROM quotes_info WHERE game_id = ${id};`
    );
    res.send(response.data);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id/questions", async function (req, res) {
  try {
    const id = req.params.id;
    const response = await db(`SELECT * FROM quotes_info WHERE game_id = ${id};`);
    res.send(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

  // Germinal comment: when i have login user_id is not in the body
    //this endpoint protected by the guard
    //the front end doesnt know the user_id but only TOKEN
    // use id i need to use guard 

router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { game_total } = req.body;
    const { user_id } = req; // Assuming user_id is obtained from authentication (guard)!!
    //insert a new game entry
    await db(
      `INSERT INTO game (user_id, game_total) VALUES (${user_id}, ${game_total});`
    );
  
  
   // get the latest inserted game_id - is this right??
   const gameIdResponse = await db(
    `SELECT id FROM game ORDER BY id DESC LIMIT 1;`
  );
    //get the game_id from the response - like suggested by germinal, is this how it is supposed to be done??
    const gameId = gameIdResponse.data[0].id;

    //req.body.quotes is an array of objects containing quote information
    const { quotes } = req.body;

    //insert quotes for the game using a for loop like suggested
    for (const quote of quotes) {
      const { quote_text, solution_char, user_answer, result_points } = quote;

      await db(
        `INSERT INTO quotes_info (quote_text, solution_char, user_answer, result_points, game_id) VALUES
        ('${quote_text}', '${solution_char}', '${user_answer}', ${result_points}, ${gameId});`
      );
    }

    // getting the updated game data
    const results = await db(`SELECT * FROM game WHERE id = ${gameId};`);
    
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ?????? also confused at this, did i change it correctly?
router.put("/:id/:game_total", async (req, res) => {
  try {
    const { id, game_total } = req.params;

    await db(`UPDATE game SET game_total = ${game_total} WHERE id = ${id};`);

    const results = await db("SELECT * FROM game ORDER BY id ASC;");

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
