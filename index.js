const surveys = document.querySelectorAll(`.survey`)
const selections = document.querySelectorAll(`.selection`)
let returnAnswer = ``

const answers = [
    { goal: `placeholder goal` },
    { sex: `placeholder sex` },
    { gender: `placeholder gender` },
]

for (let i = 0; i < surveys.length; i++) {
    if (i === 0) {
        continue 
    } else {
        surveys[i].style.display = `none`
    }
}

document.addEventListener(`click`, (event) => {
    inputAnswer(event.target)
    nextAnswer(event.target)
    prevAnswer(event.target)
    console.log(answers)
})

const inputAnswer = (target) => {
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
    }
}

const nextAnswer = (target) => {
    if (target.className === `next`) {
        console.log(returnAnswer)
        for (let i = 0; i < surveys.length; i++) {
            if (target.parentElement.parentElement === surveys[i] && returnAnswer !== ``) {
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
                // returnAnswer = answers[i - 1].Object.keys(answers)[0]
                break
            }
        }
    }}
   
