import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { rssFiles } from "../Data";

import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Tab, Box, Typography } from "@mui/material";

import { Home } from "../pages";
import S from "./BasicTabs.module.css";

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

const SimpleBillTable = () => {
  return (
    <>
      <ul>
        {rssFiles.map((name) => (
          <li key={name}>
            <Link to={`/${name}`}>{name}</Link>
          </li>
        ))}
      </ul>
      {/*  This breaks if loaded too slowly. */}
      <Routes>
        {[rssFiles?.[0]].map((name) => (
          <Route
            key={name}
            path={`/${name}`}
            element={<CsvTable filename={name} />}
          />
        )) || <Route path="*" element={<h1>404: Page not found</h1>} />}
      </Routes>
    </>
  );
};

function CsvTable({ filename }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvFile = require(`../assets/csvs/${filename}.csv`);
      const response = await fetch(csvFile);
      const text = await response.text();
      const rows = text.split("\n");
      // Rows and headers are pipe-delimited, per how they are stored in the repo
      const headers = rows[0].split("|");
      const rowsData = rows.slice(1).map((row) => row.split("|"));
      const newData = rowsData.map((row) =>
        headers.reduce((obj, key, index) => {
          obj[key] = row[index];
          return obj;
        }, {})
      );
      setData(newData);
      setLoading(false);
    };

    fetchData();
  }, [filename]);

  return (
    <div>
      {loading ? <p>Loading...</p> : <Table filename={filename} data={data} />}
    </div>
  );
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
          <Tab label="Rss Data" {...a11yProps(1)} />
          <Tab label="Supabase Data" {...a11yProps(2)} />
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
        <Container className={S.container}>
          <Row>
            <Col>
              <SimpleBillTable />
              {/* <Link to="/results">Results</Link> */}
            </Col>
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container>
          <Row>
            <Col>
              {/* <BillsFromDB /> */}
              <p>Mike can help you get this tab set up.</p>
            </Col>
          </Row>
        </Container>
      </TabPanel>
    </Box>
  );
}

export default BasicTabs;
