const surveys = document.querySelectorAll(`.survey`)
const selections = document.querySelectorAll(`.selection`)
const dimensionInputs = document.querySelectorAll(`.dimension-input`)
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
        weight: ``
    },
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
   
