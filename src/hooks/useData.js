const { useState, createContext, useContext } = require("react");

const DataContext = createContext(null);

const useData = () => {
  const context = useContext(DataContext);
  return context;
};
export default useData;

const useDataContext = () => {
  const [data, setData] = useState();

  return { data, setData };
};

const DataProvider = ({ children }) => {
  const value = useDataContext();
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataProvider, useData };
