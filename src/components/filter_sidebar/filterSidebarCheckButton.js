import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

// Class for the filter sidebar subcategory check button
// Contains the button that, when clicked, toggles the checked state
// Also has a function that returns the checked state
class FilterSidebarCheckButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    render() {
        return (
            <ToggleButton
                className="mb-2"
                id={"check-button-" + this.props.category + "-" + this.props.subcategory}
                type="checkbox"
                variant="outline-primary"
                checked={this.state.checked}
                value={this.props.category + "-" + this.props.subcategory}
                onChange={(e) => this.setState({checked: e.currentTarget.checked})}
            >
                {this.props.subcategory}
            </ToggleButton>
        )
    }
}


export default FilterSidebarCheckButton;