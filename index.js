const surveys = document.querySelectorAll(`.survey`);
const selections = document.querySelectorAll(`.selection`);
const dimensionInputs = document.querySelectorAll(`.dimension-input`);
const requiredPlates = document.querySelector(`.required-plates`);
const requiredPoles = document.querySelector(`.required-poles`);
const plateGrid = document.querySelector(`.plate-grid`);
const plateGridPole = document.querySelector(`.plate-grid-pole`);

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
];

let stagedItems = [
  (ceiling = []),
  (poles = []),
  (arms = []),
  (mounts = []),
  (struts = []),
  (adapters = []),
];
let orderedList = [];

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
  checkStagedItemsCeiling();
});

document.getElementById("sub-struts").addEventListener("click", function () {
  propigateStruts();
  checkStagedItemsPoles();
});

function checkStagedItemsCeiling() {
  let items = document.querySelectorAll(".ceiling");
  stagedItems.ceiling = [];
  for (let i = 0; i < items.length; i++) {
    let x = items[i].childNodes[1].childNodes[2].childNodes[1].innerText;
    var numb = x.match(/\d/g);
    numb = numb.join("");
    if (numb > 0) {
      stagedItems.ceiling.push(items[i].innerText);
    }
  }
  console.log(stagedItems.ceiling);
}

function checkStagedItemsPoles() {
  let items = document.querySelectorAll(".poles");
  stagedItems.poles = [];
  for (let i = 0; i < items.length; i++) {
    let x = items[i].childNodes[1].childNodes[2].childNodes[1].innerText;
    var numb = x.match(/\d/g);
    numb = numb.join("");
    if (numb > 0) {
      stagedItems.poles.push(items[i].innerText);
    }
  }
  console.log(stagedItems.poles);
}

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
    items = itemAppend(
      plateGridPole,
      `${sortedDataPole[i].description}`,
      `${sortedDataPole[i].sku}`,
      `./product_images/products_thumbnail_150x150/poles/${sortedDataPole[i].sku}.jpg`,
      `pole`
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
  // console.table(answers)
});

document.addEventListener(`input`, (event) => {
  inputDimensionsAnswer(event.target);
});

document.querySelector(`.plate-next`).addEventListener(`click`, () => {
  requiredPlatesDisplay(`plate-grid-pole`);
});

document.querySelector(`.pole-next`).addEventListener(`click`, () => {
  requiredPolesDisplay(`.plate-grid-pole`);
});

const inputTileAnswer = (target) => {
  // Check if target is an answer button
  if (target.classList.contains(`selection`)) {
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
    // Make the current selection the only picked class for this question
    target.classList.add(`picked`);
    target.parentElement.parentElement.classList.add(`question-picked`);
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
  if (target.classList.contains(`item-quantity-subtract`)) {
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
        let currentQuantity =
          itemQuantityAmountArray[i].getAttribute(`data-value`);
        let newQuantity = parseInt(currentQuantity) - 1;
        itemQuantityAmountArray[i].setAttribute(`data-value`, newQuantity);
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredItemsDirector(gridLocation);

    itemQuantityAmountArray.forEach((item) => {
      console.log(itemQuantityAmountArray);
    });
  }

  if (target.classList.contains(`item-quantity-add`)) {
    const itemQuantityAmountArray = document.querySelectorAll(
      `.item-quantity-amount-${gridLocation}`
    );
    const targetSKU = target.getAttribute(`data-sku`);
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
      if (
        targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) &&
        parseInt(requiredPlates.textContent) > 0
      ) {
        let currentQuantity =
          itemQuantityAmountArray[i].getAttribute(`data-value`);
        let newQuantity = parseInt(currentQuantity) + 1;
        itemQuantityAmountArray[i].setAttribute(`data-value`, newQuantity);
        itemQuantityAmountArray[i].textContent = newQuantity;
      }
    }
    requiredItemsDirector(gridLocation);
  }
};

const requiredItemsDirector = (gridLocation) => {
  if (
    window.getComputedStyle(document.querySelector(`.plate`)).display === `flex`
  ) {
    requiredPlatesDisplay(gridLocation);
  }
  if (
    window.getComputedStyle(document.querySelector(`.poles`)).display === `flex`
  ) {
    requiredPolesDisplay(gridLocation);
  }
};

const requiredPlatesDisplay = (gridLocation) => {
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-${gridLocation}`
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

const requiredPolesDisplay = (gridLocation) => {
  const itemQuantityAmountArray = document.querySelectorAll(
    `.item-quantity-amount-${gridLocation}`
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

const itemAppend = (itemDestination, itemTitle, itemSKU, itemImage, page) => {
  const currentGrid = itemDestination.classList[1];

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
  subtract.classList.add(`item-quantity-subtract`);
  subtract.setAttribute(`data-SKU`, itemSKU);
  subtract.textContent = `-`;
  quantityButtons.appendChild(subtract);

  const amount = document.createElement(`div`);
  amount.classList.add(`item-quantity-amount-${currentGrid}`);
  amount.classList.add(`item-quantity-amount`);
  amount.setAttribute(`data-SKU`, itemSKU);
  amount.setAttribute(`data-value`, 0);
  amount.textContent = amount.getAttribute(`data-value`);
  quantityButtons.appendChild(amount);

  const add = document.createElement(`div`);
  add.classList.add(`item-quantity-add`);
  add.setAttribute(`data-SKU`, itemSKU);
  add.textContent = `+`;
  quantityButtons.appendChild(add);
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
