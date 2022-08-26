import React, { useRef, useEffect, useState } from "react";
import CardMovie from "../Component/Card/CardMovie";
import axios from "axios";
import "./searchPageStyle.css";

const SearchPage = () => {
  const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState("");
  const [apiResult, setApiResult] = useState([]);

  /*this function is the callback accepts a single parameter:
  an object based on Event describing the event that has occurred, and it returns nothing.*/
  const handleKeyPress = (event) => {
    if (event.key === "/") {
      event.preventDefault();
      inputRef.current.focus();
    } else if (event.key.toLowerCase() === "enter") {
      event.preventDefault();
      searchMovie();
    }
  };

  /*useEffect run just after first render but the listener is always listen to event and when the
event happen the browser tell the react to render useEffect again*/
  useEffect(() => {
    //Type of event I want to listen to it is ==>keypress is one of the keyboard functions type
    //handelkeypress is a function it's run after press a key
    //here the second parameter it's can be callback function or object
    window.addEventListener("keypress", handleKeyPress);
    // cleanup this component
    return () => {
      //in this code this line it will not run in any time but it's good practice to write here
      //the clean up happen just when the element delete after that clean up happen
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const searchMovie = () => {
    axios
      .get(`https://api.tvmaze.com/search/shows?q=${inputVal}`)
      .then(function (response) {
        setApiResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <h1 className="mainHeader">Search a movie :</h1>
      </div>
      <div className="searchBox">
        <div>
          <p>Search:</p>
          <input
            className="searchInput"
            placeholder={`Press "/" to focuse on this field`}
            ref={inputRef}
            onChange={(event) => setInputVal(event.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="searchButton" tabIndex={0} onClick={searchMovie}>
            Search
          </button>
        </div>
      </div>
      <div className="containerBox">
        {apiResult.map((movie, index) => {
          return (
            <CardMovie
              key={index + movie.show.name}
              title={movie.show.name}
              img={movie.show.image ? movie.show.image.original : ""}
              summary={movie.show.summary}
              url={movie.show.url}
            />
          );
        })}
      </div>
    </>
  );
};

export default SearchPage;
