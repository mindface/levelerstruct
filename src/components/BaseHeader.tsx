import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";
import { PhotoDialog } from "./PhotoDialog";

const pathIds = [
  { id: 1, path: "task" },
  { id: 2, path: "process" },
  { id: 3, path: "method" },
  { id: 4, path: "movieANDphoto" },
  { id: 5, path: "selector" },
  { id: 6, path: "connection" },
  { id: 7, path: "structureFormation" },
];

export function BaseHeader() {
  return (
    <header className="header flex">
      <div className="logo">
        <Image src={logo} alt="list menu" />
      </div>
      <nav className="nav flex">
        <ul className="list flex">
          {pathIds.map((item, index) => (
            <li key={index} className="item">
              <Link className="link p-1" href={`/${item.path}`}>
                {item.path}
              </Link>
            </li>
          ))}
        </ul>
        <PhotoDialog />
      </nav>
    </header>
  );
}
