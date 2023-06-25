import "./TypeItems.css";
function TypeItem({ typeHotels }) {
  const typeData = require("../../../../data/type.json");
  return (
    <div className="type">
      {typeHotels.map((item, index) => {
        return (
          <div className="type-item" key={item.type}>
            <img
              src={`./images/type_${index + 1}.jpg`}
              alt={item.type}
              className="type-item__img"
              width="220px"
              height="200px"
            />
            <div className="type-item__content">
              <h3>{item.type}</h3>
              <p>{`${item.data.length} ${item.type}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default TypeItem;
