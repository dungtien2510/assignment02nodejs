import React from "react";
import "./FooterCol.css";
function FooterCol(props) {
  const colItems = props.footerData;

  return (
    <ul className="footer-col">
      {colItems.col_values.map((item) => {
        return (
          <li key={item}>
            <a className="footer-col__item">{item}</a>
          </li>
        );
      })}
    </ul>
  );
}
export default FooterCol;
