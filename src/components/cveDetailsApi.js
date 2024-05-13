import React, { useEffect, useState } from "react";
import cve_api from "../utils/cve_api"; // Import the correct API fetching function

const CVEDetails = ({ selectedItem }) => {
  const [cveDetails, setCveDetails] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(selectedItem);
  useEffect(() => {
    const fetchCVEData = async () => {
      setLoading(true);
      try {
        // Fetch data based on the provided path
        const responseData = await cve_api(); // Assuming selectedItem contains the correct structure
        setCveDetails(responseData);
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching CVE data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCVEData();
  }, [selectedItem]);

  return (
    <div>
      {loading ? (
        <div>Loading CVE data...</div>
      ) : (
        <div>
          {/* Display the retrieved CVE data */}
          {cveDetails && ( // Check if cveDetails is not null
            <div>
              <h1>{selectedItem.cve.id}</h1>
              <p>{cveDetails.totalResults}</p>
              {/* Add more fields as needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CVEDetails;



