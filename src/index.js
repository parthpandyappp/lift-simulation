let lift = document.querySelector(".lift")
let formInput = document.querySelector(".form")
let noOfLifts = document.querySelector("#no-of-lifts")
let floorContainer = document.querySelector(".floors")
let noOfFloors = document.querySelector("#no-of-floors")
let floorGeneration = document.querySelector("#generateFloors")

let liftPos = []


const createFloor = (floorNumber) => {
    let floor = document.createElement("div")


    floor.className = "floor"
    floor.innerHTML = `
        <p>${floorNumber}</p>
        ${liftPos.map((pos, index) => {
        if (pos.pos === floorNumber) {
            return `<span class="lift lift-${index}"><section class="door left-door"></section><section class="door right-door"></section></span>`
        }
        return `<p class="no-lift"></p>`
    }).join('')}`

    if (floorNumber !== noOfFloors.value - 1) {
        let upButton = document.createElement("button")
        upButton.innerText = "up"
        upButton.className = "up-button"
        upButton.addEventListener("click", () => {
            moveLift(floorNumber)
        })
        floor.appendChild(upButton)
    }
    else {
        let upButton = document.createElement("button")
        upButton.innerText = "up"
        upButton.className = "up-button"
        upButton.style.visibility = "hidden"
        floor.appendChild(upButton)
    }

    if (floorNumber !== 0) {
        let downButton = document.createElement("button")
        downButton.innerText = "down"
        downButton.className = "up-button"
        downButton.addEventListener("click", () => {
            moveLift(floorNumber)
        })
        floor.appendChild(downButton)
    }
    else {
        let downButton = document.createElement("button")
        downButton.innerText = "down"
        downButton.className = "down-button"
        downButton.style.visibility = "hidden"
        floor.appendChild(downButton)
    }

    return floor
}

const moveLift = (floorNumber) => {
    let flag = false
    let pos = 0;
    for (let i = 0; i < liftPos.length; i++) {
        if (liftPos[i].pos === floorNumber) {
            pos = i
            flag = true
        }
    }
    if (flag === true) {
        let liftInstance = document.querySelector(`.lift-${pos}`)
        openAndCloseDoors(liftInstance, pos)
        return liftPos
    }
    else {
        const res = {}
        for (let i = noOfFloors.value - 1; i >= 0; i--) {
            if (isLiftPresent(i)) {
                res[i] = Math.abs(i - floorNumber)
            }
        }

        const index = getPresentLiftPos(Number(getKeyWithMinimumValue(res)))
        liftPos[index].pos = floorNumber
        liftPos[index].busy = true
        let liftInstance = document.querySelector(`.lift-${index}`)
        liftInstance.style.transform = `translateY(-${6 * (Math.abs(floorNumber))}rem)`;
        liftInstance.style.transition = `all ${floorNumber !== 0 ? 2 * (Math.abs(floorNumber)) : 2}s`;
        setTimeout(() => {
            openAndCloseDoors(liftInstance, index);

        }, 2000 * (Math.abs(floorNumber)))
        return liftPos;
    }
}

const openAndCloseDoors = (liftInstance, index) => {
    const leftDoor = liftInstance.querySelector(".left-door");
    const rightDoor = liftInstance.querySelector(".right-door");
    leftDoor.classList.add("left-move");
    rightDoor.classList.add("right-move");
    setTimeout(() => {
        leftDoor.classList.remove("left-move");
        rightDoor.classList.remove("right-move")
        liftPos[index].busy = false
    }, 2000)
}

const isLiftPresent = (floorNumber) => {
    return liftPos.filter(({ busy }) => busy === false).some((pos) => pos.pos === floorNumber)
}

const getPresentLiftPos = (floorNumber) => {
    return liftPos.findIndex((pos) => {
        return pos.pos === floorNumber
    })
}

const getKeyWithMinimumValue = (obj) => {
    let firstKey = Object.keys(obj)[0]
    let minValue = obj[firstKey];
    let minKey;

    if (Object.keys(obj).length === 1) {
        return firstKey;
    }

    for (let key in obj) {
        if (obj[key] <= minValue) {
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
    let flag = true
    liftPos = Array.from({ length: Number(noOfLifts.value) }, () => ({ pos: 0, busy: false }))
    if (noOfLifts.value < 0) {
        flag = false
        alert("Number of lifts can't underflow")
    }
    if (noOfFloors.value < 0) {
        flag = false
        alert("Number of floors can't underflow")
    }
    if (noOfLifts.value > noOfFloors.value) {
        flag = false
        alert("Number of lifts can't exceed Number of floors")
    }
    if (flag) {
        formInput.style.display = "none"
        floorContainer.style.display = "flex"
        renderFloors();
    }
})
