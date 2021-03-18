import React, { useState, useEffect } from "react";
import "./App.css";
import Cards from "./Components/Card/card";
import Chart from "./Components/Charts/chart";
import CountryPicker from "./Components/Country/country";
import { CircularProgress } from "@material-ui/core";
import { getAllData, getCountry, getdailyData } from "./api";

function App() {
  const [AllStatedata, setAllStatedata] = useState();
  const [loading, setloading] = useState();
  const [country, setCountry] = useState("all");
  const [Chartdata, setChartdata] = useState();
  const handleChange = async (val) => {
    setloading(true);
    if (val != "all") {
      let res = await getCountry(val);
      setAllStatedata(res);
      setChartdata(res);
    } else {
      let res = await getAllData(val);
      setAllStatedata(res);
      let daily = await getdailyData();
      setChartdata(daily);
    }
    setCountry(val);
    setloading(false);
  };

  useEffect(() => {
    async function fetchdata() {
      setloading(true);
      let res = await getAllData();
      setAllStatedata(res);
      console.log(res);
      let daily = await getdailyData();
      setChartdata(daily);
      setloading(false);
    }
    fetchdata();
  }, []);
  return (
    <>
      <div className="App">
       
        {!loading ? (
          <>
            <Cards AllStatedata={AllStatedata} />
            <CountryPicker handleChange={handleChange} country={country} />
            <Chart data={Chartdata} country={country} />
          </>
        ) : (
          <div className="loading">
            <CircularProgress color="secondary" size="7rem" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;