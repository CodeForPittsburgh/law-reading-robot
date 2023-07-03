import React, { createContext, useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import S from "./Search.module.css";

/**
 * This should not be used directly. Instead, use the `useSearch` hook.
 * @returns {SearchContext}
 */
const SearchContext = createContext({
  /** @type {string} */ search: "",
  /** @type {searchCallback} */ handleChange: () => {},
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
const useSearchContext = (handleSearch) => {
  /**
   * @type {[string, React.Dispatch<string>]} state
   * */
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (handleSearch) handleSearch(search);
  }, [search, handleSearch]);

  return {
    search,
    handleChange,
  };
};

/**
 * @param {SearchProviderProps} props
 * */
export const SearchProvider = ({ children, handleSearch }) => {
  const value = useSearchContext(handleSearch);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const Search = () => {
  const { search, handleChange } = useSearch();
  return (
    <TextField
      className={S.search}
      label="Search"
      type="search"
      variant="outlined"
      value={search}
      onChange={handleChange}
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
