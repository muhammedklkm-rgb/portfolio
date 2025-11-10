// PREELOADER

gsap.registerPlugin(ScrollTrigger);
document.addEventListener('DOMContentLoaded', function () {
    const introTl = gsap.timeline({ repeat: 0 });
    const introWords = gsap.utils.toArray(".introText");

    introWords.forEach((word) => {
        introTl.fromTo(word, {
            opacity: 0,
            scale: 0.8,
            yPercent: 100,
        }, {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            duration: 0.15,
            ease: "power2.out"
        })
            .to(word, {
                opacity: 0,
                scale: 1.1,
                yPercent: -100,
                duration: 0.15,
                delay: 0.1,
                ease: "power2.in"
            });
    });
    const masterTl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
            document.getElementById('preLoader').style.display = 'none';
            AOS.init();
        }
    });
    masterTl
        .add(introTl)
        .to("#preLoader", {
            yPercent: -100,
            duration: 1.2,
        }, "-=0.5")
        .from("h1 span", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
        }, "<0.5");
});




// header

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menuOverlay = document.getElementById("menuOverlay");
const mainTalk = document.getElementById("mainTalk");

menuBtn.addEventListener("click", () => {
    menuOverlay.classList.add("active");
    mainTalk.style.display = "none";
});

closeBtn.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    mainTalk.style.display = "inline-block";
});



// SCROLL GALLERY

const columnsUp = document.querySelectorAll('.column-up');
const columnsDown = document.querySelectorAll('.column-down');
const projectGrid = document.querySelector('.project-grid');
const SCROLL_SPEED = 0.2;
const INITIAL_OFFSET = 200;
function handleScroll() {
    const scrollAmount = window.scrollY;
    columnsUp.forEach(column => {

        const moveY = -scrollAmount * SCROLL_SPEED;
        column.style.transform = `translateY(${moveY}px)`;
    });
    columnsDown.forEach(column => {

        const moveY = (scrollAmount * SCROLL_SPEED) - INITIAL_OFFSET;
        column.style.transform = `translateY(${moveY}px)`;
    });
}
window.addEventListener('scroll', handleScroll);
handleScroll();











gsap.registerPlugin(ScrollTrigger);

// Animate color for each line based on its own scroll position
document.querySelectorAll(".ab-tex span").forEach((line) => {
    gsap.to(line, {
        color: "#000", // change to any color you want
        ease: "none",
        scrollTrigger: {
            trigger: line,       // each span triggers itself
            start: "top 85%",    // when line starts to appear
            end: "top 40%",      // when line reaches center area
            scrub: true,
            toggleActions: "play reverse play reverse"
        }
    });
});










gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-section",
        start: "top center",
        end: "bottom top",
        scrub: true,
    }
});


tl.to(".text-1 .text-inner1", { xPercent: -40, ease: "none" }, 0)
    .to(".text-2 .text-inner2", { xPercent: 40, ease: "none" }, 0)

    .to(".center-image img", { scale: 1.8, ease: "power1.out" }, 0);










$('.testi').slick({
    dots: true,
    infinite: false,
    arrows: true,
    prevArrow: $('.pre-arrow'),
    nextArrow: $('.next-arrow'),
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]
});







































gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".project-card");

// Set stacking order
gsap.set(cards, { zIndex: (i, el, arr) => arr.length - i });

// Create timeline
const projectsTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".projects-section",
    start: "top top",
    end: "+=" + (cards.length * 100) + "%",
    scrub: true,
    pin: true,
    pinSpacing: true,
    // markers: true,
  }
});

// Animate stack effect
cards.forEach((card, index) => {
  if (index !== cards.length - 1) {
    projectsTl.to(card, {
      yPercent: -100,
      scale: 0.95,
      ease: "none",
    }, "+=0.5");
  }
});



























const texts = ["Muhammed", "UI/UX Designer", "Web Developer"];
const el = document.getElementById("typingText");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// typing speed values
const typeSpeed = 85;  // each letter typing speed
const deleteSpeed = 50; // deleting speed
const wordPause = 600;  // pause after typing word

function typeEffect() {
  const current = texts[textIndex];
  
  // Type or delete letters
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  // Update text content instantly
  el.textContent = current.substring(0, charIndex);

  // Adjust speed dynamically
  let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

  // If word is complete
  if (!isDeleting && charIndex === current.length) {
    nextSpeed = wordPause; // short pause after word
    isDeleting = true;
  }

  // If word deleted completely
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    nextSpeed = 200; // quick jump to next word
  }

  // Call next frame
  setTimeout(typeEffect, nextSpeed);
}

// Start
typeEffect();
