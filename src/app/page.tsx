'use client'
import { AppBar, Toolbar } from "@mui/material";
import CityEmissions from "./Charts/CityEmissions";
import YearlyEmissions from "./Charts/YearlyEmissions";
import logo from "../logo.png";
import Image from "next/image";
import "../styles/page.css"

export default function Home() {

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="regular">
          <Image
            src={logo}
            alt={"logo"}
            width={200}
            height={44}
            style={{ filter: "brightness(0) invert(1)" }} />
        </Toolbar>

      </AppBar>
      <div className="graph">
        <CityEmissions />
      </div>
      <div className="graph">
        <YearlyEmissions />
      </div>
      
    </>
  );
}
