export default function InfoElement({ data }) {
  return (
    <>
      <div className="info__date">{data.date}</div>
      <div className="info__description">{data.description}</div>
      <div className="info__price">{data.price} € </div>
    </>
  );
}
