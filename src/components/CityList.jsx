/* eslint-disable react/prop-types */
import React from "react";
import styles from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";

import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Please add your city first" />;
  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  );
}

export default CityList;
