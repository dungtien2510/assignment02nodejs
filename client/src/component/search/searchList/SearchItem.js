import "./SearchItem.css";
function SearchItem(props) {
  const item = props.item;
  return (
    <form className="search-item">
      <div className="search-item__img">
        <img src={item.image_url} width="300px" height="310px" />
      </div>
      <div className="search-item__content">
        <div className="item-content__name">
          <strong>{item.name}</strong>
        </div>
        <div className="item-content__distance">{`${item.distance} from center`}</div>
        <div className="item-content__tag">{item.tag}</div>
        <div className="item-content__description">
          <strong>{item.description}</strong>
        </div>
        <div className="item-content__type">{item.type}</div>
        {item.free_cancel ? (
          <div className="item-content__free">
            <div>Free cancellation</div>
            <div>You can cancel later, so lock in great price today!</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="search-item__price">
        <div className="item-price__rate">
          <div className="item-price__rateText">
            <strong>{item.rate_text}</strong>
          </div>
          <div className="item-price__rateNumber">{item.rate}</div>
        </div>
        <div className="item-price__price">{`$ ${item.price}`}</div>
        <p>Includes taxes and fees</p>
        <div>
          <button className="item-price__btn">See availability</button>
        </div>
      </div>
    </form>
  );
}
export default SearchItem;
