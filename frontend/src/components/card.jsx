import { categories } from "../data/dataset";
import "../styles/card.css";

export const LocationCard = ({ location, handleCardClick }) => {
  const { id, name, category, description, isOpen } = location;
  const categoryValue = categories.find((c) => c.value === category);

  return (
    <article key={id} className="card">
      <h3 className="name">{name}</h3>
      <span className="card-category">{categoryValue.name}</span>
      <p className="card-description">{description}</p>
      <button
        className={isOpen ? "open" : "close"}
        onClick={() => handleCardClick(id)}
      >
        {isOpen ? `Close ${name}` : `Open ${name}`}
      </button>
    </article>
  );
};
