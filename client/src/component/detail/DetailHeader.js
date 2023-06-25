import { Link } from "react-router-dom";
import "./DetailHeader.css";
function DetailHeader(props) {
  return (
    <div className="detail-header">
      <div className="detail-header__content">
        <h2 className="header-content__Name">{props.name}</h2>
        <div className="header-content__address">{`${props.address}`}</div>
        <div className="header-content__distance">{`Excellent location -${props.distance}m from center`}</div>
        <div className="header-content__price">{`Book a stay over $${props.cheapestPrice} at this property and get a free airport taxi`}</div>
      </div>
      <Link to={`book?id=${props.id}`} className="detail-header__btn">
        Reserve or Book Now!
      </Link>
    </div>
  );
}
export default DetailHeader;
