import { useEffect, useRef } from "react";

const fadeInSection = (options = { threshold: 0.15 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target); // fade once, stay visible
                }
            },
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [options]);

    return ref;
};

export default fadeInSection;
