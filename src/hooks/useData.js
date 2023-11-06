import { DataService } from "../services/DataService";
import { Types as _, BillModel as _BillModel } from "../models/Bill";
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useSearchParams } from 'react-router-dom';
import { NextPlan } from '@mui/icons-material';

const DataContext = createContext(
  /**
   * @type {DataContext}
   * */
  {
    /** @type {_BillModel[]} */ data: [],
    /** @type {boolean} */ loading: false,
    /** @type {string|null} */ error: null,
    /** @type {searchCallback} */ handleSearch: () => {},
    /** @type {nextPageCallback} */ handleNextPage: () => {},
    /** @type {fetachCallback} */ handleFetch: () => {},
    /** @type {number} */ nextPage: () => {},
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
const useData = (page=1) => {
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

  const [count, setCount] = useState();

  /**
   * @type {[boolean, React.Dispatch<boolean>]} state
   */
  const [loading, setLoading] = useState(false);

  /**
   * @type {[string|null, React.Dispatch<string|null>]} state
   * */
  const [error, setError] = useState(null);

  const [nextPage, setNextPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * @description Action handler for data. Should only be used by this hook.
   * @param {_BillModel[]} data - Data to set.
   * @param {boolean} loading - Loading state.
   * @param {string|null} error - Error message.
   * @param {number} nextPage  - Whether or not more data can be loaded.
   *
   * @returns {void}
   */
  const handleAction = useCallback(
    /**
     * @param {_BillModel[]} data
     * @param {boolean} loading
     * @param {string|null} error
     * @param {number} nextPage
     */ (data = [], count = 0, loading = false, error = null, nextPage = 1) => {
      setData(data);
      setCount(count);
      setLoading(loading);
      setError(error);
      setNextPage(nextPage);
      setSearchParams({page: nextPage});
    },
    [setData, setLoading, setError, setNextPage]
  );

  const handleFetch = useCallback(async () => {
    // Begin loading, reset error.
    handleAction(data, 0, true, null, 1);
    const {data, count} = await DataService.FetchData().catch(
      /**
       * @param {Error} error
       * */
      (error) => {
        // Set error, stop loading.
        handleAction(data, 0,false, error.message, 1);
      }
    );
    // Set data, stop loading.
    handleAction(
      data,
      count,
      false,
      null,
      1
    );
  }, [handleAction, data]);

  const handleNextPage = useCallback(async (page = 1) => {
    // Begin loading, reset error.
    handleAction(data, true, null);
    const {data: _data, count} = await DataService.NextPage(page).catch(
      /**
       * @param {Error} error
       * */
      (error) => {
        // Set error, stop loading.
        handleAction(data, count, false, error.message);
      }
    );
    // Set data, stop loading.
    handleAction(
      [..._data],
      count,
      false,
      null,
      page
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
        if (search === "") {
          handleFetch();
          return;
        }
        // Begin loading, reset error.
        handleAction(data, true, null, 1);

        await DataService.Search(search)
          .then((data) => {
            // Set data, stop loading.
            handleAction(
              data,
              false,
              null,
              1
            );
          })
          .catch(
            /**
             * @param {Error} error
             */
            (error) => {
              // Catch the error if the server is not running, but set the data to most recent valid data.
              handleAction(data, false, error.message, 1);
            }
          );
    },
    [handleAction, data, handleFetch]
  );

  /**
   * Fetch data from server on initial load.
   */
  useEffect(() => {
    if (data) return;
    // Begin loading, reset error.
    handleAction(data, 0, true, null, 1);
    DataService.FetchData()
      .then(({data, count}) => {
        // Set data, stop loading.
        handleAction(
          data,
          count,
          false,
          null,
          1 // If the data length is less than the increment, then we know that there is no more data to load.
        );
      })
      .catch(
        /**
         * @param {Error} error
         */ (error) => {
          // Catch the error if the server is not running, but set the data to most recent valid data.
          handleAction(data, 0,false, error.message, 1);
        }
      );
  }, [data, handleAction]);

  return { data, count,loading, error, nextPage, handleSearch, handleNextPage, handleFetch };
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
 * @property {nextPageCallback} handleNextPage
 * @property {fetchCallback} handleFetch
 * @property {NextPage} nextPage
 */

/**
 * @callback searchCallback
 * @param {string} search
 */

/**
 * @callback nextPageCallback
 * @returns {void}
 */

/**
 * @callback dataCallback
 * @param {_BillModel[]} data
 * @returns {void}
 */

/**
 * @description Fetches default data.
 * @callback fetchCallback
 * @returns {void}
 */

/**
 * @typedef {Object} DataProviderProps
 * @prop {React.ReactNode} children
 */
