import React, { useState, useEffect } from "react";


import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Tab, Box, Typography } from "@mui/material";

import { Home } from "../pages";
import Newsfeed from "./Newsfeed/Newsfeed";

//TabPanel, a11yProps, and BasicTabs are boilerplate from MUI used to make tabs in the app
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


//A component that takes a filename and an array of data, and creates a table with the data
function Table({ filename, data }) {
  const rowStyles = {
    maxHeight: "50px",
    overflowY: "auto",
  };
  const cellStyles = {
    overflowY: "auto",
    maxHeight: "50px",
    border: "1px solid black",
    maxWidth: "400px",
    width: "100%",
    // overflow: 'auto',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
  };
  const tableStyle = {
    borderCollapse: "collapse",
    border: "1px solid black",
    // width: '100%',
    tableLayout: "fixed",
    // maxHeight: '50px',
    // overflowY: 'auto'
  };
  const scrollableDiv = {
    width: "100%",
    height: "100px",
    overflowY: "scroll",
  };

  const tbodyStyles = { maxHeight: "50px", overflowY: "auto" };

  return (
    <div>
      <h1>{filename}</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody style={tbodyStyles}>
          {data.map((row, index) => (
            <tr key={index} style={rowStyles}>
              {Object.values(row).map((value, index) => (
                <td key={index} style={cellStyles}>
                  <div style={scrollableDiv}>{value}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Prototype" {...a11yProps(0)} />
          <Tab label="Supabase Data" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Container fluid={"md"}>
          <Row>
            <Home />
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container>
          <Row>
            <Col>
              <Newsfeed />
            </Col>
          </Row>
        </Container>
      </TabPanel>
    </Box>
  );
}

export default BasicTabs;
