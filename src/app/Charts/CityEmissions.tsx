

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Chart,GoogleChartWrapperChartType } from "react-google-charts";
const CityEmissionData = [
  ["Location", "Total CO2e emissions (kg of CO2e)", "CO2 (in kg)", "CH4 (in kg)", "N2O (in kg)"],
  ["Barcelona", 10000, 9800, 125, 75],
  ["Valencia", 8000, 7920, 75, 5],
  ["Bilbao", 6000, 5500, 300, 200],
  ["Madrid", 12000, 10000, 1500, 500],
  ["Zaragoza", 4000, 3300, 500, 200],
  ["Malaga", 2000, 1750, 225, 25]
]
const options = {
  title: "City Emissions",
  vAxis: { title: "City", titleTextStyle: { color: "#333" } },
  hAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

export default function CityEmissions() {
  let [city, setCity] = useState("All");
  let [chartType, setChartType] = useState<GoogleChartWrapperChartType>("BarChart");
  let filteredDataset = CityEmissionData;

  if (city != "All")
    filteredDataset = CityEmissionData.filter(x => (x[0] == "Location" || x[0] === city));

  function handleCityChange(event: any) {
    setCity(event.target.value);
  }
  function handleChartTypeChange(event: any) {
    setChartType(event.target.value);
  }
  return (
    <>
      <div className='w-10'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="Age"
            onChange={handleCityChange}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Barcelona"}>Barcelona</MenuItem>
            <MenuItem value={"Valencia"}>Valencia</MenuItem>
          </Select>
        </FormControl>
        <ToggleButtonGroup
          color="primary"
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          aria-label="Chart Type"
        >
          <ToggleButton value="BarChart">Bar</ToggleButton>
          <ToggleButton value="LineChart">Line</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Chart
        chartType={chartType}
        width="50%"
        height="400px"
        data={filteredDataset}
        options={options}
      /></>
  );
}
