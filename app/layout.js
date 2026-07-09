// Root layout — wraps EVERY page. The navbar and footer live here, so a
// change to either one now happens in a single place instead of 8 files.
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
	title: "Eva Cihak | Portfolio",
	description: "Personal portfolio of Eva Cihak — Web Developer & Designer.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<NavBar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
