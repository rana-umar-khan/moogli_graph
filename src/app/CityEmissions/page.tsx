'use client'
import { FormControl, InputLabel, Select, MenuItem, ToggleButton, ToggleButtonGroup, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";

const CityEmissionData = [
  ["Location", "Total CO2e emissions (kg of CO2e)", "CO2 (in kg)", "CH4 (in kg)", "N2O (in kg)"],
  ["Barcelona", 10000, 9800, 125, 75],
  ["Valencia", 8000, 7920, 75, 5],
  ["Bilbao", 6000, 5500, 300, 200],
  ["Madrid", 12000, 10000, 1500, 500],
  ["Zaragoza", 4000, 3300, 500, 200],
  ["Malaga", 2000, 1750, 225, 25]
];
const options = {
  title: "City Emissions",
  vAxis: { title: "Location", titleTextStyle: { color: "#333" } },
  hAxis: { title: "CO2 emissions (kg of CO2e)", minValue: 0 },
  chartArea: { width: "70%", height: "70%" },
  animation: {
    duration: 1000,
    easing: "linear",
    startup: true,
  }
};

export default function CityEmissions() {
  const [city, setCity] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [chartType, setChartType] = useState<GoogleChartWrapperChartType>("BarChart");

  let filteredDataset = CityEmissionData;

  if (city) {
    filteredDataset = filteredDataset.filter(x => (x[0] == "Location" || x[0] === city));
  }
  if (fuelType) {
    filteredDataset = filteredDataset.map(x => {
      return [x[0], x[parseInt(fuelType)]];
    });
  }

  function handleCityChange(event: SelectChangeEvent) {
    setCity(event.target.value);
  }

  function handleFuelTypeChange(event: SelectChangeEvent) {
    setFuelType(event.target.value);
  }

  function handleChartTypeChange(event: React.MouseEvent, value: string) {
    setChartType(value as GoogleChartWrapperChartType);
  }

  return (
    <>
      <div className='filter-bar'>
        <div className='filter-title'>
          Filters:
        </div>
        <div className='filters'>
          <FormControl className='filter' fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              label="Location"
              onChange={handleCityChange}
            >
              <MenuItem value={"Barcelona"}>Barcelona</MenuItem>
              <MenuItem value={"Valencia"}>Valencia</MenuItem>
              <MenuItem value={"Bilbao"}>Bilbao</MenuItem>
              <MenuItem value={"Madrid"}>Madrid</MenuItem>
              <MenuItem value={"Zaragoza"}>Zaragoza</MenuItem>
              <MenuItem value={"Malaga"}>Malaga</MenuItem>
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
            </Select>
          </FormControl >
          <FormControl className='filter' fullWidth>
            <InputLabel id="fuel-select-label">Fuel Type</InputLabel>
            <Select
              labelId="fuel-select-label"
              value={fuelType}
              label="Fuel Type"
              onChange={handleFuelTypeChange}
            >
              <MenuItem value={2}>CO2</MenuItem>
              <MenuItem value={3}>CH4</MenuItem>
              <MenuItem value={4}>N2O</MenuItem>
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
            </Select>
          </FormControl>
          <ToggleButtonGroup
            color="primary"
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="Chart Type"
            className='filter toggle-button'
          >
            <ToggleButton value="BarChart">Bar Chart</ToggleButton>
            <ToggleButton value="Bar">Bar</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div
        className='chart'>
        <Chart
          chartType={chartType}
          width="95%"
          height="600px"
          data={filteredDataset}
          options={options}
        />
      </div>
    </>
  );
}
