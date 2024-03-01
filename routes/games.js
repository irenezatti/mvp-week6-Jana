var express = require("express");
var router = express.Router();
const db = require("../model/helper");

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

router.get("/:id/:q", async function (req, res) {
  try {
    const { id, q } = req.params;
    const response = await db(
      `SELECT user_answer FROM quotes_info WHERE game_id = ${id} AND question_id = ${q};`
    );
    res.send(response.data);
  } catch (err) {
    console.log(err.message);
  }
});

// i created columns named: quote_text, solution_char, user_answer, and result_points in the quotes_info table
// is this enough?
router.post("/", async function (req, res, next) {
  try {
    const { game_total } = req.body;
    const { user_id } = req; // this will be protected by the guard
    const gameResults = await db(
      `INSERT INTO game (user_id, game_total) VALUES (${user_id}, ${game_total});`
    );
    // when i have login user_id is not in the body
    //this endpoint protected by the guard
    //the front end doesnt know the user_id but only TOKEN
  

    const gameId = gameResults.data.insertId;
    // select id from game ordered  by id descendent 

    // this depends on my table structure but how do i approach this?
    // i need to change the column names based on this trable structure
    const { quote_text, solution_char, user_answer, result_points } = req.body;
    await db(
      // is this even right?
      `INSERT INTO quotes_info (quote_text, solution_char, user_answer, result_points, game_id) VALUES
      ('${quote_text}', '${solution_char}', '${user_answer}', ${result_points}, ${gameId});` // this last inserted
    );
    // one game is gonna have many questions - i want to add more than 1 quote
    //this has to be in a for loop
    // front end is an arr with objects with quotes - for each one of these entries 

    const results = await db("SELECT * FROM game;");
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
