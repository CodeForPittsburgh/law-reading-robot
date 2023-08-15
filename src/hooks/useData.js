import { DataService } from "../services/DataService";
import { Types as _, BillModel as _BillModel } from "../models/Bill";
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";

const DataContext = createContext(
  /**
   * @type {DataContext}
   * */
  {
    /** @type {_BillModel[]} */ data: [],
    /** @type {boolean} */ loading: false,
    /** @type {string|null} */ error: null,
    /** @type {searchCallback} */ handleSearch: () => {},
    /** @type {nextCallback} */ handleNext: () => {},
    /** @type {boolean} */ next: true,
  }
);

/**
 * @description Custom hook for accessing the data context.
 * Must be used within a component that is a child of the {@link DataProvider} component.
 * @example
 * // ComponentThatNeedsData must be a child of DataProvider.
 *
 * //---ParentComponent.js---//
 * const ParentComponent = () => {
 *    return (
 *      <DataProvider>
 *        <ComponentThatNeedsData />
 *      </DataProvider>
 *    );
 * };
 *
 * //---ComponentThatNeedsData.js---//
 * // Accessing BillData via the useData hook.
 * const ComponentThatNeedsData = () => {
 * const { data } = useData();
 *
 * return <div>{data.map((bill) => <div>{bill.title}</div>)}</div>
 *
 * @returns {DataContext}
 */
const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
export default useData;

/**
 * @description useDataContext is only used by the DataProvider component.
 * It is used to manage the state of the data context and
 * should not be exported or used outside of the DataProvider component.
 */
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

  const [next, setNext] = useState(true);

  /**
   * @description Action handler for data. Should only be used by this hook.
   * @param {_BillModel[]} data - Data to set.
   * @param {boolean} loading - Loading state.
   * @param {string|null} error - Error message.
   * @param {boolean} next  - Whether or not more data can be loaded.
   *
   * @returns {void}
   */
  const handleAction = useCallback(
    /**
     * @param {_BillModel[]} data
     * @param {boolean} loading
     * @param {string|null} error
     * @param {boolean} next
     */ (data = [], loading = false, error = null, next = false) => {
      setData(data);
      setLoading(loading);
      setError(error);
      setNext(next);
    },
    [setData, setLoading, setError, setNext]
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
    handleAction(
      [...data, ..._data],
      false,
      null,
      _data.length > 0 ? true : false
    );
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
        handleAction(data, true, null, false);
        await DataService.Search(search)
          .then((data) => {
            // Set data, stop loading.
            handleAction(
              data,
              false,
              null,
              data.length < DataService.increment ? false : true
            );
          })
          .catch(
            /**
             * @param {Error} error
             */
            (error) => {
              // Catch the error if the server is not running, but set the data to most recent valid data.
              handleAction(data, false, error.message, false);
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
    handleAction(data, true, null, false);
    DataService.FetchData()
      .then((data) => {
        // Set data, stop loading.
        handleAction(
          data,
          false,
          null,
          data.length < DataService.increment ? DataService.increment : true // If the data length is less than the increment, then we know that there is no more data to load.
        );
      })
      .catch(
        /**
         * @param {Error} error
         */ (error) => {
          // Catch the error if the server is not running, but set the data to most recent valid data.
          handleAction(data, false, error.message, false);
        }
      );
  }, [data, handleAction]);

  return { data, loading, error, next, handleSearch, handleNext };
};

/**
 * @description - Data provider for the application. Any component
 * that is a child of this component will have access to the data context
 * via the {@link useData} hook.
 * @param {DataProviderProps} props
 * @returns
 */
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
 * @property {boolean} next
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

/**
 * @typedef {Object} DataProviderProps
 * @prop {React.ReactNode} children
 */
