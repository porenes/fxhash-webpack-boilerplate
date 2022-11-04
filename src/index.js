import {
  FXInit,
  FXRandomBetween,
  FXRandomBool,
  FXRandomIntBetween,
  FXRandomOption,
  FXGetWeightedOption,
} from "@liamegan1/fxhash-helpers";
import p5 from "p5";
import p5Svg from "p5.js-svg";

const PALETTES = [
  {
    name: "Blues",
    colors:
      "111722,7e444b,ca8787,94bad7,4088bf,085691,1063a2,1973b8,2a8eda,f7f5f5",
    weight: 10,
    weight_alt: 0,
  },
];

let toColPal = (colPalString) => {
  let colArray = colPalString.split(",");
  return colArray.map((c) => "#" + c);
};
const BG = 10;

console.log(`fxhash - template`);
console.log(`
Patxol - 2022`);

// these are the variables you can use as inputs to your algorithms
console.log(window.location.href + "?fxhash=" + fxhash); // the 64 chars hex number fed to your algorithm
// console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()
const seed = ~~(fxrand() * 123456789);
FXInit(fxrand);
let s;
const { palette, paletteName, RATIO, BORDER } = getTraits();
function getTraits() {
  // RATIO
  let RATIO = FXGetWeightedOption([
    [7 / 5, 0],
    [1, 80],
    [5 / 7, 0],
  ]);
  // RATIO = 1;
  // Palettes
  const mainPalette = FXGetWeightedOption(PALETTES.map((p) => [p, p.weight]));
  let palette = toColPal(mainPalette.colors);
  let paletteName = mainPalette.name;
  //BORDER
  const BORDER = 0.03;

  let traits = {
    palette,
    paletteName,
    RATIO,
    BORDER,
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

console.table(window.$fxhashFeatures);

// adding SVG
p5Svg(p5);
let isSVG = false;

// here it starts
let sketch = function (p5) {
  p5.setup = function () {
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
    p5.angleMode(p5.DEGREES);
    p5.noLoop();
    s = Math.min(p5.windowWidth / RATIO, p5.windowHeight);
    p5.createCanvas(s * RATIO, s, isSVG ? p5.SVG : "");

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
    p5.resizeCanvas(s * RATIO, s);
  };

  p5.keyTyped = function () {
    if (p5.key == "s") {
      p5.save();
    }
  };
};

let myp5 = new p5(sketch, window.document.body);
