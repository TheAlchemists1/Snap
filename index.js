const surveys = document.querySelectorAll(`.survey`);
const selections = document.querySelectorAll(`.selection`);
const dimensionInputs = document.querySelectorAll(`.dimension-input`);
const requiredPlates = document.querySelector(`.required-plates`);
const requiredPoles = document.querySelector(`.required-poles`);
const requiredStruts = document.querySelector(`.required-struts`);
const requiredBoxes = document.querySelector(`.required-boxes`);
const plateGrid = document.querySelector(`.plate-grid`);
const plateGridPole = document.querySelector(`.plate-grid-pole`);
const strutGrid = document.querySelector(`.strut-grid`);
const boxGrid = document.querySelector(`.box-grid`);
const armGrid = document.querySelector(`.arm-grid`);


let returnAnswer = ``;

let sortedDataCeil = [];
let sortedDataArm = [];
let sortedDataPole = [];
let sortedDataMount = [];
let sortedDataStrut = [];
let sortedDataAdapter = [];

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
  { plate: `` },
  { poles: `` },
];

for (let i = 0; i < surveys.length; i++) {
  if (i === 0) {
    continue;
  } else {
    surveys[i].style.display = `none`;
  }
}

//on click after display to propigate ceiling plates
document.getElementById("sub").addEventListener("click", function () {
  propigateCeiling();
});

document.getElementById("sub-poles").addEventListener("click", function () {
  propigatePole();
});

//filtering system for ceiling plate type uni-strut
document.getElementById("uni-plate").addEventListener("click", function () {
  let x = document.getElementsByClassName("item-container");
  for (let i = 0; i < x.length; i++) {
    // console.log(x[i].childNodes[1].innerText);
    if (!x[i].childNodes[1].innerText.includes("8 IN")) {
      x[i].style.display = `none`;
    }
  }
});

//filtering system for ceiling plate type joists
document.getElementById("joist-plate").addEventListener("click", function () {
  let x = document.getElementsByClassName("item-container");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = `flex`;
  }
});

//filtering system for ceiling plate type uni-strut
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

//filtering system for ceiling plate type joists
document
  .getElementById("adjustable-pole")
  .addEventListener("click", function () {
    let x = document.getElementsByClassName("item-container");
    for (let i = 0; i < x.length; i++) {
      if (x[i].childNodes[1].innerText.includes("ADJUSTABLE")) {
        x[i].style.display = `flex`;
      } else {
        x[i].style.display = `none`;
      }
    }
  });

axios
  .get("http://localhost:3000/")
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

function propigateCeiling() {
  if (answers[0].mount == "ceiling-mount") {
    for (let i = 0; i < sortedDataCeil.length; i++) {
      console.log(sortedDataCeil[i]);
      items = itemAppend(
        plateGrid,
        `${sortedDataCeil[i].description}`,
        `${sortedDataCeil[i].sku}`,
        `./product_images/products_thumbnail_150x150/ceiling_mount/${sortedDataCeil[i].sku}.jpg`
      );
    }
  } else {
    console.log(answers[0]);
  }
}

function propigatePole() {
  for (let i = 0; i < sortedDataPole.length; i++) {
    console.log(sortedDataPole[i]);
    items = itemAppend(
      plateGridPole,
      `${sortedDataPole[i].description}`,
      `${sortedDataPole[i].sku}`,
      `./product_images/products_thumbnail_150x150/poles/${sortedDataPole[i].sku}.jpg`
    );
  }
}

document.addEventListener(`click`, (event) => {
  let selectionTargeter = event.target;
  if (event.target.classList.contains(`selection-child`)) {
    selectionTargeter = event.target.parentElement;
  }
  inputTileAnswer(selectionTargeter);
  nextAnswer(selectionTargeter);
  prevAnswer(selectionTargeter);

  addOrSubtractPlate(
    event.target,
    event.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.classList[1]
  );

  addOrSubtractPole(
    event.target,
    event.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.classList[1]
  );
  addOrSubtractStrut(
    event.target,
    event.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.classList[1]
  );
  addOrSubtractBoxes(
    event.target,
    event.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.classList[1]
  );
  console.table(answers);
});

document.addEventListener(`input`, (event) => {
  inputDimensionsAnswer(event.target);
});

document.querySelector(`.plate-next`).addEventListener(`click`, () => {
  requiredPlatesDisplay(); ////// plate-grid-pole` <----------------------
});

document.querySelector(`.pole-next`).addEventListener(`click`, () => {
  requiredPolesDisplay();  ////// plate-grid-pole` <----------------------
});

document.querySelector(`.strut-next`).addEventListener(`click`, () => {
  document.querySelector(`.item-quantity-amount-box-grid`).textContent =
    answers[3].displays;
  requiredStrutsDisplay();
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

const addOrSubtractPlate = (target, gridLocation) => {
  if (target.classList.contains(`item-quantity-subtract-plate-grid`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-${gridLocation}`
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
      `.item-quantity-amount-${gridLocation}`
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

const addOrSubtractPole = (target, gridLocation) => {
  if (target.classList.contains(`item-quantity-subtract-plate-grid-pole`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-${gridLocation}`
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
      `.item-quantity-amount-${gridLocation}`
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

const addOrSubtractStrut = (target, gridLocation) => {
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

const addOrSubtractBoxes = (target, gridLocation) => {
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
  requiredStrutsBoxesChecker(
    strutLength,
    document.querySelector(`.item-quantity-amount-box-grid`).textContent
  );
};

const requiredStrutsBoxesChecker = (strutLength, chosenBoxes) => {
  if (strutLength >= 120 && chosenBoxes >= answers[3].displays) {
    document.querySelector(`.struts`).classList.add(`question-picked`);
  } else {
    document.querySelector(`.struts`).classList.remove(`question-picked`);
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

const itemAppend = (itemDestination, itemTitle, itemSKU, itemImage) => {
  let currentGrid = itemDestination.classList[1];
  if (itemDestination === strutGrid || itemDestination === boxGrid) {
    currentGrid = itemDestination.classList;
  }

  const container = document.createElement(`div`);
  container.classList.add(`item-container`);
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
};

itemAppend(
  strutGrid,
  `test`,
  `SM-CB-CM-ST-30`,
  `./product_images/products_thumbnail_150x150/strut/SM-CB-CM-ST-30.jpg`
);
itemAppend(
  strutGrid,
  `test`,
  `SM-CB-CM-ST-50`,
  `./product_images/products_thumbnail_150x150/strut/SM-CB-CM-ST-50.jpg`
);
itemAppend(
  boxGrid,
  `test`,
  `SM-CB-CM-D`,
  `./product_images/products_thumbnail_150x150/mounting_box/SM-CB-CM-D.jpg`
);
itemAppend(
  armGrid,
  `test`,
  `SM-CB-CM-LARM-55`,
  `./product_images/products_thumbnail_150x150/display_arm/SM-CB-CM-LARM-55.jpg`
);

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
