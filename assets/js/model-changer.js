AFRAME.registerComponent("model-changer", {
  schema: {
    textElement: { type: "selector" },
    modelEntity: { type: "selector" },
    asset1: { type: "asset" },
    asset2: { type: "asset" },
  },

  init: function () {
    this.newPosition = {
      x: 0,
      y: 0,
      z: 0,
    };

    this.threeObject = this.data.modelEntity.object3D;
  },

  tick: function () {
    if (this.data.textElement.textContent === "Model 1") {
      this.data.modelEntity.setAttribute("src", this.data.asset1);
      this.newPosition = { x: 0, y: 0, z: -4 };
    }

    if (this.data.textElement.textContent === "Model 2") {
      this.data.modelEntity.setAttribute("src", this.data.asset2);
      this.newPosition = { x: 0, y: -0.06, z: -0.55 };
    }
  },

  tock: function () {
    this.threeObject.position.set(
      this.newPosition.x,
      this.newPosition.y,
      this.newPosition.z
    );
  },
});
