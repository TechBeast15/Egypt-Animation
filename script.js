let gate;

const GateSlide = new Audio("Assets/Audio/doorOpen.mp3");
GateSlide.volume = 0.1;

function openGateFunction(element) {
  const gateImage = document.querySelector(".gateImage");

  element.classList.toggle("ButtonClass");

  if (element.classList.contains("ButtonClass")) {
    // Toggle ON
    element.innerHTML = `<i class="bi bi-toggle-on"></i>`;
    GateSlide.currentTime = 0;
    GateSlide.play();

    gate = setTimeout(() => {
      gateImage.classList.add("slideGate");
    //   thunderVideo.play();

    //   thunderVideo.volume = 0.1;
    }, 2000);
  } else {
    // Toggle OFF
    element.innerHTML = `<i class="bi bi-toggle-off"></i>`;

    GateSlide.pause();
    GateSlide.currentTime = 0;
  }
}
