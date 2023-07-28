// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function Form() {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [geolocationError, setGeolocationError] = useState("");

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const navigate = useNavigate();

  const { addCity, isLoading } = useCities();

  function handelBackButton(e) {
    e.preventDefault();
    navigate("../cities");
  }

  async function handelSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };
    await addCity(newCity);
    navigate("../cities");
  }

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(
    function () {
      if (!mapLat || !mapLng) return;
      async function getCityData() {
        try {
          setGeolocationError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "This doesn't seem to be a city, click somewhere else 🫡"
            );
          setCityName(data.city || data.locality || " ");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
          // console.log(data);
        } catch (err) {
          setGeolocationError(err.message);
        }
      }
      getCityData();
    },
    [mapLat, mapLng]
  );

  if (isLoading) return <Spinner />;
  if (!mapLat && !mapLng)
    return <Message message={"Start by clicking somewhere on the map"} />;

  if (geolocationError) return <Message message={geolocationError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handelSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={handelBackButton}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
