import type { TargetAndTransition, Transition } from "motion/react";

interface AnimatorItem {
    initials: TargetAndTransition;
    animate: TargetAndTransition;
    transition: Transition;
    whileHover?: TargetAndTransition;
    whileTap?: TargetAndTransition;
}

export const BannerAnimator: Record<string, AnimatorItem> = {
  
    HeroImageAnimator: {
        initials: { opacity: 0, scale: 1.14 },
        animate: { opacity: 0.95, scale: 1 },
        transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
    },


    BannerEyebrowAnimator: {
        initials: { opacity: 0, filter: "blur(8px)", scale: 0.9, y: 10 },
        animate: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
    },


    BannerHeadlineAnimator: {
        initials: { opacity: 0, filter: "blur(12px)", scale: 0.95, y: 25 },
        animate: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 },
        transition: { duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] },
    },


    BannerDescriptionAnimator: {
        initials: { opacity: 0, filter: "blur(6px)", y: 18 },
        animate: { opacity: 1, filter: "blur(0px)", y: 0 },
        transition: { duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
    },


    BannerCTAButtonAnimator: {
        initials: { opacity: 0, scale: 0.88, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.48, type: "spring", stiffness: 350, damping: 22 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.96 },
    },

    BannerAnimator: {
        initials: { opacity: 0, scale: 0.96, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
    },

    AuraGlowPulse: {
        initials: { scale: 1 },
        animate: {
            scale: [1, 1.04, 1],
            boxShadow: [
                "0 0 0px rgba(244, 178, 68, 0.2)",
                "0 0 20px rgba(244, 178, 68, 0.55)",
                "0 0 0px rgba(244, 178, 68, 0.2)"
            ]
        },
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};