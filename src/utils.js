/**
 * @returns {HTMLElement}
 */
export function setElementProps(
    element = document.body,
    options = {},
    children = []
) {
    Object.entries(options).forEach(([key, value]) => {
        if (key === 'class') {
            element.classList.add(value);
            return;
        }

        if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
            return;
        }

        if (key === 'text') {
            element.textContent = value;
            return;
        }

        element.setAttribute(key, value);
    });

    children.forEach((child) => {
        if (typeof child === 'string' || typeof child === 'number') {
            child = document.createTextNode(child);
        }

        if (child instanceof Node) {
            element.appendChild(child);
        }
    });

    return element;
}

/**
 * @returns {HTMLElement}
 */
export function createElement(type, options = {}, children = []) {
    const element = document.createElement(type);

    setElementProps(element, options, children);

    return element;
}

/**
 * @param {string} str
 */
export function trimInner(str) {
    return [...str.matchAll(/[\S]/g)].join('');
}
