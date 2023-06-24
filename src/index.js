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
        <p class="floor-number">${floorNumber}</p>
        ${liftPos.map((pos, index) => {
        if (pos.pos === floorNumber) {
            return `<span class="lift lift-${index}"><section class="door left-door"></section><section class="door right-door"></section></span>`
        }
        return `<p class="no-lift"></p>`
    }).join('')}`

    let buttonsContainer = document.createElement("div")
    buttonsContainer.style.display = "flex"
    buttonsContainer.style.flexDirection = "column"
    buttonsContainer.style.gap = "0.5rem"


    if (floorNumber !== noOfFloors.value - 1) {
        let upButton = document.createElement("div")
        upButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      `
        upButton.className = "up-button"
        upButton.addEventListener("click", () => {
            moveLift(floorNumber)
        })
        buttonsContainer.appendChild(upButton)
    }



    if (floorNumber !== 0) {
        let downButton = document.createElement("div")
        downButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      `
        downButton.className = "up-button"
        downButton.addEventListener("click", () => {
            moveLift(floorNumber)
        })
        buttonsContainer.appendChild(downButton)
    }
    floor.appendChild(buttonsContainer)
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
        liftPos[pos].busy = true
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
        const prevPos = liftPos[index].pos
        liftPos[index].pos = floorNumber
        liftPos[index].busy = true
        let liftInstance = document.querySelector(`.lift-${index}`)
        liftInstance.style.transform = `translateY(-${6 * (Math.abs(floorNumber))}rem)`;
        liftInstance.style.transition = `all ${2 * (Math.abs(floorNumber - prevPos))}s`;
        setTimeout(() => {
            openAndCloseDoors(liftInstance, index);
        }, 2000 * (Math.abs(floorNumber - prevPos)))
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
        setTimeout(() => { liftPos[index].busy = false }, 2500)
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
    backBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="back-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
  </svg> Back
  `
    backBtn.className = "back-btn"
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
