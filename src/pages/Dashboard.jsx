import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [filteredRows, setFilteredRows] = useState([]);

  function searchFilter(value)
  {
    setSearchText(value);
    setFilteredRows(mockData.results.filter(row => row["&id"] === value));
    
  }
  const handleRowClick = (row1, row2) => {
    setSelectedOrderDetails(row1);
    setSelectedOrderTimeStamps(row2);
  };


  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={mockData.results.length + " orders"} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => searchFilter(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section} style={{display:"flex", flexDirection:"row"}}>
          <Card
            cardData={Object.keys(selectedOrderDetails).length>0 ? selectedOrderDetails.executionDetails : selectedOrderDetails }
            title="Selected Order Details"
          />
          <Card
            cardData={  Object.keys(selectedOrderTimeStamps).length>0 ?  selectedOrderTimeStamps.timestamps : selectedOrderTimeStamps } 
            title="Selected Order Timestamps"
          />
        </div>
        { searchText.length === 0 ? <List rows={mockData.results} rows2={timestamps.results} currency={currency} rowClick={handleRowClick} />
            : <List rows={filteredRows} rows2={timestamps.results} currency={currency} rowClick={handleRowClick} />
        }
        
      </div>
    </div> 
  );
};

export default Dashboard;
