function BasicTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="Prototype" {...a11yProps(0)} />
            <Tab label="Rss Data" {...a11yProps(1)} />
            <Tab label="Supabase Data" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <Container>
                  <Row>
                      <Col sm={3}>
                          <FilterSidebarContainer/>
                          {/*Home*/}
                          {/*<Link to="/">Home</Link>*/}
                      </Col>
                      <Col>
                          <Results articles={bills}/>
                      </Col>
                  </Row>
              </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Container>
                  <Row>
                      <Col>
                          <SimpleBillTable/>
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

  export default BasicTabs