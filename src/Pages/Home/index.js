import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LogCard from "../../Components/logcard";
import Footer from "../../Components/footer";
import Header from "../../Components/header";
import useFetch from "../../Hooks/Get";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { endpoints } from "../../Api";
import FilterSection from "../../Components/filterInput";
import usePost from "../../Hooks/AuthPost";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [logs, setLogs] = useState([[]]);
  const [page, setPage] = useState(0);
  const [totalLogs, setTotalLogs] = useState(0);
  const [currentFilter,setCurrentFilter] = useState(null)
  const pageSize = 10;
  const { data, loading, error } = useFetch(endpoints.home + "/" + page);
  const { data2, loading2, error2,trigger} = usePost();
  const navigate  = useNavigate();
  const isLoggedIn = localStorage.getItem('is_loggedIn');
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('is_loggedIn');

    // Check if the user is not logged in, then redirect to the login page
    if (!isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [navigate]);
  const filter = (value,prop) => {
    const payload = {
        params: prop,
        value,
        startIndex:0
    }
    console.log("hello",payload)
    setCurrentFilter(payload)
    trigger(endpoints.filter,payload);
  }
  const chunkLogsIntoRows = (logs, itemsPerRow) => {
    return Array.from(
      { length: Math.ceil(logs?.length / itemsPerRow) },
      (_, index) => logs.slice(index * itemsPerRow, (index + 1) * itemsPerRow)
    );
  };
  useEffect(() => { 
    console.log("----", data);
    if(currentFilter == null){
    const temp = chunkLogsIntoRows(data?.data, 3);
    setLogs(temp);
    console.log(temp);
    setTotalLogs(data?.total_count);
    }
  }, [data]);
  useEffect(()=>{
    console.log("/////", data2);
    const temp = chunkLogsIntoRows(data2?.data, 3);
    setLogs(temp);
    console.log(temp);
    setTotalLogs(data2?.total_count);
  },[data2])
  const handleNextPage = () => {
    if (page + pageSize < 1000) {
      setPage(page + pageSize);
      if(currentFilter != null){
      currentFilter.startIndex = page+pageSize
      trigger(endpoints.filter,currentFilter)
      }
    }
  };

  const handlePreviousPage = () => {
    if (page - pageSize >= 0) {
      setPage(page - pageSize);
      if(currentFilter != null){
      currentFilter.startIndex = page-pageSize
      trigger(endpoints.filter,currentFilter)
      }
    }
  };

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header navigate={navigate} />
      <div
        style={{
          marginInline: "auto",
          padding: "20px",
          width: "80%",
          minHeight: "80vh",
        }}
      >
        <FilterSection reset={()=>{
            setPage(0)
            setCurrentFilter(null)
            trigger(endpoints.filter,{})
        }} action={(value,prop)=>filter(value,prop)}/>
        <Grid container spacing={2}>
          {logs.map((row, rowIndex) => (
            <Grid container item key={rowIndex} spacing={2}>
              {row.map((log, logIndex) => (
                <Grid item key={logIndex} xs={4}>
                  <LogCard log={log} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "orange" }}
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>
          Page {Math.ceil((page + 1) / pageSize)}
        </span>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={page + pageSize >= totalLogs}
        >
          Next
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
