import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BasicTabs from './components/BasicTabs';
// import { supabase } from './supabaseClient';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const MainAppContainer = () => {
    return (
        <Router>
            <Header/>
            <BasicTabs/>
        </Router>
    );
}

function ContainerFluidExample() {
    return (
        <Container fluid>
            <Row>
                <Col>1 of 1</Col>
            </Row>
        </Container>
    );
}





//A component that takes a filename and an array of data, and creates a table with the data
function Table({filename, data}) {
    const rowStyles = {
        maxHeight: '50px',
        overflowY: 'auto'
    };
    const cellStyles = {
        overflowY: 'auto',
        maxHeight: '50px',
        border: '1px solid black',
        maxWidth: '400px',
        width: '100%',
        // overflow: 'auto',
        // textOverflow: 'ellipsis',
        // whiteSpace: 'nowrap',
    };
    const tableStyle = {
        borderCollapse: 'collapse',
        border: '1px solid black',
        // width: '100%',
        tableLayout: 'fixed',
        // maxHeight: '50px',
        // overflowY: 'auto'
    };
    const scrollableDiv = {
        width: '100%',
        height: '100px',
        overflowY: 'scroll'
    };


    const tbodyStyles = {maxHeight: '50px', overflowY: 'auto'};

    return (
        <div>
            <h1>{filename}</h1>
            <table style={tableStyle}>
                <thead>
                <tr>
                    {Object.keys(data[0]).map(key => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody style={tbodyStyles} >
                {data.map((row, index) => (
                    <tr key={index} style={rowStyles}>
                        {Object.values(row).map((value, index) => (
                            <td key={index} style={cellStyles}>
                                <div style={scrollableDiv}>
                                    {value}
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

function Page({ name }) {
    return (
        <div>
            <h1>{name}</h1>
            <p>This is the {name} page.</p>
        </div>
    );
}

const pages = ['Home', 'About', 'Contact'];



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






function App() {
  return (
      <MainAppContainer/>
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
