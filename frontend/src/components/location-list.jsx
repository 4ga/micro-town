import { useState } from "react";
import { LocationCard } from "./card";
import { categories } from "../data/dataset";

import "../styles/location-list.css";

export const LocationList = ({ locations }) => {
  const [category, setCategory] = useState("all");
  const [list, setList] = useState(locations);

  const updateList = (locationId) => {
    setList((currentList) =>
      currentList.map((location) =>
        location.id === locationId
          ? { ...location, isOpen: !location.isOpen }
          : location,
      ),
    );
  };

  const filteredLocations = list.filter(
    (location) => category === "all" || location.category === category,
  );
  return (
    <>
      <label htmlFor="location-selection">Filter by category</label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        name="location-selection"
        id="location-selection"
      >
        {categories.map((c) => (
          <option key={c.id} value={c.value}>
            {c.name}
          </option>
        ))}
      </select>

      <section
        className="locations-section"
        aria-labelledby="locations-heading"
      >
        <h2 id="locations-heading">Locations</h2>

        {filteredLocations.length === 0 ? (
          <p className="no-listings">No Locations Found</p>
        ) : (
          <ul className="locations-container">
            {filteredLocations.map((location) => (
              <li key={location.id}>
                <LocationCard
                  location={location}
                  handleCardClick={updateList}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};
