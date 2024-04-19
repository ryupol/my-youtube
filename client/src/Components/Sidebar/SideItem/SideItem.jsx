import "./SideItem.scss";

function SidebarItem({ link, active, icon, iconFill, text, roundBorder }) {
  return (
    <a href={link} className={`item ${active ? "active" : ""}`}>
      <div className="icon">
        <img
          src={active ? iconFill : icon}
          alt="Icon"
          style={roundBorder ? { borderRadius: "50%" } : {}}
        />
      </div>
      <p>{text}</p>
    </a>
  );
}

export default SidebarItem;
