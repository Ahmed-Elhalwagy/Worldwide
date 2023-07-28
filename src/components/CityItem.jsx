/* eslint-disable react/prop-types */
import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  function handelDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <Link
      to={`${id}?name=${cityName}&lat=${lat}&lng=${lng}`}
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles["cityItem--active"] : ""
      }`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn} onClick={handelDeleteCity}>
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
