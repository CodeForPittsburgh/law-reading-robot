import {AccordionDetails, AccordionSummary} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import FilterSidebarCheckButton from "./filterSidebarCheckButton";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Class for the filter sidebar category
// Given a category and an array of subcategories, creates a FilterSidebarSubcategories for each subcategory
// Contains the "getSelected" function that returns the value of all checked subcategories
class FilterSidebarCategory extends React.Component {
    subcategoryComponents = {};

    constructor(props) {
        super(props);
        this.category = props.category;
        this.subcategories = props.subcategories;
        this.state = {
            selected: []
        }

        //Create a ref for each subcategory component
        this.subcategories.forEach((subcategory) => {
            this.subcategoryComponents[subcategory] = React.createRef();
        });
    }

    renderSidebarSubcategories = () => {
        return this.subcategories.map((subcategory) => (
            <FilterSidebarCheckButton
                key={subcategory}
                category={this.category}
                subcategory={subcategory}
                ref={this.subcategoryComponents[subcategory]}
            />
        ));
    }

    // A function that takes the selected subcategories from each FilterSidebarSubcategories
    // and stores them in the state
    getSelected = () => {
        // Iterate through all subcategory component refs.
        let selected = []
        // If the component's checked value is true, add the subcategory name to the selected array
        Object.keys(this.subcategoryComponents).forEach((subcategory) => {
            if (this.subcategoryComponents[subcategory].current.state.checked) {
                selected.push(subcategory);
            }
        })
        return selected;

    };

    render() {
        return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>{this.category}</AccordionSummary>
                <AccordionDetails>
                    {this.renderSidebarSubcategories({category: this.category, subcategories: this.subcategories})}
                </AccordionDetails>
            </Accordion>
        )
    }
}


export default FilterSidebarCategory;