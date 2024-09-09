import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Chart } from "react-google-charts";

const data = [
    ["Scope", "2020", "2021", "2022", "2023"],
    ["Direct Emissions", 15000, 10000, 11000, 9800],
    ["Indirect emissions from purchased energy (electricity)", 6400, 8000, 6400, 7800],
    ["Indirect emissions (everything else)", 140000, 125000, 162000, 115000],
    ["Total Emissions", 161400, 143000, 179400, 132600]
]
const options = {
  title: "Direct and Indirect Emissions",
  vAxis: { title: "Scope", titleTextStyle: { color: "#333" } },
  hAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

export default function YearlyEmissions() {
//   let [city, setCity] = useState("All");
//   let filteredDataset = data;

//   if (city != "All")
//     filteredDataset = CityEmissionDataCityEmissionData.filter(x => (x[0]=="Location" ||x[0] === city));

//   function handleChange(event:any) {
//     setCity(event.target.value);
//   }

  return (
    <>
      <div className='w-10'>
        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Barcelona"}>Barcelona</MenuItem>
            <MenuItem value={"Valencia"}>Valencia</MenuItem>
          </Select>
        </FormControl> */}
      </div>
      <Chart
        chartType="BarChart"
        width="5 0%"
        height="400px"
        data={data}
        options={options}
      /></>
  );
}