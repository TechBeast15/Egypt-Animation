const part1 = document.querySelector(".part1");
const part2 = document.querySelector(".part2");
part2.classList.add("hiddenClass");

let gate, waterfall, pyramid, partVisible, partHidden;

const GateSlide = new Audio("Assets/Audio/doorOpen.mp3");
GateSlide.volume = 0.1;

const fallingAudio = new Audio("Assets/Audio/falling.mp3");
fallingAudio.currentTime = 3;

function openGateFunction(element) {
  const pyramidImage = document.querySelector(".pyramidImage");
  const gateImage = document.querySelector(".gateImage");
  const waterfallImage = document.querySelector(".waterfallImage");
  const birdsFly = document.querySelector(".birdsFly");
  const AnimationButtonDiv = document.querySelector(".AnimationButtonDiv");

  element.classList.toggle("ButtonClass");

  if (element.classList.contains("ButtonClass")) {
    AnimationButtonDiv.style.display = "none";

    // Toggle ON
    element.innerHTML = `<i class="bi bi-toggle-on"></i> Animation`;
    GateSlide.currentTime = 0;
    GateSlide.play();

    gate = setTimeout(() => {
      gateImage.classList.add("slideGate");
    }, 2000);

    waterfall = setTimeout(() => {
      waterfallImage.classList.add("scaleUp");
      fallingAudio.play();
    }, 6000);

    pyramid = setTimeout(() => {
      pyramidImage.classList.add("opacityClass");
      gateImage.classList.add("opacityClass");
      birdsFly.classList.add("opacityClass");
    }, 10000);

    partVisible = setTimeout(() => {
      part1.classList.add("hiddenClass");
      part1.style.display = "none";
      part2.classList.remove("hiddenClass");
      part2.classList.add("visibleClass");
      //   universeImage.classList.add("opcityVisible");
    }, 15000);

    partHidden = setTimeout(() => {
      fallingAudio.pause();
      //   buttonBox2.style.display = "block";
      // TheMummyDiv.style.display = "block";
    }, 20000);
  } else {
    AnimationButtonDiv.style.display = "flex";
    // Toggle OFF
    element.innerHTML = `<i class="bi bi-toggle-off"></i> Animation`;

    GateSlide.pause();
    GateSlide.currentTime = 0;
  }
}
