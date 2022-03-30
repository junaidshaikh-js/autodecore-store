import { useState } from "react";
import { FaFilter } from "react-icons/fa";

import {
  FilterByAvailability,
  FilterByCustomerRating,
  FilterByCategory,
  FilterByPriceRange,
  SortByPrice,
} from "./filters";

import { useData } from "../../context";
import { BtnComplementary } from "../buttons";
import { useFixBody } from "../../hooks";

export function Filter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    state: { filters },
    dispatch,
  } = useData();

  useFixBody(isFilterOpen);

  function toggleFilter() {
    setIsFilterOpen((f) => !f);
  }

  function handleClearFilter(dispatch) {
    dispatch({ type: "CLEAR_FILTERS" });
  }

  return (
    <aside
      className={
        "filter-section mt-1 p-sm mx-1 bg-white " +
        (isFilterOpen ? " open-filter" : null)
      }
    >
      <div>
        <div className="flex justify-center">
          <div onClick={toggleFilter} className="mobile-filter">
            {isFilterOpen ? (
              <BtnComplementary>Apply</BtnComplementary>
            ) : (
              <button className="btn btn-primary m-auto">
                <FaFilter fontSize="1.2rem" /> Filters
              </button>
            )}
          </div>
          {isFilterOpen && (
            <button
              className="btn btn-link"
              onClick={() => handleClearFilter(dispatch)}
            >
              Clear
            </button>
          )}
        </div>

        <div className="desktop-filter">
          <span className="txt-rg txt-bold">Filters</span>

          <button
            className="btn btn-link"
            onClick={() => handleClearFilter(dispatch)}
          >
            {"Clear"}
          </button>
        </div>
      </div>

      <FilterByPriceRange dispatch={dispatch} filters={filters} />

      <FilterByCategory dispatch={dispatch} filters={filters} />

      <FilterByCustomerRating dispatch={dispatch} filters={filters} />

      <SortByPrice dispatch={dispatch} filters={filters} />

      <FilterByAvailability dispatch={dispatch} filters={filters} />
    </aside>
  );
}
