<div class="arinova3d-viewer-container">
	<div class="arinova3d-toolbar">
		<div class="arinova3d-select-menu">
			<div class="arinova3d-select-menu__label">Change model</div>
			<button class="arinova3d-select-menu__button">
				<div class="arinova3d-select-menu__button-inner-flex-wrapper">
					<img 
						class="arinova3d-select-menu__selected-item-thumbnail" 
						src="<?php echo plugin_dir_url(__DIR__) .
          "/assets/images/list-thumb-helmet.png"; ?>" alt="" 
					/>
					<span class="arinova3d-select-menu__selected-item-text">Model 1</span>
				</div>
				<img 
					class="arinova3d-select-menu__icon" 
					src="<?php echo plugin_dir_url(__DIR__) .
         "/assets/images/menu-arrow-down.svg"; ?>" alt="" 
				/>
			</button>
			<ul class="arinova3d-select-menu--open arinova3d-select-menu--closed">
				<li>
					<div class="arinova3d-select-menu__item-inner-flex-wrapper">
						<img 
							class="arinova3d-select-menu__item-thumbnail" 
							src="<?php echo plugin_dir_url(__DIR__) .
           "/assets/images/list-thumb-helmet.png"; ?>" alt="" 
						/>
						<span class="arinova3d-select-menu__item-text">Model 1</span>
					</div>
				</li>
				<li>
					<div class="arinova3d-select-menu__item-inner-flex-wrapper">
						<img 
							class="arinova3d-select-menu__item-thumbnail" 
							src="<?php echo plugin_dir_url(__DIR__) .
           "/assets/images/list-thumb-shoe.png"; ?>" alt="" 
						/>
						<span class="arinova3d-select-menu__item-text">Model 2</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="arinova3d-gesture-overlay arinova3d-gesture-overlay--hidden">
		<img 
			class="arinova3d-gesture-icon" 
			src="<?php echo plugin_dir_url(__DIR__) .
       "/assets/images/gesture-swipe.svg"; ?>" alt="" 
		/>
		<span class="arinova3d-gesture-instruction">Swipe or drag to rotate.</span>
	</div>
	<a-scene vr-mode-ui="enabled: false" embedded reflection="directionalLight: a-light#dirlight">
		<a-assets>
			<a-asset-item 
				id="helmet" 
				src="<?php echo plugin_dir_url(__DIR__) . "/assets/gltf/DamagedHelmet.gltf"; ?>"
			></a-asset-item>
			<a-asset-item 
				id="shoe" 
				src="<?php echo plugin_dir_url(__DIR__) .
        "/assets/gltf/MaterialsVariantsShoe.gltf"; ?>"
			></a-asset-item>
		</a-assets>
		<a-sky color="#1c1f24"></a-sky>
		<a-light id="dirlight" color="#fff" position="0 3 3" intensity="3"></a-light>
		<a-camera 
			id="main-camera" 
			fov="60" 
			zoom="1"  
			position="0 0 0" 
			look-controls-enabled="false"
		></a-camera>
		<a-gltf-model 
			src="#helmet" 
			gesture-overlay 
			look-controls-model="uiOverlay: .arinova3d-gesture-overlay; mainCamera: #main-camera"
			position="0 0 -4"
		></a-gltf-model>
		<a-entity 
			model-changer="textElement: .arinova3d-select-menu__selected-item-text; modelEntity: a-gltf-model; asset1: #helmet; asset2: #shoe"
		></a-entity>
	</a-scene>
</div>
