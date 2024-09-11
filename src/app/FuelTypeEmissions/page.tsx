'use client'
import { FormControl, InputLabel, Select, MenuItem, ToggleButtonGroup, ToggleButton, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";

const data = [
    ["Main fuel type", "Coal Tar", "Coke oven coke", "Natural gas liquids", "Gas/Diesel oil", "Motor gasoline", "Natural gas", "Wood waste", "Landfill gas"],
    ["Solid fossil fuel", 10000, 5000, 0, 0, 0, 0, 0, 0,],
    ["Liquid fossil fuel", 0, 0, 13000, 10000, 7000, 0, 0, 0,],
    ["Gaseous fossil fuel", 0, 0, 0, 0, 0, 25000, 0, 0],
    ["Biomass", 0, 0, 0, 0, 0, 0, 3000, 2000],
]
const options = {
    title: "Direct and Indirect Emissions",
    vAxis: { title: "Fuel Type", titleTextStyle: { color: "#333" } },
    hAxis: { title: "Total CO2 emissions (kg of CO2e)", minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
};
const specificFuelTypes = [
    ["Coal Tar", "Coke oven coke", "Natural gas liquids", "Gas/Diesel oil", "Motor gasoline", "Natural gas", "Wood waste", "Landfill gas"],
    ["Coal Tar", "Coke oven coke"],
    ["Natural gas liquids", "Gas/Diesel oil", "Motor gasoline"],
    ["Natural gas"],
    ["Wood waste", "Landfill gas"],
];

export default function EmissionsByFuelType() {
    const [chartType, setChartType] = useState<GoogleChartWrapperChartType>("BarChart");
    const [mainFuelType, setmainFuelType] = useState("");
    const [specificFuel, setSpecificFuel] = useState("");

    const [fuelTypes, setFuelTypes] = useState(specificFuelTypes[0]);

    let filteredDataset = data;

    if (mainFuelType) {
        filteredDataset = [['', ...specificFuelTypes[parseInt(mainFuelType)]], filteredDataset[parseInt(mainFuelType)].filter(x => x > '0')];
    }
    if (specificFuel) {
        filteredDataset = filteredDataset.map(x => {
            return [x[0], x[parseInt(specificFuel)]];
        });
    }

    function handleSpecificFuelChange(event: SelectChangeEvent) {
        setSpecificFuel(event.target.value);
    }

    function handleChartTypeChange(event: React.MouseEvent, value: string) {
        setChartType(value as GoogleChartWrapperChartType);
    }

    function handleMainFuelTypeChange(event: SelectChangeEvent) {
        setSpecificFuel("");
        setmainFuelType(event.target.value);
        setFuelTypes(specificFuelTypes[parseInt(event.target.value) || 0]);
    }

    return (
        <>
            <div>
                <div className='filter-title'>
                    Filters:
                </div>
                <div className='filters'>
                    <FormControl className='filter' fullWidth>
                        <InputLabel id="mainFuelType-select-label">Main Fuel Type</InputLabel>
                        <Select
                            labelId="mainFuelType-select-label"
                            value={mainFuelType}
                            label="Main Fuel Type"
                            onChange={handleMainFuelTypeChange}
                        >
                            <MenuItem value={1}>Solid fossil fuel</MenuItem>
                            <MenuItem value={2}>Liquid fossil fuel</MenuItem>
                            <MenuItem value={3}>Gaseous fossil fuel</MenuItem>
                            <MenuItem value={4}>Biomass</MenuItem>
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className='filter' fullWidth>
                        <InputLabel id="specificFuel-select-label">Specific Fuel Type</InputLabel>
                        <Select
                            labelId="specificFuel-select-label"
                            id="specificFuel-select"
                            value={specificFuel}
                            label="Specific Fuel Type"
                            onChange={handleSpecificFuelChange}
                        >
                            {fuelTypes.map((x, i) => {
                                return <MenuItem key={i} value={i + 1}>{x}</MenuItem>
                            })}
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                        </Select>
                    </FormControl >
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
                    height="700px"
                    data={filteredDataset}
                    options={options}
                />
            </div>
        </>
    );
}