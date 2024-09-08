"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Slot() {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [bombLocation, setBombLocation] = useState<number | undefined>(undefined);
	const [revealedLocations, setRevealedLocations] = useState<number[]>([]);
	const { toast } = useToast();

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-background">
			<div className="text-center">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Bomb Blast Slots</h1>
				{isGameStarted ? <></> : <p className="mt-2 text-muted-foreground">Select where you want to place the bomb</p>}
			</div>
			<div className="grid grid-cols-5 gap-2 mb-8">
				{Array.from(Array(25).keys()).map((index) => (
					<div key={index} className="w-16 h-16 bg-card rounded-md flex items-center justify-center">
						{isGameStarted ? (
							revealedLocations.includes(index) ? (
								<div className="w-8 h-8 bg-[#009933] rounded-full" />
							) : (
								<div
									className="w-12 h-12 bg-card rounded-sm flex items-center justify-center text-card-foreground font-bold text-2xl cursor-pointer transition-all hover:bg-secondary hover:text-secondary-foreground"
									onClick={() => {
										if (index === bombLocation) {
											toast({
												title: "You found the bomb ;(",
												description: "Game over! Restart a game",
												variant: "destructive",
											});
											setRevealedLocations([]);
											setIsGameStarted(false);
											setBombLocation(undefined);
											return;
										}
										setRevealedLocations((oldLocations) => [...oldLocations, index]);
									}}
								>
									?
								</div>
							)
						) : (
							<div
								className={`w-8 h-8 bg-[#ff4d4d] rounded-full ${index === bombLocation ? "bg-primary" : ""}`}
								onClick={() => setBombLocation(index)}
							/>
						)}
					</div>
				))}
			</div>
			<div className="flex items-center justify-center w-full max-w-md px-4">
				<div className="flex gap-4">
					<Button
						variant="outline"
						className="px-4 py-2 rounded-md"
						disabled={bombLocation === undefined}
						onClick={() => setIsGameStarted(true)}
					>
						New Game
					</Button>
				</div>
			</div>
		</div>
	);
}
