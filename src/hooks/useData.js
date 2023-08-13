import { DataService } from "../services/DataService";
import { Types as _, BillModel as _BillModel } from "../models/Bill";

const {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} = require("react");

const DataContext = createContext(
  /**
   * @type {DataContext}
   * */
  {
    /** @type {_BillModel[]} */ data: [],
    /** @type {boolean} */ loading: false,
    /** @type {string|null} */ error: null,
    /** @type {searchCallback} */ handleSearch: () => {},
  }
);

/**
 * @returns {DataContext}
 */
const useData = () => {
  const context = useContext(DataContext);
  return context;
};
export default useData;

const useDataContext = () => {
  /**
   * @type {[_BillModel[], React.Dispatch<_BillModel[]>]} state
   */
  const [data, setData] = useState();

  /**
   * @type {[boolean, React.Dispatch<boolean>]} state
   */
  const [loading, setLoading] = useState(false);

  /**
   * @type {[string|null, React.Dispatch<string|null>]} state
   * */
  const [error, setError] = useState(null);

  const handleAction = useCallback(
    /**
     * @param {_BillModel[]} data
     * @param {boolean} loading
     * @param {string|null} error
     */ (data, loading, error) => {
      setData(data);
      setLoading(loading);
      setError(error);
    },
    [setData, setLoading, setError]
  );

  const handleNext = useCallback(async () => {
    // Begin loading, reset error.
    handleAction(data, true, null);
    const _data = await DataService.Next().catch(
      /**
       * @param {Error} error
       * */
      (error) => {
        // Set error, stop loading.
        handleAction(data, false, error.message);
      }
    );
    // Set data, stop loading.
    handleAction([...data, ..._data], false, null);
  }, [handleAction, data]);

  /**
   * @description - Handles search functionality via DataService.
   * @param {string} search
   * */
  const handleSearch = useCallback(
    /**
     * @param {string} search
     * */
    async (search) => {
      if (search) {
        // Begin loading, reset error.
        handleAction(data, true, null);
        await DataService.Search(search)
          .then((data) => {
            // Set data, stop loading.
            handleAction(data, false, null);
          })
          .catch(
            /**
             * @param {Error} error
             */
            (error) => {
              // Catch the error if the server is not running, but set the data to most recent valid data.
              handleAction(data, false, error.message);
            }
          );
      }
    },
    [handleAction, data]
  );

  /**
   * Fetch data from server on initial load.
   */
  useEffect(() => {
    if (data) return;
    // Begin loading, reset error.
    handleAction(data, true, null);
    DataService.FetchData()
      .then((data) => {
        // Set data, stop loading.
        handleAction(data, false, null);
      })
      .catch(
        /**
         * @param {Error} error
         */ (error) => {
          // Catch the error if the server is not running, but set the data to most recent valid data.
          handleAction(data, false, error);
        }
      );
  }, [data, handleAction]);

  return { data, loading, error, handleSearch, handleNext };
};

const DataProvider = ({ children }) => {
  const value = useDataContext();
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataProvider, useData };

/**
 * @typedef DataContext
 * @property {_BillModel} data
 * @property {boolean} loading
 * @property {string|null} error
 * @property {searchCallback} handleSearch
 * @property {nextCallback} handleNext
 */

/**
 * @callback searchCallback
 * @param {string} search
 */

/**
 * @callback nextCallback
 * @returns {void}
 */

/**
 * @callback dataCallback
 * @param {_BillModel[]} data
 * @returns {void}
 */
