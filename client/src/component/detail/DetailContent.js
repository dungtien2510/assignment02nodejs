import { Link } from "react-router-dom";
import "./DetailContent.css";
function DetailContent(props) {
  return (
    <div className="detail-content">
      <div className="detail-content__text">
        <h2 className="detail-content__title">{props.title}</h2>
        <div className="detail-content__description">{props.description}</div>
      </div>
      <div className="detail-content__night-price">
        <div className="nine-night-price">
          <strong>{`$ ${props.price}`}</strong>
          {` (1 nights)`}
        </div>
        <Link to={`book?id=${props.id}`} className="nine-night-price__btn">
          Reserve or Book Now!
        </Link>
      </div>
    </div>
  );
}
export default DetailContent;
