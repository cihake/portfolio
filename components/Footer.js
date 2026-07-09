// Shared site footer — previously duplicated at the bottom of every page.
export default function Footer() {
	return (
		<footer className="text-center">
			<div className="container">
				<p className="mb-1">Eva Cihak &mdash; Web Developer &amp; Designer</p>
				<p className="mb-0">
					<a href="mailto:evaqcihak@gmail.com">evaqcihak@gmail.com</a>
					&nbsp;&bull;&nbsp;
					<a
						href="https://github.com/cihake"
						target="_blank"
						rel="noopener"
					>
						GitHub
					</a>
					&nbsp;&bull;&nbsp;
					<a
						href="https://linkedin.com/in/evaqc"
						target="_blank"
						rel="noopener"
					>
						LinkedIn
					</a>
				</p>
			</div>
		</footer>
	);
}
