// import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/breadcrumb.styles.css";

const Breadcrumb = (props) => {
  const paths = props?.paths;
  return (
    <nav className="breadcrumb">
      {paths &&
        paths?.length > 0 &&
        paths.map((path, index) => (
          <span key={index}>
            {index > 0 && " / "}
            {path.url ? (
              <Link to={path.url}>{path.name}</Link>
            ) : (
              <span>{path.name}</span>
            )}
          </span>
        ))}
    </nav>
  );
};

export default Breadcrumb;
