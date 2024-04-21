import "./IconItem.scss";

function IconItem({ name, icon, callback }) {
  return (
    <div className="icon-item">
      <button className="item-btn" onClick={callback}>
        <img src={icon} alt="Icon" />
      </button>
      <p className="tooltip">{name}</p>
    </div>
  );
}

export default IconItem;
