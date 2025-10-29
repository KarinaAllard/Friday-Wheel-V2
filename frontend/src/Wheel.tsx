import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReward } from "react-rewards";
import { useEntriesContext } from "./context/EntriesContext";

type Winner = {
    restaurant: string;
    suggestedBy: string;
    colorClass: string;
} | null;

export const Wheel = () => {
    const { entries } = useEntriesContext();
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState<Winner>(null);

    const colors = [
        "var(--pastel-green)",
        "var(--pastel-blue)",
        "var(--pastel-pink)",
        "var(--pastel-red)",
        "var(--pastel-yellow)",
    ];

    const spinDuration = 4;
    const size = 320;
    const radius = size / 2;
    const center = radius;

    const { reward } = useReward("confetti", "confetti", {
       lifetime: 100,
        spread: 90,
        startVelocity: 30, 
    });

    useEffect(() => {
        setRotation(0);
        setWinner(null);
    }, [entries]);

    const spinWheel = () => {
        if (spinning || entries.length === 0) return;
        setSpinning(true);
        setWinner(null);

        const audio = new Audio(`${import.meta.env.BASE_URL}spin.mp3`);
        audio.play();
        
        const sliceAngle = 360 / Math.max(entries.length, 1);
        const winnerIndex = Math.floor(Math.random() * entries.length);
        const fullSpins = 3;
        const targetRotation = fullSpins * 360 + winnerIndex * sliceAngle + sliceAngle / 2;

        setRotation(prev => prev + targetRotation);
    };

    const getPath = (i: number) => {
        const sliceAngle = 360 / Math.max(entries.length, 1);

        if (entries.length === 1) {
            return `M${center},${center} m-${radius},0 a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 -${radius * 2},0`;
        }

        const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;
        const largeArc = sliceAngle > 180 ? 1 : 0;
        const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
        const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
        const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
        const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
        return `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`;
    }

    return (
        <div className="flex flex-col items-center relative gap-4">
            <motion.div 
                className="w-80 h-80 relative rounded-full overflow-hidden"
                animate={{ rotate: rotation }}
                transition={{ duration: spinDuration, ease: [0.33, 1, 0.68, 1] }}
                onAnimationComplete={() => {
                    if (!spinning) return;
                    setSpinning(false);
                    
                    if (entries.length === 0) return;

                    const sliceAngle = 360 / entries.length;
                    const normalized = (rotation + 90) % 360;
                    const index = (entries.length - 1 - Math.floor(normalized / sliceAngle) + entries.length) % entries.length;
                    const chosen = entries [index];
                    setWinner({ 
                        restaurant: chosen.restaurant,
                        suggestedBy: chosen.suggestedBy, 
                        colorClass: colors[index % colors.length] 
                    });
                    reward();
                }}
            >
                {entries.map((_, i) => (
                    <svg key={i} className="absolute inset-0 w-full h-full"><path d={getPath(i)} fill={colors[i % colors.length]} /></svg>
                ))}
            </motion.div>

            <div className="absolute top-0 left-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-16 border-b-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <span id="confetti" />
            <button 
                className="px-4 py-2 bg-(--pastel-green) border-t border-t-white text-black text-2xl rounded-2xl hover:bg-linear-to-l hover:from-(--pastel-yellow) hover:via-(--pastel-green) hover:scale-105 hover:to-(--pastel-pink) cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={spinWheel}
                disabled={spinning}
            >
                {spinning ? "Spinning.." : "Spin the Wheel!"}
            </button>

            {winner && (
                <div className="text-4xl flex flex-col items-center">
                    <span>
                        Winner:{" "}
                        <span style={{ color: winner.colorClass }}>
                            {winner.restaurant}
                        </span>
                    </span>
                    {winner.suggestedBy && (
                        <span className="text-xl opacity-70">
                            (suggested by {winner.suggestedBy})
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}