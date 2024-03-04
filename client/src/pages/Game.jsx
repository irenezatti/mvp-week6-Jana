import React from "react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export default function Game() {
  const characters = [
    {
      _id: "5cd99d4bde30eff6ebccfea0",
      name: "Gandalf",
    },
    {
      _id: "5cd99d4bde30eff6ebccfc15",
      name: "Frodo",
    },
    {
      _id: "5cd99d4bde30eff6ebccfd0d",
      name: "Sam",
    },
    {
      _id: "5cd99d4bde30eff6ebccfc38",
      name: "Bilbo",
    },
    {
      _id: "5cd99d4bde30eff6ebccfbe6",
      name: "Aragorn",
    },
    {
      _id: "5cd99d4bde30eff6ebccfd81",
      name: "Legolas",
    },
    {
      _id: "5cd99d4bde30eff6ebccfd23",
      name: "Gimli",
    },
    {
      _id: "5cd99d4bde30eff6ebccfd06",
      name: "Galadriel",
    },
    {
      _id: "5cd99d4bde30eff6ebccfc07",
      name: "Arwen",
    },
    {
      _id: "5cd99d4bde30eff6ebccfc57",
      name: "Boromir",
    },
    {
      _id: "5cd99d4bde30eff6ebccfe9e",
      name: "Gollum",
    },

    {
      _id: "5cd99d4bde30eff6ebccfcc8",
      name: "Elrond",
    },
    {
      _id: "5cd99d4bde30eff6ebccfea4",
      name: "Saruman",
    },
    {
      _id: "5cd99d4bde30eff6ebccfea5",
      name: "Sauron",
    },
  ];
  // ************************************************************************************************

  const [randomQuote, setRandomQuote] = useState("");
  const [char_id, setChar_id] = useState();
  const [count, setCount] = useState(0);
  const [quotes, setQuotes] = useState([]);
  // ************************************************************************************************

  const options = {
    // apply a .get method
    method: "GET",
    headers: {
      accept: "application/json",
      // Authorization Bearer:
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  // ************************************************************************************************
  useEffect(() => {
    getQuotes();
  }, [newItem]);

  // ************************************************************************************************

  useEffect(() => {
    addAnswerToDB();
  }, [count === 5]);
  // ************************************************************************************************

  function randomizeQuote(quotes) {
    const item = quotes[Math.floor(Math.random() * quotes.length)];
    // console.log("randomizeQuote", { quotes, item });

    setRandomQuote(item.dialog);
  }
  // ************************************************************************************************

  function getRandomCharacterId() {
    const item = characters[Math.floor(Math.random() * characters.length)];
    return item._id;
  }
  // ************************************************************************************************
  // Get all Quotes by a certain character
  const getQuotes = async () => {
    let id = getRandomCharacterId();
    setChar_id(id);
    try {
      const result = await fetch(
        // Create a function to acess the api
        `https://the-one-api.dev/v2/character/${id}/quote`,
        options
      );
      const quotes = await result.json();

      // take all the quotes -> const quotes = await result.json()
      // filter those with a length > 20
      const newQuotes = quotes.docs.filter((quote) => quote.dialog.length > 20);

      // if the filter returns an empty array (e.g. because for a given character there is no quote with more than 20 letters), push the first quote into the newQuotes array
      if (newQuotes.length === 0) {
        newQuotes.push(quotes.docs[0]);
      }

      // then randomize quotes out of this
      randomizeQuote(newQuotes);
    } catch (error) {
      console.log(error);
    }
  };
  // ************************************************************************************************
  // Take the players answer, compare it to the solution, and return a number 1 (for correct) and 0 (for wrong)
  // store this in the database

  // 1. create table in database
  // 2. describe table so that per question there is an id and an amount of points made (correct = 1, wrong = 0)
  // 3. take user input onClick and compare it to solution
  // if correct, add 1 to table_amountOfPoints
  // if wrong, add 0 to table_amountOfPoints
  // 4. When the game ends, compare amount of corrects to amount of wrongs
  // 4. return you win if correct > wrong, return you lose if c < w
  // 5. store this data so that it can be used in "/result"

  // useMemo (variable that gets computed from other state)
  // difference to useState?
  const characterOptions = useMemo(() => {
    // I want to find the right one from the list of characters
    // with the rest of the list, I want to randomize it and get the first 3
    // then I want to create a new array with the right one and the 3 random ones
    // and randomize it again
    // and return it
    if (!randomQuote) return [];
    const rightCharacter = characters.find(
      (character) => character._id === char_id
    );
    const restOfCharacters = characters.filter(
      (character) => character._id !== char_id
    );
    const randomCharacters = restOfCharacters
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const allCharacters = [rightCharacter, ...randomCharacters].sort(
      () => 0.5 - Math.random()
    );
    return allCharacters;
  }, [randomQuote]);

  // ************************************************************************************************

  function storeAnswer(event) {
    const answer = event.target.textContent;
    compareToSolution(answer);
  }
  // ************************************************************************************************

  function compareToSolution(answer) {
    const rightCharacter = characters.find(
      (character) => character._id === char_id
    );
    if (answer === rightCharacter.name) {
      const result = 1;
      console.log(result);
      updateResult(result);
    } else {
      const result = 0;
      console.log(result);
      updateResult(result);
    }
  }
  // ************************************************************************************************

  function updateResult(result) {
    // TODO
    // "Push" the react way. create a new quote object and push it into the array
    // setQuotes((state) => [
    //   ...state,
    //   { quote_text: randomQuote, solution_char, user_answer, result_points: 1 },
    // ]);

    setCount((count) => count + 1);
  }

  // ************************************************************************************************
  const addAnswerToDB = async (result) => {
    try {
      // the fetch(`/api/games/` means that
      // we are sending the {method: "POST"...}-stuff
      // to the route /api/games/
      const response = await fetch(`/api/games/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quotes }),
      });

      const data = await response.json();
      // console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  // ************************************************************************************************

  return (
    <>
      {/* <div className="solution">The count is {count}</div> */}
      <div>
        {count < 5 ? (
          <div>
            <div className="quoteBox bad-script-regular">
              {randomQuote && <p>{randomQuote}</p>}
            </div>

            <h5 className="questionbox">Who said this? Answer here:</h5>
            <div>
              {characterOptions.map((character) => (
                <button
                  key={character._id}
                  className="answerbutton"
                  onClick={storeAnswer}
                >
                  {character.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="end-of-game-message">
            {" "}
            <h2 className="shrikhand-regular">
              You have reached
              <br />
              the end of this journey
            </h2>
            <div>
              <button>
                <Link to="/Result">Show results</Link>
              </button>
            </div>
          </div>
        )}
      </div>
      <pre>{JSON.stringify(newItem, null, 4)}</pre>
      <div className="shrikhand-regular footer-right">Quote {count}/5</div>
    </>
  );
}
