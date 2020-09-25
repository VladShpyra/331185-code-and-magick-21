'use strict';

let CLOUD_WIDTH = 420;
let CLOUD_HEIGHT = 270;
let CLOUD_X = 100;
let CLOUD_Y = 10;
let GAP = 10;
let BAR_MAX_HEIGHT = 150;
let BAR_WIDTH = 40;
let BARS_SPACING = 50;
let BARS_LEFT_SPACING = 40;
let BARS_TOP_SPACING = 80;


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

  // Нарисуем тень
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  // Нарисуем облако
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );
  // найдем максимальный счет
  const maxTime = getMaxElement(times);

  ctx.textBaseline = `hanging`;
  ctx.font = `16px PT Mono`;
  ctx.fillStyle = `#000`;

  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

  for (let i = 0; i < names.length; i++) {
    // Рассчитаем высоту текущей колонки гистограммы
    let barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;

    // Цвет для подписей - черный
    ctx.fillStyle = `#000`;
    // Выведем счет текущего игрока
    ctx.fillText(
        Math.round(times[i]).toString(),
        CLOUD_X + BARS_LEFT_SPACING + (BAR_WIDTH + BARS_SPACING) * i,
        CLOUD_Y + BARS_TOP_SPACING + BAR_MAX_HEIGHT - barHeight - GAP * 2
    );
    // Выведем цвет игрока
    ctx.fillText(
        names[i],
        CLOUD_X + BARS_LEFT_SPACING + (BAR_WIDTH + BARS_SPACING) * i,
        CLOUD_Y + BARS_TOP_SPACING + BAR_MAX_HEIGHT + GAP
    );
    // Определяем цвет игрока
    ctx.fillStyle = names[i] === `Вы`
      ? `rgba(255, 0, 0, 1)`
      : ctx.fillStyle = `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;
    // Рисуем колонку
    ctx.fillRect(
        CLOUD_X + BARS_LEFT_SPACING + (BAR_WIDTH + BARS_SPACING) * i,
        CLOUD_Y + BARS_TOP_SPACING + BAR_MAX_HEIGHT - barHeight,
        BAR_WIDTH,
        barHeight
    );
  }
};
