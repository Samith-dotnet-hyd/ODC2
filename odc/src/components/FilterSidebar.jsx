import "./FilterSidebar.css";
import { useState } from "react";

export default function FilterSidebar({ updateFilter ,filters }) {
  const [price, setPrice] = useState(800);
  const [experience, setExperience] = useState(0);
  const [rating, setRating] = useState(0);

  const handlePriceChange = (value) => {
    const num = Number(value);
    setPrice(num);
    updateFilter("price", num);
  };

  const handleExperienceChange = (value) => {
    const num = Number(value);
    setExperience(num);
    updateFilter("experience", num);
  };

 const handleRatingChange = (value) => {
  setRating(value);
  updateFilter("rating", value);
};

  return (
    <div className="filter-sidebar">

      {/* SPECIALIZATION */}
      {/* <h3>Specialization</h3> */}
      {/* <div className="filter-chip" onClick={() => updateFilter("specialization", "Cardiologist")}>
        Cardiologist
      </div>
      <div className="filter-chip" onClick={() => updateFilter("specialization", "Dermatologist")}>
        Dermatologist
      </div> */}
{/* <h3>Specialization</h3>

<div 
  className={`filter-chip ${filters.specialization === "Cardiologist" ? "active" : ""}`}
  onClick={() => updateFilter("specialization", "Cardiologist")}
>
  Cardiologist
</div>

<div 
  className={`filter-chip ${filters.specialization === "Dermatologist" ? "active" : ""}`}
  onClick={() => updateFilter("specialization", "Dermatologist")}
>
  Dermatologist
</div> */}
<h3>Specialization</h3>
<select
  className="filter-select"
  onChange={(e) => updateFilter("specialization", e.target.value)}
>
  <option value="">All</option>
  <option value="Cardiologist">Cardiologist</option>
  <option value="Dermatologist">Dermatologist</option>
  <option value="Neurologist">Neurologist</option>
  <option value="Pediatrician">Pediatrician</option>
  <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
  <option value="Gynecologist">Gynecologist</option>
  <option value="Psychiatrist">Psychiatrist</option>
  <option value="ENT Specialist">ENT Specialist</option>
  <option value="General Physician">General Physician</option>
</select>


      {/* EXPERIENCE */}
      <h3>Minimum Experience (Years)</h3>
      <input
        type="number"
        min="0"
        className="number-input"
        placeholder="e.g. 5"
        value={experience}
        onChange={(e) => handleExperienceChange(e.target.value)}
      />

      {/* RATING */}
      {/* <h3>Minimum Rating</h3>
      <input
        type="range"
        min="0"
        max="5"
        value={rating}
        onChange={(e) => handleRatingChange(e.target.value)}
      />
      <p>⭐ {rating}+</p> */}
      <h3>Minimum Rating</h3>

{/* Slider */}
<input
  type="range"
  min="0"
  max="5"
  step="0.1"
  value={rating}
  onChange={(e) => handleRatingChange(e.target.value)}
/>

{/* Text Box Below Slider */}
<input
  type="number"
  className="rating-input"
  min="0"
  max="5"
  step="0.1"
  value={rating}
  onChange={(e) => handleRatingChange(e.target.value)}
  placeholder="Enter rating (0 - 5)"
/>

<p>⭐ {rating}+</p>


      {/* PRICE FILTER */}
      <h3>Max Price</h3>
      <input
        type="range"
        min="200"
        max="1500"
        value={price}
        onChange={(e) => handlePriceChange(e.target.value)}
      />

      <input
        type="number"
        className="price-input"
        min="200"
        max="1500"
        value={price}
        onChange={(e) => handlePriceChange(e.target.value)}
        placeholder="Enter max fee"
      />

      <p className="price-value">₹ {price}</p>
    </div>
  );
}
