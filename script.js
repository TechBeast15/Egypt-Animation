const part1 = document.querySelector(".part1");
const part2 = document.querySelector(".part2");
// part2.classList.add("hiddenClass"); HIT
const universeImage = document.querySelector(".universeImage");

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
  const buttonBox2 = document.querySelector(".buttonBox2");

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
      universeImage.classList.add("opcityVisible");
    }, 15000);

    partHidden = setTimeout(() => {
      fallingAudio.pause();
      buttonBox2.style.display = "block";
      // TheMummyDiv.style.display = "block";
    }, 20000);
  } else {
    AnimationButtonDiv.style.display = "flex";
    // Toggle OFF
    element.innerHTML = `<i class="bi bi-toggle-off"></i> Animation`;

    GateSlide.pause();
    GateSlide.currentTime = 0;
    fallingAudio.pause();
    fallingAudio.currentTime = 3;

    clearTimeout(gate);
    clearTimeout(waterfall);
    clearTimeout(pyramid);
    clearTimeout(partVisible);
    clearTimeout(partHidden);

    gateImage.classList.remove("slideGate");
    waterfallImage.classList.remove("scaleUp");
    pyramidImage.classList.remove("opacityClass");
    gateImage.classList.remove("opacityClass");
    birdsFly.classList.remove("opacityClass");
    universeImage.classList.remove("opacityVisible"); // typo fix

    part2.classList.remove("visibleClass");
    part2.classList.add("hiddenClass");
    part2.style.display = "none";
    part1.classList.remove("hiddenClass");
    part1.style.display = "block";

    // Reset buttonBox2 or TheMummyDiv if needed
    buttonBox2.style.display = "none";
    // TheMummyDiv.style.display = "none";
  }
}

// PART 2---------------------------------------
let hideVideoTimeout;
let wasMusicPlayingBeforeVideo = false;

let RockAudio = new Audio("Assets/Audio/rock.mp3");
let DoorAudio = new Audio("Assets/Audio/SecretDoor.mp3");
let StressReliefAudio = new Audio("Assets/Audio/StressRelief.mp3");

function egyptAnimation(element) {
  const egyptImage = document.querySelector(".egyptImage");

  const EgyptVideoDiv = document.querySelector(".EgyptVideoDiv");
  const EgyptVideo = document.querySelector(".EgyptVideo");
  console.log(EgyptVideo);

  const eygptButtonDiv = document.querySelector(".eygptButtonDiv");
  const RestartDiv = document.querySelector(".RestartDiv");

  eygptButtonDiv.style.display = "none";

  element.classList.toggle("ButtonClass");
  if (element.classList.contains("ButtonClass")) {
    // Toggle ON
    element.innerHTML = `<i class="bi bi-toggle-on"></i> Animation`;

    egyptImage.classList.add("brightness1");
    universeImage.classList.add("brightness1");
    EgyptVideoDiv.classList.add("visibleClass");

    setTimeout(() => {
      EgyptVideo.currentTime = 2;
      EgyptVideo.play();

      // Pause background music if it's playing
      if (isMusicPlaying) {
        wasMusicPlayingBeforeVideo = true;
        backgroundMusic.pause();
      } else {
        wasMusicPlayingBeforeVideo = false;
      }

      EgyptVideo.onended = function () {
        if (wasMusicPlayingBeforeVideo) {
          backgroundMusic.play();
        }

        EgyptVideoDiv.classList.remove("visibleClass");
        egyptImage.classList.remove("brightness1");
        universeImage.classList.remove("brightness1");

        
      };
    }, 2000);
  } else {
    // Toggle OFF
    element.innerHTML = `<i class="bi bi-toggle-off"></i> Animation`;
  }
}

// MUSIC PART--------------------------------------------------------------------------

let isMusicPlaying = false;
const backgroundMusic = new Audio("Assets/Audio/AlanWalkerMashup.mp3");
backgroundMusic.loop = true;

function playMusic(clickedButton) {
  isMusicPlaying = !isMusicPlaying;

  if (isMusicPlaying) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }

  const allMusicButtons = document.querySelectorAll(
    ".buttonBox button, .buttonBox2 button"
  );

  allMusicButtons.forEach((button) => {
    const label = button.nextElementSibling?.innerText?.trim();
    if (label === "Music" || button === clickedButton) {
      if (isMusicPlaying) {
        button.classList.add("ButtonClass");
        button.innerHTML = '<i class="bi bi-toggle-on"></i> Music';
      } else {
        button.classList.remove("ButtonClass");
        button.innerHTML = '<i class="bi bi-toggle-off"></i> Music';
      }
    }
  });
}
