let noOfFloors = document.querySelector("#no-of-floors")
let noOfLifts = document.querySelector("#no-of-lifts")
let formInput = document.querySelector(".form")
let floorGeneration = document.querySelector("#generateFloors")
let lift = document.querySelector(".lift")

let floorContainer = document.querySelector(".floors")
let liftPos = []


const createFloor = (floorNumber) => {
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

    if (floorNumber !== noOfFloors.value - 1) {
        let upButton = document.createElement("button")
        upButton.innerText = "up"
        upButton.className = "up-button"
        upButton.addEventListener("click", () => {
            moveLift(floorNumber)
            renderFloors()
        })
        floor.appendChild(upButton)
    }
    else{
        
    }

    if (floorNumber !== 0) {
        let downButton = document.createElement("button")
        downButton.innerText = "down"
        downButton.className = "up-button"
        downButton.addEventListener("click", () => {
            moveLift(floorNumber)
            renderFloors()
        })
        floor.appendChild(downButton)
    }

    return floor
}

const moveLift = (floorNumber) => {
    let flag = false
    for (let i = 0; i < liftPos.length; i++) {
        if (liftPos[i] === floorNumber) {
            flag = true
        }
    }
    if (flag === true) {
        return liftPos;
    }
    else {
        const res = {}
        for (let i = noOfFloors.value - 1; i >= 0; i--) {
            if (isLiftPresent(i)) {
                res[i] = Math.abs(i - floorNumber)
            }
        }
        const index = getPresentLiftPos(Number(getKeyWithMinimumValue(res)))
        liftPos[index] = floorNumber
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
        return firstKey;
    }

    for (let key in obj) {
        if (obj[key] < minValue) {
            minValue = obj[key];
            minKey = key;
        }
    };
    return minKey;
}


const renderFloors = () => {
    if (floorContainer.childElementCount > 0) {
        while (floorContainer.firstChild) {
            floorContainer.removeChild(floorContainer.firstChild);
        }
    }

    let backBtn = document.createElement("button")
    backBtn.innerText = "BACK"
    backBtn.addEventListener("click", () => {
        formInput.style.display = "flex"
        floorContainer.style.display = "none"
    })
    floorContainer.appendChild(backBtn)
    for (let i = noOfFloors.value - 1; i >= 0; i--) {
        floorContainer.appendChild(createFloor(i));
    }
}


floorGeneration.addEventListener("click", () => {
    liftPos = new Array(Number(noOfLifts.value)).fill(0)
    if (noOfLifts.value > noOfFloors.value) {
        alert("No of lifts can't exceed no of floors")
    }
    else {
        formInput.style.display = "none"
        floorContainer.style.display = "flex"
        renderFloors();
    }
})
