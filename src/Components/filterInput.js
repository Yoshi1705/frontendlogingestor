import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

const FilterSection = ({action,reset}) => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [value , setValue] = useState("");
  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  return (
    <Paper
      elevation={10}
      style={{
        padding: "10px",
        marginBottom: "20px",
        width: "80%",
        marginInline: "auto",
        justifyContent:"space-between",
        alignItems:"center",
        display:"flex",
        height:"100%"
      }}
    >
        {/* Dropdown to choose a property */}
        <div style={{width:"15%"}}>
          <Select
            value={selectedProperty}
            onChange={handlePropertyChange}
            displayEmpty
            inputProps={{ "aria-label": "Select property" }}
            style={{ width: "100%" }}
          >
            <MenuItem value="" disabled>
              choose item
            </MenuItem>
            <MenuItem value={0}>Level</MenuItem>
            <MenuItem value={1}>Message</MenuItem>
            <MenuItem value={2}>Resource ID</MenuItem>
            <MenuItem value={3}>Trace ID</MenuItem>
            <MenuItem value={4}>Span ID</MenuItem>
            <MenuItem value={5}>Commit</MenuItem>
            <MenuItem value={6}>Parent Resource ID</MenuItem>
          </Select>
        </div>
        {/* Filter TextField */}
        <div style={{width:"60%"}}>
          <TextField onChange={(e)=>{setValue(e.target.value)}} label="Filter" variant="outlined" fullWidth />
        </div>

        {/* Filter Button */}
        <div style={{width:"6%"}}>
          <Button
            variant="contained"
            onClick={()=>action(value,selectedProperty)}
            style={{ width: "100%",height:50  }}
          >
            Filter
          </Button>
        </div>
        <div style={{width:"6%",paddingRight : 8}}>
          <Button
            variant="contained"
            onClick={()=>reset()}
            style={{ width: "100%",height:50,backgroundColor:"orange"  }}
          >
            Reset
          </Button>
        </div>
    </Paper>
  );
};

export default FilterSection;
