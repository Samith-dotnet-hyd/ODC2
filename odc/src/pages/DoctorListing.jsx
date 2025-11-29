import { useState, useEffect } from "react";
import "./DoctorListing.css";
import DoctorCard from "../components/DoctorCard";
import FilterSidebar from "../components/FilterSidebar";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function DoctorListing() {
  const [filters, setFilters] = useState({
    specialization: "",
    experience: "",
    rating: "",
    price: ""
  });

  const [doctors, setDoctors] = useState([]);

  // const updateFilter = (key, value) => {
  //   setFilters(prev => ({ ...prev, [key]: value }));
  // };
  const updateFilter = (key, value) => {
  setFilters(prev => ({
    ...prev,
    [key]: prev[key] === value ? "" : value   // <-- toggle filter
  }));
};


  // Load doctors
  const fetchDoctors = async () => {
    try {
      const hasFilters =
        filters.specialization ||
        filters.experience ||
        filters.rating ||
        filters.price;

      let response;

      if (!hasFilters) {
        // No filters → get ALL doctors
        response = await axios.get("http://localhost:5108/api/doctors");
      } else {
        // Filters applied → call /filter endpoint
        response = await axios.get("http://localhost:5108/api/doctors/filter", {
          params: {
            Specialization: filters.specialization || undefined,
            MinExperience: filters.experience || undefined,
            MinRating: filters.rating || undefined,
            MaxConsultationFee: filters.price || undefined
          }
        });
      }

      setDoctors(response.data);

    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Fetch when filters change
  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  return (
    <>
      <Navbar />

      <div className="doctor-listing">

<FilterSidebar updateFilter={updateFilter} filters={filters} />

        <div className="doctor-grid">
          {doctors?.length > 0 ? (
            doctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </>
  );
}
