const surveys = document.querySelectorAll(`.survey`)
const selections = document.querySelectorAll(`.selection`)
const dimensionInputs = document.querySelectorAll(`.dimension-input`)
const requiredPlates = document.querySelector(`.required-plates`)
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
    requiredPlatesDisplay()
    console.table(answers)
})

document.addEventListener(`input`, (event) => {
    inputDimensionsAnswer(event.target)
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
    console.table(answers)
}

// wip
const requiredPlatesDisplay = () => {
    requiredPlates.textContent = answers[3].displays
}

const itemGenerator = (itemDestination, itemTitle, itemSKU, itemImage) => {
    const container = document.createElement(`div`)
    container.classList.add(`item-container`)
    itemDestination.appendChild(container)
    
    const img = document.createElement(`img`)
    img.src = itemImage
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

    const quantityBoxes = document.createElement(`div`)
    quantityBoxes.classList.add(`item-quantity-boxes`)
    quantityContainer.appendChild(quantityBoxes)

    
}

const nextAnswer = (target) => {
    if (target.classList.contains(`next`)) {
        console.log(returnAnswer)
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
   
