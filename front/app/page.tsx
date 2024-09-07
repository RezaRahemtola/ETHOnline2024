import { Slot } from "@/components/slot";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stackr Bomb Slot",
};

export default function Home() {
	return <Slot />;
}
