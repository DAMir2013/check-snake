"use strict";
function createdTwoInput() {
  const input1 = document.createElement("input");
  input1.type = "number";

  input1.id = "inp1";
  document.getElementById("main").appendChild(input1);

  const input2 = document.createElement("input");
  input2.type = "number";

  input2.id = "inp2";
  document.getElementById("main").appendChild(input2);

  createdButton();
}

function createdButton() {
  const butt = document.createElement("button");
  document.getElementById("main").appendChild(butt);
  document.querySelector("button").innerHTML = "START GAME";

  butt.addEventListener(
    "click",
    function () {
      const inputWidht = document.getElementById("inp1").value;
      const inputHeight = document.getElementById("inp2").value;

      createField(inputWidht, inputHeight);
    },
    { once: true }
  );
}

createdTwoInput();

function createField(width, height) {
  const field = document.createElement("div");
  document.getElementById("main").appendChild(field);
  let valueWidth = width / 10;
  let valueHeight = height / 10;
  field.className = "fieldClass";
  field.style.gridTemplateColumns = "repeat(" + valueWidth + ", 10px)";
  field.style.width = `${width}px`;
  field.style.height = `${height}px`;
  completionField(valueWidth, valueHeight);
}

function createCell(y, x) {
  const cell = document.createElement("div");
  cell.className = "cellClass";
  document.querySelector(".fieldClass").appendChild(cell);
  cell.setAttribute("positionY", y);
  cell.setAttribute("positionX", x);
}

function completionField(width, height) {
  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      createCell(y, x);
    }
  }

  createFly(width, height);
}

function createFly(x, y, once = 0) {
  let flyCoordinatsX = Math.floor(Math.random() * x + 1);
  let flyCoordinatsY = Math.floor(Math.random() * y + 1);

  let fly = document.querySelector(
    `[positionY = '${flyCoordinatsY}'][positionX = '${flyCoordinatsX}']`
  );

  fly.className = "flyClass";

  // console.log("yes2");
  if (once == 0) {
    createSnake(x, y);
  }
}

function createSnake(wid, heig) {
  let centerX = Math.floor(wid / 2);
  let centerY = Math.floor(heig / 2);
  let body = document.querySelector(
    `[positionY = '${centerY}'][positionX = '${centerX}']`
  );
  body.className = "bodySnake";
  let tailSnake = document.querySelector(
    `[positionY = '${centerY}'][positionX = '${centerX - 1}']`
  );
  tailSnake.className = "tailSnake";
  let headSnake = document.querySelector(
    `[positionY = '${centerY}'][positionX = '${centerX + 1}']`
  );
  headSnake.className = "head";

  let snakeArray = [
    [centerY, centerX - 1],
    [centerY, centerX],
    [centerY, centerX + 1],
  ];
  let directionValue = [1, 0, 1];
  let direction = 1;

  let y = directionValue[1];
  let x = directionValue[2];

  document.addEventListener("keydown", function (event) {
    if (event.code == "ArrowRight") {
      if (direction == 3 || direction == 4) {
        y = 0;
        x = 1;
        direction = 1;
      }
    }
    if (event.code == "ArrowLeft") {
      if (direction == 3 || direction == 4) {
        y = 0;
        x = -1;
        direction = 2;
      }
    }
    if (event.code == "ArrowDown") {
      if (direction == 1 || direction == 2) {
        y = 1;
        x = 0;
        direction = 4;
      }
    }
    if (event.code == "ArrowUp") {
      if (direction == 1 || direction == 2) {
        y = -1;
        x = 0;
        direction = 4;
      }
    }
  });
  let counter = 0;
  let snakeSpeed = 500;

  let moveInter = setInterval(function () {
    snakeMove(snakeArray, y, x, wid, heig);
  }, snakeSpeed);
  function repeatMove() {
    moveInter = setInterval(function () {
      snakeMove(snakeArray, y, x, wid, heig);
    }, snakeSpeed);
  }

  function snakeMove(snakeArray, y, x, width, height) {
    let fly2 = document.querySelector(".flyClass");
    let flyCoordArray = [
      fly2.getAttribute("positionx"),
      fly2.getAttribute("positiony"),
    ];

    let snakeArrayNew = snakeArray;
    document.querySelector(
      `[positionY = '${snakeArrayNew[0][0]}'][positionX = '${snakeArrayNew[0][1]}']`
    ).className = "cellClass";
    document.querySelector(
      `[positionY = '${
        snakeArrayNew[snakeArrayNew.length - 1][0]
      }'][positionX = '${snakeArrayNew[snakeArrayNew.length - 1][1]}']`
    ).className = "bodySnake";
    // console.log(snakeArrayNew[snakeArrayNew.length - 1][0] + y);
    // console.log(snakeArrayNew[snakeArrayNew.length - 1][1] + x);

    if (
      snakeArrayNew[snakeArrayNew.length - 1][0] + y == 0 ||
      snakeArrayNew[snakeArrayNew.length - 1][0] + y == height + 1 ||
      snakeArrayNew[snakeArrayNew.length - 1][1] + x == 0 ||
      snakeArrayNew[snakeArrayNew.length - 1][1] + x == width + 1
    ) {
      alert("GAME OVER");
      clearInterval(moveInter);
    }
    document.querySelector(
      `[positionY = '${
        snakeArrayNew[snakeArrayNew.length - 1][0] + y
      }'][positionX = '${snakeArrayNew[snakeArrayNew.length - 1][1] + x}']`
    ).className = "head";
    snakeArrayNew.push([
      snakeArrayNew[snakeArrayNew.length - 1][0] + y,
      snakeArrayNew[snakeArrayNew.length - 1][1] + x,
    ]);

    for (let i = 0; i < snakeArrayNew.length - 2; i++) {
      if (
        snakeArrayNew[snakeArrayNew.length - 1][0] == snakeArrayNew[i][0] &&
        snakeArrayNew[snakeArrayNew.length - 1][1] == snakeArrayNew[i][1]
      ) {
        alert("GAME OVER");

        clearInterval(moveInter);
      }
      if (
        Number(flyCoordArray[0]) == snakeArrayNew[i][1] &&
        Number(flyCoordArray[1]) == snakeArrayNew[i][0]
      ) {
        let errorFly = document.querySelector(
          `[positionY = '${flyCoordArray[1]}'][positionX = '${flyCoordArray[0]}']`
        );
        errorFly.className = "bodySnake";
        createFly(width, height, 1);
      }
    }
    if (
      Number(flyCoordArray[0]) == snakeArrayNew[snakeArrayNew.length - 1][1] &&
      Number(flyCoordArray[1]) == snakeArrayNew[snakeArrayNew.length - 1][0]
    ) {
      createFly(width, height, 1);
      counter++;
      console.log(counter);
      if (counter == 3) {
        snakeSpeed -= 100;
        counter = 0;
        clearInterval(moveInter);
        repeatMove();
        // moveInter = setInterval(function () {
        //   snakeMove(snakeArray, y, x, wid, heig);
        // }, snakeSpeed);

        console.log(snakeSpeed);
      }
    } else {
      snakeArrayNew.shift();
    }
  }
  return snakeSpeed;
}
