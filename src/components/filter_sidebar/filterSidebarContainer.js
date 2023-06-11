import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilterSidebarCategory from "./filterSidebarCategory";


// Class for container for the filter sidebar
// Given a categoryDictionary, creates a FilterSidebarCategory for each category
// Contains the search button. When clicked, the search button will call "getSelected" from each FilterSidebarCategory
class FilterSidebarContainer extends React.Component {
    categoryComponents = {};

    // A dictionary of all the categories and their corresponding subcategories
    categoryDictionary = {
        "Category 1": ["Tag 1", "Tag 2", "Tag 3"],
        "Category 2": ["Tag 4", "Tag 5", "Tag 6"],
        "Category 3": ["Tag 7", "Tag 8", "Tag 9"],
        "Category 4": ["Tag 10", "Tag 11", "Tag 12"],
    }
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            search: ""
        }

        // Create a ref for each category component
        Object.keys(this.categoryDictionary).forEach((category) => {
            this.categoryComponents[category] = React.createRef();
        });
    }

    renderCategoryComponents = () => {
        return Object.keys(this.categoryDictionary).map((category) => (
            <FilterSidebarCategory
                key={category}
                category={category}
                subcategories={this.categoryDictionary[category]}
                ref={this.categoryComponents[category]}
            />
        ));
    }

    // A function that takes the selected subcategories from each FilterSidebarCategory
    // and stores them in the state
    getSelected = () => {
        // Iterate through all category component refs.
        let selected = []
        // Add all selected subcategories to the selected array
        Object.keys(this.categoryComponents).forEach((category) => {
            selected = selected.concat(this.categoryComponents[category].current.getSelected());
        })
        console.log(selected)
        console.log(this.state.search)
        // Update selected state
        this.setState({selected: selected});
    }

    // Component for search button that, on click, calls getSelected
    SearchBar = () => {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={(e) => this.setState({search: e.target.value})}
                />
                <button onClick={() => this.getSelected(this.state.search)}>Search</button>
            </div>
        )
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <h1>Filter Sidebar</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Filter Options</h2>
                            {this.renderCategoryComponents()}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Search</h2>
                            {this.SearchBar()}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default FilterSidebarContainer;