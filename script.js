const backgroundMusic = new Audio("Assets/Audio/AlanWalkerMashup.mp3");
backgroundMusic.loop = true;
backgroundMusic.preload = "auto";

// Preload all other audios
const GateSlide = new Audio("Assets/Audio/doorOpen.mp3");
GateSlide.volume = 0.1;
GateSlide.preload = "auto";

const fallingAudio = new Audio("Assets/Audio/falling.mp3");
fallingAudio.currentTime = 3;
fallingAudio.preload = "auto";

let RockAudio = new Audio("Assets/Audio/rock.mp3");
RockAudio.preload = "auto";

let DoorAudio = new Audio("Assets/Audio/SecretDoor.mp3");
DoorAudio.preload = "auto";

let StressReliefAudio = new Audio("Assets/Audio/StressRelief.mp3");
StressReliefAudio.preload = "auto";

let isMusicPlaying = false;
let gate, waterfall, pyramid, partVisible, partHidden;

window.onload = function () {
  const preloader = document.getElementById("preloader");
  const musicButton = document.querySelector(".musicButton");

  // Create the Enter button
  const enterButton = document.createElement("button");
  enterButton.id = "enterButton";
  enterButton.textContent = "Enter Site";
  preloader.appendChild(enterButton);

  let hasEntered = false;

  enterButton.addEventListener("click", function () {
    if (hasEntered) return; // 🚫 already clicked once, ignore
    hasEntered = true;

    enterButton.disabled = true;
    enterButton.style.pointerEvents = "none";

    preloader.classList.add("fade-out");

    setTimeout(() => {
      preloader.style.display = "none";
      document.getElementById("fullUI").style.display = "block";

      const part1 = document.querySelector(".part1");
      const part2 = document.querySelector(".part2");
      const universeImage = document.querySelector(".universeImage");
      part2.classList.add("hiddenClass");

      backgroundMusic.play();
      isMusicPlaying = true; // ✅ added this line to sync the flag
      musicButton.classList.add("ButtonClass");
      musicButton.innerHTML = '<i class="bi bi-toggle-on"></i> Music';

      window.animationElements = { part1, part2, universeImage };
    }, 1000);
  });
};

function openGateFunction(element) {
  const { part1, part2, universeImage } = window.animationElements;
  const pyramidImage = document.querySelector(".pyramidImage");
  const gateImage = document.querySelector(".gateImage");
  const waterfallImage = document.querySelector(".waterfallImage");
  const birdsFly = document.querySelector(".birdsFly");
  const AnimationButtonDiv = document.querySelector(".AnimationButtonDiv");
  const buttonBox2 = document.querySelector(".buttonBox2");
  const RestartDiv = document.querySelector(".RestartDiv");
  element.classList.toggle("ButtonClass");

  if (element.classList.contains("ButtonClass")) {
    GateSlide.currentTime = 0;
    GateSlide.play();

    AnimationButtonDiv.style.display = "none";
    RestartDiv.classList.add("displayClass");
    RestartDiv.classList.add("visibleClass");
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
      universeImage.classList.add("opacityVisible"); // ✅ typo fixed here
    }, 15000);

    partHidden = setTimeout(() => {
      fallingAudio.pause();
      setTimeout(() => {
        egyptAnimation(element);
      }, 1000);
    }, 17000);
  }
}

// PART 2---------------------------------------
let hideVideoTimeout;
let wasMusicPlayingBeforeVideo = false;

function egyptAnimation() {
  const egyptImage = document.querySelector(".egyptImage");
  const EgyptVideoDiv = document.querySelector(".EgyptVideoDiv");
  const EgyptVideo = document.querySelector(".EgyptVideo");
  const TheMummy = document.querySelector(".TheMummy");
  const rainVideo = document.querySelector(".rainVideo");
  const { universeImage } = window.animationElements;

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

      setTimeout(() => {
        const mummyBackground = document.querySelector(".mummyBackground");
        mummyBackground.classList.add("opacityVisible");

        setTimeout(() => {
          const king = document.querySelector(".king");
          king.classList.add("kingTransform");
        }, 2000);
        RockAudio.play();
      }, 2000);

      setTimeout(() => {
        TheMummy.classList.add("mummyTransform");
        DoorAudio.currentTime = 0;
        DoorAudio.play();

        setTimeout(() => {
          rainVideo.classList.add("rainOpacity");
          StressReliefAudio.play();
        }, 5000);
      }, 7000);

      
    };
  }, 2000);
}
//  else {
//   // Toggle OFF
//   element.innerHTML = `<i class="bi bi-toggle-off"></i> Animation`;
// }
// }

// MUSIC PART--------------------------------------------------------------------------

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

function RestartAnimation(element) {
  element.classList.add("ButtonClass");
  element.innerHTML = `<i class="bi bi-toggle-on"></i>`;
  window.location.reload();
}
