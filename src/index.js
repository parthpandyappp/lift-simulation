// let floor = 8
// let noOfLifts = 1
// let liftPos = 1

// let fromFloor = document.querySelector("#fromFloor")
// let toFloor = document.querySelector("#toFloor")


// let sbmt = document.querySelector("#sbmt")

// const showLiftStatus = () => {
//     for (let i = 0; i < floor; i++) {
//         console.log(`${liftPos - 1 == i ? `--Floor ${i}--lift` : `--Floor ${i}`}`)
//     }
//     console.log("-------------------------------------------")
// }

// const moveLift = () => {
//     if (toFloor.value - liftPos > 0) {
//         console.log("UP")
//         liftPos += (toFloor.value - (liftPos - 1))
//     }
//     else {
//         console.log("DOWN")
//         liftPos += (toFloor.value - (liftPos - 1))
//     }

//     showLiftStatus()
// }

// sbmt.addEventListener("click", moveLift)

// const liftUp = () => {
//     if (liftPos + 1 <= floor) {
//         liftPos++
//     }
//     showLiftStatus()

// }

// const liftDown = () => {
//     if (liftPos - 1 > 0) {
//         liftPos--
//     }
//     showLiftStatus()

// }

// showLiftStatus()
// *********************************************************************
// let noOfFloors = document.querySelector("#no-of-floors")
// let noOfLifts = document.querySelector("#no-of-lifts")
// let floorGeneration = document.querySelector("#generateFloors")

// let floorContainer = document.querySelector(".floors")
// let liftPos = 3

// const createFloor = (floorNumber) => {
//     console.log("Floor number: ", floorNumber)
//     let floor = document.createElement("div")
//     floor.className = "floor"
//     floor.innerHTML = `
//     <p>${floorNumber}</p>
//     `

//     if (floorNumber !== noOfFloors.value) {
//         const upButton = document.createElement('button');
//         upButton.textContent = 'Up';
//         upButton.addEventListener('click', () => {
//             liftPos += floorNumber - liftPos
//             console.log("Up button clicked");
//             console.log("Lift pos: ", liftPos, floorNumber)
//             renderFloors();

//         });
//         floor.appendChild(upButton)

//     }

//     if (floorNumber !== 1) {
//         const downButton = document.createElement('button');
//         downButton.textContent = 'Down';
//         downButton.addEventListener('click', () => {
//             liftPos += floorNumber - liftPos

//             console.log("Down button clicked");
//             console.log("Lift pos: ", liftPos, floorNumber)
//             renderFloors();
//         });
//         floor.appendChild(downButton)
//     }

//     if (Number(floorNumber) === Number(liftPos)) {
//         const liftButton = document.createElement("button");
//         liftButton.textContent = "Lift";
//         floor.appendChild(liftButton);
//     }
//     return floor
// }

// const generateFloors = () => {
//     console.log("Generating floors...")
//     renderFloors()
// }

// const renderFloors = () => {
//     if (floorContainer.childElementCount > 0) {
//         while (floorContainer.firstChild) {
//             floorContainer.removeChild(floorContainer.firstChild);
//         }
//     }
//     for (let i = noOfFloors.value; i > 0; i--) {
//         console.log(i)
//         floorContainer.appendChild(createFloor(i));
//     }
// }

// const moveLift = (toFloor) = {

// }

// floorGeneration.addEventListener("click", generateFloors)
// *********************************************************
let noOfFloors = document.querySelector("#no-of-floors")
let noOfLifts = document.querySelector("#no-of-lifts")
let floorGeneration = document.querySelector("#generateFloors")
let lift = document.querySelector(".lift")

let floorContainer = document.querySelector(".floors")
let liftPos = []
console.log("NO OF LIFTS: ", noOfLifts.value)

const createFloor = (floorNumber) => {
    console.log("FLOOR NUMBER: ", floorNumber)
    let floor = document.createElement("div")


    floor.className = "floor"
    floor.innerHTML = `
        <p>${floorNumber}</p>
        ${liftPos.map((pos) => {
        if (pos === floorNumber) {
            return `<p class="lift"></p>`
        }
        return `<p class="no-lift"></p>`
    }).join('')}`

    let upButton = document.createElement("button")
    upButton.innerText = "up"
    upButton.className = "up-button"
    upButton.addEventListener("click", () => {
        moveLift(floorNumber)
        renderFloors()
    })
    floor.appendChild(upButton)

    let downButton = document.createElement("button")
    downButton.innerText = "down"
    downButton.className = "up-button"
    downButton.addEventListener("click", () => {
        moveLift(floorNumber)
        renderFloors()
    })
    floor.appendChild(downButton)

    return floor
}

const moveLift = (floorNumber) => {
    console.log("FROM MOVELIFT:  ", floorNumber)
    let flag = false
    for (let i = 0; i < liftPos.length; i++) {
        if (liftPos[i] === floorNumber) {
            flag = true
        }
    }
    console.log("FLAG: ", flag)
    if (flag === true) {
        console.log("FLAG TRUE")
        return liftPos;
    }
    else {
        const res = {}
        console.log("ITERATION CHECK: ", noOfFloors.value - 1)
        for (let i = noOfFloors.value - 1; i >= 0; i--) {
            console.log(`Presence of ${i}: `, isLiftPresent(i))
            if (isLiftPresent(i)) {
                res[i] = Math.abs(i - floorNumber)
            }
        }
        console.log(res)
        const index = getPresentLiftPos(Number(getKeyWithMinimumValue(res)))
        console.log("INDEX: ", index)
        liftPos[index] = floorNumber
        console.log("LIFT POS: ", liftPos)
        return liftPos;
    }
}

const isLiftPresent = (floorNumber) => {
    return liftPos.some((pos) => pos === floorNumber)
}

const getPresentLiftPos = (floorNumber) => {
    return liftPos.findIndex((pos) => pos === floorNumber)
}

const getKeyWithMinimumValue = (obj) => {
    let firstKey = Object.keys(obj)[0]
    let minValue = obj[firstKey];
    let minKey = firstKey;

    if (Object.keys(obj).length === 1) {
        console.log("FIRST KEY RETURNED")
        return firstKey;
    }

    for (let key in obj) {
        if (obj[key] < minValue) {
            console.log("EXECCCCCC")
            minValue = obj[key];
            minKey = key;
        }
        console.log("TRACK MIN: ", minValue, minKey)
    };
    console.log("MIN KEY: ", minKey)
    return minKey;
}

// const updatedLiftPos = moveLift(6, "up");

const renderFloors = () => {
    if (floorContainer.childElementCount > 0) {
        while (floorContainer.firstChild) {
            floorContainer.removeChild(floorContainer.firstChild);
        }
    }
    for (let i = noOfFloors.value - 1; i >= 0; i--) {
        console.log(i)
        floorContainer.appendChild(createFloor(i));
    }
}

floorGeneration.addEventListener("click", () => {
    liftPos = new Array(Number(noOfLifts.value)).fill(0)
    renderFloors();
})
