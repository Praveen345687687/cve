import React, { useEffect, useState } from "react";

// cve_api.js
const cve_api = async () => {
  try {
    const response = await fetch("https://services.nvd.nist.gov/rest/json/cves/2.0");
    const data = await response.json();
    //console.log(data);
    return data; // Return data wrapped in a Promise
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};

export default cve_api;

