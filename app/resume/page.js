export const metadata = {
	title: "Resume | Eva Cihak",
};

export default function Resume() {
	return (
		<>
			{/* Page header */}
			<div className="project-hero">
				<div className="container">
					<h1 className="fw-bold mb-1">Resume</h1>
					<p style={{ color: "rgba(255,255,255,0.7)" }}>
						Eva Cihak &mdash; Web Developer &amp; Designer
					</p>
				</div>
			</div>

			{/* Resume body */}
			<section className="py-5">
				<div className="container">
					<div className="resume-wrapper">
						{/* Header */}
						<div className="text-center mb-4 pb-4 border-bottom">
							<div className="resume-name mb-1">Eva Q. Cihak</div>
							<p className="mb-0" style={{ fontSize: "0.9rem" }}>
								Red Lion, PA &nbsp;&bull;&nbsp;
								<a href="mailto:evaqcihak@gmail.com">evaqcihak@gmail.com</a>{" "}
								&nbsp;&bull;&nbsp; (717) 654-5756 &nbsp;&bull;&nbsp;
								<a
									href="https://github.com/cihake"
									target="_blank"
									rel="noopener"
								>
									github.com/cihake
								</a>{" "}
								&nbsp;&bull;&nbsp;
								<a
									href="https://linkedin.com/in/evaqc"
									target="_blank"
									rel="noopener"
								>
									linkedin.com/in/evaqc
								</a>
							</p>
						</div>

						{/* Summary */}
						<div className="mb-4">
							<div className="resume-section-title">Summary</div>
							<p>
								Detail-oriented web developer + designer with main proficiencies
								in coding, technical writing, and graphic design. Eager to
								expand skills and deliver meaningful results in a professional
								setting.
							</p>
						</div>

						{/* Education */}
						<div className="mb-4">
							<div className="resume-section-title">Education</div>
							<div className="mb-3">
								<div className="resume-entry-title">
									Associate of Applied Science in Web Design &amp; Development
								</div>
								<div className="resume-entry-meta">
									Harrisburg Area Community College, York, PA &nbsp;&bull;&nbsp;
									Jan 2025 &ndash; May 2026
								</div>
							</div>
						</div>

						{/* Skills */}
						<div className="mb-4">
							<div className="resume-section-title">Skills</div>
							<div className="row g-3">
								<div className="col-sm-6">
									<p className="detail-label mb-1">FULL-STACK DEVELOPMENT</p>
									<p className="mb-0">React, Vue, JavaScript, HTML/CSS</p>
									<p className="mb-0">
										Node.js, Python, PostgreSQL, MongoDB, APIs
									</p>
									<p className="mb-0">
										Android Studio, Java/Kotlin, Git, CI/CD pipelines
									</p>
								</div>
								<div className="col-sm-6">
									<p className="detail-label mb-1">DESIGN &amp; UX</p>
									<p className="mb-0">Figma, wireframing, UI/UX principles</p>
									<p className="mb-0">Adobe Illustrator, Adobe Photoshop</p>
									<p className="mb-0">
										Component design, accessibility, design systems
									</p>
								</div>
							</div>
						</div>

						{/* Work Experience */}
						<div className="mb-4">
							<div className="resume-section-title">Work Experience</div>

							<div className="resume-entry-title">Dollar Tree, Inc.</div>
							<div className="mb-3">
								<div>Operations Assistant Manager</div>
								<div className="resume-entry-meta">
									Red Lion, PA &nbsp;&bull;&nbsp; Jan 2025 &ndash; Present
								</div>
								<ul className="mb-0">
									<li>
										Supervise associates during closing shifts, encouraging a
										welcoming and productive work environment
									</li>
									<li>
										Protect and secure store assets, correcting financial
										discrepancies and preparing daily bank deposits.
									</li>
									<li>
										Process markdowns and damaged merchandise, adhering to
										proper disposal methods.
									</li>
								</ul>
							</div>
							<div className="mb-3">
								<div>Sales Floor Associate</div>
								<div className="resume-entry-meta">
									Red Lion, PA &nbsp;&bull;&nbsp; May 2021 &ndash; Jul 2023
								</div>
								<ul className="mb-0">
									<li>
										Assisted with various store operations such as
										merchandising, unloading trucks, and processing transactions
										at cash registers.
									</li>
									<li>
										Delivered excellent customer service by addressing all
										inquiries with a friendly, cooperative attitude.
									</li>
								</ul>
							</div>

							<div className="resume-entry-title">
								Mondelēz International, Inc.
							</div>
							<div className="mb-3">
								<div>Nabisco Sales Service Representative</div>
								<div className="resume-entry-meta">
									York, PA &nbsp;&bull;&nbsp; Jul 2023 &ndash; Aug 2024
								</div>
								<ul className="mb-0">
									<li>
										Deployed DSD merchandising strategies to optimize product
										visibility and drive sales for leading Nabisco brands such as
										Oreo, Chips Ahoy, Ritz, and Triscuit.
									</li>
									<li>
										Serviced various stores throughout York County, handling
										100&ndash;150 cases of merchandise per workday.
									</li>
									<li>
										Collaborated with store management to ensure compliance with
										negotiated sales plans and promotional displays, documenting
										merchandising efforts and back stock conditions.
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
