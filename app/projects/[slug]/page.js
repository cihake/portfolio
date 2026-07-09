import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, getAdjacentProjects } from "@/lib/projects";

// Pre-render one static page per project at build time. This is what makes
// all six project routes exist even though there's only one source file.
export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

// Give each project page its own <title> for the browser tab / SEO.
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) return {};
	return { title: `${project.title} | Eva Cihak` };
}

export default async function ProjectPage({ params }) {
	const { slug } = await params;
	const project = getProject(slug);

	// Unknown slug (e.g. /projects/project-99) -> Next.js 404 page.
	if (!project) notFound();

	const { prev, next } = getAdjacentProjects(slug);

	return (
		<>
			{/* Project hero */}
			<div className="project-hero">
				<div className="container">
					<nav aria-label="breadcrumb" className="mb-3">
						<ol
							className="breadcrumb mb-0"
							style={{
								"--bs-breadcrumb-divider-color": "rgba(255,255,255,0.4)",
								color: "rgba(255,255,255,0.6)",
							}}
						>
							<li className="breadcrumb-item">
								<Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>
									Home
								</Link>
							</li>
							<li className="breadcrumb-item active" style={{ color: "#fff" }}>
								{`Project ${project.num}`}
							</li>
						</ol>
					</nav>
					<h1 className="fw-bold mb-2">{project.title}</h1>
					<div className="d-flex flex-wrap gap-2">
						{project.tech.map((t) => (
							<span key={t} className="badge-tech">
								{t}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Project content */}
			<section className="py-5">
				<div className="container">
					<div className="row g-5">
						{/* Screenshot */}
						<div className="col-lg-7">
							{/* TODO: swap for a real screenshot, e.g.
                  <img src="/projects/project-01.jpg" alt="..." className="img-fluid rounded-3 shadow" />
                  (put the image in the /public folder). */}
							<div className={`screenshot-placeholder ${project.thumb}`}>
								📷 Screenshot goes here
							</div>
						</div>

						{/* Details sidebar */}
						<div className="col-lg-5">
							<h2 className="fw-bold mb-3">About This Project</h2>
							<p className="text-muted">{project.about}</p>

							<hr className="my-4" />

							<div className="mb-3">
								<div className="detail-label">Technologies Used</div>
								<p className="mb-0">{project.technologiesUsed}</p>
							</div>
							<div className="mb-3">
								<div className="detail-label">Course / Context</div>
								<p className="mb-0">{project.context}</p>
							</div>
							<div className="mb-4">
								<div className="detail-label">Year</div>
								<p className="mb-0">{project.year}</p>
							</div>

							<div className="d-flex flex-wrap gap-2">
								<a href={project.liveUrl} className="btn btn-accent px-4">
									Live Demo
								</a>
								<a
									href={project.repoUrl}
									className="btn btn-outline-accent px-4"
								>
									GitHub Repo
								</a>
							</div>
						</div>
					</div>

					{/* Features */}
					<div className="row mt-5">
						<div className="col-lg-8">
							<h3 className="fw-bold mb-4">Key Features</h3>
							{project.features.map((feature) => (
								<div
									key={feature.title}
									className="feature-item d-flex gap-3"
								>
									<span
										style={{ color: "var(--accent)", fontSize: "1.1rem" }}
									>
										✓
									</span>
									<div>
										<strong>{feature.title}</strong>
										<p className="text-muted mb-0">{feature.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Prev / Next navigation */}
			<div className="border-top py-4">
				<div className="container d-flex justify-content-between">
					{prev ? (
						<Link
							href={`/projects/${prev.slug}`}
							className="btn btn-outline-secondary"
						>
							&larr; Previous Project
						</Link>
					) : (
						<Link href="/" className="btn btn-outline-secondary">
							&larr; Back to Home
						</Link>
					)}
					{next ? (
						<Link href={`/projects/${next.slug}`} className="btn btn-accent">
							Next Project &rarr;
						</Link>
					) : (
						<Link href="/" className="btn btn-accent">
							Back to Home &rarr;
						</Link>
					)}
				</div>
			</div>
		</>
	);
}
