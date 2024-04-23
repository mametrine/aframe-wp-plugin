const bind = AFRAME.utils.bind;

AFRAME.registerComponent("look-controls-model", {
	schema: {
		enabled: { default: true },
		touchEnabled: { default: true },
		mouseEnabled: { default: true },
		uiOverlay: { type: "selector" },
		mainCamera: { type: "selector" },
	},

	init: function () {
		this.magicWindowDeltaEuler = new THREE.Euler();
		this.position = new THREE.Vector3();
		this.rotation = {};
		this.setupMouseControls();
		this.bindMethods();
		this.previousMouseEvent = {};
		this.prevDiff = -1;
		this.zoom = 1;
	},

	update: function (oldData) {
		var data = this.data;

		// Disable grab cursor classes if no longer enabled.
		if (data.enabled !== oldData.enabled) {
			this.updateGrabCursor(data.enabled);
		}
	},

	tick: function (t) {
		var data = this.data;
		if (!data.enabled) {
			return;
		}
		this.updateOrientation();
		this.updateZoom(this.zoom);
	},

	play: function () {
		this.addEventListeners();
	},

	pause: function () {
		this.removeEventListeners();
	},

	remove: function () {
		this.removeEventListeners();
	},

	bindMethods: function () {
		this.onMouseDown = bind(this.onMouseDown, this);
		this.onMouseMove = bind(this.onMouseMove, this);
		this.onMouseUp = bind(this.onMouseUp, this);
		this.onTouchStart = bind(this.onTouchStart, this);
		this.onTouchMove = bind(this.onTouchMove, this);
		this.onTouchEnd = bind(this.onTouchEnd, this);
	},

	// Set up states and Object3Ds needed to store rotation data.
	setupMouseControls: function () {
		this.mouseDown = false;
		this.pitchObject = new THREE.Object3D();
		this.yawObject = new THREE.Object3D();
		this.yawObject.position.y = 10;
		this.yawObject.add(this.pitchObject);
	},

	// Add mouse and touch event listeners to canvas.
	addEventListeners: function () {
		var sceneEl = this.el.sceneEl;
		var canvasEl = sceneEl.canvas;

		// Wait for canvas to load.
		if (!canvasEl) {
			sceneEl.addEventListener(
				"render-target-loaded",
				bind(this.addEventListeners, this)
			);
			return;
		}

		// Mouse events.
		canvasEl.addEventListener("mousedown", this.onMouseDown, false);
		window.addEventListener("mousemove", this.onMouseMove, false);
		window.addEventListener("mouseup", this.onMouseUp, false);

		// Touch events.
		canvasEl.addEventListener("touchstart", this.onTouchStart);
		window.addEventListener("touchmove", this.onTouchMove);
		window.addEventListener("touchend", this.onTouchEnd);
	},

	// Remove mouse and touch event listeners from canvas.
	removeEventListeners: function () {
		var sceneEl = this.el.sceneEl;
		var canvasEl = sceneEl && sceneEl.canvas;

		if (!canvasEl) {
			return;
		}

		// Mouse events.
		canvasEl.removeEventListener("mousedown", this.onMouseDown);
		window.removeEventListener("mousemove", this.onMouseMove);
		window.removeEventListener("mouseup", this.onMouseUp);

		// Touch events.
		canvasEl.removeEventListener("touchstart", this.onTouchStart);
		window.removeEventListener("touchmove", this.onTouchMove);
		window.removeEventListener("touchend", this.onTouchEnd);
	},

	// Update orientation for mobile and mouse drag.
	updateOrientation: function () {
		var object3D = this.el.object3D;
		var pitchObject = this.pitchObject;
		var yawObject = this.yawObject;

		object3D.rotation.x = this.magicWindowDeltaEuler.x + pitchObject.rotation.x;
		object3D.rotation.y = this.magicWindowDeltaEuler.y + yawObject.rotation.y;
		object3D.rotation.z = this.magicWindowDeltaEuler.z;
	},

	updateZoom: function (zoom) {
		this.data.mainCamera.setAttribute("zoom", zoom);
	},

	// Translate mouse drag into rotation.
	onMouseMove: function (evt) {
		var movementX;
		var movementY;
		var pitchObject = this.pitchObject;
		var previousMouseEvent = this.previousMouseEvent;
		var yawObject = this.yawObject;

		// Not dragging or not enabled.
		if (!this.data.enabled || !this.mouseDown) {
			return;
		}

		// Gesture overlay
		if (this.data.uiOverlay !== null) this.data.uiOverlay.remove();

		movementX = evt.screenX - previousMouseEvent.screenX;
		movementY = evt.screenY - previousMouseEvent.screenY;

		this.previousMouseEvent.screenX = evt.screenX;
		this.previousMouseEvent.screenY = evt.screenY;

		// Calculate rotation.
		yawObject.rotation.y += movementX * 0.005;
		pitchObject.rotation.x += movementY * 0.005;
	},

	// Register mouse down to detect mouse drag.
	onMouseDown: function (evt) {
		if (!this.data.enabled || !this.data.mouseEnabled) {
			return;
		}
		// Handle only primary button.
		if (evt.button !== 0) {
			return;
		}

		this.mouseDown = true;
		this.previousMouseEvent.screenX = evt.screenX;
		this.previousMouseEvent.screenY = evt.screenY;
		this.showGrabbingCursor();
	},

	// Shows grabbing cursor on scene
	showGrabbingCursor: function () {
		this.el.sceneEl.canvas.style.cursor = "grabbing";
	},

	// Hides grabbing cursor on scene
	hideGrabbingCursor: function () {
		this.el.sceneEl.canvas.style.cursor = "";
	},

	// Register mouse up to detect release of mouse drag.
	onMouseUp: function () {
		this.mouseDown = false;
		this.hideGrabbingCursor();
	},

	// Register touch down to detect touch drag.
	onTouchStart: function (evt) {
		if (!this.data.touchEnabled) {
			return;
		}

		this.touchStart = {
			x: evt.touches[0].pageX,
			y: evt.touches[0].pageY,
		};

		this.touchStarted = true;
	},

	// Translate touch move to X/Y-axis rotation.
	onTouchMove: function (evt) {
		var canvas = this.el.sceneEl.canvas;
		var deltaX;
		var deltaY;
		var yawObject = this.yawObject;
		var pitchObject = this.pitchObject;

		if (!this.touchStarted || !this.data.touchEnabled) {
			return;
		}

		if (this.data.uiOverlay !== null) this.data.uiOverlay.remove();

		if (evt.touches.length == 1) {
			deltaX =
				(2 * Math.PI * (evt.touches[0].pageY - this.touchStart.y)) /
				canvas.clientWidth;

			deltaY =
				(2 * Math.PI * (evt.touches[0].pageX - this.touchStart.x)) /
				canvas.clientWidth;

			yawObject.rotation.y += deltaY * 0.5;
			pitchObject.rotation.x += deltaX * 0.5;

			this.touchStart = {
				x: evt.touches[0].pageX,
				y: evt.touches[0].pageY,
			};
		}

		if (evt.touches.length == 2) {
			const curDiff = Math.sqrt(
				Math.pow(evt.touches[1].clientX - evt.touches[0].clientX, 2) +
					Math.pow(evt.touches[1].clientY - evt.touches[0].clientY, 2)
			) / 100;

			if (this.prevDiff > 0) {
				if (curDiff > this.prevDiff) {
					this.zoom += parseFloat(curDiff.toPrecision(2));
				}
				if (curDiff < this.prevDiff) {
					this.zoom -= 0.1;
				}
			}
			this.prevDiff = curDiff;
		}
	},

	// Register touch end to detect release of touch drag.
	onTouchEnd: function () {
		this.touchStarted = false;
	},

	// Toggle the feature of showing/hiding the grab cursor.
	updateGrabCursor: function (enabled) {
		var sceneEl = this.el.sceneEl;

		function enableGrabCursor() {
			sceneEl.canvas.classList.add("a-grab-cursor");
		}
		function disableGrabCursor() {
			sceneEl.canvas.classList.remove("a-grab-cursor");
		}

		if (!sceneEl.canvas) {
			if (enabled) {
				sceneEl.addEventListener("render-target-loaded", enableGrabCursor);
			} else {
				sceneEl.addEventListener("render-target-loaded", disableGrabCursor);
			}
			return;
		}

		if (enabled) {
			enableGrabCursor();
			return;
		}
		disableGrabCursor();
	},
});
