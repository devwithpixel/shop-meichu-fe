"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CircleTransformSection() {
    const sectionRef = useRef(null);
    const greenBgRef = useRef(null);
    const circleAreaRef = useRef(null);
    const circleTextRef = useRef(null);
    const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
    const whiteBgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.3,
                    pin: true,
                },
            });

            /** 1) GREEN BACKGROUND → PERFECT SMALL CIRCLE */
            tl.fromTo(
                greenBgRef.current,
                {
                    clipPath: "circle(100% at 50% 50%)",
                },
                {
                    clipPath: "circle(7% at 50% 35%)", // ukuran PAS seperti referensi
                    ease: "power2.inOut",
                    duration: 1.8,
                }
            );

            /** 2) WHITE BACKGROUND APPEARS */
            tl.to(
                whiteBgRef.current,
                {
                    opacity: 1,
                    duration: 1,
                },
                "-=1.1"
            );

            /** 3) CONTINUOUS ROTATION */
            gsap.to(circleTextRef.current, {
                rotate: 360,
                repeat: -1,
                duration: 16,
                ease: "none",
            });

            /** 4) BUBBLE APPEAR ANIMATION */
            bubblesRef.current.forEach((bubble, i) => {
                tl.from(
                    bubble,
                    {
                        opacity: 0,
                        scale: 0.3,
                        x: i % 2 === 0 ? -120 : 120,
                        duration: 1,
                        ease: "back.out(1.6)",
                    },
                    "-=0.5"
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[240vh] w-full bg-white overflow-hidden"
        >
            {/* WHITE BACKGROUND */}
            <div
                ref={whiteBgRef}
                className="absolute inset-0 bg-white"
                style={{ opacity: 0 }}
            />



            {/* GREEN BACKGROUND (SHRINK INTO CENTER CIRCLE) */}
            <div ref={greenBgRef} className="absolute inset-0 bg-green-500" />



            {/* CENTERED ROTATING CIRCLE */}
            <div
                ref={circleAreaRef}
                className="absolute top-120 left-146 -translate-x-1 -translate-y-1"
            >
                <div className="w-[200px] h-[200px] flex items-center justify-center relative">
                    <svg
                        ref={circleTextRef}
                        className="absolute w-full h-full"
                        viewBox="0 0 300 300"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                            />
                        </defs>
                        <text fill="#fff" fontSize="17" letterSpacing="5">
                            <textPath xlinkHref="#circlePath">
                                PREMIUM DESIGN • ELEVATED EXPERIENCE • PREMIUM DESIGN •
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>

            {/* BUBBLES — EXACTLY LIKE THE SPACING IN YOUR REFERENCE */}
            <div className="absolute inset-0 pointer-events-none">
                {["Design", "Branding", "UI/UX", "Strategy"].map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => { bubblesRef.current[i] = el; }}
                        className="absolute bg-amber-300 shadow-xl rounded-full w-48 h-48 text-black font-medium text-lg flex items-center justify-center"
                        style={{
                            top: ["29%", "29%", "29%", "29%"][i], // lebih naik dan simetris
                            left: ["58%", "28%", "72%", "14%"][i],
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </section>
    );
}
