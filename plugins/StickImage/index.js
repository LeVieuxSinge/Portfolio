import { Showcase } from "./src/Showcase";
import { Slides } from "./src/Slides";
import { Cursor } from "./src/Cursor";
import image1 from "~/assets/images/back.png";
import image2 from "~/assets/images/bottom.png";
import image3 from "~/assets/images/front.png";
import image4 from "~/assets/images/head_sculpt.png";
import image5 from "~/assets/images/top.png";

const container = document.getElementById("app"); //
const cursor = new Cursor(document.querySelector(".cursor")); //
const slidesData = [ //
  {
    image: image1,
    title: "Segovia",
    meta: "Spain / Castile and León"
  },
  {
    image: image2,
    title: "Barcelona",
    meta: "Spain / Catalonia"
  },
  {
    image: image3,
    title: "Málaga",
    meta: "Spain / Andalusia"
  },
  {
    image: image4,
    title: "Pamplona",
    meta: "Spain / Navarre"
  },
  {
    image: image5,
    title: "Bilbao",
    meta: "Spain / Biscay"
  }
];

const slides = new Slides(slidesData);
const showcase = new Showcase(slidesData, {
  onActiveIndexChange: activeIndex => {
    slides.onActiveIndexChange(activeIndex);
  },
  onIndexChange: index => {
    slides.onMove(index);
  },
  onZoomOutStart: ({ activeIndex }) => {
    cursor.enter();
    slides.appear();
  },
  onZoomOutFinish: ({ activeIndex }) => {},
  onFullscreenStart: ({ activeIndex }) => {
    cursor.leave();
    slides.disperse(activeIndex);
  },
  onFullscreenFinish: ({ activeIndex }) => {}
});

showcase.mount(container);
slides.mount(container);
showcase.render();

window.addEventListener("resize", function() {
  showcase.onResize();
});

window.addEventListener("mousemove", function(ev) {
  showcase.onMouseMove(ev);
});
