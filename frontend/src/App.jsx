import { LocationList } from "./components/location-list";
import { locations } from "./data/dataset";

import "./App.css";

function App() {
  return (
    <main>
      <section className="application-page">
        <div className="page-hero">
          <span className="eyebrow">Welcome to Micro Town</span>
          <h1>One account. Various businesses. Many useful applications.</h1>
          <p>
            Move between business projects, shared services, community features,
            and productivity tools through one responsive application.
          </p>

          <div className="hero-action">
            <button className="explore">Explore Micro Town</button>
            <button className="account">Create account</button>
          </div>
        </div>
        <div className="section-heading">
          <h2>Choose a business</h2>
          <p>
            Each business contains a related collection of applications.
          </p>
        </div>
        <div className="card-section">
          <LocationList locations={locations} />
        </div>
      </section>
    </main>
  );
}

export default App;
