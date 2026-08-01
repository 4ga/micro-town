import { useState, useEffect } from "react";

const LocationLoader = ({ loadLocations }) => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    const loadLocationData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const loadedLocations = await loadLocations();

        if (!isCancelled) {
          setLocations(loadedLocations);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadLocationData();

    return () => {
      isCancelled = true;
    };
  }, [loadLocations, requestVersion]);

  if (isLoading) {
    return <p>Loading locations...</p>;
  }

  if (error) {
    return (
      <div role="alert">
        <p>Unable to load locations.</p>
        <button
          type="button"
          onClick={() => setRequestVersion((version) => version + 1)}
        >
          Retry loading locations
        </button>
      </div>
    );
  }

  if (locations.length === 0) {
    return <p>No locations available.</p>;
  }

  return (
    <ul>
      {locations.map((loc) => (
        <li key={loc.id}>{loc.name}</li>
      ))}
    </ul>
  );
};

export default LocationLoader;
