import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import { POKEMON_ENDPOINT } from "../App";

// { handleUserChoice }
function SearchBar() {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState(() => {
    return JSON.parse(localStorage.getItem("pokemon")) || [];
  });

  const [typeList, setTypeList] = useState(() => {
    return JSON.parse(localStorage.getItem("type")) || [];
  });

  async function fetchPokemon(endpoint) {
    try {
      const response = await fetch(
        `${POKEMON_ENDPOINT}${endpoint}?limit=100000`,
      );
      if (!response.status === "ok") {
        throw response;
      }
      const data = await response.json();
      const shapedData = data.results.flat();

      switch (endpoint) {
        case "pokemon":
          localStorage.setItem("pokemon", JSON.stringify(shapedData));
          setPokemonList(shapedData);
          break;
        case "type":
          localStorage.setItem("type", JSON.stringify(shapedData));
          setTypeList(shapedData);
          break;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("pokemon"))) {
      fetchPokemon("pokemon");
    }
    if (!JSON.parse(localStorage.getItem("type"))) {
      fetchPokemon("type");
    }
  }, []);

  return (
    <Autocomplete
      id="pokemon-search-box"
      options={pokemonList.concat(typeList)}
      getOptionLabel={(option) => option.name}
      onChange={(event, value, reason) => {
        if (
          value.length === 1 &&
          pokemonList.some((ele) => {
            return ele.name === value[0].name;
          })
        ) {
          // handleUserChoice(value.map((ele) => ele.name));
          navigate(`/pokemon-info/${value.map((ele) => ele.name)}`);
        } else if (
          value.length === 2 &&
          !pokemonList.some((ele) => {
            return ele.name === value[0].name || ele.name === value[1].name;
          })
        ) {
          // handleUserChoice(value.map((ele) => ele.name));
          navigate(`/type-info/${value.map((ele) => ele.name).join("-")}`);
        }
      }}
      multiple
      filterSelectedOptions
      disablePortal
      autoHighlight
      fullWidth
      sx={{ marginTop: "40vh" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search pokemon names or types"
          onKeyDown={() => {
            if (event.key === "Enter") {
            }
          }}
        />
      )}
    />
  );
}

export default SearchBar;
