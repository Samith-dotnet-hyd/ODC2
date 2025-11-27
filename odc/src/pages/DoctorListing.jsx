import { useState, useEffect } from "react";
import "./DoctorListing.css";
import DoctorCard from "../components/DoctorCard";
import FilterSidebar from "../components/FilterSidebar";
import axios from "axios";
import Navbar from "../components/Navbar";
export default function DoctorListing() {
  const [filters, setFilters] = useState({
    Specialization: "",
    // availability: "",
    consultation: "",
    price: ""
  });

  const [doctors, setDoctors] = useState([]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

 

// load once initially
 const fetchDoctors = async () => {
  try {
    const hasFilters =
      filters.specialization ||
      filters.consultation ||
      filters.price;

    let response;

    if (!hasFilters) {
      // No filters → get ALL doctors
      response = await axios.get("http://localhost:5108/api/doctors");
    } else {
      // Filters applied → call /filter endpoint
      response = await axios.get("http://localhost:5108/api/doctors/filter", {
        params: {
          Specialization: filters.specialization,
          Consultation: filters.consultation,
          Price: filters.price
        }
      });
    }

    setDoctors(response.data);
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
};

 // Fetch doctors when filters change
  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  return (
    <>
        <Navbar/>
    <div className="doctor-listing">
           
      
      <FilterSidebar updateFilter={updateFilter} />

      <div className="doctor-grid">
        {doctors.length > 0 ? (
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
