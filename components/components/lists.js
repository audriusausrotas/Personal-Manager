import ListItem from "./listItem";

export default function lists({ list, name }) {
  return (
    <div className="lists">
      <div className="lists__header">
        {name === "expense" && <div className="lists__header--left">Date</div>}

        <div className="lists__header--content">
          {name === "todo" ? "To-do" : "Description"}
        </div>
        <div className="lists__header--right">
          {name === "todo" ? "Category" : "Amount"}
        </div>
      </div>
      {list.map((item) => (
        <ListItem key={item._id} item={item} name={name} />
      ))}
    </div>
  );
}
