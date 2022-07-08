const surveys = document.querySelectorAll(`.survey`);
const selections = document.querySelectorAll(`.selection`);
const dimensionInputs = document.querySelectorAll(`.dimension-input`);
const requiredPlates = document.querySelector(`.required-plates`);
const requiredPoles = document.querySelector(`.required-poles`);
const requiredStruts = document.querySelector(`.required-struts`);
const requiredBoxes = document.querySelector(`.required-boxes`);
const requiredArms = document.querySelector(`.required-arm`);
const plateGrid = document.querySelector(`.plate-grid`);
const plateGridPole = document.querySelector(`.plate-grid-pole`);
const strutGrid = document.querySelector(`.strut-grid`);
const boxGrid = document.querySelector(`.box-grid`);
const armGrid = document.querySelector(`.arm-grid`);
const overviewGrid = document.querySelector(`.overview-products-grid`);

let returnAnswer = ``;

let sortedDataCeil = [];
let sortedDataPole = [];
let sortedDataMount = [];
let sortedDataStrut = [];
let sortedDataArm = [];
let sortedDataWall = [];

let strutMin;
let strutMax;
let totalDisplayLength;
let totalWeight;

const answers = [
  { mount: `` },
  { sides: `` },
  { orientation: `` },
  {
    displays: ``,
    gap: ``,
    width: ``,
    height: ``,
    weight: ``,
  },
];

let stagedItems = {};
let finalData;

for (let i = 0; i < surveys.length; i++) {
  if (i === 0) {
    continue;
  } else {
    surveys[i].style.display = `none`;
  }
}

// <----------------------Varaible ending---------------------------->

// <----------------------Popup Container---------------------------->

document.getElementById("open-snap").addEventListener("click", function () {
  window.open(
    "https://www.snapav.com/shop/UserAccountView?currentSelection=quickOrderSlct&catalogId=10010&langId=-1&storeId=10151"
  );
});
const popupContainer = document.querySelector(`.pop-up-container`);

popupContainer.style.display = "none";

document.getElementById("order-btn").addEventListener("click", function () {
  popupContainer.style.display = "flex";
  window.scrollTo(0, 0);
});

document.getElementById("x").addEventListener("click", function () {
  popupContainer.style.display = "none";
});

function copyText(lastCall) {
  let stagingItems = [];
  for (let i = 0; i < lastCall.ceiling.length; i++) {
    console.log(lastCall.ceiling[i]);
    stagingItems.push(
      `${lastCall.ceiling[i].sku}	${lastCall.ceiling[i].quantity} `
    );
  }
  for (let i = 0; i < lastCall.pole.length; i++) {
    console.log(lastCall.pole[i]);
    stagingItems.push(`${lastCall.pole[i].sku}	${lastCall.pole[i].quantity} `);
  }
  for (let i = 0; i < lastCall.strut.length; i++) {
    console.log(lastCall.strut[i]);
    stagingItems.push(`${lastCall.strut[i].sku}	${lastCall.strut[i].quantity} `);
  }
  for (let i = 0; i < lastCall.box.length; i++) {
    console.log(lastCall.box[i]);
    stagingItems.push(`${lastCall.box[i].sku}	${lastCall.box[i].quantity} `);
  }
  for (let i = 0; i < lastCall.arm.length; i++) {
    console.log(lastCall.arm[i]);
    stagingItems.push(`${lastCall.arm[i].sku}	${lastCall.arm[i].quantity} `);
  }

  console.log(stagingItems);
  let CopyItems = `${stagingItems}`;
  const finalItemList = CopyItems.replaceAll(",", "");
  console.log(finalItemList);

  navigator.clipboard.writeText(finalItemList);
}

// <----------------------Popup Container End---------------------------->

/////Axios call to wake up server
axios
  .get("https://snap-server2508.herokuapp.com/api")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// <----------------------Algorithm for specs start---------------------------->

function algorithmSetup() {
  const answerArr = answers[3];
  const display = parseInt(answerArr.displays);
  const width = parseInt(answerArr.width);
  const gap = parseInt(answerArr.gap);
  const weight = parseInt(answerArr.weight);
  const vesaWidth = display / 2;

  strutMin = display * width + ((display - 1) * gap) / 2 - (width - vesaWidth);
  console.log(strutMin);
  strutMax = display * width;

  totalDisplayLength = display * width + (display - 1) * gap;

  totalWeight = display * weight;
}

// <----------------------Algorithm for specs end---------------------------->

// <----------------------Event handling for prop and checking items staged Start---------------------------->

//on click after display to propigate ceiling plates
document.getElementById("sub").addEventListener("click", function () {
  const plates = document.querySelectorAll(".selection.plate");
  console.log(plates);
  if (plateGrid.childNodes.length > 0) {
    for (let i = 0; i < plateGrid.childNodes.length; i++) {
      plateGrid.innerHTML = "";
    }
  }

  if (answers[0].mount === "wall-mount") {
    for (let i = 0; i < plates.length; i++) {
      plates[i].classList.add(`disabled`);
    }
  } else if (answers[0].mount === "ceiling-mount") {
    for (let i = 0; i < plates.length; i++) {
      plates[i].classList.remove(`disabled`);
    }
  }
  propigateCeiling();
  algorithmSetup();
  window.scrollTo(0, 0);
});

document.getElementById("sub-poles").addEventListener("click", function () {
  if (plateGridPole.childNodes.length > 0) {
    for (let i = 0; i < plateGridPole.childNodes.length; i++) {
      plateGridPole.innerHTML = "";
    }
  }
  propigatePole();
  checkStagedItemsCeiling();
  window.scrollTo(0, 0);
});

document.getElementById("sub-struts").addEventListener("click", function () {
  if (strutGrid.childNodes.length > 0) {
    for (let i = 0; i < strutGrid.childNodes.length; i++) {
      strutGrid.innerHTML = "";
    }
  }
  if (boxGrid.childNodes.length > 0) {
    for (let i = 0; i < boxGrid.childNodes.length; i++) {
      boxGrid.innerHTML = "";
    }
  }

  propigateStruts();
  propigateBox();

  checkStagedItemsPoles();
  window.scrollTo(0, 0);
});

document.getElementById("sub-arm").addEventListener("click", function () {
  if (armGrid.childNodes.length > 0) {
    for (let i = 0; i < armGrid.childNodes.length; i++) {
      armGrid.innerHTML = "";
    }
  }

  propigateArm();
  checkStagedItemsStrut();
  checkStagedItemsBox();
  window.scrollTo(0, 0);
});

document.getElementById("sub-overview").addEventListener("click", function () {
  if (overviewGrid.childNodes.length > 0) {
    for (let i = 0; i < overviewGrid.childNodes.length; i++) {
      overviewGrid.innerHTML = "";
    }
  }
  checkStagedItemsArm();
  console.log(stagedItems);
  overviewAppend();
  window.scrollTo(0, 0);
});

// <----------------------Events ending---------------------------->

// <----------------------Event listeners to Unpop---------------------------->

// <----------------------Events ending---------------------------->

// <----------------------Item Staging Checking Functions Start---------------------------->

function checkStagedItemsCeiling() {
  let items = document.querySelectorAll(".ceiling");
  console.log(items);
  stagedItems.ceiling = [];
  for (let i = 0; i < items.length; i++) {
    let z = items[i].childNodes[1];
    let x = z.childNodes[2].childNodes[1].innerText;
    var numb = x.match(/\d/g);
    numb = numb.join("");
    if (numb > 0) {
      stagedItems.ceiling.push({
        quantity: numb,
        title: z.childNodes[0].innerText,
        sku: z.childNodes[1].innerText,
        img: items[i].childNodes[0].currentSrc,
        link: items[i].childNodes[1].childNodes[1].href,
      });
    }
  }
}
//
//
//
//
//
//
//
//

function checkStagedItemsPoles() {
  let items = document.querySelectorAll(".pole");
  stagedItems.pole = [];
  for (let i = 0; i < items.length; i++) {
    let z = items[i].childNodes[1];
    let x = z.childNodes[2].childNodes[1].innerText;
    var numb = x.match(/\d/g);
    numb = numb.join("");
    if (numb > 0) {
      stagedItems.pole.push({
        quantity: numb,
        title: z.childNodes[0].innerText,
        sku: z.childNodes[1].innerText,
        img: items[i].childNodes[0].currentSrc,
        link: items[i].childNodes[1].childNodes[1].href,
      });
    }
  }
}

function checkStagedItemsStrut() {
  let items = document.querySelectorAll(".strut");
  stagedItems.strut = [];
  for (let i = 0; i < items.length; i++) {
    let z = items[i].childNodes[1];
    let x = z.childNodes[2].childNodes[1].innerText;
    var numb = x.match(/\d/g);
    numb = numb.join("");
    if (numb > 0) {
      stagedItems.strut.push({
        quantity: numb,
        title: z.childNodes[0].innerText,
        sku: z.childNodes[1].innerText,
        img: items[i].childNodes[0].currentSrc,
        link: items[i].childNodes[1].childNodes[1].href,
      });
    }
  }
}

function checkStagedItemsBox() {
  let items = document.querySelectorAll(".box");
  stagedItems.box = [];
  for (let i = 0; i < items.length; i++) {
    let z = items[i].childNodes[1];
    let x = z.childNodes[2].childNodes[1].innerText;
    var numb = x.match(/\d/g);
    numb = numb.join("");
    if (numb > 0) {
      stagedItems.box.push({
        quantity: numb,
        title: z.childNodes[0].innerText,
        sku: z.childNodes[1].innerText,
        img: items[i].childNodes[0].currentSrc,
        link: items[i].childNodes[1].childNodes[1].href,
      });
    }
  }
}

function checkStagedItemsArm() {
  let items = document.querySelectorAll(".arms");
  stagedItems.arm = [];
  for (let i = 0; i < items.length; i++) {
    let z = items[i].childNodes[1];
    let x = z.childNodes[2].childNodes[1].innerText;
    var numb = x.match(/\d/g);
    numb = numb.join("");
    if (numb > 0) {
      stagedItems.arm.push({
        quantity: numb,
        title: z.childNodes[0].innerText,
        sku: z.childNodes[1].innerText,
        img: items[i].childNodes[0].currentSrc,
        link: items[i].childNodes[1].childNodes[1].href,
      });
    }
  }
}

// <----------------------Item Staging Checking Functions End---------------------------->

// <----------------------Filtering Functions Start--------------------------------->

//filtering system for ceiling plate i-beam
document.getElementById("i-beam").addEventListener("click", function () {
  let x = document.getElementsByClassName("item-container");
  for (let i = 0; i < x.length; i++) {
    if (x[i].childNodes[1].innerText.includes("I-Beam")) {
      x[i].style.display = `flex`;
    } else {
      x[i].style.display = `none`;
    }
  }
});

//filtering system for ceiling plates not i-beam
let allCeilingFilter = document.querySelectorAll("#all-ceiling-plates");

allCeilingFilter.forEach((item) => {
  item.addEventListener("click", function () {
    let x = document.getElementsByClassName("item-container");
    for (let i = 0; i < x.length; i++) {
      if (!x[i].childNodes[1].innerText.includes("I-Beam")) {
        x[i].style.display = `flex`;
      } else {
        x[i].style.display = `none`;
      }
    }
  });
});

//filtering system for fixed pole
document.getElementById("fixed-pole").addEventListener("click", function () {
  let x = document.getElementsByClassName("item-container");
  for (let i = 0; i < x.length; i++) {
    // console.log(x[i].childNodes[1].innerText);
    if (x[i].childNodes[1].innerText.includes("Adjustable")) {
      x[i].style.display = `none`;
    } else {
      x[i].style.display = `flex`;
    }
  }
});

//filtering system for adjustable pole
document.getElementById("adj-pole").addEventListener("click", function () {
  let x = document.getElementsByClassName("item-container");
  for (let i = 0; i < x.length; i++) {
    if (x[i].childNodes[1].innerText.includes("Adjustable")) {
      x[i].style.display = `flex`;
    } else {
      x[i].style.display = `none`;
    }
  }
});

// <----------------------Filtering Functions End--------------------------------->

// <----------------------Axios Call Start--------------------------------->

axios
  .get("https://snap-server2508.herokuapp.com/api")
  .then(function (response) {
    let apiData = response.data;
    apiData[0].forEach((item) => {
      sortedDataCeil.push(item);
    });
    apiData[1].forEach((item) => {
      sortedDataArm.push(item);
    });
    apiData[2].forEach((item) => {
      sortedDataPole.push(item);
    });
    apiData[3].forEach((item) => {
      sortedDataMount.push(item);
    });
    apiData[4].forEach((item) => {
      sortedDataStrut.push(item);
    });
    apiData[5].forEach((item) => {
      sortedDataWall.push(item);
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// <----------------------Axios Call End--------------------------------->

// <----------------------Item Propifation Functions Start--------------------------------->

function propigateCeiling() {
  if (answers[0].mount == "ceiling-mount") {
    for (let i = 0; i < sortedDataCeil.length; i++) {
      itemAppend(
        plateGrid,
        `${sortedDataCeil[i].description}`,
        `${sortedDataCeil[i].sku}`,
        `https://snap-server2508.herokuapp.com/${sortedDataCeil[i].sku}.jpg`,
        `ceiling`,
        `0`,
        `${sortedDataCeil[i].link}`
      );
    }
  } else {
    for (let i = 0; i < sortedDataWall.length; i++) {
      itemAppend(
        plateGrid,
        `${sortedDataWall[i].description}`,
        `${sortedDataWall[i].sku}`,
        `https://snap-server2508.herokuapp.com/${sortedDataWall[i].sku}.jpg`,
        `ceiling`,
        `0`,
        `${sortedDataCeil[i].link}`
      );
    }
  }
}
//
//
//
//
//
//
//

function propigatePole() {
  for (let i = 0; i < sortedDataPole.length; i++) {
    itemAppend(
      plateGridPole,
      `${sortedDataPole[i].description}`,
      `${sortedDataPole[i].sku}`,
      `https://snap-server2508.herokuapp.com/${sortedDataPole[i].sku}.jpg`,
      `pole`,
      `0`,
      `${sortedDataPole[i].link}`
    );
  }
}

function propigateStruts() {
  for (let i = 0; i < sortedDataStrut.length; i++) {
    itemAppend(
      strutGrid,
      `${sortedDataStrut[i].description}`,
      `${sortedDataStrut[i].sku}`,
      `https://snap-server2508.herokuapp.com/${sortedDataStrut[i].sku}.jpg`,
      `strut`,
      `0`,
      `${sortedDataStrut[i].link}`
    );
  }
}

function propigateBox() {
  if (answers[1].sides == "single") {
    itemAppend(
      boxGrid,
      `${sortedDataMount[0].description}`,
      `${sortedDataMount[0].sku}`,
      `https://snap-server2508.herokuapp.com/${sortedDataMount[0].sku}.jpg`,
      `box`,
      `0`,
      `${sortedDataMount[0].link}`
    );
  } else {
    itemAppend(
      boxGrid,
      `${sortedDataMount[1].description}`,
      `${sortedDataMount[1].sku}`,
      `https://snap-server2508.herokuapp.com/${sortedDataMount[1].sku}.jpg`,
      `box`,
      `0`,
      `${sortedDataMount[1].link}`
    );
  }
}

function propigateArm() {
  const width = parseInt(answers[3].width);
  for (let i = 0; i < sortedDataArm.length; i++) {
    if (answers[2].orientation == "landscape") {
      if (sortedDataArm[i].sku.includes("LARM")) {
        if (width <= 42) {
          if (sortedDataArm[i].description.includes("24")) {
            itemAppend(
              armGrid,
              `${sortedDataArm[i].description}`,
              `${sortedDataArm[i].sku}`,
              `https://snap-server2508.herokuapp.com/${sortedDataArm[i].sku}.jpg`,
              `arms`,
              `0`,
              `${sortedDataArm[i].link}`
            );
          }
        } else if (width <= 64 && width > 42) {
          if (sortedDataArm[i].description.includes("40")) {
            itemAppend(
              armGrid,
              `${sortedDataArm[i].description}`,
              `${sortedDataArm[i].sku}`,
              `https://snap-server2508.herokuapp.com/${sortedDataArm[i].sku}.jpg`,
              `arms`,
              `0`,
              `${sortedDataArm[i].link}`
            );
          }
        } else {
          if (sortedDataArm[i].description.includes("100")) {
            itemAppend(
              armGrid,
              `${sortedDataArm[i].description}`,
              `${sortedDataArm[i].sku}`,
              `https://snap-server2508.herokuapp.com/${sortedDataArm[i].sku}.jpg`,
              `arms`,
              `0`,
              `${sortedDataArm[i].link}`
            );
          }
        }
      }
    } else if (answers[2].orientation == "portrait") {
      if (sortedDataArm[i].sku.includes("PARM")) {
        if (width <= 42) {
          if (sortedDataArm[i].description.includes("24")) {
            itemAppend(
              armGrid,
              `${sortedDataArm[i].description}`,
              `${sortedDataArm[i].sku}`,
              `https://snap-server2508.herokuapp.com/${sortedDataArm[i].sku}.jpg`,
              `arms`,
              `0`,
              `${sortedDataArm[i].link}`
            );
          }
        } else if (width <= 64 && width > 42) {
          if (sortedDataArm[i].description.includes("40")) {
            itemAppend(
              armGrid,
              `${sortedDataArm[i].description}`,
              `${sortedDataArm[i].sku}`,
              `https://snap-server2508.herokuapp.com/${sortedDataArm[i].sku}.jpg`,
              `arms`,
              `0`,
              `${sortedDataArm[i].link}`
            );
          }
        } else {
          if (sortedDataArm[i].description.includes("100")) {
            itemAppend(
              armGrid,
              `${sortedDataArm[i].description}`,
              `${sortedDataArm[i].sku}`,
              `https://snap-server2508.herokuapp.com/${sortedDataArm[i].sku}.jpg`,
              `arms`,
              `0`,
              `${sortedDataArm[i].link}`
            );
          }
        }
      }
    }
  }
}

// <----------------------Item Propigation Functions End--------------------------------->

document.addEventListener(`click`, (event) => {
  let selectionTargeter = event.target;
  if (event.target.classList.contains(`selection-child`)) {
    selectionTargeter = event.target.parentElement;
  }
  inputTileAnswer(selectionTargeter);
  nextAnswer(selectionTargeter);
  prevAnswer(selectionTargeter);
  wallMountDisablesDualSided(selectionTargeter);
  portraitOrLandscapeSVGDisplay();

  addOrSubtractPlate(event.target);
  addOrSubtractPole(event.target);
  addOrSubtractStrut(event.target);
  addOrSubtractBoxes(event.target);
  addOrSubtractArms(event.target);
  addOrSubtractOverview(event.target);
  highlightSelectedQuantity(event.target);
  console.log(answers);
  // console.table(answers);
});

document.addEventListener(`input`, (event) => {
  inputDimensionsAnswer(event.target);
  inputItemQuantity(event.target);
});

document.querySelector(`.plate-next`).addEventListener(`click`, () => {
  requiredPlatesAlgorithm();
  requiredPlatesDisplay();
});

document.querySelector(`.pole-next`).addEventListener(`click`, () => {
  requiredPolesDisplay();
});

document.querySelector(`.strut-next`).addEventListener(`click`, () => {
  requiredStrutsDisplay();
});

document.querySelector(`.arm-next`).addEventListener(`click`, () => {
  requiredArmsDisplay();
});

document.querySelector(`.overview-next`).addEventListener(`click`, () => {
  overviewSpecsPopulate();
});

document.querySelector(`.quick-order-next`).addEventListener(`click`, () => {
  overviewItemsSaver();
});
//
//
//
//
//
//
//
//

document
  .querySelector(`.overview-dropdown`)
  .addEventListener(`click`, (event) => {
    overviewDropdownAlternator(event.target);
  });

// Client does not want items to wipe when selecting other tiles
// const wipeItemSelections = (target) => {
//   if (target.classList.contains(`plate`)) {
//     const itemQuantityAmountArray = document.querySelectorAll(
//       `.item-quantity-amount-plate-grid`
//     );
//     for (let i = 0; i < itemQuantityAmountArray.length; i++) {
//       itemQuantityAmountArray[i].textContent = `0`;
//     }
//     requiredPlatesDisplay();
//   }
//   if (target.classList.contains(`poles`)) {
//     const itemQuantityAmountArray = document.querySelectorAll(
//       `.item-quantity-amount-plate-grid-pole`
//     );
//     for (let i = 0; i < itemQuantityAmountArray.length; i++) {
//       itemQuantityAmountArray[i].textContent = `0`;
//     }
//     requiredPolesDisplay();
//   }
// };

const wallMountDisablesDualSided = (target) => {
  const singleSided = document.querySelector(`.single-sided`);
  const dualSided = document.querySelector(`.dual-sided`);

  if (document.querySelector(`.wall-mount`).classList.contains(`picked`)) {
    document.querySelector(`.plate-question`).textContent = `Wall Plate`;
    dualSided.classList.add(`disabled`);
    dualSided.classList.remove(`picked`);
    singleSided.classList.add(`picked`);
    singleSided.parentElement.parentElement.classList.add(`question-picked`);
    answers[1].sides = `single`;
  } else if (
    document.querySelector(`.wall-mount`).classList.contains(`picked`) === false
  ) {
    document.querySelector(`.plate-question`).textContent = `Ceiling Plate`;
    dualSided.classList.remove(`disabled`);
  }

  if (target.classList.contains(`ceiling-mount`)) {
    singleSided.classList.remove(`picked`);
    singleSided.parentElement.parentElement.classList.remove(`question-picked`);
  }
};

const portraitOrLandscapeSVGDisplay = () => {
  if (answers[2].orientation === `portrait`) {
    console.log(`portrait`);
    document.querySelector(`.dimensions-SVG`).src = `./w-h-gap_vert.svg`;
  } else if (answers[2].orientation === `landscape`) {
    document.querySelector(`.dimensions-SVG`).src = `./w-h-gap_horiz.svg`;
  }
};

const highlightSelectedQuantity = (target) => {
  if (target.classList.contains(`item-quantity-amount`)) {
    var range = document.createRange();
    range.selectNodeContents(target);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
};

const inputTileAnswer = (target) => {
  // Check if target is an answer button
  if (target.classList.contains(`selection`)) {
    // wipeItemSelections(target);
    // Obtain data-question which will match the answers array key we are using
    const question = target.getAttribute(`data-question`);
    // Iterate through answers
    answers.forEach((answer) => {
      // Find the matching object key
      if (Object.keys(answer)[0] === question) {
        // Inject value we clicked on into
        answer[question] = target.value;
        returnAnswer = answer[question];
      }
    });

    if (
      target.classList.contains(`struts`) === false &&
      target.classList.contains(`boxes`) === false &&
      target.classList.contains(`arm`) === false &&
      target.classList.contains(`picked`) === false
    ) {
      selections.forEach((selection) => {
        if (
          window.getComputedStyle(selection.parentElement.parentElement)
            .display === `flex`
        ) {
          selection.classList.remove(`picked`);
        }
      });

      target.classList.add(`picked`);

      if (
        target.parentElement.parentElement.classList.contains(`mount`) ||
        target.parentElement.parentElement.classList.contains(`sides`) ||
        target.parentElement.parentElement.classList.contains(`orientation`)
      ) {
        target.parentElement.parentElement.classList.add(`question-picked`);
      }
    } else if (
      target.classList.contains(`struts`) === false &&
      target.classList.contains(`boxes`) === false &&
      target.classList.contains(`arm`) === false &&
      target.classList.contains(`picked`) === true
    ) {
      selections.forEach((selection) => {
        if (
          window.getComputedStyle(selection.parentElement.parentElement)
            .display === `flex`
        ) {
          selection.classList.remove(`picked`);
        }
      });
      target.parentElement.parentElement.classList.remove(`question-picked`);
    }
  }
};

const inputDimensionsAnswer = (target) => {
  if (target.classList.contains(`dimension-input`)) {
    answers[3][target.getAttribute(`id`)] = target.value;

    for (let i = 0; i < dimensionInputs.length; i++) {
      if (dimensionInputs[i].value === `` || dimensionInputs[i].value < `0`) {
        target.parentElement.parentElement.parentElement.parentElement.classList.remove(
          `question-picked`
        );
        break;
      }

      target.parentElement.parentElement.parentElement.parentElement.classList.add(
        `question-picked`
      );
    }
  }
};

const inputItemQuantity = (target) => {
  target.textContent = parseInt(target.textContent);
  if (target.textContent < 0 || !parseInt(target.textContent)) {
    target.textContent = `0`;
  }
  if (target.classList.contains(`item-quantity-amount-plate-grid`)) {
    requiredPlatesDisplay();
  }
  if (target.classList.contains(`item-quantity-amount-plate-grid-pole`)) {
    requiredPolesDisplay();
  }
  if (target.classList.contains(`item-quantity-amount-strut-grid`)) {
    requiredStrutsDisplay();
  }
  if (target.classList.contains(`item-quantity-amount-arm-grid`)) {
    requiredArmsDisplay();
  }
  if (
    target.classList.contains(`item-quantity-amount-overview-products-grid`)
  ) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-overview-products-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    let stagedItemQuantity;
    stagedItems.arm.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });
    stagedItems.box.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });
    stagedItems.ceiling.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });
    stagedItems.pole.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });
    stagedItems.strut.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });

    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(itemQuantityAmountArray[i].textContent) <
          parseInt(stagedItemQuantity)
      ) {
        itemQuantityAmountArray[i].textContent = stagedItemQuantity;
      }

      // Updates previous page item quantities
      document.querySelectorAll(`.item-quantity-amount`).forEach((e) => {
        if (
          targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
          targetSKU === e.getAttribute(`data-sku`) &&
          !e.classList.contains(`item-quantity-amount-overview-products-grid`)
        ) {
          e.textContent = itemQuantityAmountArray[i].textContent;
        }
      });
    }
  }
};

const addOrSubtractPlate = (target) => {
  if (target.classList.contains(`item-quantity-subtract-plate-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-plate-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(requiredPlates.textContent) < requiredPlatesAlgorithm() &&
        parseInt(itemQuantityAmountArray[i].textContent) > 0
      ) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) - 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredPlatesDisplay();
  }

  if (target.classList.contains(`item-quantity-add-plate-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-plate-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`)) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) + 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredPlatesDisplay();
  }
};

const addOrSubtractPole = (target) => {
  if (target.classList.contains(`item-quantity-subtract-plate-grid-pole`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-plate-grid-pole`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(requiredPoles.textContent) < answers[3].displays &&
        parseInt(itemQuantityAmountArray[i].textContent) > 0
      ) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) - 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredPolesDisplay();
  }

  if (target.classList.contains(`item-quantity-add-plate-grid-pole`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-plate-grid-pole`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`)) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) + 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredPolesDisplay();
  }
};
//
//
//
//
//
//

const addOrSubtractStrut = (target) => {
  if (target.classList.contains(`item-quantity-subtract-strut-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-strut-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(itemQuantityAmountArray[i].textContent) > 0
      ) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) - 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredStrutsDisplay();
  }

  if (target.classList.contains(`item-quantity-add-strut-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-strut-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`)) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) + 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredStrutsDisplay();
  }
};

const addOrSubtractBoxes = (target) => {
  if (target.classList.contains(`item-quantity-subtract-box-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-box-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(requiredBoxes.textContent) < answers[3].displays &&
        parseInt(itemQuantityAmountArray[i].textContent) > 0
      ) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) - 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredStrutsDisplay();
  }

  if (target.classList.contains(`item-quantity-add-box-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-box-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`)) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) + 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredStrutsDisplay();
  }
};

const addOrSubtractArms = (target) => {
  if (target.classList.contains(`item-quantity-subtract-arm-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-arm-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(itemQuantityAmountArray[i].textContent) > 0
      ) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) - 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredArmsDisplay();
  }

  if (target.classList.contains(`item-quantity-add-arm-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-arm-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`)) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) + 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredArmsDisplay();
  }
};

const addOrSubtractOverview = (target) => {
  if (
    target.classList.contains(`item-quantity-subtract-overview-products-grid`)
  ) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-overview-products-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    let stagedItemQuantity;
    stagedItems.arm.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });

    stagedItems.box.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });
    stagedItems.ceiling.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });
    stagedItems.pole.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });
    stagedItems.strut.forEach((item) => {
      if (targetSKU === item.sku) {
        stagedItemQuantity = item.quantity;
      }
    });

    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(itemQuantityAmountArray[i].textContent) > 0 &&
        parseInt(itemQuantityAmountArray[i].textContent) >
          parseInt(stagedItemQuantity)
      ) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) - 1;
        itemQuantityAmountArray[i].textContent = newQuantity;

        // Updates previous page item quantities
        document.querySelectorAll(`.item-quantity-amount`).forEach((e) => {
          if (
            targetSKU === e.getAttribute(`data-sku`) &&
            !e.classList.contains(`item-quantity-amount-overview-products-grid`)
          ) {
            e.textContent = itemQuantityAmountArray[i].textContent;
          }
        });
      }
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(itemQuantityAmountArray[i].textContent) ===
          parseInt(stagedItemQuantity)
      ) {
        target.classList.add(`disable`);
      }
    }
  }

  if (target.classList.contains(`item-quantity-add-overview-products-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-overview-products-grid`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`)) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) + 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
        document
          .querySelectorAll(`.item-quantity-subtract-overview-products-grid`)
          .forEach((subButton) => {
            if (targetSKU === subButton.getAttribute(`data-sku`))
              subButton.classList.remove(`disable`);
          });

        // Updates previous page item quantities
        document.querySelectorAll(`.item-quantity-amount`).forEach((e) => {
          if (
            targetSKU === e.getAttribute(`data-sku`) &&
            !e.classList.contains(`item-quantity-amount-overview-products-grid`)
          ) {
            e.textContent = itemQuantityAmountArray[i].textContent;
          }
        });
      }
    }
  }
};
//
//
//
//
//
//
//
//

const requiredPlatesDisplay = () => {
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-plate-grid`
  );
  let totalQuantity = 0;
  for (let i = 0; i < itemQuantityAmountArray.length; i++) {
    let currentQuantity = parseInt(itemQuantityAmountArray[i].textContent);
    totalQuantity += currentQuantity;
  }

  const calculatedPlates = requiredPlatesAlgorithm();
  console.log(calculatedPlates);
  if (totalQuantity > calculatedPlates) {
    totalQuantity = calculatedPlates;
  }

  const difference = calculatedPlates - totalQuantity;
  requiredPlates.textContent = difference;

  requiredTextManipulator(
    requiredPlates,
    document.querySelector(`.required-plates-text`),
    `You will need `,
    ` mounting plate for this install`,
    ` mounting plates for this install`
  );
  requiredChecker(requiredPlates);
};

const requiredPlatesAlgorithm = () => {
  const totalWeight = answers[3].displays * answers[3].weight;
  console.log(`Total weight: ${totalWeight}`);
  let wallOrCeilingRating = answers[0].mount == "ceiling-mount" ? 500 : 200;
  console.log(`Wall or Ceiling Rating: ${wallOrCeilingRating}`);
  let calculatedPlates = Math.ceil(totalWeight / wallOrCeilingRating);
  // let calculatedPlates =
  //   answers[3].displays / (answers[1].sides == "single" ? 2 : 4);
  // let totalPlateRating = calculatedPlates * wallOrCeilingRating;
  // console.log(`Total plate rating: ${totalPlateRating}`);

  // if (totalWeight > totalPlateRating) {
  //   calculatedPlates = Math.ceil(totalWeight / wallOrCeilingRating);
  // }
  return Math.ceil(calculatedPlates);
};

const requiredPolesDisplay = () => {
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-plate-grid-pole`
  );
  let totalQuantity = 0;
  for (let i = 0; i < itemQuantityAmountArray.length; i++) {
    let currentQuantity = parseInt(itemQuantityAmountArray[i].textContent);
    totalQuantity += currentQuantity;
  }

  const calculatedPlates = requiredPlatesAlgorithm();
  if (totalQuantity > calculatedPlates) {
    totalQuantity = calculatedPlates;
  }

  const difference = calculatedPlates - totalQuantity;
  requiredPoles.textContent = difference;

  requiredTextManipulator(
    requiredPoles,
    document.querySelector(`.required-poles-text`),
    `You will need `,
    ` drop pole for this install`,
    ` drop poles for this install`
  );
  requiredChecker(requiredPoles);
};

const requiredStrutsDisplay = () => {
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-strut-grid`
  );

  let totalLength = 0;
  for (let i = 0; i < itemQuantityAmountArray.length; i++) {
    const itemLength = parseInt(
      itemQuantityAmountArray[i].getAttribute(`data-length`)
    );
    const itemAmount = parseInt(itemQuantityAmountArray[i].textContent);
    let currentLength = itemLength * itemAmount;
    console.log(currentLength);
    totalLength += currentLength;
  }
  let newStrutMin;
  if (answers[1].sides === `dual`) {
    newStrutMin = strutMin / 2;
    requiredStruts.textContent = newStrutMin;
  } else {
    newStrutMin = strutMin;
    requiredStruts.textContent = newStrutMin;
  }

  if (totalLength >= requiredStruts.textContent) {
    document
      .querySelector(`.required-struts-text-warning`)
      .classList.remove(`show`);
  } else {
    document
      .querySelector(`.required-struts-text-warning`)
      .classList.add(`show`);
  }
  requiredBoxesDisplay(totalLength, newStrutMin);
};

const requiredBoxesDisplay = (strutLength, newStrutMin) => {
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-box-grid`
  );
  let totalQuantity = 0;
  for (let i = 0; i < itemQuantityAmountArray.length; i++) {
    let currentQuantity = parseInt(itemQuantityAmountArray[i].textContent);
    totalQuantity += currentQuantity;
  }

  const calculatedPlates = requiredPlatesAlgorithm();
  if (totalQuantity > calculatedPlates) {
    totalQuantity = calculatedPlates;
  }

  const difference = calculatedPlates - totalQuantity;
  requiredBoxes.textContent = difference;

  requiredTextManipulator(
    requiredBoxes,
    document.querySelector(`.required-boxes-text`),
    `You will need `,
    ` mounting box for this install. If you would like more, please update the quantity below.`,
    ` mounting boxes for this install. If you would like more, please update the quantity below.`
  );

  requiredStrutsBoxesChecker(
    strutLength,
    newStrutMin,
    document.querySelector(`.item-quantity-amount-box-grid`).textContent
  );
};

const requiredArmsDisplay = () => {
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-arm-grid`
  );
  let totalQuantity = 0;
  for (let i = 0; i < itemQuantityAmountArray.length; i++) {
    let currentQuantity = parseInt(itemQuantityAmountArray[i].textContent);
    totalQuantity += currentQuantity;
  }

  const calculatedPlates = requiredPlatesAlgorithm();
  if (totalQuantity > calculatedPlates) {
    totalQuantity = calculatedPlates;
  }

  const difference = calculatedPlates - totalQuantity;
  requiredArms.textContent = difference;

  requiredTextManipulator(
    requiredArms,
    document.querySelector(`.required-arm-text`),
    `You will need `,
    ` display arm for this install.`,
    ` display arms for this install.`
  );
  requiredChecker(requiredArms);
};

const requiredTextManipulator = (
  numberLocation,
  textLocation,
  firstText,
  singularText,
  pluralText
) => {
  if (numberLocation.textContent === `1`) {
    textLocation.childNodes[0].textContent = firstText;
    textLocation.childNodes[2].textContent = singularText;
  } else {
    textLocation.childNodes[0].textContent = firstText;
    textLocation.childNodes[2].textContent = pluralText;
  }
};

const requiredStrutsBoxesChecker = (strutLength, newStrutMin, chosenBoxes) => {
  if (strutLength >= newStrutMin && chosenBoxes >= requiredPlatesAlgorithm()) {
    document.querySelector(`.struts`).classList.add(`question-picked`);
  } else {
    document.querySelector(`.struts`).classList.remove(`question-picked`);
  }
};

// const requiredArmsChecker = (chosenArms) => {
//   if (chosenArms >= answers[3].displays) {
//     document.querySelector(`.arm`).classList.add(`question-picked`);
//   } else {
//     document.querySelector(`.arm`).classList.remove(`question-picked`);
//   }
// };

const requiredChecker = (remainingChoices) => {
  if (remainingChoices.textContent === `0`) {
    remainingChoices.parentElement.parentElement.classList.add(
      `question-picked`
    );
  }
  if (remainingChoices.textContent !== `0`) {
    remainingChoices.parentElement.parentElement.classList.remove(
      `question-picked`
    );
  }
};

const overviewSpecsPopulate = () => {
  document.querySelector(
    `.overview-displays`
  ).textContent = `# of Displays: ${answers[3].displays}`;
  document.querySelector(
    `.overview-width`
  ).textContent = `Width: ${answers[3].width}in`;
  document.querySelector(
    `.overview-height`
  ).textContent = `Height: ${answers[3].height}in`;
  document.querySelector(
    `.overview-weight`
  ).textContent = `Weight: ${answers[3].weight}lbs`;
  document.querySelector(
    `.overview-gap`
  ).textContent = `Gap: ${answers[3].gap}in`;
};

const overviewItemsSaver = () => {
  let finalItems = stagedItems;
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-overview-products-grid`
  );

  finalItems.arm.forEach((item) => {
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (itemQuantityAmountArray[i].getAttribute(`data-sku`) === item.sku) {
        item.quantity = itemQuantityAmountArray[i].textContent;
      }
    }
  });
  finalItems.box.forEach((item) => {
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (itemQuantityAmountArray[i].getAttribute(`data-sku`) === item.sku) {
        item.quantity = itemQuantityAmountArray[i].textContent;
      }
    }
  });
  finalItems.ceiling.forEach((item) => {
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (itemQuantityAmountArray[i].getAttribute(`data-sku`) === item.sku) {
        item.quantity = itemQuantityAmountArray[i].textContent;
      }
    }
  });
  finalItems.pole.forEach((item) => {
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (itemQuantityAmountArray[i].getAttribute(`data-sku`) === item.sku) {
        item.quantity = itemQuantityAmountArray[i].textContent;
      }
    }
  });
  finalItems.strut.forEach((item) => {
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (itemQuantityAmountArray[i].getAttribute(`data-sku`) === item.sku) {
        item.quantity = itemQuantityAmountArray[i].textContent;
      }
    }
  });
  console.log(finalItems);
  copyText(finalItems);
};
//
//
//
//
//
//
//

const overviewDropdownAlternator = (target) => {
  if (target.classList.contains(`show`)) {
    document.querySelector(`.overview-info`).style.display = `none`;
    target.textContent = `expand_more`;
    target.classList.remove(`show`);
  } else {
    document.querySelector(`.overview-info`).style.display = `flex`;
    target.textContent = `expand_less`;
    target.classList.add(`show`);
  }
};

const overviewAppend = () => {
  stagedItems.arm.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity,
      item.link
    );
  });

  stagedItems.box.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity,
      item.link
    );
  });
  stagedItems.ceiling.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity,
      item.link
    );
  });
  stagedItems.pole.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity,
      item.link
    );
  });
  stagedItems.strut.forEach((item) => {
    let strutQuantity = item.quantity;
    if (answers[1].sides === `dual`) {
      strutQuantity = item.quantity * 2;
    }
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      strutQuantity,
      item.link
    );
  });
  document
    .querySelectorAll(`.item-quantity-subtract-overview-products-grid`)
    .forEach((subButton) => {
      subButton.classList.add(`disable`);
    });
};

const itemAppend = (
  itemDestination,
  itemTitle,
  itemSKU,
  itemImage,
  page,
  quantity,
  link
) => {
  let currentGrid = itemDestination.classList;
  if (itemDestination === plateGrid || itemDestination === plateGridPole) {
    currentGrid = itemDestination.classList[1];
  }

  const container = document.createElement(`div`);
  container.classList.add(`item-container`);
  container.classList.add(`${page}`);
  itemDestination.appendChild(container);

  const img = document.createElement(`img`);
  img.src = itemImage;
  img.classList.add(`item-img`);
  container.appendChild(img);

  const infoContainer = document.createElement(`div`);
  infoContainer.classList.add(`item-info-container`);
  container.appendChild(infoContainer);

  const title = document.createElement(`div`);
  title.classList.add(`item-info-title`);
  title.textContent = itemTitle;
  infoContainer.appendChild(title);

  const SKU = document.createElement(`a`);
  SKU.classList.add(`item-info-SKU`);
  SKU.setAttribute(`href`, `${link}`);
  SKU.setAttribute(`target`, `_blank`);
  SKU.setAttribute(`rel`, `noopener noreferrer`);
  SKU.textContent = itemSKU;
  infoContainer.appendChild(SKU);

  const quantityContainer = document.createElement(`div`);
  quantityContainer.classList.add(`item-quantity-container`);
  if (page === `overview-page`) {
    container.appendChild(quantityContainer);
  } else {
    quantityContainer.textContent = `Qty:`;
    infoContainer.appendChild(quantityContainer);
  }

  const quantityButtons = document.createElement(`div`);
  quantityButtons.classList.add(`item-quantity-buttons`);
  quantityContainer.appendChild(quantityButtons);

  const subtract = document.createElement(`div`);
  subtract.classList.add(`item-quantity-subtract-${currentGrid}`);
  subtract.classList.add(`item-quantity-subtract`);
  subtract.setAttribute(`data-SKU`, itemSKU);
  subtract.textContent = `-`;
  quantityButtons.appendChild(subtract);

  const amount = document.createElement(`div`);
  amount.classList.add(`item-quantity-amount-${currentGrid}`);
  amount.classList.add(`item-quantity-amount`);
  amount.setAttribute(`data-SKU`, itemSKU);
  amount.setAttribute(`contenteditable`, true);
  amount.textContent = `0`;
  quantityButtons.appendChild(amount);

  const add = document.createElement(`div`);
  add.classList.add(`item-quantity-add-${currentGrid}`);
  add.classList.add(`item-quantity-add`);
  add.setAttribute(`data-SKU`, itemSKU);
  add.textContent = `+`;
  quantityButtons.appendChild(add);

  if (itemSKU === `SM-CB-CM-ST-30`) {
    subtract.setAttribute(`data-length`, 30);
    amount.setAttribute(`data-length`, 30);
    add.setAttribute(`data-length`, 30);
  }
  if (itemSKU === `SM-CB-CM-ST-50`) {
    subtract.setAttribute(`data-length`, 50);
    amount.setAttribute(`data-length`, 50);
    add.setAttribute(`data-length`, 50);
  }
  if (itemSKU === `SM-CB-CM-ST-100`) {
    subtract.setAttribute(`data-length`, 100);
    amount.setAttribute(`data-length`, 100);
    add.setAttribute(`data-length`, 100);
  }

  if (quantity) {
    amount.textContent = quantity;
  }
};

const nextAnswer = (target) => {
  if (target.classList.contains(`next`)) {
    for (let i = 0; i < surveys.length; i++) {
      if (
        target.parentElement.parentElement === surveys[i] &&
        surveys[i].classList.contains(`question-picked`)
      ) {
        if (
          target.classList.contains(`pole-next`) &&
          answers[0].mount === `wall-mount`
        ) {
          surveys[i].style.display = `none`;
          surveys[i + 1].style.display = `flex`;
          document
            .querySelector(`.survey.poles`)
            .classList.add(`question-picked`);
          document.querySelector(`#sub-struts`).click();
          document
            .querySelector(`.survey.poles`)
            .classList.remove(`question-picked`);
          break;
        } else {
          surveys[i].style.display = `none`;
          surveys[i + 1].style.display = `flex`;
          break;
        }
      }
    }
    returnAnswer = ``;
  }
};

const prevAnswer = (target) => {
  if (
    target.classList.contains(`prev`) &&
    target.parentElement.parentElement !== surveys[0]
  ) {
    for (let i = 0; i < surveys.length; i++) {
      if (target.parentElement.parentElement === surveys[i]) {
        if (
          target.classList.contains(`back-to-poles`) &&
          answers[0].mount === `wall-mount`
        ) {
          surveys[i].style.display = `none`;
          surveys[i - 1].style.display = `flex`;
          document.querySelector(`.back-to-plates`).click();
          break;
        } else {
          surveys[i].style.display = `none`;
          surveys[i - 1].style.display = `flex`;
          break;
        }
      }
    }
  }
};
