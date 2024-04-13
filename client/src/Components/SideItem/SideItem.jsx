import "./SideItem.scss";

function SidebarItem({ link, active, icon, iconFill, text, onClick }) {
  return (
    <a href={link} className={`item ${active ? "active" : ""}`} onClick={onClick}>
      <div className="icon">
        <img src={active ? iconFill : icon} alt="Icon" />
      </div>
      <p>{text}</p>
    </a>
  );
}

export default SidebarItem;
