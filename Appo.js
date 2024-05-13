import React, { useEffect, useMemo, useState } from "react";
import Pagination from "./src/components/pagination";
import cve_api from "./src/utils/cve_api";
import { Dateconvert } from "./src/utils/Dateconvert";
import CVEDetails from "./src/components/cveDetailsApi";

export default function Appo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedCVE, setSelectedCVE] = useState(null); // Track selected CVE
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected index

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]); // Fetch data when currentPage or pageSize changes

  const fetchData = async () => {
    setLoading(true); // Set loading state
    try {
      const responseData = await cve_api();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset current page when changing page size
  };

  const handleRowClick = (index) => {
    setSelectedIndex(index);
    setSelectedCVE(data.vulnerabilities[index].cve); // Set selected CVE based on index
  };

  const currentTableData = useMemo(() => {
    const vulnerabilities = data?.vulnerabilities || []; // Use optional chaining to handle potential undefined data
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return vulnerabilities.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data, pageSize]);

  return (
    <>
      {selectedCVE ? (
        <CVEDetails selectedItem={selectedCVE} /> // Pass selectedItem to CVEDetails
      ) : (
        <>
          {loading ? (
            <div>Loading...</div> // Display loading state while fetching data
          ) : (
            <>
              <div>Total Records: {data.totalResults}</div>
              <table>
                <thead>
                  <tr> 
                    <th>CVE ID</th>
                    <th>SOURCE IDENTIFIER</th>
                    <th>PUBLISHED</th>
                    <th>LAST MODIFIED</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((item, index) => {
                    return (
                      <tr key={index} onClick={() => handleRowClick(index)}> {/* Pass index to handleRowClick */}
                        <td>{item.cve.id}</td>
                        <td>{item.cve.sourceIdentifier}</td>
                        <td>{Dateconvert(item.cve.published)}</td>
                        <td>{Dateconvert(item.cve.lastModified)}</td>
                        <td>{item.cve.vulnStatus}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Results per page:
                  <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <span style={{alignContent:'center'}}>{currentPage} of {data.totalResults} Records</span>
                <div style={{ marginLeft: 'auto' }}>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={data.totalResults}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

