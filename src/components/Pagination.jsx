import { DOTS, usePagination } from "../hooks/usePagination"
import classnames from "classnames"

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  // console.log({
  //   totalCount,
  //   siblingCount,
  //   currentPage,
  //   pageSize,
  //   className,
  // })
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  // console.log(paginationRange)
  // console.log(paginationRange.length)

  if (currentPage === 0 || paginationRange.length < 2) {
    return <div className="empty"></div>
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  // console.log({paginationRange,currentPage})
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        {/* <div className="arrow left" /> */}
        <i className="arrow left"></i>
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          )
        }

        // Render our Page Pills
        return (
          <li
            key={index}
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        {/* <div className="arrow right" /> */}
        <i className="arrow right"></i>
      </li>
    </ul>
  )
}

export default Pagination
