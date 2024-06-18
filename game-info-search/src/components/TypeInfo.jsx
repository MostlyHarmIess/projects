import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POKEMON_ENDPOINT } from "../config";

function TypeInfo() {
  const { userChoice } = useParams();
  const shapedUserChoice = userChoice.split("-");
  const [typeData, setTypeData] = useState(
    JSON.parse(sessionStorage.getItem("typeData")) || [],
  );
  const [totalDamageTaken, setTotalDamageTaken] = useState({
    fourTimes: [],
    twoTimes: [],
    halfTimes: [],
    quarterTimes: [],
    immune: [],
  });

  async function getTypeInfo(type) {
    if (!type) return undefined;

    try {
      const response = await fetch(
        `${POKEMON_ENDPOINT}type/${type}?limit=100000`,
      );
      if (!response.status === "ok") {
        throw response;
      }
      const data = await response.json();
      delete data.game_indices;
      delete data.generation;
      delete data.move_damage_class;
      delete data.moves;
      delete data.names;
      delete data.past_damage_relations;

      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async function assembleTypeData() {
    setTypeData([
      await getTypeInfo(shapedUserChoice[0]),
      await getTypeInfo(shapedUserChoice[1]),
    ]);
  }

  function compareDamageTaken() {
    const doubleFrom1 = new Set([
      ...typeData[0].damage_relations.double_damage_from.map((ele) => ele.name),
    ]);
    const doubleFrom2 = new Set([
      ...typeData[1].damage_relations.double_damage_from.map((ele) => ele.name),
    ]);

    const halfFrom1 = new Set([
      ...typeData[1].damage_relations.half_damage_from.map((ele) => ele.name),
    ]);
    const halfFrom2 = new Set([
      ...typeData[1].damage_relations.half_damage_from.map((ele) => ele.name),
    ]);

    const noDamageFrom1 = new Set([
      ...typeData[1].damage_relations.no_damage_from.map((ele) => ele.name),
    ]);
    const noDamageFrom2 = new Set([
      ...typeData[1].damage_relations.no_damage_from.map((ele) => ele.name),
    ]);

    setTotalDamageTaken({
      fourTimes: [...doubleFrom1.intersection(doubleFrom2)],
      twoTimes: [
        ...doubleFrom1
          .symmetricDifference(doubleFrom2)
          .difference(halfFrom1.symmetricDifference(halfFrom2)),
      ],
      halfTimes: [
        ...halfFrom1
          .symmetricDifference(halfFrom2)
          .difference(doubleFrom1.symmetricDifference(doubleFrom2)),
      ],
      quarterTimes: [...halfFrom1.intersection(halfFrom2)],
      immune: [...noDamageFrom1.union(noDamageFrom2)],
    });
  }

  useEffect(() => {
    if (!typeData[0]?.name || typeData[0].name !== shapedUserChoice[0]) {
      assembleTypeData();
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("typeData", JSON.stringify(typeData));
    compareDamageTaken();
  }, [typeData]);

  if (!typeData[0]?.name || typeData[0].name !== shapedUserChoice[0]) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>
        {shapedUserChoice[0]}
        &nbsp;
        {shapedUserChoice[1]}
        &nbsp; takes:
      </h1>
      <ul>
        <li>
          four times damage from:&nbsp;
          {totalDamageTaken.fourTimes.join(", ")}
        </li>
        <li>
          double damage from:&nbsp;
          {totalDamageTaken.twoTimes.join(", ")}
        </li>
        <li>
          half damage from:&nbsp;
          {totalDamageTaken.halfTimes.join(", ")}
        </li>
        <li>
          and is immune to:&nbsp;
          {totalDamageTaken.immune.join(", ")}
        </li>
      </ul>
    </>
  );
}

export default TypeInfo;
