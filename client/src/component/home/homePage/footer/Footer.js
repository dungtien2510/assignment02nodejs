import React from "react";
import "./Footer.css";
import FooterCol from "./FooterCol";
function Footer() {
  const footerData = require("../../../../data/footer.json");
  return (
    <div className="footer">
      {footerData.map((item) => {
        return <FooterCol footerData={item} key={item.col_number}></FooterCol>;
      })}
    </div>
  );
}
export default Footer;
