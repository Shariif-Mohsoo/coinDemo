function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const avatar = document.querySelector("img[alt='My Cartoon']");
const coin = document.querySelector("img[alt='My Coin']");
const score = document.querySelector("span.points");
let count = 0;
score.innerText = count;
const getPos = (pos) => {
  if (!pos) return 100;
  return parseFloat(pos.slice(0, -2));
};
const moveCoin = () => {
  const Y = Math.floor(Math.random() * document.body.clientHeight);
  const X = Math.floor(Math.random() * document.body.clientWidth);
  coin.style.top = `${Y}px`;
  coin.style.left = `${X}px`;
};
moveCoin();

const moveVertical = (element, amount) => {
  let posTop = getPos(element.style.top);
  element.style.top = `${posTop + amount}px`;
};
const moveHorizontal = (element, amount) => {
  let posLeft = getPos(element.style.left);
  element.style.left = `${posLeft + amount}px`; //for flipping purpose
};
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowDown" || e.key === "Down") {
    moveVertical(avatar, 50);
  } else if (e.key === "ArrowUp" || e.key === "Up") {
    moveVertical(avatar, -50);
  } else if (e.key === "ArrowRight" || e.key === "Right") {
    moveHorizontal(avatar, 50);
    avatar.style.transform = "scale(1,1)";
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    moveHorizontal(avatar, -50);
    avatar.style.transform = "scale(-1,1)";
  }
  if (isTouching(avatar, coin)) {
    score.innerText = ++count;
    moveCoin();
  }
});
