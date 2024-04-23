AFRAME.registerComponent("gesture-overlay", {
  init: function () {
    const entity = this.el;
    const overlayElement = document.querySelector(".arinova3d-gesture-overlay");
    entity.addEventListener("model-loaded", () => {
      overlayElement.classList.remove("arinova3d-gesture-overlay--hidden");
    });
  },
});

// The gesture icon will appear when the model has loaded.
