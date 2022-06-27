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
let sortedDataAdapter = [];

let strutMin;
let strutMax;
let totalDisplayLength;
let totalWeight;

let ceilingFlag;
let poleFlag;
let strutFlag;
let boxFlag;
let armFlag;

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

for (let i = 0; i < surveys.length; i++) {
  if (i === 0) {
    continue;
  } else {
    surveys[i].style.display = `none`;
  }
}

// <----------------------Varaible ending---------------------------->

// <----------------------Algorithm for specs start---------------------------->

function algorithmSetup() {
  const answerArr = answers[3];
  const display = parseInt(answerArr.displays);
  const width = parseInt(answerArr.width);
  const gap = parseInt(answerArr.gap);
  const weight = parseInt(answerArr.weight);
  const vesaWidth = display / 2;

  strutMin = display * width + ((display - 1) * gap) / 2 - (width - vesaWidth);

  strutMax = display * width;

  totalDisplayLength = display * width + (display - 1) * gap;

  totalWeight = display * weight;
}

// <----------------------Algorithm for specs end---------------------------->

// <----------------------Page Population function---------------------------->

function loadChecker(token, propigate) {
  if (token) {
    console.log(`${token} already populated`);
  } else {
    propigate();
  }
}

// <----------------------Event handling for prop and checking items staged Start---------------------------->

//on click after display to propigate ceiling plates
document.getElementById("sub").addEventListener("click", function () {
  loadChecker(ceilingFlag, propigateCeiling);
  ceilingFlag = true;
  algorithmSetup();
  console.log(answers);
});

document.getElementById("sub-poles").addEventListener("click", function () {
  loadChecker(poleFlag, propigatePole);
  poleFlag = true;
  checkStagedItemsCeiling();
});

document.getElementById("sub-struts").addEventListener("click", function () {
  loadChecker(strutFlag, propigateStruts);
  loadChecker(boxFlag, propigateBox);
  strutFlag = true;
  boxFlag = true;
  checkStagedItemsPoles();
});

document.getElementById("sub-arm").addEventListener("click", function () {
  loadChecker(armFlag, propigateArm);
  armFlag = true;
  checkStagedItemsStrut();
  checkStagedItemsBox();
});

document.getElementById("sub-overview").addEventListener("click", function () {
  checkStagedItemsArm();

  console.log(stagedItems);
  for (let i = 0; i < stagedItems.length; i++) {
    console.log(stagedItems[i]);
  }
  overviewAppend();
});

// <----------------------Events ending---------------------------->

// <----------------------Item Staging Checking Functions Start---------------------------->

function checkStagedItemsCeiling() {
  let items = document.querySelectorAll(".ceiling");
  stagedItems.ceiling = [];
  for (let i = 0; i < items.length; i++) {
    let z = items[i].childNodes[1];
    let x = z.childNodes[2].childNodes[1].innerText;
    console.log(items);
    var numb = x.match(/\d/g);
    numb = numb.join("");
    if (numb > 0) {
      stagedItems.ceiling.push({
        quantity: numb,
        title: z.childNodes[0].innerText,
        sku: z.childNodes[1].innerText,
        img: items[i].childNodes[0].currentSrc,
      });
    }
  }
}

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
      });
    }
  }
}

function checkStagedItemsArm() {
  let items = document.querySelectorAll(".arms");
  stagedItems.arm = [];
  for (let i = 0; i < items.length; i++) {
    console.log(items);
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
    if (x[i].childNodes[1].innerText.includes("I-BEAM")) {
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
      if (!x[i].childNodes[1].innerText.includes("I-BEAM")) {
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
    if (x[i].childNodes[1].innerText.includes("ADJUSTABLE")) {
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
    if (x[i].childNodes[1].innerText.includes("ADJUSTABLE")) {
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
      sortedDataAdapter.push(item);
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
      console.log(sortedDataCeil[i]);
      itemAppend(
        plateGrid,
        `${sortedDataCeil[i].description}`,
        `${sortedDataCeil[i].sku}`,
        `./product_images/products_thumbnail_150x150/ceiling_mount/${sortedDataCeil[i].sku}.jpg`,
        `ceiling`
      );
    }
  } else {
    console.log(answers[0]);
  }
}

function propigatePole() {
  for (let i = 0; i < sortedDataPole.length; i++) {
    console.log(sortedDataPole[i]);
    itemAppend(
      plateGridPole,
      `${sortedDataPole[i].description}`,
      `${sortedDataPole[i].sku}`,
      `./product_images/products_thumbnail_150x150/poles/${sortedDataPole[i].sku}.jpg`,
      `pole`
    );
  }
}

function propigateStruts() {
  for (let i = 0; i < sortedDataStrut.length; i++) {
    console.log(sortedDataStrut[i]);
    itemAppend(
      strutGrid,
      `${sortedDataStrut[i].description}`,
      `${sortedDataStrut[i].sku}`,
      `./product_images/products_thumbnail_150x150/strut/${sortedDataStrut[i].sku}.jpg`,
      `strut`
    );
  }
}

function propigateBox() {
  if (answers[1].sides == "single") {
    itemAppend(
      boxGrid,
      `${sortedDataMount[0].description}`,
      `${sortedDataMount[0].sku}`,
      `./product_images/products_thumbnail_150x150/mounting_box/${sortedDataMount[0].sku}.jpg`,
      `box`
    );
  } else {
    itemAppend(
      boxGrid,
      `${sortedDataMount[1].description}`,
      `${sortedDataMount[1].sku}`,
      `./product_images/products_thumbnail_150x150/mounting_box/${sortedDataMount[1].sku}.jpg`,
      `box`
    );
  }
}

function propigateArm() {
  for (let i = 0; i < sortedDataArm.length; i++) {
    if (answers[2].orientation == "landscape") {
      if (sortedDataArm[i].sku.includes("LARM")) {
        itemAppend(
          armGrid,
          `${sortedDataArm[i].description}`,
          `${sortedDataArm[i].sku}`,
          `./product_images/products_thumbnail_150x150/display_arm/${sortedDataArm[i].sku}.jpg`,
          `arms`
        );
      }
    } else if (answers[2].orientation == "portrait") {
      if (sortedDataArm[i].sku.includes("PARM")) {
        itemAppend(
          armGrid,
          `${sortedDataArm[i].description}`,
          `${sortedDataArm[i].sku}`,
          `./product_images/products_thumbnail_150x150/display_arm/${sortedDataArm[i].sku}.jpg`,
          `arms`
        );
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

  addOrSubtractPlate(event.target);
  addOrSubtractPole(event.target);
  addOrSubtractStrut(event.target);
  addOrSubtractBoxes(event.target);
  addOrSubtractArms(event.target);
  addOrSubtractOverview(event.target);
  // console.table(answers);
});

document.addEventListener(`input`, (event) => {
  inputDimensionsAnswer(event.target);
});

document.querySelector(`.plate-next`).addEventListener(`click`, () => {
  requiredPlatesDisplay();
});

document.querySelector(`.pole-next`).addEventListener(`click`, () => {
  requiredPolesDisplay();
});

document.querySelector(`.strut-next`).addEventListener(`click`, () => {
  document.querySelector(`.item-quantity-amount-box-grid`).textContent =
    answers[3].displays;
  requiredStrutsDisplay();
});

document.querySelector(`.arm-next`).addEventListener(`click`, () => {
  document.querySelector(`.item-quantity-amount-arm-grid`).textContent =
    answers[3].displays;
  requiredArmsDisplay();
});

document.querySelector(`.overview-next`).addEventListener(`click`, () => {
  overviewSpecsPopulate();
});

document
  .querySelector(`.overview-dropdown`)
  .addEventListener(`click`, (event) => {
    overviewDropdownAlternator(event.target);
  });

const wipeItemSelections = (target) => {
  if (target.classList.contains(`plate`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-plate-grid`
    );
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      itemQuantityAmountArray[i].textContent = `0`;
    }
    requiredPlatesDisplay();
  }
  if (target.classList.contains(`poles`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-plate-grid-pole`
    );
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      itemQuantityAmountArray[i].textContent = `0`;
    }
    requiredPolesDisplay();
  }
};

const inputTileAnswer = (target) => {
  // Check if target is an answer button
  if (target.classList.contains(`selection`)) {
    wipeItemSelections(target);
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

    selections.forEach((selection) => {
      // if the selections are visible remove the picked class
      if (
        window.getComputedStyle(selection.parentElement.parentElement)
          .display === `flex`
      ) {
        selection.classList.remove(`picked`);
      }
    });

    if (
      target.classList.contains(`struts`) === false &&
      target.classList.contains(`boxes`) === false &&
      target.classList.contains(`arm`) === false
    ) {
      target.classList.add(`picked`);
    }
    if (
      target.parentElement.parentElement.classList.contains(`mount`) ||
      target.parentElement.parentElement.classList.contains(`sides`) ||
      target.parentElement.parentElement.classList.contains(`orientation`)
    ) {
      target.parentElement.parentElement.classList.add(`question-picked`);
    }
  }
};

const inputDimensionsAnswer = (target) => {
  if (target.classList.contains(`dimension-input`)) {
    answers[3][target.getAttribute(`id`)] = target.value;

    for (let i = 0; i < dimensionInputs.length; i++) {
      if (dimensionInputs[i].value === `` || dimensionInputs[i].value < `0`) {
        target.parentElement.parentElement.parentElement.classList.remove(
          `question-picked`
        );
        break;
      }

      target.parentElement.parentElement.parentElement.classList.add(
        `question-picked`
      );
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
        parseInt(requiredPlates.textContent) < answers[3].displays &&
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
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(requiredPlates.textContent) > 0
      ) {
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
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(requiredPoles.textContent) > 0
      ) {
        let currentQuantity = itemQuantityAmountArray[i].textContent;
        let newQuantity = parseInt(currentQuantity) + 1;
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredPolesDisplay();
  }
};

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
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(requiredBoxes.textContent) > 0
      ) {
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
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(requiredArms.textContent) > 0
      ) {
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
      }
    }
  }
};

const requiredPlatesDisplay = () => {
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-plate-grid`
  );
  let totalQuantity = 0;
  for (let i = 0; i < itemQuantityAmountArray.length; i++) {
    let currentQuantity = parseInt(itemQuantityAmountArray[i].textContent);
    totalQuantity += currentQuantity;
  }
  const displaysChosen = answers[3].displays;
  const difference = displaysChosen - totalQuantity;
  requiredPlates.textContent = difference;

  requiredTextManipulator(
    requiredPlates,
    document.querySelector(`.required-plates-text`),
    `You will need `,
    ` ceiling plate for this install`,
    ` ceiling plates for this install`
  );
  requiredChecker(requiredPlates);
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
  const displaysChosen = answers[3].displays;
  const difference = displaysChosen - totalQuantity;
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
  if (totalLength >= 120) {
    document
      .querySelector(`.required-struts-text-warning`)
      .classList.remove(`show`);
  } else {
    document
      .querySelector(`.required-struts-text-warning`)
      .classList.add(`show`);
  }
  requiredBoxesDisplay(totalLength);
};

const requiredBoxesDisplay = (strutLength) => {
  requiredBoxes.textContent = answers[3].displays;
  requiredTextManipulator(
    requiredBoxes,
    document.querySelector(`.required-boxes-text`),
    `You will need `,
    ` mounting box. For your convenience we have already updated the quantity. If you would like more, please update the quantity below.`,
    ` mounting boxes. For your convenience we have already updated the quantity. If you would like more, please update the quantity below.`
  );
  requiredStrutsBoxesChecker(
    strutLength,
    document.querySelector(`.item-quantity-amount-box-grid`).textContent
  );
};

const requiredArmsDisplay = () => {
  requiredArms.textContent = answers[3].displays;
  requiredTextManipulator(
    requiredArms,
    document.querySelector(`.required-arm-text`),
    `You will need `,
    ` display arm for this install.`,
    ` display arms for this install.`
  );
  requiredArmsChecker(
    document.querySelector(`.item-quantity-amount-arm-grid`).textContent
  );
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

const requiredStrutsBoxesChecker = (strutLength, chosenBoxes) => {
  if (strutLength >= 120 && chosenBoxes >= answers[3].displays) {
    document.querySelector(`.struts`).classList.add(`question-picked`);
  } else {
    document.querySelector(`.struts`).classList.remove(`question-picked`);
  }
};

const requiredArmsChecker = (chosenArms) => {
  if (chosenArms >= answers[3].displays) {
    document.querySelector(`.arm`).classList.add(`question-picked`);
  } else {
    document.querySelector(`.arm`).classList.remove(`question-picked`);
  }
};

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
  console.log(stagedItems);
  console.log(overviewGrid);
  stagedItems.arm.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity
    );
  });

  stagedItems.box.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity
    );
  });
  stagedItems.ceiling.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity
    );
  });
  stagedItems.pole.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity
    );
  });
  stagedItems.strut.forEach((item) => {
    itemAppend(
      overviewGrid,
      item.title,
      item.sku,
      item.img,
      `overview-page`,
      item.quantity
    );
  });
};

const itemAppend = (
  itemDestination,
  itemTitle,
  itemSKU,
  itemImage,
  page,
  quantity
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

  const SKU = document.createElement(`div`);
  SKU.classList.add(`item-info-SKU`);
  SKU.textContent = itemSKU;
  infoContainer.appendChild(SKU);

  const quantityContainer = document.createElement(`div`);
  quantityContainer.classList.add(`item-quantity-container`);
  quantityContainer.textContent = `Qty:`;
  infoContainer.appendChild(quantityContainer);

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
        surveys[i].style.display = `none`;
        surveys[i + 1].style.display = `flex`;
        break;
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
        surveys[i].style.display = `none`;
        surveys[i - 1].style.display = `flex`;
        break;
      }
    }
  }
};
