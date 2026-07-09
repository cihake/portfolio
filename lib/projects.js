// Single source of truth for every project on the site.
// The home page grid, the Projects dropdown, and each project detail page
// are all generated from this array. Add real content here — no HTML editing.

export const projects = [
	{
		slug: "project-01",
		num: 1,
		title: "Project One Title",
		emoji: "💻",
		thumb: "thumb-1",
		tech: ["HTML", "CSS", "JavaScript"],
		blurb:
			"Short description of the project: what it does and why it was created.",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et diam at nunc vehicula fringilla. Mauris lobortis quis turpis vitae bibendum. Integer tristique mi finibus massa dignissim imperdiet. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas risus quam, aliquam quis lacus nec, dapibus commodo mauris.",
		technologiesUsed: "HTML5, CSS3, JavaScript",
		context: "WEB 1XX",
		year: "20XX",
		liveUrl: "#",
		repoUrl: "#",
		features: [
			{ title: "Feature One", description: "Description" },
			{ title: "Feature Two", description: "Description" },
			{ title: "Feature Three", description: "Description" },
		],
	},
	{
		slug: "project-02",
		num: 2,
		title: "Project Two Title",
		emoji: "🌐",
		thumb: "thumb-2",
		tech: ["Bootstrap", "CSS"],
		blurb:
			"Short description of the project: what it does and why it was created.",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et diam at nunc vehicula fringilla. Mauris lobortis quis turpis vitae bibendum. Integer tristique mi finibus massa dignissim imperdiet. Nulla facilisi.",
		technologiesUsed: "Bootstrap 5, CSS3, HTML5",
		context: "WEB 1XX",
		year: "20XX",
		liveUrl: "#",
		repoUrl: "#",
		features: [
			{ title: "Feature One", description: "Description" },
			{ title: "Feature Two", description: "Description" },
			{ title: "Feature Three", description: "Description" },
		],
	},
	{
		slug: "project-03",
		num: 3,
		title: "Project Three Title",
		emoji: "📈",
		thumb: "thumb-3",
		tech: ["PHP", "MySQL", "JavaScript"],
		blurb:
			"Short description of the project: what it does and why it was created.",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et diam at nunc vehicula fringilla. Mauris lobortis quis turpis vitae bibendum. Integer tristique mi finibus massa dignissim imperdiet. Nulla facilisi.",
		technologiesUsed: "PHP, MySQL, JavaScript",
		context: "WEB 2XX",
		year: "20XX",
		liveUrl: "#",
		repoUrl: "#",
		features: [
			{ title: "Feature One", description: "Description" },
			{ title: "Feature Two", description: "Description" },
			{ title: "Feature Three", description: "Description" },
		],
	},
	{
		slug: "project-04",
		num: 4,
		title: "Project Four Title",
		emoji: "🌟",
		thumb: "thumb-4",
		tech: ["HTML", "CSS"],
		blurb:
			"Short description of the project: what it does and why it was created.",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et diam at nunc vehicula fringilla. Mauris lobortis quis turpis vitae bibendum. Integer tristique mi finibus massa dignissim imperdiet. Nulla facilisi.",
		technologiesUsed: "HTML5, CSS3",
		context: "WEB 1XX",
		year: "20XX",
		liveUrl: "#",
		repoUrl: "#",
		features: [
			{ title: "Feature One", description: "Description" },
			{ title: "Feature Two", description: "Description" },
			{ title: "Feature Three", description: "Description" },
		],
	},
	{
		slug: "project-05",
		num: 5,
		title: "Project Five Title",
		emoji: "🎨",
		thumb: "thumb-5",
		tech: ["JavaScript", "API"],
		blurb:
			"Short description of the project: what it does and why it was created.",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et diam at nunc vehicula fringilla. Mauris lobortis quis turpis vitae bibendum. Integer tristique mi finibus massa dignissim imperdiet. Nulla facilisi.",
		technologiesUsed: "JavaScript, REST APIs",
		context: "WEB 2XX",
		year: "20XX",
		liveUrl: "#",
		repoUrl: "#",
		features: [
			{ title: "Feature One", description: "Description" },
			{ title: "Feature Two", description: "Description" },
			{ title: "Feature Three", description: "Description" },
		],
	},
	{
		slug: "project-06",
		num: 6,
		title: "Project Six Title",
		emoji: "🛡️",
		thumb: "thumb-6",
		tech: ["WordPress", "PHP"],
		blurb:
			"Short description of the project: what it does and why it was created.",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et diam at nunc vehicula fringilla. Mauris lobortis quis turpis vitae bibendum. Integer tristique mi finibus massa dignissim imperdiet. Nulla facilisi.",
		technologiesUsed: "WordPress, PHP",
		context: "WEB 2XX",
		year: "20XX",
		liveUrl: "#",
		repoUrl: "#",
		features: [
			{ title: "Feature One", description: "Description" },
			{ title: "Feature Two", description: "Description" },
			{ title: "Feature Three", description: "Description" },
		],
	},
];

// Look up a single project by its slug (used by the dynamic [slug] route).
export function getProject(slug) {
	return projects.find((p) => p.slug === slug);
}

// Given a slug, return the previous/next projects for the footer nav.
// `next` is null on the last project so we don't link to a page that
// doesn't exist (the old static site linked project-06 -> project-07).
export function getAdjacentProjects(slug) {
	const i = projects.findIndex((p) => p.slug === slug);
	return {
		prev: i > 0 ? projects[i - 1] : null,
		next: i < projects.length - 1 ? projects[i + 1] : null,
	};
}
