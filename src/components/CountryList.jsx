/* eslint-disable react/prop-types */
import React from "react";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

import styles from "./CountryItem.module.css";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Please add your city first" />;

  //remove dublicated countries
  let countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <div className={styles.cityList}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
