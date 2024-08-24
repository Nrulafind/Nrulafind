document.addEventListener("DOMContentLoaded", function () {
    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
});

let TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};


document.addEventListener('DOMContentLoaded', () => {
    const bubleHeroes = document.querySelectorAll('.buble-hero');
    const images = [
        './assets/img/web-development.png',
        './assets/img/machine-learning.png',
        './assets/img/server.png',
        './assets/img/project-management.png',
    ];

    bubleHeroes.forEach((buble, index) => {
        const delay = index * 1.25;
        buble.style.animationDelay = `${delay}s`;
        buble.style.backgroundImage = `url(${images[index]})`;
    });
});

const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    @keyframes orbit {
        0% {
            transform: rotate(0deg) translateX(300px) rotate(0deg);
        }
        100% {
            transform: rotate(360deg) translateX(300px) rotate(-360deg);
        }
    }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    let slides = Array.from(track.children);

    // Duplicate slides for infinite loop
    function duplicateSlides() {
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Calculate track width dynamically
    function updateTrackWidth() {
        return track.scrollWidth;
    }

    // Start the carousel
    function startCarousel() {
        let trackWidth = updateTrackWidth();
        track.style.transition = "transform 5s linear";
        track.style.transform = `translateX(-${trackWidth / 2}px)`;

        track.addEventListener("transitionend", () => {
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            setTimeout(() => {
                track.style.transition = "transform 5s linear";
                track.style.transform = `translateX(-${trackWidth / 2}px)`;
            }, 50);
        });
    }

    // Initialize
    duplicateSlides();
    startCarousel();
});

