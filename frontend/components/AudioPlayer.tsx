"use client";

import { useEffect, useRef } from "react";

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const isPlayedOnceRef = useRef(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.muted = true;
        audio.play().catch((err) => console.log("Mount autoplay muted error:", err));

        const enableAudibleSound = () => {
            if (isPlayedOnceRef.current) return;
            if (audio) {
                audio.muted = false;
                isPlayedOnceRef.current = true;
                audio.play().catch(() => { });
            }
        };

        window.addEventListener("pointermove", enableAudibleSound, { once: true });
        window.addEventListener("scroll", enableAudibleSound, { once: true });
        window.addEventListener("click", enableAudibleSound, { once: true });
        window.addEventListener("touchstart", enableAudibleSound, { once: true });

        return () => {
            window.removeEventListener("pointermove", enableAudibleSound);
            window.removeEventListener("scroll", enableAudibleSound);
            window.removeEventListener("click", enableAudibleSound);
            window.removeEventListener("touchstart", enableAudibleSound);
        };
    }, []);

    return (
        <div>
            <audio ref={audioRef} src="/assets/sound/dhak.mp3" loop autoPlay muted />
        </div>
    );
};

export default AudioPlayer;