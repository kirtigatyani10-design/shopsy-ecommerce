import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/navbar.css";

export default function NavbarComponent({ activeLink, handleNavClick }) {
  const navItems = ["home", "about", "skills", "projects", "resume", "contact"];

  return (
    <header className="top-header">
      <Navbar expand="lg" bg="light" variant="light" className="fixed-top navbar-custom">
        <Container fluid className="d-flex align-items-center">
          {/* Left: Brand */}
          <div className="brand-wrap">
            <Navbar.Brand href="#home" className="fw-bold brand" onClick={(e) => handleNavClick && handleNavClick(e, "home")}>
              KIRTI.
            </Navbar.Brand>
          </div>

          {/* Center / Right: Toggle + Nav (toggle appears on small screens) */}
          <Navbar.Toggle aria-controls="main-nav" className="ms-auto" />
          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav className="align-items-center nav-right">
              {navItems.map((id) => (
                <Nav.Link
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick && handleNavClick(e, id)}
                  className={activeLink === id ? "active-link" : ""}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
