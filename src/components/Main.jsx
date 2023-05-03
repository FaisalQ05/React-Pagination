import React, { useMemo, useState } from "react"
import { dummyData, dummyDataTwo } from "../assets/data"
import Pagination from "./Pagination"

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [PageSize, setPageSize] = useState(12)
  const [query, setQuery] = useState("")
  const [sortQuery, setSortQuery] = useState("")

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
    if (sortQuery === "fname") {
      return [
        ...getFilteredData.sort((a, b) =>
          a.first_name.localeCompare(b.first_name)
        ),
      ]
    } else if (sortQuery === "fname desc") {
      return [
        ...getFilteredData.sort((a, b) =>
          b.first_name.localeCompare(a.first_name)
        ),
      ]
    } else {
      return getFilteredData
    }
  }, [getFilteredData, sortQuery])

  const currentTableData = useMemo(() => {
    // console.log("main data")
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return getSortedData.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, PageSize, getSortedData])

  // console.log({ query, sortQuery })
  const onSort = (e) => {
    setSortQuery(e)
  }
  return (
    <>
      <button onClick={() => onSort("fname")}>Sort by fname asc</button>
      <button onClick={() => onSort("fname desc")}>Sort by fname desc</button>
      <div className="container">
        <input
          className="search-field"
          type="text"
          placeholder="Search ....."
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th className="id">ID</th>
                <th>FIRST NAME</th>
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
          <div className="pagination">
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
