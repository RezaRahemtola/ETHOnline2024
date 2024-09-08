// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fontHeading = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading",
});

const fontBody = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-body",
});

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn("antialiased", fontHeading.variable, fontBody.variable)}>
				<Toaster />
				{children}
			</body>
		</html>
	);
}
