import p5 from "p5";

const shapeColorPalNames = [
  "Earth Feeling",
  "Hot Fire",
  "Green Wash",
  "Smooth Water",
  // "Dark Fire",
  "Rainbow !",
  "Pink Parade",
  "Acid Green",
  "Dusk blue",
  "Pheonix orange",
  "Bloody Sunday",
  "Under the sea",
  "Grey",
];

const shapeColorPalStr = [
  "cb997e-ddbea9-ffe8d6-b7b7a4-a5a58d-6b705c", //https://coolors.co/cb997e-ddbea9-ffe8d6-b7b7a4-a5a58d-6b705c
  "FF4400-FF4D00-FF5600-FF5F01-FF6801-FF7101-FF7A01-FF8301-FF8C01-FF9502-FF9E02-FFA702-FFB002-FFB902-FFC202-FFCB03-FFD403-FFDD03-FFE603", // https://coolors.co/gradient-palette/ff4400-ffe603?number=19
  "1c7c54-73e2a7-def4c6-1b512d-b1cf5f", //https://coolors.co/1c7c54-73e2a7-def4c6-1b512d-b1cf5f
  "5465ff-788bff-9bb1ff-bfd7ff-e2fdff", // mid day
  // "03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08", //https://coolors.co/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08
  "ff0000-ff8700-ffd300-deff0a-a1ff0a-0aff99-0aefff-147df5-580aff-be0aff", //https://coolors.co/ff0000-ff8700-ffd300-deff0a-a1ff0a-0aff99-0aefff-147df5-580aff-be0aff
  // ["2a1559-3d4073-a61f82-f21d92-f291b5", //Pink Parade
  "F809BC-F91DBD-FA32BE-FB46BF-FC5BC0-FC6FC1-FD83C2-FE98C3-FFACC4", //Pink Parade better
  "007f5f-2b9348-55a630-80b918-aacc00-bfd200-d4d700-dddf00-eeef20-ffff3f", //Acid Green
  "01161e-124559-598392-aec3b0-eff6e0", //dusk blue
  "ff4800-ff5400-ff6000-ff6d00-ff7900-ff8500-ff9100-ff9e00-ffaa00-ffb600", //phoenix orange
  "e53939-db1515-bd0f0f-db1d1d-bd1515-d21515-c90c0c-e01414", // Bloody Sunday
  "00eeee-00eedd-00eecc-00eebb-00eeaa-00ee99-00ee88-00ee77", // Under the sea
  "f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529", //grey
];
const artPalStrName = [
  "FLOWERS, 1964, BY ANDY WARHOL",
  "A MOUNTAIN SCENE, VAL D'AOSTA BY J. M. W. TURNER",
  "HIDE-AND-SEEK BY PAVEL TCHELITCHEW",
  "LARGE GREEN VASE WITH MIXED FLOWERS BY ODILON REDON",
  "LES DEMOISELLES D'AVIGNON BY PABLO PICASSO",
  "BOUQUET OF SUNFLOWERS BY CLAUDE MONET",
  "WATER LILIES (1906) BY CLAUDE MONET",
  "BROADWAY BOOGIE WOOGIE BY PIET MONDRIAN",
  "SQUIGGLES BY SOL LEWITT",
  "ANTHROPOMETRY: PRINCESS HELENA BY YVES KLEIN",
  "DUSTHEADS BY JEAN-MICHEL BASQUIAT",
  "THE SIESTA BY PAUL GAUGUIN",
];
const artPalStr = [
  "F26386-F588AF-FCBC52-FD814E-A4D984", //FLOWERS, 1964, BY ANDY WARHOL
  "F1ECCE-9EA3B5-E9D688-A85835-AE8045", //A MOUNTAIN SCENE, VAL D'AOSTA BY J. M. W. TURNER
  "AC2527-F8CC5A-5C8447-61221A-2B4868", //HIDE-AND-SEEK BY PAVEL TCHELITCHEW
  "695B8F-B26C61-4D5E30-8B1F1D-C2AF46", //LARGE GREEN VASE WITH MIXED FLOWERS BY ODILON REDON
  "CD6C74-DD9D91-A1544B-D5898D-566C7D", //LES DEMOISELLES D'AVIGNON BY PABLO PICASSO
  "548150-DEB738-734321-852419-184430", //BOUQUET OF SUNFLOWERS BY CLAUDE MONET
  "9F4640-7EA860-B985BA-395A92-4885A4", //WATER LILIES (1906) BY CLAUDE MONET
  "314290-4A71C0-F1F2ED-F0D32D-AB3A2C", //BROADWAY BOOGIE WOOGIE BY PIET MONDRIAN
  "0A71B6-F9C40A-190506-EB5432-EAF2F0", //SQUIGGLES BY SOL LEWITT
  "344CB9-1B288A-0F185B-D7C99A-F2E4C7", //ANTHROPOMETRY: PRINCESS HELENA BY YVES KLEIN
  "C11432-009ADA-66A64F-FDD10A-070707", //DUSTHEADS BY JEAN-MICHEL BASQUIAT
  "21344F-8AAD05-E2CE1B-DF5D22-E17976", //THE SIESTA BY PAUL GAUGUIN
];

let toColPal = (colPalString) => {
  let colArray = colPalString.split("-");
  return colArray.map((c) => "#" + c);
};
const BG = 10;

// these are the variables you can use as inputs to your algorithms
console.log(fxhash); // the 64 chars hex number fed to your algorithm
console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()
const seed = ~~(fxrand() * 123456789);
let s;
const {
  palette,
  paletteName,
  artistPalette,
  dancerNum,
  rectNum,
  curveComplexity,
  isSharp,
  noiseType,
  frameType,
  framePos,
  isColorNoise,
  swR,
  swRName,
} = getTraits();

function getTraits() {
  let artistPalette = fxrand() < 0.3;
  let strPal = artistPalette ? artPalStr : shapeColorPalStr;
  let strNamePal = artistPalette ? artPalStrName : shapeColorPalNames;
  let palId = Math.floor(strPal.length * fxrand());
  let palette = toColPal(strPal[palId]);
  let paletteName = strNamePal[palId];
  let dancerNum = Math.floor(1 + fxrand() * 5);
  let rectNum = Math.floor(20 * fxrand()) * 5;
  let curveComplexity = Math.floor(3 + fxrand() * 10);
  let isSharp = fxrand() > 0.9;
  let noiseType =
    artistPalette || fxrand() > 0.5
      ? "PLAIN"
      : fxrand() > 0.5
      ? fxrand() > 0.5
        ? "CENTER"
        : "LINES"
      : fxrand() > 0.5
      ? "MOUNTAIN"
      : "WAVES";
  let frameType = fxrand() > 0.7 ? "NONE" : fxrand() > 0.5 ? "SOFT" : "HARD";
  let framePos =
    frameType == "NONE"
      ? "N/A"
      : fxrand() > 0.5
      ? "FULL"
      : fxrand() > 0.5
      ? "BOTTOM RIGHT"
      : "UPPER LEFT";
  let isColorNoise = !artistPalette && fxrand() > 0.5;
  const swRNames = ["Thick", "Standard", "Thin", "Ultrathin"];
  const swOpt = [400, 800, 1500, 3000];
  let swRId = Math.floor(swOpt.length * fxrand());
  let swR = swOpt[swRId];
  let swRName = swRNames[swRId];
  let traits = {
    palette,
    paletteName,
    artistPalette,
    dancerNum,
    rectNum,
    curveComplexity,
    isSharp,
    noiseType,
    frameType,
    framePos,
    isColorNoise,
    swR,
    swRName,
  };
  console.log(traits);
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
  "Blooming dancers ": dancerNum,
  "Shades ": artistPalette ? "N/A" : rectNum,
  "Complexity ": curveComplexity,
  "Sharp ": isSharp,
  "Noise ": noiseType,
  "Frame type": frameType,
  "Frame position": framePos,
  "Colored noise ": isColorNoise,
  "Stroke ": swRName,
};

let sketch = function (p5) {
  p5.setup = function () {
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
    p5.noLoop();
    s = p5.min(p5.windowWidth, p5.windowHeight);
    p5.angleMode(p5.DEGREES);
    p5.createCanvas(s, s);
  };

  p5.draw = function () {};

  p5.windowResized = function () {
    s = p5.min(p5.windowWidth, p5.windowHeight);
    p5.resizeCanvas(s, s);
  };
};

let myp5 = new p5(sketch, window.document.body);
