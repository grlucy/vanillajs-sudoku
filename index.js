// Mock sudoku puzzle data
const solved = [
    "496157832",
    "218396745",
    "753284196",
    "531672984",
    "649831257",
    "827549613",
    "962415378",
    "185763429",
    "374928561"
]
const display = [
    "-96157-3-",
    "-18--67--",
    "--32--1--",
    "5316----4",
    "6--8---5-",
    "---5-9--3",
    "9---1-3-8",
    "-8576--2-",
    "-7-9-856-"
]

let selectedBox
let mistakes = 0

function selectBox (event) {
    // Clear last selection
    if (selectedBox) {
        selectedBox.classList.remove('selected')
    }
    // Add new selection
    selectedBox = this
    selectedBox.classList.add('selected')
}

/**
 * Returns true if the new value is incorrect
 */
function checkMistake (boxId, val) {
    // example boxId: 'row4-box6'
    const row = parseInt(boxId[3])
    const index = parseInt(boxId[8])
    const correctVal = solved[row][index]
    return val !== correctVal
}

function handleOption (event) {
    // If no box selected, do nothing
    if (!selectedBox) return

    if (event.target.id === "option0") {
        // clear box
        selectedBox.classList.remove('mistake')
        selectedBox.innerText = ""
    } else {
        // check for mistakes and update box
        const newValue = event.target.id.slice(-1)
        const isMistake = checkMistake(selectedBox.id, newValue)
        if (isMistake) {
            selectedBox.classList.add('mistake')
            mistakes++
            const mistakeCounter = document.getElementById('mistakeCounter')
            mistakeCounter.innerText = mistakes
        } else {
            selectedBox.classList.remove('mistake')
        }
        selectedBox.innerText = newValue
    }
}

function loadPuzzle () {
    // Populate puzzle grid
    display.forEach((str, i) => {
        const row = document.createElement('div')
        row.id = `row${i}`
        row.classList.add("row")
        for (let j = 0; j < str.length; j++) {
            const box = document.createElement('div')
            box.id = `row${i}-box${j}`
            box.classList.add('box')
            if (j === 2 || j === 5) {
                box.classList.add("rightBorder")
            }
            if (i === 2 || i === 5) {
                box.classList.add("bottomBorder")
            }
            if (str[j] !== '-') {
                box.innerText = str[j]
                box.classList.add('given')
            } else {
                box.addEventListener('click', selectBox)
            }
            row.appendChild(box)
        }
        document.getElementById('grid').appendChild(row)
    })
    // Populate number buttons
    const options = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    options.forEach((str, i) => {
        const box = document.createElement('div')
        box.id = `option${i}`
        box.classList.add('box')
        box.innerText = str
        box.addEventListener('click', handleOption)
        document.getElementById('options').appendChild(box)
    })
}

window.onload = () => {
    loadPuzzle()
}
