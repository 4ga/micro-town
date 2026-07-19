import { useState, useEffect } from "react";
import { LocationCard } from "./card";
import { categories } from "../data/dataset";

import "../styles/location-list.css";

export const LocationList = ({ locations }) => {
  const [category, setCategory] = useState("all");
  const [visibleLocations, setVisibleLocations] = useState(locations);

  useEffect(() => {
    const updateLocationList = () => {
      setVisibleLocations(
        category === "all"
          ? locations
          : locations.filter((location) => location.category === category),
      );
    };
    updateLocationList();
  }, [category, locations]);

  const handleCardClick = (e) => {
    setVisibleLocations(
      visibleLocations.map((loc) =>
        loc.id === e ? { ...loc, isOpen: !loc.isOpen } : loc,
      ),
    );
  };

  return (
    <>
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

      {visibleLocations?.length === 0 && (
        <p className="no-listings">No Locations Found</p>
      )}
      <section className="locations-list">
        {visibleLocations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            handleCardClick={(e) => handleCardClick(e)}
          />
        ))}
      </section>
    </>
  );
};
