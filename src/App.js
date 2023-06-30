import logo from "./logo.svg";
import { BillData, TAGS, generateRandomBill } from "./Data";
import Results from "./components/results/Results";
import Header from "./components/Header/Header";
import FilterContainer from "./components/Filter/FilterContainer";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import { supabase } from './supabaseClient';
import { createTheme } from "@mui/material";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FilterProvider from "./components/Filter/FilterProvider";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Work Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
const MainAppContainer = () => {
  return (
    <Router>
      <Header />
      <BasicTabs />
    </Router>
  );
};

function ContainerFluidExample() {
  return (
    <Container fluid>
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
  );
}

// An array composed of 5 random bills for testing purposes
const bills = Array.from({ length: 5 }, () => generateRandomBill());

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

function CsvTable({ filename }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvFile = require(`./assets/csvs/${filename}.csv`);
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

function Page({ name }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>This is the {name} page.</p>
    </div>
  );
}

const rssFiles = [
  "HouseBillsAndResolutions",
  "HouseCommitteeAssignments",
  "HouseCommitteeMeetingSchedule",
  "HouseCoSponsorshipMemoranda",
  "HouseDailySessionReports",
  "HouseLegislativeJournals",
  "HouseMembers",
  "HouseRollCallVotes",
  "HouseVotedAmendments",
  "SenateBillsAndResolutions",
  "SenateCommitteeAssignments",
  "SenateCommitteeMeetingSchedule",
  "SenateCoSponsorshipMemoranda",
  "SenateExecutiveNominationsCalendar",
  "SenateFloorAmendments",
  "SenateLegislativeJournals",
  "SenateMembers",
  "SenateRollCallVotes",
  "SenateSessionCalendar",
  "SenateSessionNotes",
];

const SimpleBillTable = () => {
  return (
    // <Router>
    <>
      <ul>
        {rssFiles.map((name) => (
          <li key={name}>
            <Link to={`/${name}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <Routes>
        {rssFiles.map((name) => (
          <Route
            key={name}
            path={`/${name}`}
            element={<CsvTable filename={name} />}
          />
        ))}
      </Routes>
    </>
  );
};

//An example of how to retreive data from Supabase
//You will need to add an .env.local file with the REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to connect to Supabase.
// function BillsFromDB () {
//   const [billsFromDB, setBillsFromDB] = useState([]);

//   async function getBillsFromDB() {
//     const { data } = await supabase.from("Bills").select();
//     setBillsFromDB(data);
//   }

//   useEffect(() => {
//     getBillsFromDB();
//   }, [])

//   return (
//       <div>
//           <h2>Bill Data From DB</h2>
//           <ul>
//           {billsFromDB.map((bill) => (
//             <li key={bill.title}><strong>Bill Title:</strong> {bill.title}</li>
//           ))}
//           </ul>
//       </div>
//   );
// }

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
          <div>{children}</div>
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
        <Container>
          <Row>
            <FilterProvider>
              <Col sm={3}>
                <FilterContainer />

                {/*Home*/}
                {/*<Link to="/">Home</Link>*/}
              </Col>
              <Col>
                <Results articles={bills} />
              </Col>
            </FilterProvider>
          </Row>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container>
          <Row>
            <Col>
              <SimpleBillTable />
              <Link to="/results">Results</Link>
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainAppContainer />
    </ThemeProvider>
    // <Router>
    //     <div className="App">
    //         <ContainerFluidExample/>
    //
    //         <ul>
    //             {rssFiles.map(name => (
    //                 <li key={name}>
    //                     <Link to={`/${name}`}>{name}</Link>
    //                 </li>
    //             ))}
    //         </ul>
    //         <Routes>
    //             {rssFiles.map(name => (
    //                 <Route key={name} path={`/${name}`} element={<CsvTable filename={name} />} />
    //             ))}
    //         </Routes>
    //
    //         {/*<CsvTable/>*/}
    //     </div>
    // </Router>
  );
}

export default App;
