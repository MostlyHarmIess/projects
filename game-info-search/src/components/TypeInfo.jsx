import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POKEMON_ENDPOINT } from "../App";

//user choice is an array of strings listing user input
function TypeInfo() {
  const { userChoice } = useParams();
  const shapedUserChoice = userChoice.split("-");
  const [typeData, setTypeData] = useState([]);

  async function getTypeInfo(type) {
    if (!type) return;

    try {
      const response = await fetch(
        `${POKEMON_ENDPOINT}type/${type}?limit=100000`,
      );
      if (!response.status === "ok") {
        throw response;
      }
      const data = await response.json();
      return data
    } catch (e) {
      throw new Error(e);
    }
  }

  async function assembleData() {
    setTypeData([await getTypeInfo(shapedUserChoice[0]), await getTypeInfo(shapedUserChoice[1]) ])
    console.log(typeData);
  }

  useEffect(() => {
    assembleData()
  }, []);

  return <div></div>;
}

export default TypeInfo;
