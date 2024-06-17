import React from "react";
import { useParams } from "react-router";

function PokemonInfo() {
  const { userChoice } = useParams();
  return <div>{userChoice}</div>;
}

export default PokemonInfo;
