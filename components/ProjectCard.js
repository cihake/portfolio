import Link from "next/link";

// One card in the home-page project grid. Rendered once per project in the
// data file, replacing six near-identical copies of this markup.
export default function ProjectCard({ project }) {
	return (
		<div className="col">
			<div className="card project-card">
				<div className={`card-thumb ${project.thumb}`}>
					<span className="project-num">{project.num}</span>
					{project.emoji}
				</div>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title fw-bold">{project.title}</h5>
					<p className="card-text text-muted flex-grow-1">{project.blurb}</p>
					<div className="d-flex flex-wrap gap-1 mb-3">
						{project.tech.map((t) => (
							<span key={t} className="badge-tech">
								{t}
							</span>
						))}
					</div>
					<Link
						href={`/projects/${project.slug}`}
						className="btn btn-accent btn-sm"
					>
						View Project
					</Link>
				</div>
			</div>
		</div>
	);
}
