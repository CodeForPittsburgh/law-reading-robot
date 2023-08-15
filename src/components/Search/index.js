import React, { createContext, useContext, useState, useCallback } from "react";
import { TextField } from "@mui/material";
import S from "./Search.module.css";
import useData from "../../hooks/useData";

/**
 * This should not be used directly. Instead, use the `useSearch` hook.
 * @returns {SearchContext}
 */
const SearchContext = createContext({
  /** @type {string} */ search: "",
  /** @type {searchCallback} */ handleChange: () => {},
  /** @type {searchCallback} */ handleSearch: () => {},
});

/**
 * @returns {SearchContext}
 * */
export const useSearch = () => {
  const context = useContext(SearchContext);
  return context;
};

/**
 * @param {searchCallback} handleSearch
 * @returns {SearchContext}
 * */
const useSearchContext = (searchCallback) => {
  /**
   * @type {[string, React.Dispatch<string>]} state
   * */
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = useCallback(
    (search) => {
      if (searchCallback) searchCallback(search);
    },
    [searchCallback]
  );

  return {
    search,
    handleChange,
    handleSearch,
  };
};

/**
 * @param {SearchProviderProps} props
 * */
export const SearchProvider = ({ children }) => {
  const { handleSearch } = useData();
  const value = useSearchContext(handleSearch);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const Search = () => {
  const { search, handleChange, handleSearch } = useSearch();
  return (
    <TextField
      className={S.search}
      label="Search"
      type="search"
      variant="outlined"
      value={search}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch(search);
        }
      }}
    />
  );
};

/**
 * @callback searchCallback
 * @param {string} search
 */

/**
 * @typedef SearchContext
 * @property {string} search
 * @property {searchCallback} handleChange
 * @property {searchCallback} handleSearch
 * */

/**
 * @typedef SearchProps
 * @prop {searchCallback} handleSearch
 * */

/**
 * @typedef SearchProviderProps
 * @prop {React.ReactNode} children
 * @prop {searchCallback} handleSearch
 * */
