import { createElement, setElementProps, trimInner } from './utils.js';

export class VideoElements extends EventTarget {
    /** @type {VideoElements[]} */
    static elements = [];

    /**
     * @param {HTMLDivElement} main
     * @param {HTMLDivElement} container
     * @param {HTMLVideoElement} video
     */
    constructor(main, container, video) {
        super();

        this.main = main;
        this.container = container;
        this.video = video;

        this.video.addEventListener('play', () => {
            this.dispatchEvent(new CustomEvent('play'));
            this.dispatchEvent(new CustomEvent('play-pause'));
        });
        this.video.addEventListener('pause', () => {
            this.dispatchEvent(new CustomEvent('pause'));
            this.dispatchEvent(new CustomEvent('play-pause'));
        });
        this.video.addEventListener('fullscreenchange', () => {
            if (this.isFullscreen) {
                this.dispatchEvent(new CustomEvent('full-screen-enter'));
            } else {
                this.dispatchEvent(new CustomEvent('full-screen-live'));
            }
            this.dispatchEvent(new CustomEvent('full-screen-change'));
        });

        VideoElements.elements.push(this);
    }

    get isPlaying() {
        return !this.video.paused;
    }

    playPause() {
        if (this.isPlaying) this.video.pause();
        else this.video.play();
    }

    get isFullscreen() {
        return document.fullscreenElement;
    }

    enterFullScreen() {
        this.main.requestFullscreen();
    }

    liveFullScreen() {
        document.exitFullscreen();
    }

    changeFullscreen() {
        if (!this.isFullscreen) this.enterFullScreen();
        else this.liveFullScreen();
    }
}

update();
/**
 * @param {number} ts
 * @param {number} lts
 */
async function update(ts, lts) {
    const dt = ts - lts;

    for (const element of VideoElements.elements) {
        if (element.isPlaying) {
            element.dispatchEvent(
                new CustomEvent('time-update', {
                    detail: {
                        dt,
                    },
                })
            );
        }
    }

    requestAnimationFrame((nts) => update(nts, ts));
}

/**
 * @param {HTMLVideoElement} videoElement
 */
export function apply(videoElement) {
    const newVideoElement = setElementProps(videoElement.cloneNode(), {
        style: trimInner(`
            width: 100%;
        `),
    });
    const elementsContainer = createElement('div', {
        style: trimInner(`
                position: absolute;
                width: 100%;
                height: 100%;
                pointer-events: bounding-box;
                z-index: 1;
            `),
    });

    const container = createElement(
        'div',
        {
            style: trimInner(`
                position: relative;
                width: 100%;
            `),
        },
        [elementsContainer, newVideoElement]
    );

    const main = createElement('div', {}, [container]);

    videoElement.parentNode.insertBefore(main, videoElement);
    videoElement.parentNode.removeChild(videoElement);

    const videoElements = new VideoElements(
        main,
        elementsContainer,
        newVideoElement
    );

    return videoElements;
}
