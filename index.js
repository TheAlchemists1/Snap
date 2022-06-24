const surveys = document.querySelectorAll(`.survey`)
const selections = document.querySelectorAll(`.selection`)
const dimensionInputs = document.querySelectorAll(`.dimension-input`)
const requiredPlates = document.querySelector(`.required-plates`)
const plateGrid = document.querySelector(`.plate-grid`)
let returnAnswer = ``

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
    { plate: `` }
]

for (let i = 0; i < surveys.length; i++) {
    if (i === 0) {
        continue 
    } else {
        surveys[i].style.display = `none`
    }
}

document.addEventListener(`click`, (event) => {
    let selectionTargeter = event.target
    if (event.target.classList.contains(`selection-child`)) {
        selectionTargeter = event.target.parentElement
    }
    inputTileAnswer(selectionTargeter)
    nextAnswer(selectionTargeter)
    prevAnswer(selectionTargeter)
    addOrSubtractPlate(event.target)
    // console.table(answers)
})

document.addEventListener(`input`, (event) => {
    inputDimensionsAnswer(event.target)
})

document.querySelector(`.ceiling-next`).addEventListener(`click`, () => {
    requiredPlates.textContent = answers[3].displays
})


const inputTileAnswer = (target) => {
    // Check if target is an answer button
    if (target.classList.contains(`selection`)) {
        // Obtain data-question which will match the answers array key we are using
        const question = target.getAttribute(`data-question`)
        // Iterate through answers
        answers.forEach((answer) => {
            // Find the matching object key
            if (Object.keys(answer)[0] === question) {
                // Inject value we clicked on into
                answer[question] = target.value
                returnAnswer = answer[question]
            }
        })

        selections.forEach((selection) => {
            // if the selections are visible remove the picked class
            if (window.getComputedStyle(selection.parentElement.parentElement).display === `flex`) {
                selection.classList.remove(`picked`)
            }
        })
        // Make the current selection the only picked class for this question
        target.classList.add(`picked`)
        target.parentElement.parentElement.classList.add(`question-picked`)
    }
}

const inputDimensionsAnswer = (target) => {
    answers[3][target.getAttribute(`id`)] = target.value
    
    for (let i = 0; i < dimensionInputs.length; i++) {
        if (dimensionInputs[i].value === `` || dimensionInputs[i].value < `0`) {
            target.parentElement.parentElement.parentElement.classList.remove(`question-picked`)
            break
        }
        target.parentElement.parentElement.parentElement.classList.add(`question-picked`)
    }
    // console.table(answers)
}

const addOrSubtractPlate = (target) => {
    const itemQuantityAmountArray = document.querySelectorAll(`.item-quantity-amount`)

    if (target.classList.contains(`item-quantity-subtract`)) {
        const targetSKU = target.getAttribute(`data-sku`)
        for (let i = 0; i < itemQuantityAmountArray.length; i++) {
            if (targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) && parseInt(requiredPlates.textContent) < answers[3].displays) {
                let currentQuantity = itemQuantityAmountArray[i].getAttribute(`data-value`)
                let newQuantity = parseInt(currentQuantity) - 1
                itemQuantityAmountArray[i].setAttribute(`data-value`, newQuantity)
                itemQuantityAmountArray[i].textContent = newQuantity
            }
        }
        requiredPlatesDisplay()
    }

    if (target.classList.contains(`item-quantity-add`)) {
        const targetSKU = target.getAttribute(`data-sku`)
        for (let i = 0; i < itemQuantityAmountArray.length; i++) {
            if (targetSKU === itemQuantityAmountArray[i].getAttribute(`data-sku`) && parseInt(requiredPlates.textContent) > 0) {
                let currentQuantity = itemQuantityAmountArray[i].getAttribute(`data-value`)
                let newQuantity = parseInt(currentQuantity) + 1
                itemQuantityAmountArray[i].setAttribute(`data-value`, newQuantity)
                itemQuantityAmountArray[i].textContent = newQuantity
            }
        }
        requiredPlatesDisplay()
    }
}

// wip
const requiredPlatesDisplay = () => {
    const itemQuantityAmountArray = document.querySelectorAll(`.item-quantity-amount`)
    let totalQuantity = 0
    for (let i = 0; i < itemQuantityAmountArray.length; i++) {
        let currentQuantity = parseInt(itemQuantityAmountArray[i].textContent)
        totalQuantity += currentQuantity
    }
    const displaysChosen = answers[3].displays
    const difference = displaysChosen - totalQuantity
    requiredPlates.textContent = difference
}

const itemAppend = (itemDestination, itemTitle, itemSKU, itemImage) => {
    const container = document.createElement(`div`)
    container.classList.add(`item-container`)
    itemDestination.appendChild(container)
    
    const img = document.createElement(`img`)
    img.src = itemImage
    img.classList.add(`item-img`)
    container.appendChild(img)

    const infoContainer = document.createElement(`div`)
    infoContainer.classList.add(`item-info-container`)
    container.appendChild(infoContainer)

    const title = document.createElement(`div`)
    title.classList.add(`item-info-title`)
    title.textContent = itemTitle
    infoContainer.appendChild(title)

    const SKU = document.createElement(`div`)
    SKU.classList.add(`item-info-SKU`)
    SKU.textContent = itemSKU
    infoContainer.appendChild(SKU)

    const quantityContainer = document.createElement(`div`)
    quantityContainer.classList.add(`item-quantity-container`)
    quantityContainer.textContent = `Qty:`
    infoContainer.appendChild(quantityContainer)

    const quantityButtons = document.createElement(`div`)
    quantityButtons.classList.add(`item-quantity-buttons`)
    quantityContainer.appendChild(quantityButtons)

    const subtract = document.createElement(`div`)
    subtract.classList.add(`item-quantity-subtract`)
    subtract.setAttribute(`data-SKU`, itemSKU)
    subtract.textContent = `-`
    quantityButtons.appendChild(subtract)

    const amount = document.createElement(`div`)
    amount.classList.add(`item-quantity-amount`)
    amount.setAttribute(`data-SKU`, itemSKU)
    amount.setAttribute(`data-value`, 0)
    amount.textContent = amount.getAttribute(`data-value`)
    quantityButtons.appendChild(amount)

    const add = document.createElement(`div`)
    add.classList.add(`item-quantity-add`)
    add.setAttribute(`data-SKU`, itemSKU)
    add.textContent = `+`
    quantityButtons.appendChild(add)
}

itemAppend(plateGrid, `Strong Carbon Series Dual Joist Ceiling Mount - 24 IN - Black`, `SM-CB-CM-DJ-24-BLK`, `./product_images/products_thumbnail_150x150/ceiling_mount/SM-CB-CM-DJ-24-BLK.jpg`)
itemAppend(plateGrid, `Strong Carbon Series Dual Joist Ceiling Mount - 16 IN - Black`, `SM-CB-CM-DJ-16-BLK`, `./product_images/products_thumbnail_150x150/ceiling_mount/SM-CB-CM-DJ-16-BLK.jpg`)

const nextAnswer = (target) => {
    if (target.classList.contains(`next`)) {
        for (let i = 0; i < surveys.length; i++) {
            if (target.parentElement.parentElement === surveys[i] && surveys[i].classList.contains(`question-picked`)) {
                surveys[i].style.display = `none`
                surveys[i + 1].style.display = `flex`
                break
            }
        }
        returnAnswer = ``
    }
}

const prevAnswer = (target) => {
    if (target.classList.contains(`prev`) && target.parentElement.parentElement !== surveys[0]) {
        for (let i = 0; i < surveys.length; i++) {
            if (target.parentElement.parentElement === surveys[i]) {
                surveys[i].style.display = `none`
                surveys[i - 1].style.display = `flex`
                break
            }
        }
    }}
   
