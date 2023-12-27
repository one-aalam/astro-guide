/**
 *
 * @param {Object} object
 * @returns {String}
 */
export const styleTransform = ({ rotation, animationSmooth }) => {
    const smoothAnimation = animationSmooth
        ? `transition: stroke-dashoffset ${animationSmooth}`
        : "";

    return `transform:rotate(${rotation}deg);transform-origin: 50% 50%;${smoothAnimation}`;
};

/**
 * Set "stroke-dasharray": "1, 2"
 * @param {String} type
 * @returns {Object}
 */
export const strokeDasharray = (type = "264") => {
    return {
        "stroke-dasharray": type,
    };
};

/**
 * Set type stroke-linecap
 * @param {String} round
 * @returns {Object}
 */
export const strokeLinecap = ({ round }) => {
    return {
        "stroke-linecap": round ? "round" : "",
    };
};

/**
 * Set font sieze/weight
 *
 * @param {Object} options
 * @returns {Object}
 */
export const fontSettings = (options) => {
    return {
        "font-size": options.fontSize,
        "font-weight": options.fontWeight,
    };
};

/**
 *
 * @param {String} element
 * @returns {HTMLElement}
 */
export const querySelector = (element) => document.querySelector(element);

/**
 * Set color or linear-gradient
 *
 * @param {String} element
 * @param {Object} object
 */
export const setColor = (element, { lineargradient, index, colorSlice }) => {
    element.setAttribute(
        "stroke",
        lineargradient ? `url(#linear-${index})` : colorSlice
    );
};

/**
 * Set attribute to specific element
 *
 * @param {String} element
 * @param {Object} object
 */
export const setAttribute = (element, object) => {
    for (const key in object) {
        element?.setAttribute(key, object[key]);
    }
};

/**
 * Create svg element
 *
 * @param {String} type
 * @returns {SVGElement}
 */
export const createNSElement = (type) =>
    document.createElementNS("http://www.w3.org/2000/svg", type);

/**
 * Create svg tspan
 *
 * @param {String} className
 * @param {String} unit
 * @returns {HTMLElement}
 */
export const tspan = (className, unit = '') => {
    const element = createNSElement("tspan");

    element.classList.add(className);
    if (unit) element.textContent = unit;
    return element;
};

/**
 * Function generate stroke-dashoffset
 *
 * @param {Number} count
 * @param {Boolean} inverse - Counterclockwise animation
 * @param {Number} cut - Angle of the circle sector
 * @returns {Number}
 */
export const dashOffset = (count, inverse, cut) => {
    const cutChar = cut ? (264 / 100) * (100 - cut) : 264;
    const angle = 264 - (count / 100) * cutChar;

    return inverse ? -angle : angle;
};

/**
 * @param {HTMLElement} element
 * @param {HTMLElement} el
 * @param {String} type
 */
export const insertAdElement = (element, el, type = "beforeend") =>
    element.insertAdjacentElement(type, el);

/**
 * Generator function linear-gradient stop svg elements
 *
 * @param {Object} object
 */
export const gradient = (linearGradientColors: string[] = []) => {
    const defsElement = createNSElement("defs");
    const linearGradient = createNSElement("linearGradient");
    linearGradient.id = `linear-0`;

    const countGradient = [].slice.call(linearGradientColors);

    defsElement.appendChild(linearGradient);

    let number = 0;
    countGradient.map((item) => {
        const stopElements = createNSElement("stop");

        const stopObj = {
            offset: `${number}%`,
            "stop-color": `${item}`,
        };
        setAttribute(stopElements, stopObj);

        linearGradient.appendChild(stopElements);
        number += 100 / (countGradient.length - 1);
    });

    return defsElement;
};

/**
 * A function that generates tspan
 * elements with a number and unit
 *
 * @param {Object} options - Global configuration
 * @param {String} className
 */
export const percent = (options, className) => {
    const creatTextElementSVG = createNSElement("text");

    creatTextElementSVG.classList.add(`${className}-text-${options.index}`);

    // create tspan element with number
    // and insert to svg text element
    insertAdElement(
        creatTextElementSVG,
        tspan(`${className}-percent-${options.index}`)
    );

    // create and insert unit to text element
    insertAdElement(
        creatTextElementSVG,
        tspan(`${className}-unit-${options.index}`, options.unit)
    );

    // config to svg text
    const obj = {
        x: "50%",
        y: "50%",
        fill: options.fontColor,
        "text-anchor": "middle",
        dy: options.textPosition || "0.35em",
        ...fontSettings(options),
    };

    setAttribute(creatTextElementSVG, obj);
    return creatTextElementSVG;
};