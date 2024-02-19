import PhotoSwipeLightbox from "photoswipe/lightbox";
import IMask from "imask";
/////////////////////////////////////
// Circle countdown

const FULL_DASH_ARRAY = 283;
const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

if (document.getElementById("countdown")) {
  document.getElementById("countdown").innerHTML = `
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          stroke="currentColor"
          stroke-width="2"
          class="base-timer__path-remaining"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
      timeLeft
    )}</span>
  </div>
  `;

  startTimer();
}

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  let seconds = time;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}`;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  const result = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  return result < 0 ? 0 : result;
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

////////////////////////////
/// Swiper slides

//---------- feature slides home page ----------//
const featureSlider = new Swiper(".feature-slider", {
  speed: 400,
  spaceBetween: 20,
  slidesPerView: 4,
  navigation: {
    nextEl: ".features-slider-controls .btn-secondary-black",
    prevEl: ".features-slider-controls .btn-secondary",
  },
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    640: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

//---------- Stats slides home page ----------//
const statsSlider = new Swiper(".stats-slider", {
  speed: 400,
  spaceBetween: 20,
  slidesPerView: 4,
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    640: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

//---------- brands slides home page ----------//
const partnersSlider = new Swiper(".partners-slider", {
  speed: 400,
  spaceBetween: 20,
  grid: {
    rows: 2,
  },
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 2,
      spaceBetween: 15,
      grid: {
        rows: 1,
      },
    },
    // when window width is >= 480px
    640: {
      slidesPerView: 4,
      spaceBetween: 15,
      grid: {
        rows: 2,
      },
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
      grid: {
        rows: 2,
      },
    },
  },
});

//---------- Related posts postwiew page ----------//
var postSlider = new Swiper(".post-slider", {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  hashNavigation: {
    watchState: true,
  },

  // If we need pagination
  pagination: {
    el: ".post-slider__pagination",
    clickable: true,
    bulletClass: "post-slider__blt",
    bulletActiveClass: "post-slider__blt--active",
    currentClass: "post-slider__blt--current",
    hiddenClass: "hidden",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".post-slider__button.next",
    prevEl: ".post-slider__button.prev",
  },
});

//---------- Instagram stories slides ----------//

let instaStoryOptions = {
  loop: true,
  watchSlidesProgress: true,
  allowTouchMove: 0,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 1,
  navigation: {
    nextEl: ".slide-button-next",
    prevEl: ".slide-button-prev",
  },
  pagination: {
    el: ".slidee-pagination",
    renderBullet: function (index, className) {
      return (
        '<div class="' +
        className +
        '"> <div class="swiper-pagination-progress"></div> </div>'
      );
    },
  },
  on: {
    autoplayTimeLeft(swiper, time, progress) {
      let currentSlide = document.querySelectorAll(".slide.swiper-slide")[
        swiper.activeIndex
      ];
      let currentBullet = document.querySelectorAll(
        ".slides-wrapper .swiper-pagination-progress"
      )[swiper.realIndex];
      let fullTime = currentSlide.dataset.swiperAutoplay
        ? parseInt(currentSlide.dataset.swiperAutoplay)
        : swiper.params.autoplay.delay;

      let percentage =
        Math.min(
          Math.max(
            parseFloat((((fullTime - time) * 100) / fullTime).toFixed(1)),
            0
          ),
          100
        ) + "%";

      if (currentBullet)
        currentBullet.style.setProperty("--progress", percentage);
    },
    transitionEnd(swiper) {
      let allBullets = [
        ...document.querySelectorAll(
          ".slides-wrapper .swiper-pagination-progress"
        ),
      ];
      let bulletsBefore = allBullets.slice(0, swiper.realIndex);
      let bulletsAfter = allBullets.slice(swiper.realIndex, allBullets.length);
      if (bulletsBefore.length) {
        bulletsBefore.forEach((element) => {
          element.style.setProperty("--progress", 100 + "%");
        });
      }
      if (bulletsAfter.length) {
        bulletsAfter.forEach((element) => {
          element.style.setProperty("--progress", 0 + "%");
        });
      }
    },
  },
};

let swiperStory = new Swiper(".home-hero-slider", instaStoryOptions);
let aboutSwiperStory = new Swiper(".about-hero-slider", instaStoryOptions);

console.log(swiperStory);
console.log(aboutSwiperStory);

aboutSwiperStory.on("transitionEnd", () => {
  let animationEl = document.querySelector(".animating-cards");
  if (![...animationEl.classList].includes("animate")) {
    animationEl.classList.add("animate");
    let timerStory = setTimeout(() => {
      animationEl.classList.remove("animate");
      clearThatTimer(timerStory);
    }, 680);
  }
});

////////////////////////////
/// Photoswipe slides

//---------- Postview lightbox ----------//
const postLightbox = new PhotoSwipeLightbox({
  gallery: "#post-gallery",
  children: "a",
  mainClass: "pswp--custom-bg",
  padding: { top: 40, bottom: 60, left: 0, right: 0 },
  bgOpacity: 0.4,
  pswpModule: () => import("photoswipe"),
});
postLightbox.init();

////////////////////////////
/// Toasters
let successToast = {
  message: "Muvaffaqiyatli ro‘yxatdan o‘tdingiz!",
  icon: "badge-verified",
  state: "success",
  timeout: 5000,
};

var autoincrement = 0;

let toaster = (options, id) => {
  var toast = document.createElement("div");
  toast.id = "toast-" + id;
  toast.className = "toast animate-slideIn";
  let toastBody = toastContent(options);

  toast.innerHTML = toastBody;

  // click callback
  if (typeof options.callback === "function") {
    toast.addEventListener("click", options.callback);
  }

  return toast;
};

function toastHide(toast) {
  toast.classList.add("animate-slideOut");
  toast.addEventListener("animationend", removeToast(toast), false);
}

function removeToast(toast) {
  document.getElementById("toast-container").removeChild(toast);
  console.log("deleted");
}

function toast(options) {
  const toastEl = toaster(options, ++autoincrement);

  if (!document.getElementById("toast-container")) {
    // Toast container
    var container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);

    setTimeout(() => {
      toastEl.classList.remove("animate-slideIn");
    }, 2000);
  }

  toastEl
    .querySelector(".timer-progress")
    .style.setProperty("animation-duration", `${options.timeout}ms`);

  document.getElementById("toast-container").appendChild(toastEl);

  if (options.timeout) {
    setTimeout(() => {
      toastEl.classList.add("animate-slideOut");
      toastEl.addEventListener(
        "animationend",
        () => {
          document.getElementById("toast-container").removeChild(toastEl);
        },
        false
      );
    }, options.timeout);
  }
}

let toasts = document.querySelectorAll(".toast");

toasts.forEach((toast) => {
  let timeout = toast.dataset.timeout;
  timeout &&
    toast
      .querySelector(".timer-progress")
      .style.setProperty("animation-duration", `${timeout}ms`);

  toast
    .querySelector(".timer-progress")
    .addEventListener("animationend", () => {
      toast.parentNode.removeChild(toast);
    });
});

////////////////////////////
/// Image Upload
const inputFile = document.getElementById("uploadImage");
const image = document.getElementById("profilePic");
const deleteFile = document.getElementById("deleteImage");
const fileLabel = document.getElementById("fileLabel");
const iconUpload = fileLabel && fileLabel.querySelector(".upload");
const iconDelete = fileLabel && fileLabel.querySelector(".delete");

inputFile &&
  inputFile.addEventListener("change", function () {
    imageUpload(this.files[0], image, fileLabel);
  });

deleteFile &&
  deleteFile.addEventListener("click", function () {
    clearFileList(inputFile);
    hideEl(image);
    clearImageSrc(image);
    changeIcon(iconDelete, iconUpload);
    changeLabelFor(fileLabel, "uploadImage");
  });

////////////////////////////
/// UTILITIES

//---------- Timeout clearance ----------//
let clearThatTimer = (id) => {
  clearTimeout(id);
};

//---------- Toaster example ----------//

let toastContent = (options) => {
  // icon
  if (options.state) {
    var state = options.state;
  }
  // message
  if (options.message) {
    var message = options.message;
  }

  // icon
  if (options.icon) {
    var icon = options.icon;
  }

  let output = `
  <div class="toast__body">
    <div class="response ${state ? "response--" + state : ""}">
      <svg class="icon !w-6">
        <use xlink:href="#icon-${icon ? icon : "badge-verified"}"></use>
      </svg>
      <span class="response__text"
        >${message ? message : "Muvaffaqiyatli ro‘yxatdan o‘tdingiz!"}</span
      >
    </div>
    <div class="timer-progress reverse"></div>
  </div>`;

  return output;
};

function show() {
  console.log("works");
  toast(successToast);
}

show();

//---------- File uploaded ----------//
const imageUpload = (inputFile, image, fileLabel) => {
  let file = getFileInstance(inputFile);
  file.addEventListener("load", () => imagePreview(event.target.result, image));
  changeLabelFor(fileLabel, "deleteImage");
  changeIcon(iconUpload, iconDelete);
};

const getFileInstance = (file) => {
  if (file) {
    var picture = new FileReader();
    picture.readAsDataURL(file);
  }
  return picture;
};

const imagePreview = (file, img) => {
  img.setAttribute("src", file);
  [...img.classList].includes("hidden") && img.classList.remove("hidden");
};

const changeIcon = (toBeHidden, toBeShown) => {
  ![...toBeHidden.classList].includes("hidden") &&
    toBeHidden.classList.add("hidden");
  [...toBeShown.classList].includes("hidden") &&
    toBeShown.classList.remove("hidden");
};

const clearFileList = (inputFile) => {
  inputFile.value = "";
};

const hideEl = (el) => {
  ![...el.classList].includes("hidden") && el.classList.add("hidden");
};

const clearImageSrc = (img) => {
  img.src = "#";
};

const changeLabelFor = (label, value) => {
  label.setAttribute("for", value);
};

const phoneMask = document.getElementById("phone-mask");
const maskOptions = {
  mask: "+{998}000000000",
  lazy: false,
};

if (phoneMask) {
  const mask = new IMask(phoneMask, maskOptions);
}
