import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
// import MainProfile from "../profileComponents/MainProfile";

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />

      <MobileNavbar />
    </>
  );
}
