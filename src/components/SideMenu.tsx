import { useState } from "react";
export function SideMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openAction = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="side-menu">
      <button className="btn" onClick={openAction}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="path">
            <path d="M4 7.5H15M0 7.5H2M4 3.5H15M0 3.5H2M4 11.5H15M0 11.5H2" />
          </g>
        </svg>
      </button>
      {menuOpen && (
        <div
          className="side-menu-view positionFixedTopLeft box-shadow background-white p-1"
          style={{ top: "33px" }}
        ></div>
      )}
    </div>
  );
}
