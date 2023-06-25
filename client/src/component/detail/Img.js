import "./Img.css";
function Img(props) {
  const images = props.photos;
  return (
    <div className="detail-img">
      {images.map((img) => {
        return <img src={img} key={img} width="390px" />;
      })}
    </div>
  );
}
export default Img;
