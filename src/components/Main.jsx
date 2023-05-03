import React, { useMemo, useState } from "react"
import { dummyData, dummyDataTwo } from "../assets/data"
import Pagination from "./Pagination"
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa"

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [customPage, setCustomPage] = useState(null)
  const [PageSize, setPageSize] = useState(12)
  const [query, setQuery] = useState("")
  const [sortQuery, setSortQuery] = useState({
    field: "",
    dir: "default",
  })

  const getFilteredData = useMemo(() => {
    // console.log("Get filtered data called")
    setCurrentPage(1)
    return dummyData.filter((item) =>
      item.first_name.toLowerCase().includes(query)
    )
  }, [query])

  const getSortedData = useMemo(() => {
    // console.log("Get sorted data called")
    // users.sort((a, b) => a.firstname.localeCompare(b.firstname))
    if (sortQuery.field === "fname" && sortQuery.dir === "asc") {
      return [
        ...getFilteredData.sort((a, b) =>
          a.first_name.localeCompare(b.first_name)
        ),
      ]
    } else if (sortQuery.field === "fname" && sortQuery.dir === "dsc") {
      return [
        ...getFilteredData.sort((a, b) =>
          b.first_name.localeCompare(a.first_name)
        ),
      ]
    } else if (sortQuery.field === "fname" && sortQuery.dir === "default") {
      // console.log("default sort fname")
      if (query.length > 0) {
        return [...getFilteredData]
      } else {
        return [...dummyData]
      }
    } else {
      return [...getFilteredData]
    }
  }, [getFilteredData, sortQuery, query.length])

  const currentTableData = useMemo(() => {
    // console.log("main data")
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return getSortedData.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, PageSize, getSortedData])

  // console.log({ sortQuery })
  const onSort = (e) => {
    setSortQuery({
      field: "fname",
      dir:
        sortQuery.dir === "default"
          ? "asc"
          : sortQuery.dir === "asc"
          ? "dsc"
          : sortQuery.dir === "dsc" && "default",
    })
  }
  return (
    <>
      {/* <button onClick={(e) => onSort("fname")}>Sort by fname asc</button> */}
      {/* <button onClick={(e) => onSort("fname desc")}>Sort by fname desc</button> */}
      <div className="container">
        <input
          className="search-field"
          type="text"
          placeholder="Search by FIRST NAME"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th className="id">ID</th>
                <th
                  onClick={onSort}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  FIRST NAME{" "}
                  {sortQuery.dir === "default" ? (
                    <FaSort />
                  ) : sortQuery.dir === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  )}
                </th>
                <th>LAST NAME</th>
                <th className="email">EMAIL</th>
                <th>PHONE</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="id">{item.id}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td className="email">{item.email}</td>
                    <td>{item.phone}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="pagination-listbar-container">
            <div className="custom-page-container">
              <input
                className="go-to-page-number"
                type="number"
                placeholder="Enter Page number"
                onChange={(e) =>
                  Number(e.target.value) > 0
                    ? setCustomPage(Number(e.target.value))
                    : null
                }
              />
              <button onClick={() => customPage && setCurrentPage(customPage)}>
                Go
              </button>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={getFilteredData.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />

            <div className="no-of-pages-select">
              <p>No of items per page</p>
              <select
                className=""
                onChange={(e) => {
                  setPageSize(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
