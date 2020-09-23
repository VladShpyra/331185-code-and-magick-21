'use strict';

let CLOUD_WIDTH = 420;
let CLOUD_HEIGHT = 270;
let CLOUD_X = 100;
let CLOUD_Y = 10;
let GAP = 10;
let TEXT_HEIGHT = 20;
let BAR_HEIGHT = 150;
let BAR_WIDTH = 40;
let COLUMN_GAP = 50;
let playerY = 260;


let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.3)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP, CLOUD_Y + (GAP * 3));

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP, CLOUD_Y + (GAP * 5));

  let maxTime = getMaxElement(times);
  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = names[i] === `Вы` ? `rgba(255, 0, 0, 1)` : `hsl(240, 100%,` + Math.floor(Math.random() * 90 + 10) + `%)`;
    ctx.fillText(
        names[i],
        CLOUD_X + COLUMN_GAP + (COLUMN_GAP * 2) * i,
        playerY,
    );
    ctx.fillRect(
        CLOUD_X + COLUMN_GAP + (COLUMN_GAP * 2) * i,
        CLOUD_Y + COLUMN_GAP + TEXT_HEIGHT,
        BAR_WIDTH,
        (BAR_HEIGHT * times[i] / maxTime)
    );
  }
};
