import React, { useEffect } from 'react';

const Archive = ({course}) => {
    const questions = [
    ];

    useEffect(() => {
        if (window.MathJax && window.MathJax.Hub) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "math-content"]);
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, ".bannerarchive"]);
        }
    }, [course]);
    
    return (
        <div>
        </div>
    );
};

export default Archive;