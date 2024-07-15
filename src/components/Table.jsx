import { useTable, usePagination } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/table.styles.css";
import PropTypes from "prop-types";

const Table = ({
  columns,
  data,
  action,
  totalPages,
  pageNumber,
  setDocumentSkip,
  documentSkip,
  setActivePageNumber,
  handleDelete,
  handleEditViewModalOpen,
  userType,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  return (
    <>
      <div className="container_table">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="table-row"
                key={`row-data${index}`}
              >
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    className="table-header"
                    key={`column-data${index}`}
                  >
                    {column.render("Header")}
                  </th>
                ))}
                <th className="table-header"> Action</th>
              </tr>
            ))}
          </thead>
          {page.length > 0 && (
            <tbody {...getTableBodyProps()} className="table-body">
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={`table-key${index}`}
                    className="table-row"
                  >
                    {row.cells.map((cell, index) => (
                      <td
                        {...cell.getCellProps()}
                        key={`table-row-key${index}`}
                        className="table-cell"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                    {action === true && (
                      <td className="table-cell">
                        <FontAwesomeIcon
                          onClick={() =>
                            handleEditViewModalOpen(row.original, "view")
                          }
                          icon={faEye}
                          className="action-icon"
                          title="View"
                        />
                        {userType === "manager" && (
                          <FontAwesomeIcon
                            onClick={() =>
                              handleEditViewModalOpen(row.original, "edit")
                            }
                            icon={faEdit}
                            className="action-icon"
                            title="Edit"
                          />
                        )}
                        {userType === "manager" && (
                          <FontAwesomeIcon
                            onClick={() => handleDelete(row.values)}
                            icon={faTrash}
                            color={"hsl(12, 60%, 45%)"}
                            className="action-icon"
                            title="Delete"
                          />
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setActivePageNumber(pageNumber - 1)}
          disabled={pageNumber == 1}
        >
          {"<"}
        </button>
        <p>{pageNumber}</p>
        <button
          onClick={() => {
            setActivePageNumber(pageNumber + 1);
          }}
          disabled={totalPages <= pageNumber}
          className={"bg-accent-400"}
        >
          {">"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageNumber} of {totalPages}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            disabled={totalPages <= pageNumber}
            defaultValue={pageNumber}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 0;
              setActivePageNumber(page);
            }}
            style={{ width: "100px" }}
          />
        </span>
        <select
          value={documentSkip}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setDocumentSkip(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option
              className="fw-bold fs-400 bg-primary-400 text-accent-400 option"
              key={pageSize}
              value={pageSize}
            >
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      col1: PropTypes.string,
      col2: PropTypes.string,
    })
  ).isRequired,
  action: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setDocumentSkip: PropTypes.func.isRequired,
  documentSkip: PropTypes.number.isRequired,
  setActivePageNumber: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditViewModalOpen: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
};

export default Table;
