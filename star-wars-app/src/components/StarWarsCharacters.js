import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { getData } from "../api";
import "./star-wars-characters.css";

export default function StarWarsCharacters() {
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [category, setCategory]= useState('people')
  const [url, setUrl] = useState(`https://swapi.co/api/${category}`);
  useEffect(() => {
    setIsLoading(true);
    const getCharacters = async () => {
      const characters = await getData(`https://swapi.co/api/${category}`);
      console.log('Calling from...', url)
      console.log('API Promise:',characters);
      setNext(characters.next);
      console.log('Next Object:', characters.next)
      setPrevious(characters.previous);
      setCharacters(characters.results);
      setIsLoading(false);
    };
    getCharacters();
  }, [category, url]);

  const goToNext = e => {
    e.preventDefault();
    setUrl(next);
  };

  const goToPrevious = e => {
    e.preventDefault();
    setUrl(previous);
  };
  console.log('Category State:', category )
  const handleChanges = e =>{
    e.preventDefault()
    setCategory(e.target.value)
  }
  //selection array
  return (
    <div>
      {isLoading ? (
        <Loader
          type="ThreeDots"
          color="#FFC402"
          height={30}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <>
        <form>
          <select
          type="select"
          name="category"
          placeholder="Categories"
          value={category}
          onChange={(e) => handleChanges(e)}
          >
            <option>Choose Category</option>
            <option>people</option>
            <option>planets</option>
            <option>starships</option>
            <option>vehicles</option>
            <option>species</option>
          </select>
        </form>
          {characters.map(character => (
            <div data-testid='character' key={character.url}>{character.name}</div>
          ))}
        </>
      )}
      <div className="buttons">
        <button onClick={goToPrevious} disabled={!previous}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!next}>
          Next
        </button>
      </div>
    </div>
  );
}
