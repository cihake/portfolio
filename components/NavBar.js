"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { projects } from "@/lib/projects";

// Shared site navigation. Defined once here instead of being copy-pasted
// into every page like the old static HTML. `usePathname` tells us the
// current route so we can mark the matching link active.
export default function NavBar() {
	const pathname = usePathname();
	const isActive = (href) => pathname === href;

	return (
		<Navbar
			expand="lg"
			variant="dark"
			bg="dark"
			sticky="top"
			collapseOnSelect
		>
			<Container>
				<Navbar.Brand as={Link} href="/">
					Eva Cihak
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navMenu" />
				<Navbar.Collapse id="navMenu">
					<Nav className="ms-auto gap-1">
						<Nav.Link as={Link} href="/" active={isActive("/")}>
							Home
						</Nav.Link>
						<NavDropdown
							title="Projects"
							id="projectsDropdown"
							align="end"
							active={pathname.startsWith("/projects")}
						>
							{projects.map((project, i) => (
								<div key={project.slug}>
									{/* Divider between the first three and the rest, like the
                      original static navbar. */}
									{i === 3 && <NavDropdown.Divider />}
									<NavDropdown.Item
										as={Link}
										href={`/projects/${project.slug}`}
										active={isActive(`/projects/${project.slug}`)}
									>
										Project {project.num}
									</NavDropdown.Item>
								</div>
							))}
						</NavDropdown>
						<Nav.Link as={Link} href="/resume" active={isActive("/resume")}>
							Resume
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
