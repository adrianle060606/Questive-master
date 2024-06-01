import React, { useEffect } from 'react';

const Archive = ({course}) => {
    const questions = [
        "\\text{Let the monic quadrinomial } f(x) = ax^4 + 3bx^3 + 4cx^2 - 8x + d \\\\ \\text{ If } f(x) \\text{ has a stationary point of inflection at } x = 2, \\text{ find } f(a + b + c + d)",
        "P(x) = 2x^3 + 8x^2 + 2x + 8 \\\\ \\mathrm{Find\\ the\\ sum\\ of\\ the\\ roots\\ of\\ } P(x) \\mathrm{\\ that\\ are\\ elements\\ of\\ } \\mathbb{R}",
        "f^{\\prime}(x) = \\frac{x}{(a^2 + x^2)^2} \\mathrm{\\ \\ and \\ \\ } f(0) = -\\frac{1}{2a^2} \\\\ \\ \\mathrm{let}\\ g(x) = 1 + 2\\cdot f(x)\\cdot (a - x)^2 \\\\ \\int_{0}^{a}g(x)dx = \\ln(8192) \\mathrm{,\\ find\\ } a",
        "\\mathrm{The\\ volume\\ of\\ any\\ pyramid\\ is\\ } V=\\frac{1}{3}Ah, \\\\ \\mathrm{\\ where\\ } A \\mathrm{\\ is\\ the\\ area\\ of\\ the\\ polygon\\ and\\ } h \\mathrm{\\ is\\ the\\ height.} \\\\ \\textbf{u} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 4 \\end{pmatrix} \\mathrm{,\\ } \\textbf{v} = \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} \\mathrm{,\\ and\\ } \\textbf{w} = \\begin{pmatrix} 6 \\\\ x \\\\ -9 \\end{pmatrix} \\\\ \\textbf{u} \\ \\mathrm{,\\ }\\ \\textbf{v} \\mathrm{,\\ and\\ }\\ \\textbf{w} \\mathrm{\\ are\\ each\\ perpendicular\\ with\\ each\\ other.} \\\\ \\mathrm{The\\ volume\\ of\\ the\\ tetrahedron\\ formed\\ by\\ the\\ vertices:} \\\\ \\mathrm{The\\ origin,\\ \\textbf{u},\\ \\textbf{v},\\ and\\ \\textbf{w}\\ is\\ } 637u^3 \\\\ \\mathrm{Find}\\ |a + b + c|",
        "\\text{C is a circle with radius 1 and a point of maximum } \\\\ \\text{modulus at } 2+\\frac{1}{\\sqrt{2}} + 2i+\\frac{i}{\\sqrt{2}} \\text{. Let } z \\text{ be the centre of circle C} \\\\ w = z^5. \\text{ Find the real part of } \\frac{1}{w}",
        "\\mathrm{A\\ special\\ firework\\ that\\ explodes\\ was\\ launched\\ at\\ } \\textbf{u} = \\begin{pmatrix} 4 \\\\ 18 \\end{pmatrix} ms^{-1} \\\\ \\mathrm{The\\ motion\\ is\\ modelled\\ by:\\ } \\ddot{x}=0, \\ \\ \\ddot{y}=-10 \\\\ \\mathrm{This\\ firework\\ drops\\ glitter,\\ suspended\\ in\\ the\\ air\\ beneath\\ its\\ path.} \\\\ \\mathrm{The\\ area\\ covered\\ by\\ the\\ glitter\\ in\\ the\\ sky\\ is\\ } \\frac{272}{3}m^2 \\\\ \\mathrm{Find,\\ to\\ the\\ nearest\\ degree,\\ the\\ angle\\ of\\ direction\\ below\\ the\\ } \\\\ \\mathrm{horizontal\\ when\\ the\\ firework\\ explodes.}",
        "\\text{This question assumes decimal, base ten.} \\\\ \\forall \\ n \\in \\mathbb{Z}^+ \\cap [0, 50] \\ \\exists \\ m \\in \\mathbb{Z}^+ \\cap [1, 9] \\ : \\\\ (|f(n)| = 2 \\ \\land \\ d(n) = k^2 \\rightarrow g(n, m) = 1, \\ \\ k \\in \\mathbb{Z}^+ \\cup \\{-3,1,4\\}) \\\\ \\ \\\\ f(n) \\ \\text{returns the set of factors of } n. \\text{ e.g. } f(6) = \\{1, 2, 3, 6\\} \\\\ g(a, b) \\ \\text{returns the number of digits in } a \\text{ that equal } b^c, \\ c \\in \\mathbb{Z}^+ \\\\ \\text{e.g. } g(128, 2) = 2 \\text{ and } g(301, 1) = 1 \\\\ d(n) \\ \\text{returns the } \\textit{digital root} \\text{ of } n. \\\\ \\text{The } \\textit{digital root} \\text{ is the summation of the digits of } n, \\\\ \\text{ until you get to a single digit. e.g. } d(125) = 8 \\text{ and } d(285) = 6 \\\\ \\text{Find the only possible value of } m.",
        "\\text{A common way to represent colours is with three values: one} \\\\ \\text{for red, one for green, and one for blue. This is known as RGB.} \\\\ \\text{In this question each of these values can range from 0 to 100.} \\\\ \\text{This can be considered a point, or rather a vector in 3D space.} \\\\ \\text{e.g.} \\begin{pmatrix} 0 \\\\ 50 \\\\ 0 \\end{pmatrix} \\text{ is dark green } \\color{green}{■} \\text{ and } \\begin{pmatrix} 100 \\\\ 0 \\\\ 100 \\end{pmatrix} \\text{ is magenta } \\color{magenta}{■}. \\\\ \\text{The Barker College crest is comprised of 4 colours:} \\\\ \\begin{pmatrix} 100 \\\\ 15 \\\\ 12 \\end{pmatrix} \\ \\color{red}{■}, \\ \\begin{pmatrix} 0 \\\\ 15 \\\\ 56 \\end{pmatrix} \\ \\color{darkblue}{■}, \\ \\begin{pmatrix} 100 \\\\ 84 \\\\ 12 \\end{pmatrix} \\ \\color{gold}{■}, \\text{ and } \\begin{pmatrix} 100 \\\\ 100 \\\\ 100 \\end{pmatrix}  \\ \\color{white}{■} \\\\ \\text{Find the circumcentre of these colours in component form.} \\\\ \\text{Round each component to the nearest integer if necessary.} \\\\ \\text{The unit vectors are: } \\underset{\\sim}{r} \\text{ for red, } \\underset{\\sim}{g} \\text{ for green, and } \\underset{\\sim}{b} \\text{ for blue.} \\\\ \\text{The circumcentre is the centre of the sphere} \\\\ \\text{that has all 4 points on its surface.}",
        "\\text{Evaluate} \\\\ \\int_{-\\frac{\\pi}{8}}^{\\frac{5\\pi}{8}} 84\\cos^4(x) - 504\\cos^2(x)\\sin^2(x) \\,dx \\\\ + \\\\ 84i \\times\\int_{\\frac{5\\pi}{8}}^{-\\frac{\\pi}{8}} \\sin(4x) + i\\sin^4(x)\\,dx \\\\ \\text{Hint: consider Pascal's triangle.}",
        "\\text{Simplify } \\ \\ \\frac{2\\cdot\\prod\\limits_{n=1}^{17}-\\sum\\limits_{m=0}^{15}n\\cdot m\\cdot\\sqrt[4]{i}}{17\\cdot15\\cdot\\sum\\limits_{n=1}^{15!}-\\prod\\limits_{m=11}^{14}4\\cdot120^4\\cdot\\sqrt[16]{-\\frac{1}{i}}} \\\\ \\text{Hint: a calculator is not required.}",
        "\\text{A particle moving in simple harmonic motion about the origin} \\\\ \\text{Find the maximum magnitude of velocity (including units) if:} \\\\ \\text{When it is 3m away from the origin it is moving at 8m}\\text{s}^{-1}. \\\\ \\text{And when it is 4m away from the origin it is moving at 6m}\\text{s}^{-1}.",
        "\\text{There are two projectiles: } A \\text{ and } B \\text{. Projectile } A \\text{ is} \\\\ \\text{launched from the origin with a velocity } \\textbf{u} = \\begin{pmatrix} 31 \\\\ 50 \\end{pmatrix} \\text{ms}^{-1}. \\\\ \\text{Projectile } B \\text{ is launched from P}(42 \\text{ metres}, 0 ) \\text{ with a velocity} \\\\ \\textbf{v} = \\begin{pmatrix} -41 \\\\ 50 \\end{pmatrix} \\text{ms}^{-1}. \\text{ Both projectiles are modelled by:} \\\\ \\ddot{x} = -k\\dot{x}, \\ \\ \\ddot{y} = -k\\dot{y} - g\\\\ \\text{These projectiles collide mid-air. If } k = 0.1 \\text{ and } g = 10\\text{ms}^{-2}. \\\\ \\text{Find, to the nearest second, when they collide.}",
        "f(x) = x^4 + 2x^3 + ix + 2i \\\\ \\text{Find the exact value of the largest modulus} \\\\ \\text{out of the roots of } f(x).",
        "\\text{Consider the implication: } \\\\ (2n + 1)\\in \\mathbb{P}\\cap \\overline{\\{2\\}}  \\rightarrow (n^2 + n + 41) \\in \\mathbb{P}, \\\\ \\text{Where } \\mathbb{P} \\text{ is the set of primes.} \\\\ \\text{Is the implication true or false?}",
        "\\text{Evaluate} \\ \\int_{0}^{\\frac{9\\pi}{5}}\\frac{8\\cdot\\cos(x)\\cdot\\sin(x)}{\\cos^2(x)(3 - \\cos(2x)) + 2\\sin^2(x)} \\,dx \\\\ \\ \\\\ \\text{Round your answer to 1 s.f.}",
        "\\text{Consider the locus on the Argand diagram described by:} \\\\ |z - 3 - 4i| = 2 \\\\ \\text{Consider the two points on said locus with the} \\\\ \\text{minimum and maximum argument. Now consider} \\\\ \\text{the two lines that pass through the origin and each of the} \\\\ \\text{said points. Find the area of the region enclosed by the} \\\\ \\text{locus and the two lines, to the nearest } u^2.",
        "\\text{Simplify} \\int \\frac{x^4 + 2x^3 -x^2 + 3x - 5}{x^3 - x^2 + 2x - 2} \\,dx",
        "\\text{Sometimes I am unsure how many blueberries to eat.} \\\\ \\text{As such, I perform the following pseudo-random number generator.} \\\\ \\text{I roll a pair of six-sided dice twice.} \\\\ \\text{let } n = \\text{ the sum of the first dice roll.} \\\\ \\text{let } m = \\text{ the sum of the second dice roll.} \\\\ \\text{If } (n + im)^{m + ni} \\text{ is real then I eat a blueberry.} \\\\ \\text{I repeat the above process 100 times.} \\\\ \\text{What is the expected number of blueberries I eat?}",
    ];

    const questionExt1 = [
        "\\text{The first 9 digits of } \\pi \\ (\\text{i.e. }3,1,...) \\text{ and the first 9 digits of } e \\text{ are} \\\\ \\text{attending a conference on transcendentalism. They } \\\\  \\text{sit around a circular table in groups. The powers of 1 sit} \\\\ \\text{in a group, the remaining powers of 2 sit in a group, and } \\\\ \\text{ the remaining powers of 3 sit in a group. The prime numbers} \\\\ \\text{ who are not already in a group form a group of their own.} \\\\ \\text{The remaining digit(s) sit(s) wherever, without} \\\\ \\text{breaking up the groups.} \\\\ \\text{As a fraction, what is the probability that} \\\\ \\text{the square number digits are sitting together?}",
        "\\text{A vase is made from the solid of revolution described by} \\\\ y = \\frac{w\\sqrt{x}}{\\sqrt{\\pi}} \\text{ around the x-axis from 0 to } h \\text{ cm}. \\\\ h \\text{ cm is the height of the vase, and } w \\text{ is the width scale factor.} \\\\ \\text{This vase is filled up with water at } 360 \\ \\frac{\\text{cm}^3}{\\text{min}}. \\\\ \\text{When the water reaches the top at 5 min, the} \\\\ \\text{rate of change in height of the water in the vase is } 3 \\ \\frac{\\text{cm}}{\\text{min}}. \\\\ \\text{What is the area of the top of the vase in } \\text{cm}^2 \\text{?}",
        "\\text{I roll two fair dice 42 times. Each time I record the sum.} \\\\ \\text{Consider whether it is more likely I rolled exactly 27 square} \\\\ \\text{number sums or at least 38 prime number sums. The question is: } \\\\ \\text{How many times more likely is the more likely case compared} \\\\ \\text{to the less likely case? Round your answer to the nearest integer.}",
        "\\text{Evaluate } \\int_{0}^{\\pi} \\sin(2x)(15\\sin(x) + 6\\cos(x)) \\, dx",
        "\\text{Find } \\frac{d}{dx} \\ 42^x \\cdot \\sin(3x) \\\\ \\text{Note that in your answer you can use ^ to denote power.} \\\\ \\text{e.g. 2^3 = 8}",
        "f(x) = x^2 + \\cos(x) \\\\ g(x) = x - \\sin(x) \\\\ h(x) = f(g(x)) + g(f(x)) \\\\ \\text{Is } h(x) \\text{ odd, even, or neither?}",
        "5 \\text{ vectors form an outline of a shape. The vectors are:} \\\\ \\textbf{P} = \\begin{pmatrix} 31 \\\\ 41 \\end{pmatrix}, \\ \\textbf{R} = \\begin{pmatrix} 34 \\\\ 45 \\end{pmatrix}, \\ \\textbf{I} = \\begin{pmatrix} 37 \\\\ 49 \\end{pmatrix}, \\\\ \\textbf{M} = \\begin{pmatrix} 47 \\\\ 49 \\end{pmatrix}, \\ \\textbf{E} = \\begin{pmatrix} 41 \\\\ 41 \\end{pmatrix} \\\\ \\text{Give the most specific name of the polygon } \\textbf{PRIME} \\text{ formed.}",
        "\\text{A geometric sequence exists such that the sum of the} \\\\ \\text{first 3 terms is equal to 12 less the double of the 3}^{\\text{rd}} \\text{ term.} \\\\ \\text{If the first term is 2 then consider the sum} \\\\ \\text{of the first 42 terms of this geometric sequence.} \\\\ \\ \\\\ \\text{Enter your answer as the first digit of the difference} \\\\ \\text{between the lowest and the highest possible solution to} \\\\ \\text{the above problem.}",
        "\\text{Four vectors are defined:} \\\\ \\textbf{A} = \\begin{pmatrix} 24 \\\\ -30 \\end{pmatrix}, \\ \\textbf{B} = \\begin{pmatrix} 34 \\\\ -33 \\end{pmatrix}, \\ \\textbf{C} = \\begin{pmatrix} 29 \\\\ -21 \\end{pmatrix}, \\ \\textbf{D} = \\begin{pmatrix} 28 \\\\ -26 \\end{pmatrix} \\\\ \\textbf{M}_1 \\text{ is the intersection between } \\overrightarrow{AB} \\text{ and } \\overrightarrow{CD}. \\\\ \\textbf{M}_2 \\text{ is the intersection between } \\overrightarrow{AD} \\text{ and } \\overrightarrow{BC}. \\\\ \\text{Out of the 8 cardinal directions, which} \\\\ \\text{direction is } \\textbf{M}_1 + \\text{M}_2 \\text{ closest to pointing in?} \\\\ \\ \\\\ \\text{Write your answer in abbreviated form.}",
        "\\text{Consider a funtion, } f(x) = x^3 + ax^2 + bx + c \\\\ f(x) \\text{ has a local minimum at } x = 1 \\text{ and a point of} \\\\ \\text{inflection at } x = -1. \\\\ \\text{If } f(0) = 1 \\text{ then find } f(a + b + c)"
    ]

    useEffect(() => {
        if (window.MathJax && window.MathJax.Hub) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "math-content"]);
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, ".bannerarchive"]);
        }
    }, [course]);
    
    if(course == "Ext1")
    return(
        <div>
            <h2>September 16</h2>
            <div id="math-content">
                {`$$${questionExt1[9]}$$`}
            </div>

            <h2>September 15</h2>
            <div id="math-content">
                {`$$${questionExt1[8]}$$`}
            </div>

            <h2>September 13</h2>
            <div id="math-content">
                {`$$${questionExt1[7]}$$`}
            </div>

            <h2>September 12</h2>
            <div id="math-content">
                {`$$${questionExt1[6]}$$`}
            </div>

            <h2>September 11</h2>
            <div id="math-content">
                {`$$${questionExt1[5]}$$`}
            </div>

            <h2>September 9</h2>
            <div id="math-content">
                {`$$${questionExt1[4]}$$`}
            </div>

            <h2>September 8</h2>

            <div id="math-content">
                {`$$${questionExt1[3]}$$`}
            </div>



            <details className = "reveal">
                <summary>Reveal Answer</summary>
                8
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 7</h2>

            <div id="math-content">
                {`$$${questionExt1[2]}$$`}
            </div>



            <details className = "reveal">
                <summary>Reveal Answer</summary>
                5
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 6</h2>

            <div id="math-content">
                {`$$${questionExt1[1]}$$`}
            </div>



            <details className = "reveal">
                <summary>Reveal Answer</summary>
                120
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 5</h2>

            <div id="math-content">
                {`$$${questionExt1[0]}$$`}
            </div>



            <details className = "reveal">
                <summary>Reveal Answer</summary>
                1/96
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>
        </div>
    );
    else
    return (
        <div>
            <h2>September 16</h2>
            <div id="math-content">
                {`$$${questions[17]}$$`}
            </div>

            <h2>September 15</h2>
            <div id="math-content">
                {`$$${questions[16]}$$`}
            </div>

            <h2>September 13</h2>
            <div id="math-content">
                {`$$${questions[15]}$$`}
            </div>

            <h2>September 12</h2>
            <div id="math-content">
                {`$$${questions[14]}$$`}
            </div>

            <h2>September 11</h2>
            <div id="math-content">
                {`$$${questions[13]}$$`}
            </div>

            <h2>September 9</h2>
            <div id="math-content">
                {`$$${questions[12]}$$`}
            </div>

            <h2>September 8</h2>

            <div id="math-content">
                {`$$${questions[11]}$$`}
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                1 second
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 7</h2>

            <div id="math-content">
                {`$$${questions[10]}$$`}
            </div>



            <details className = "reveal">
                <summary>Reveal Answer</summary>
                10m/s
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 6</h2>

            <div id="math-content">
                {`$$${questions[9]}$$`}
            </div>



            <details className = "reveal">
                <summary>Reveal Answer</summary>
                1
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Thank you to Marcus Wang for providing the following working:
                    <br/>
                    <br/>
                    <img src={require("./September7.png")} alt = "Marcus Working" width = "1000"></img>
                </div>
            </details>

            <h2>September 5</h2>

            <div id="math-content">
                {`$$${questions[8]}$$`}
            </div>



            <details className = "reveal">
                <summary>Reveal Answer</summary>
                42
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 4</h2>

            <div id="math-content">
                {`$$${questions[7]}$$`}
            </div>

            <div className="bannerarchive" >
                "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyways. Because bees don't care what humans think is impossible..." - Tom vB
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                63r + 50g + 64b <br/> A nice lavender colour.
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 3</h2>

            <div id="math-content">
                {`$$${questions[6]}$$`}
            </div>

            <div className="bannerarchive" >
                "The Stoodleys don’t have a favourite child until I’m in the house" - Nick Bailey
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                3
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 2</h2>

            <div id="math-content">
                {`$$${questions[5]}$$`}
            </div>

            <div className="bannerarchive" >
                "Hmmmmm...." - Marcus Wang
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                27°
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>September 1</h2>

            <div id="math-content">
                {`$$${questions[4]}$$`}
            </div>

            <div className="bannerarchive" >
                "Yur" - Nick Bradshaw
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                -1/256
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>August 31</h2>

            <div id="math-content">
                {`$$${questions[3]}$$`}
            </div>

            <div className="bannerarchive" >
                "The matrix is everywhere. It is all around us. Even now in this very room." - Morpheus
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                6
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    This question is about setting up a system of equations and solving simultaneously. <br/>
                    First we can find x as u and w are perpendicular, therefore u • w = 0: <br/>
                    i.e. 3 * 6 + x + 4 * -9 = 0  <br/>
                    18 + x - 36 = 0 <br/>
                    x = 18 <br/>
                    <br/>
                    u and v are perpendicular, therefore u • v = 0: <br/>
                    i.e. 3a + b + 4c = 0, Equation 1 <br/>
                    <br/>
                    v and w are perpendicular, therefore v • w = 0: <br/>
                    i.e. 6a + xb - 9c = 0 <br/>
                    6a + 18b - 9c = 0, Equation 2 <br/>
                    <br/>
                    Equation 2 - 2 * Equation 1: <br/>
                    6a - 6a + 18b - 2b - 9c - 8c = 0 <br/>
                    16b - 17c = 0 <br/>
                    b = 17c/16 <br/>

                    18 * Equation 1 - Equation 2: <br/>
                    18 * 3a - 6a + 18b - 18b + 18 * 4c - -9c = 0 <br/>
                    48a + 81c = 0 <br/>
                    16a + 27c = 0 <br/>
                    a = -27c/16 <br/>

                    V = 1/3 * A * h <br/>
                    637 = 1/3 * (1/2 * |u| * |w|) * |v| <br/>
                    3822 = |u| * |w| * |v| <br/>
                    3822 = sqrt(3^2 + 1^2 + 4^2) * sqrt(6^2 + 18^2 + (-9)^2) * sqrt(a^2 + b^2 + c^2) <br/>
                    3822 = sqrt(26) * sqrt(441) * sqrt(a^2 + b^2 + c^2) <br/>
                    182/sqrt(26) = sqrt(a^2 + b^2 + c^2) <br/>
                    33124/26 = a^2 + b^2 + c^2 <br/>
                    1274 = (-27c/16)^2 + (17c/16)^2 + c^2 <br/>
                    1274 = c^2 * (27^2 / 16^2 + 17^2 / 16^2 + 1) <br/>
                    1274 = c^2 * 637/128 <br/>
                    c^2 = 256 <br/>
                    c = ±16 <br/>
                    Therefore a = ∓27, b = ±17 <br/>
                    |a + b + c| = |±16 ∓ 27 ± 17| = |16 - 27 + 17| or |-16 + 27 - 17| <br/>
                    Both equal 6. Giving us the only answer of 6. <br/>
                </div>
            </details>

            <h2>August 30</h2>
            <h4>Caitlin Stoodley's 13<sup>th</sup> Birthday</h4>

            <div id="math-content">
                {`$$${questions[2]}$$`}
            </div>

            <div className="bannerarchive" >
                "🔥" - Nick Bradshaw
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                13
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Working coming soon! <br/> 
                    Do you have working for this question? <br/>
                    If so, please email it to me at stoodleym23@barker.college
                </div>
            </details>

            <h2>August 29</h2>
            <div id="math-content">
                {`$$${questions[1]}$$`}
            </div>

            <div className="bannerarchive" >
                <span>{`$$\`\`\\frac{F}{a} + e^{i\\frac{\\pi}{2}}\"\\mathrm{\\ - \\ Tom\\ vB}$$`}</span>
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                -4
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Firstly a factor of two can be taken out: <br/>
                    i.e. P(x) = 2(x^3 + 4x^2 + x + 4) <br/>
                    Now it is a matter of factorising via grouping in pairs. <br/>
                    P(x) = 2(x^2(x + 4) + (x + 4)) <br/>
                    Now the (x + 4) can be taken out <br/>
                    P(x) = 2(x + 4)(x^2 + 1) <br/>
                    From here we know the answer is -4, as x^2 + 1 only has imaginary roots <br/>
                    But we can fully factorise it: <br/>
                    P(x) = 2(x + 4)(x - i)(x + i) <br/>
                    let P(x) = 0 to find the roots: <br/>
                    2(x + 4)(x - i)(x + i) = 0 <br/>
                    Therefore x = -4, i, -i <br/>
                    Therefore the sum of real roots is -4. <br/>
                    And that is the answer! -4. <br/>
                    NB: Make sure to flip the sign in (x + 4) to find the root, unlike our school captain! 🤭
                </div>
            </details>
            <h2>August 28</h2>
            <div id="math-content">
                {`$$${questions[0]}$$`}
            </div>

            <div className="bannerarchive" >
                "If you got an answer of zero, then you are a hero, and you will now never forget what a quadrinomial is!" - Mr Hanlon
            </div>

            <details className = "reveal">
                <summary>Reveal Answer</summary>
                0
            </details>
            <details className = "reveal">
                <summary>Reveal Working</summary>
                <div className = "revealworking">
                    Monic means a = 1 <br/>
                    f '(x) = 4x^3 + 9bx^2 + 8cx - 8 <br/>
                    f '(2) = 0 as there is a stationary point at x = 2 <br/>
                    4 * 2^3 + 9b * 2^2 + 8c * 2 - 8 = 0 <br/>
                    32 + 36b + 16c - 8 = 0 <br/>
                    36b + 16c = -24 <br/>
                    9b + 4c = -6, Equation 1 <br/>
                    <br/>
                    f ''(x) = 12x^2 + 18bx + 8c <br/>
                    f ''(2) = 0 as there is a point of inflection at x = 2 <br/>
                    12 * 2^2 + 18b * 2 + 8c = 0 <br/>
                    48 + 36b + 8c = 0 <br/>
                    36b + 8c = -48 <br/>
                    9b + 2c = -12, Equation 2 <br/>
                    <br/>
                    Equation 1 - Equation 2: <br/>
                    2c = 6 <br/>
                    c = 3 <br/>
                    Therefore b = -2 <br/>
                    f(x) is a quadrinomial (4 terms), therefore one of the coefficients must be 0 <br/>
                    a = 1, b = -2, c = 3, therefore d = 0 <br/>
                    i.e. f(x) = x^4 - 6x^3 + 12x^2 - 8x <br/>
                    We need to find f(a + b + c + d) = f(1 - 2 + 3 + 0) = f(2) <br/>
                    f(2) = 2^4 - 6 * 2^3 + 12 * 2^2 - 8 * 2 <br/>
                    f(2) = 16 - 6 * 8 + 12 * 4 - 16 <br/>
                    f(2) = 16 - 48 + 48 - 16 <br/>
                    f(2) = 0 <br/>
                    And that is the answer! 0. <br/>
                </div>
            </details>
        </div>
    );
};

export default Archive;