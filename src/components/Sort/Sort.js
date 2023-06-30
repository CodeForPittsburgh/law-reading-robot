import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const sortBy = (key, objects = []) => {
  return objects.sort((a, b) => {
    if (!a[key] || !b[key]) {
      return 0;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
};

/**
 * @param {SortProps} props
 */
export const Sort = ({ handleSort }) => {
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (handleSort) {
      handleSort(sort);
    }
  }, [sort, handleSort]);

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
          }}
          label="Sort by"
        >
          <MenuItem value="">
            <em>Sort by</em>
          </MenuItem>
          <MenuItem value={"billNumber"}>Bill Number</MenuItem>
          <MenuItem value={"pubDate"}>Publication Date</MenuItem>
          <MenuItem value={"sponsor"}>Sponsor</MenuItem>
          <MenuItem value={"status"}>Status</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;

/**
 * Set state of parent component
 * @callback SortCallback
 * @param {string} value
 * @returns {void}
 */

/**
 * @typedef {Object} SortProps
 * @prop {SortCallback} [handleSort]
 */
