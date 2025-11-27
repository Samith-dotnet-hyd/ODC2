import "./FilterSidebar.css";
import { useState } from "react";
export default function FilterSidebar({ updateFilter }) {
   const [price, setPrice] = useState(0);
  return (
    <div className="filter-sidebar">

      <h3>Specialization</h3>
      <div className="filter-chip" onClick={() => updateFilter("specialization", "Cardiologist")}>
        cardiologist
      </div>
      <div className="filter-chip" onClick={() => updateFilter("specialization", "Dermatologist")}>
        Dermatologist
      </div>

      <h3>Availability</h3>
      <div className="filter-chip" onClick={() => updateFilter("availability", "Today")}>
        Today
      </div>
      <div className="filter-chip" onClick={() => updateFilter("availability", "Next3Days")}>
        Next 3 Days
      </div>

      <h3>Consultation</h3>
      <div className="filter-chip" onClick={() => updateFilter("consultation", "InPerson")}>
        In-Person
      </div>
      <div className="filter-chip" onClick={() => updateFilter("consultation", "Video")}>
        Video
      </div>

    
      <h3>Price</h3>

      <input
        type="range"
        min="200"
        max="1500"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          updateFilter("price", e.target.value);
        }}
      />

      <p className="price-value">₹ {price}</p>

    </div>
  );
}

