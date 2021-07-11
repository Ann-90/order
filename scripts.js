const inputContainers = document.querySelectorAll(".form__input");

function removeClass(elemList, className) {
	elemList.forEach((e) => {
		e.classList.remove(className);
	});
}

function activateInput(event) {
	event.currentTarget.querySelector("input").focus();
}

function changeLightningStyle(event) {
	const inputEl = event.currentTarget.querySelector("input");
	
	if (inputEl.type === "radio") {
		inputEl.checked = true;
		removeClass(inputContainers, "form__input_active");
		event.currentTarget.classList.add("form__input_active");
	}
}

function handleInputCick(event) {
	changeLightningStyle(event);
	activateInput(event);
}
inputContainers.forEach((elem) => {
	elem.addEventListener("click", handleInputCick);	
});
