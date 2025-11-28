"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const bigTextRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const nextSectionRef = useRef<HTMLElement | null>(null);
    const storyRef = useRef<HTMLHeadingElement | null>(null);
    const buttonsRef = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {

        // 1. BIG TEXT — HORIZONTAL LOOP (BASE ANIM)

        const loopAnim = gsap.to(bigTextRef.current, {
            x: "-50%",
            duration: 20,
            repeat: -1,
            ease: "none",
        });


        // 2. SCROLL → BOOST TIME SCALE

        let lastScrollY = window.scrollY;
        let lastTime = Date.now();
        let idleTimeout: number | null = null;

        const onScroll = () => {
            const now = Date.now();
            const newY = window.scrollY;

            const deltaY = Math.abs(newY - lastScrollY);
            const deltaTime = now - lastTime;

            const speed = deltaY / deltaTime;
            const scaled = gsap.utils.clamp(1, 15, 1 + speed * 15);

            loopAnim.timeScale(scaled);

            lastScrollY = newY;
            lastTime = now;

            if (idleTimeout) clearTimeout(idleTimeout);
            idleTimeout = window.setTimeout(() => {
                gsap.to(loopAnim, {
                    timeScale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }, 150);
        };

        window.addEventListener("scroll", onScroll);


        // 3. BIG TEXT — SCROLL UP SLIGHTLY

        gsap.to(bigTextRef.current, {
            y: "-100vh",
            scrollTrigger: {
                trigger: nextSectionRef.current!,
                start: "top bottom",
                end: "top top",
                scrub: true,
            },
        });


            // 4. OVERLAY FADE IN

        gsap.to(overlayRef.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: nextSectionRef.current!,
                start: "top bottom",
                end: "top 55%",
                scrub: true,
            },
        });


            // 5. TIMELINE NEXT SECTION

        gsap.timeline({
            scrollTrigger: {
                trigger: nextSectionRef.current,
                start: "top 42%",
                end: "top -35%",
                scrub: 4,
                markers: false,
            },
        });

        gsap.from(storyRef.current, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: nextSectionRef.current,
                start: "top 5%",
                toggleActions: "play none none reverse",
                markers: false,
            },
        });

        // BUTTON ENTER ANIM
        gsap.from(buttonsRef.current[0], {
            opacity: 0,
            y: 70,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: nextSectionRef.current,
                start: "top 10%",
                toggleActions: "play none none reverse",
            },
        });

        gsap.from(buttonsRef.current[1], {
            opacity: 0,
            y: 70,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: nextSectionRef.current,
                start: "top 5%",
                toggleActions: "play none none reverse",
            },
        });

        gsap.from(buttonsRef.current[2], {
            opacity: 0,
            y: 70,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: nextSectionRef.current,
                start: "top 5%",
                toggleActions: "play none none reverse",
            },
        });

            //CLEANUP
        return () => {
            window.removeEventListener("scroll", onScroll);
            loopAnim.kill();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 300);

    return (
        <>
            <section className=" relative h-screen sticky top-0 overflow-hidden z-0">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                />

                <div className="absolute inset-0 bg-black/40" />

                <div
                    ref={overlayRef}
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,1) 60%)",
                        opacity: 0,
                    }}
                />

                <div className="relative z-10 max-w-4xl px-6 md:px-12 pt-[22vh]">
                    <h1 className=" text-white text-5xl sm:text-4xl md:text-7xl font-bold leading-tight">
                        LOREM IPSUM <br /> DOLOR
                    </h1>

                    <p className="text-white/90 mt-6 text-lg md:text-xl max-w-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla libero a turpis viverra vehicula.
                    </p>

                    <div className="mt-10">
                        <button className="group flex items-center gap-4 pr-8 pl-3 py-2 bg-white text-black rounded-full text-lg font-medium transition-all">
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-black transition-all duration-300 group-hover:bg-black group-hover:translate-x-2">
                                <ArrowUpRight className="w-6 h-6 transition-all group-hover:text-white" />
                            </span>
                            <span>EXPLORE NOW</span>
                        </button>
                    </div>
                </div>

                <div
                    ref={bigTextRef}
                    className="absolute bottom-0 left-0 w-[260%] text-white text-[12vw] lg:text-[9vw] font-bold whitespace-nowrap pointer-events-none z-30"
                >
                    LOREM • IPSUM • DOLOR • SIT • AMET • LOREM • IPSUM • DOLOR •
                </div>
            </section>

            <section
                ref={nextSectionRef}
                className="relative z-20 min-h-[150vh] w-full flex flex-col items-center justify-center text-center"
                style={{
                    background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.8) 10%,
            rgba(0,0,0,1) 18%,
            rgba(0,0,0,1) 100%
            )`,
                }}
            >
                <h2
                    ref={storyRef}
                    className="text-white text-4xl md:text-4xl font-bold leading-relaxed max-w-5xl"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla libero a turpis viverra vehicula. Sed ac pellentesque ligula, ac pharetra justo. Donec ut erat vitae tortor accumsan convallis. Aenean ornare commodo purus sed semper. Sed fermentum et mi ac condimentum. Etiam sed sagittis ex, in imperdiet urna
                </h2>

                <div className="flex flex-wrap justify-center gap-6 mt-12">
                    {[
                        { label: "LOREM Collections", img: "/men.jpg" },
                        { label: "IPSUM Collections", img: "/woman.jpg" },
                        { label: "DOLOR Collections", img: "/popular.jpg" },
                    ].map((item, i) => (
                        <button
                            key={i}
                            ref={(el) => {
                                if (el) buttonsRef.current[i] = el;
                            }}
                            className="flex items-center gap-3 bg-white/100 border border-white/20 px-6 py-3 rounded-full backdrop-blur-md hover:bg-white/80 transition-all"
                        >
                            <img src={item.img} className="w-10 h-10 rounded-full object-cover" />
                            <span className="text-black text-lg font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </section>
        </>
    );
}