import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

export default function Navbar() {
  return (
    <>
      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Sidebar for Desktop */}
      <DesktopNavbar />
    </>
  );
}
