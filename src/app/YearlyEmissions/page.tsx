'use client'
import { FormControl, InputLabel, Select, MenuItem, ToggleButtonGroup, ToggleButton, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";

const data = [
  ["Scope", "2020", "2021", "2022", "2023"],
  ["Direct Emissions", 15000, 10000, 11000, 9800],
  ["Indirect emissions from purchased energy (electricity)", 6400, 8000, 6400, 7800],
  ["Indirect emissions (everything else)", 140000, 125000, 162000, 115000],
  ["Total Emissions", 161400, 143000, 179400, 132600]
];
const options = {
  title: "Direct and Indirect Emissions",
  vAxis: { title: "Scope", titleTextStyle: { color: "#333" } },
  hAxis: { title: "Total CO2 emissions (kg of CO2e)", minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

export default function YearlyEmissions() {
  const [chartType, setChartType] = useState<GoogleChartWrapperChartType>("BarChart");
  const [year, setYear] = useState("");
  const [scope, setScope] = useState("");

  let filteredDataset = data;

  if (scope) {
    filteredDataset = [filteredDataset[0], filteredDataset[parseInt(scope)]];
  }
  if (year) {
    filteredDataset = filteredDataset.map(x => {
      return [x[0], x[parseInt(year)]];
    });
    //flipping the data to improve UX
    filteredDataset = filteredDataset[0].map((_, colIndex) => filteredDataset.map(row => row[colIndex]));
    options.vAxis.title = "Year";
  } else {
    options.vAxis.title = "Scope";
  }

  function handleScopeChange(event: SelectChangeEvent) {
    setScope(event.target.value);
  }

  function handleChartTypeChange(event: React.MouseEvent, value: string) {
    setChartType(value as GoogleChartWrapperChartType);
  }

  function handleYearChange(event: SelectChangeEvent) {
    setYear(event.target.value);
  }

  return (
    <>
      <div>
        <div className='filter-title'>
          Filters:
        </div>
        <div className='filters'>
          <FormControl className='filter' fullWidth>
            <InputLabel id="scope-select-label">Scope</InputLabel>
            <Select
              labelId="scope-select-label"
              id="scope-select"
              value={`${scope}`}
              label="Scope"
              onChange={handleScopeChange}
            >
              <MenuItem value={1}>Direct Emissions</MenuItem>
              <MenuItem value={2}>Indirect emissions from purchased energy (electricity)</MenuItem>
              <MenuItem value={3}>Indirect emissions (everything else)</MenuItem>
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
            </Select>
          </FormControl >
          <FormControl className='filter' fullWidth>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              value={`${year}`}
              label="Year"
              onChange={handleYearChange}
            >
              <MenuItem value={1}>2020</MenuItem>
              <MenuItem value={2}>2021</MenuItem>
              <MenuItem value={3}>2022</MenuItem>
              <MenuItem value={4}>2023</MenuItem>
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