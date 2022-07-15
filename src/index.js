import {
  FXInit,
  FXRandomBetween,
  FXRandomBool,
  FXRandomIntBetween,
  FXRandomOption,
  getWeightedOption,
} from "@liamegan1/fxhash-helpers";
import p5 from "p5";
import p5Svg from "p5.js-svg";

const shapeColorPalNames = [
  "Hot Fire",
  "Rainbow !",
  "Pink Parade",
  "Acid Green",
  "Dusk blue",
  "Phoenix orange",
  "Bloody Sunday",
  "Under the sea",
  "Grey",
  "Violet Candy",
];

const shapeColorPalStr = [
  "FF0000-FF0D00-FF1A00-FF2601-FF3301-FF4001-FF4D01-FF5901-FF6601-FF7302-FF8002-FF8D02-FF9902-FFA602-FFB302-FFC003-FFCC03-FFD903-FFE603", // https://coolors.co/gradient-palette/ff4400-ffe603?number=19
  "ff0000-ff8700-ffd300-deff0a-a1ff0a-0aff99-0aefff-147df5-580aff-be0aff", //https://coolors.co/ff0000-ff8700-ffd300-deff0a-a1ff0a-0aff99-0aefff-147df5-580aff-be0aff
  "fb13c1-fc2bc4-fc3dc3-fd46c3-fd4fc3-fd62c5-fd76c5-fe88c5-fea0c7-ffb2c9", //Pink Parade better
  "007f5f-2b9348-55a630-80b918-aacc00-bfd200-d4d700-dddf00-eeef20-ffff3f", //Acid Green
  "0a688d-0b7199-0c79a0-0d7ca8-178bb9-1e9acb-43b3db-71cfc0-9eeaa5-f4fbdf", //dusk blue
  "bb31e1-dd00ff-ee2480-ff4800-ff5400-ff6000-ff6d00-ff8500-ff9100-ff9e00", //Phoenix
  "e53939-db1515-bd0f0f-db1d1d-cc1919-bd1515-d21515-c90c0c-d51010-e01414", // Bloody Sunday
  "00eeee-00eedd-00eecc-00eebb-00eeaa-00ee99-00ee88-00ee77", // Under the sea
  "f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529", //grey
  "f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0", //Candy
];
const artPalStrName = [
  "Blues",
  "Espoir",
  "Klein vibes",
  "Wedfest 2022",
  "Stendhal",
  "France",
  "Blueprint",
  "Chartreuse",
  "Lavender field",
  "La nuit étoilée",
];
const artPalStr = [
  "111722-7e444b-ca8787-94bad7-4088bf-085691-1063a2-1973b8-2a8eda-f7f5f5",
  "0d0d0d-1b1b1b-222222-292929-373737-454545-4f4f4f-828382-d2d2d3-f1f1f1",
  "344cb9-283aa2-1b288a-18247f-152073-141e6d-121c67-0f185b-d7c99a-f2e4c7", //ANTHROPOMETRY: PRINCESS HELENA BY YVES KLEIN
  "d13e85-9b2248-65060a-3a174b-0e288b-1e7fbc-26abd4-2dd6ec-f2f3fa",
  "0b090a-111214-161a1d-660708-a4161a-af171b-ba181b-d0282b-e5383b-d3d3d3",
  "011d95-112c9c-213aa3-909cd1-fffeff-f89fa7-f13f4e-f03141-ee2334-000101",
  "cfd2cf-daddda-dfe2df-e2e5e2-e4e7e4-d7dadb-d0d4d6-c9cdd1-9aa0af-0a1647",
  "edfa5f-ebfb62-e8fb64-e2fc68-d7fd70-c0ff80-b0ff60-a0ff40-80ff00-444444",
  "869884-93a791-f4f6f6-31572c-ceafe6-a28bb4-8c799b-766781-1e1e1c-ecf39e",
  "fd9902-fd9d02-feaa01-ffb805-85cef0-14a3c7-fe9501-fe8c01-fa8500-041529",
];

let toColPal = (colPalString) => {
  let colArray = colPalString.split("-");
  return colArray.map((c) => "#" + c);
};
const BG = 10;

console.log(`fxhash - template`);
console.log(`
Patxol - 2022`);

// these are the variables you can use as inputs to your algorithms
console.log(fxhash); // the 64 chars hex number fed to your algorithm
// console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()
const seed = ~~(fxrand() * 123456789);
FXInit(fxrand);
let s;
const { palette, paletteName, artistPalette, RATIO } = getTraits();
function getTraits() {
  // RATIO
  let pRATIO = fxrand();
  let RATIO = pRATIO < 0.1 ? 7 / 5 : pRATIO > 0.9 ? 1 : 5 / 7;
  // Palettes
  let artistPalette = fxrand() < 0.4;
  let strPal = artistPalette ? artPalStr : shapeColorPalStr;
  let strNamePal = artistPalette ? artPalStrName : shapeColorPalNames;
  let palId = Math.floor(strPal.length * fxrand());
  let palette = toColPal(strPal[palId]);
  let paletteName = strNamePal[palId];

  let traits = {
    palette,
    paletteName,
    artistPalette,
    RATIO,
  };
  // console.log(traits);
  return traits;
}

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
window.$fxhashFeatures = {
  "Color Palette ": paletteName,
  "Aspect ratio": RATIO == 1 ? "1:1" : RATIO > 1 ? "Landscape" : "Portrait",
};

console.log(window.$fxhashFeatures);

// adding SVG
p5Svg(p5);
let sketch = function (p5) {
  p5.setup = function () {
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
    p5.angleMode(p5.DEGREES);
    p5.noLoop();
    s = Math.min(p5.windowWidth / RATIO, p5.windowHeight);
    p5.createCanvas(s * RATIO, s, false ? p5.SVG : "");

    /**
     * Add setup code here
     */
  };

  p5.draw = function () {
    /**
     * Add drawing instructions here
     */
  };

  p5.windowResized = function () {
    s = p5.min(p5.windowWidth / RATIO, p5.windowHeight);
    i = 1;
    p5.resizeCanvas(s * RATIO, s);
    p5.loop();
  };

  p5.keyTyped = function () {
    if (p5.key == "s") {
      p5.save();
    }
  };
};

let myp5 = new p5(sketch, window.document.body);
