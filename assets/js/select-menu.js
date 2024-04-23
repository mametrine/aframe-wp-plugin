{
	const viewerContainer = document.querySelector(".arinova3d-viewer-container");
	const selectMenuButton = document.querySelector(
		".arinova3d-select-menu__button"
	);
	const selectMenuList = document.querySelector(".arinova3d-select-menu ul");
	const selectMenuListItems = selectMenuList.getElementsByTagName("li");
	const selectedItemThumbnail = document.querySelector(
		".arinova3d-select-menu__selected-item-thumbnail"
	);
	const selectedItemText = document.querySelector(
		".arinova3d-select-menu__selected-item-text"
	);

	viewerContainer.addEventListener("click", () => {
		if (
			selectMenuList.querySelector(".arinova3d-select-menu--closed") === null
		) {
			selectMenuList.classList.add("arinova3d-select-menu--closed");
		}
	});

	selectMenuButton.addEventListener("click", (event) => {
		selectMenuList.classList.toggle("arinova3d-select-menu--closed");
		event.stopPropagation();
	});

	for (const listItem of selectMenuListItems) {
		listItem.addEventListener("click", () => {
			const thumbnail = listItem.querySelector(
				".arinova3d-select-menu__item-thumbnail"
			);
			const text = listItem.querySelector(".arinova3d-select-menu__item-text");
			selectedItemThumbnail.setAttribute("src", thumbnail.getAttribute("src"));
			selectedItemText.textContent = text.textContent;
			selectMenuList.classList.add("arinova3d-select-menu--closed");
		});
	}
}
