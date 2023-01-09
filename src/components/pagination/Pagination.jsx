import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import NextButton from "./child/NextButton";
import BackButton from "./child/BackButton";
import NumberButton from "./child/NumberButton";
import MoreButton from "./child/MoreButton";

import "./Pagination.scss";

//TODO handle display of paging in URL and find the way to change url and currentPage properly to currentURL

export default function Pagination({ context, buttonClass }) {
  //handle not provider context
  if(!context) {
    throw new Error('need provider accordingly context to work.Accordingly context is context have some props like currentPage, setCurrentPage and pages. If you dont use context can use something like this to replace it');
  }


  const navigate = useNavigate();
  const { currentPage, setCurrentPage, pages } = useContext(context);

  let searchParamsString = '?';
  const [searchParams] = useSearchParams();
  for (const entry of searchParams.entries()) {
    searchParamsString = searchParamsString.concat(`${entry[0]}=${entry[1]}`);
  }
  let pagingButtonClass = buttonClass ? buttonClass : 'paging-button';
  const resetButton = useRef(null);

  const handlePagination = (number) => {
    setCurrentPage(number);
    navigate(`/${number}${searchParamsString}`);
  }

  useEffect(() => {
    if(currentPage > pages) {
      setCurrentPage(1);
      navigate(`/1${searchParamsString}`)
    }    
  },[currentPage, navigate, pages, searchParamsString, setCurrentPage])

  // some complex condition
  // change to var to increase readable

  // is number of pages large enough?
  const enoughPages = pages > 9;

  //is current page lower than 5?
  const currentPageLow = currentPage < 5;

  //is current page greater than total pages - 4?
  const currentPageHigh = currentPage > pages - 4;

  //is current page in the middle?
  const currentPageMed = !currentPageLow && !currentPageHigh;

  //make function to handle what kind of display will to use
  if (pages === 1) {
    return null;
  }

  return (
    <>
      <div className="pagination">
        <button hidden className="comeback-button" onClick={() => navigate(`/1${searchParamsString}`)} ref={resetButton}>
        </button>
        {currentPage !== 1
          && <BackButton
            currentPage={currentPage}
            paging={handlePagination}
            className={pagingButtonClass}
          />
        }

        {!enoughPages && [...Array(pages)].map((ele, index) => (
          <NumberButton
            className={pagingButtonClass}
            key={index}
            paging={handlePagination}
            number={index + 1}
            current={index + 1 === currentPage}
          />
        ))}

        {enoughPages && [...Array(currentPageLow ? 5 : 2)].map((ele, index) => (
          <NumberButton
            className={pagingButtonClass}
            key={index}
            paging={handlePagination}
            number={index + 1}
            current={index + 1 === currentPage}
          />
        ))}

        {(!currentPageHigh && enoughPages) ? <MoreButton className={pagingButtonClass} /> : null}

        {currentPageMed && [...Array(3)].map((ele, index) => (
          <NumberButton
            className={pagingButtonClass}
            key={currentPage - 1 + index}
            paging={handlePagination}
            number={currentPage - 1 + index}
            current={currentPage - 1 + index === currentPage}
          />
        ))}

        {(!currentPageLow && enoughPages) ? <MoreButton className={pagingButtonClass} /> : null}

        {enoughPages && [...Array(currentPageHigh ? 5 : 2)].map((ele, index) => (
          <NumberButton
            className={pagingButtonClass}
            key={pages - (currentPageHigh ? 4 : 1) + index}
            paging={handlePagination}
            number={pages - (currentPageHigh ? 4 : 1) + index}
            current={pages - (currentPageHigh ? 4 : 1) + index === currentPage}
          />
        ))}

        {currentPage !== pages
          && <NextButton
            currentPage={currentPage}
            paging={handlePagination}
            className={pagingButtonClass}
          />}

      </div>
    </>
  )
}