import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function Home() {
	return (
		<>
			{/* Hero */}
			<section className="hero">
				<div className="container">
					<div className="row align-items-center g-5">
						{/* Profile photo */}
						<div className="col-md-4 text-center">
							{/* TODO: swap this placeholder for a real photo, e.g.
							<img src="/profile.jpg" alt="Eva Cihak" className="profile-photo" />
							(put the file in the /public folder). */}
							<div
								className="profile-placeholder"
								aria-label="Profile photo placeholder"
							>
								😀
							</div>
						</div>

						{/* Intro text */}
						<div className="col-md-8">
							<p
								className="text-uppercase fw-semibold mb-1"
								style={{
									color: "#a5b4fc",
									letterSpacing: "0.1em",
									fontSize: "0.85rem",
								}}
							>
								Web Developer &amp; Designer
							</p>
							<h1 className="display-5 fw-bold mb-3">
								Hi, I&apos;m <span style={{ color: "#a5b4fc" }}>Eva</span>
							</h1>
							<p className="lead mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
								et diam at nunc vehicula fringilla. Mauris lobortis quis turpis
								vitae bibendum. Integer tristique mi finibus massa dignissim
								imperdiet. Nulla facilisi. Pellentesque habitant morbi tristique
								senectus et netus et malesuada fames ac turpis egestas. Maecenas
								risus quam, aliquam quis lacus nec, dapibus commodo mauris.
							</p>
							<div className="d-flex flex-wrap gap-3">
								<Link href="/resume" className="btn btn-accent px-4 py-2">
									View Resume
								</Link>
								<a href="#projects" className="btn btn-outline-light px-4 py-2">
									See My Work
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Projects grid */}
			<section id="projects" className="py-5">
				<div className="container">
					<h2 className="section-title text-center">My Projects</h2>
					<div className="section-divider"></div>

					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{projects.map((project) => (
							<ProjectCard key={project.slug} project={project} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}
