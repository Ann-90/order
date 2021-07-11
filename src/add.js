// Product info is saved in LocalStorage object {products: {amount: amount, price: price}}

const continueBtn = document.querySelector(".formbtn");
const prices = [24.99, 44, 60, 72, 80];

function saveLocalStorage(event) {
	const inputs = event.target.form.querySelectorAll("input");

	inputs.forEach((inp) => {
		if (inp.checked) {
			const amount = Number(inp.id.slice(0, 1));
			// const isDiscount = amount === 1 ? false : true;

			const products = {
				amount,
				// isDiscount,
				price: prices[amount - 1],
			};

			localStorage.setItem("products", JSON.stringify(products));
		}
	});
}

continueBtn.addEventListener("click", saveLocalStorage);
