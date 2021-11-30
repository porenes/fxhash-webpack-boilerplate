import p5 from "p5";

const shapeColorPalNames = [
  "Earth Feeling",
  "Hot Fire",
  "Green Wash",
  "Smooth Water",
  "Dark Fire",
  "Rainbow !",
  "Pink Parade",
  "Acid Green",
  "Bloody Sunday",
  "Under the sea",
];
const shapeColorPal = [
  ["cb997e", "ddbea9", "ffe8d6", "b7b7a4", "a5a58d", "6b705c"], //https://coolors.co/cb997e-ddbea9-ffe8d6-b7b7a4-a5a58d-6b705c
  ["220901", "621708", "941b0c", "bc3908", "f6aa1c"], //https://coolors.co/220901-621708-941b0c-bc3908-f6aa1c
  ["1c7c54", "73e2a7", "def4c6", "1b512d", "b1cf5f"], //https://coolors.co/1c7c54-73e2a7-def4c6-1b512d-b1cf5f
  ["5465ff", "788bff", "9bb1ff", "bfd7ff", "e2fdff"], // mid day
  [
    "03071e",
    "370617",
    "6a040f",
    "9d0208",
    "d00000",
    "dc2f02",
    "e85d04",
    "f48c06",
    "faa307",
    "ffba08",
  ], //https://coolors.co/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08
  [
    "ff0000",
    "ff8700",
    "ffd300",
    "deff0a",
    "a1ff0a",
    "0aff99",
    "0aefff",
    "147df5",
    "580aff",
    "be0aff",
  ], //https://coolors.co/ff0000-ff8700-ffd300-deff0a-a1ff0a-0aff99-0aefff-147df5-580aff-be0aff
  ["2a1559", "3d4073", "a61f82", "f21d92", "f291b5"], //Pink Parade
  [
    "007f5f",
    "2b9348",
    "55a630",
    "80b918",
    "aacc00",
    "bfd200",
    "d4d700",
    "dddf00",
    "eeef20",
    "ffff3f",
  ], //Acid Green

  [
    "e53939",
    "db1515",
    "bd0f0f",
    "db1d1d",
    "bd1515",
    "d21515",
    "c90c0c",
    "e01414",
  ], // Bloody Sunday
  [
    "00eeee",
    "00eedd",
    "00eecc",
    "00eebb",
    "00eeaa",
    "00ee99",
    "00ee88",
    "00ee77",
  ], // Under the sea
];
const BG = 10;

// these are the variables you can use as inputs to your algorithms
console.log(fxhash); // the 64 chars hex number fed to your algorithm
console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()
const seed = ~~(fxrand() * 123456789);
let s;

const { step, form, palette, paletteName, curved, spacing, spacingName } =
  getTraits();
console.log(getTraits());
const BORDER = 1 / step;

function getTraits() {
  let step = 8;
  let sStep = fxrand();
  if (sStep > 0.2) step *= 2;
  if (sStep > 0.8) step *= 2;
  if (sStep > 0.98) step = 4;
  if (sStep < 0.02) step = 64;
  let form = 0;
  if (fxrand() > 0.2) form = Math.ceil(7 * fxrand());
  let palId = Math.floor(shapeColorPal.length * fxrand());
  let palette = shapeColorPal[palId];
  let paletteName = shapeColorPalNames[palId];
  let curved = step == 4 || fxrand() < 0.2;
  let spacing = 0.8 + 0.4 * fxrand();
  let spacingName = "Standard";
  if (spacing < 0.92) spacingName = "Narrow";
  if (spacing > 1.1) spacingName = "Wide";
  return { step, form, palette, paletteName, curved, spacing, spacingName };
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
  "Density ": step,
  "Curved ": curved,
  "Pattern ": form,
  "Spacing ": spacingName,
};

let sketch = function (p5) {
  p5.setup = function () {
    p5.noLoop();
    s = p5.min(p5.windowWidth, p5.windowHeight);
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(s, s);
  };

  p5.draw = function () {
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
  };

  p5.windowResized = function () {
    s = p5.min(p5.windowWidth, p5.windowHeight);
    p5.resizeCanvas(s, s);
  };
};

let myp5 = new p5(sketch, window.document.body);
