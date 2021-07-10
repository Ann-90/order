const products = document.querySelector(".form__products");
const orderBtn = document.querySelector(".order__formbtn");

function getProductInfo() {
	// get LocalStorage object {products: {amount: amount, price: price}}

	const productStorage = JSON.parse(localStorage.getItem("products"));
	const quantity = productStorage ? productStorage.amount : 1;
	const price = productStorage ? productStorage.price : 24.99;

	return [quantity, price];
}

function updateState() {
	const quantity = getProductInfo()[0];
	const price = getProductInfo()[1];

	renderProductCard(quantity, price);

	const cross = document.querySelectorAll(".product__cross_hidden");

	if (quantity > 1) removeClass(cross, "product__cross_hidden");

	deleteBtn(cross);
}

function updateProductInfo(amount) {
	// update localStorage by amount of Products
	const prices = [24.99, 44, 60, 72, 80];
	const productUPD = { amount, price: prices[amount - 1] };

	if (amount === 0) localStorage.removeItem("products");
	else localStorage.setItem("products", JSON.stringify(productUPD));
}

function renderProductCard(quantity, price, delay) {
	// render product card

	if (quantity) {
		for (let p = 0; p < quantity; p++) {
			const title = p + 1;

			const testNode = `
        <div class="product">
            <section class="form__input">
                <div class="product__title">
                    <h3>Product ${title}</h3>
                    <img class="product__cross_hidden" src="/public/cross.svg" alt="" />
                </div>
                <span>Enter main keyword for the product</span>
                <input type="text" placeholder="for example, sylicon wine cup" />
            </section>

            <section class="form__input">
                <span>Enter link to the similar product as a reference</span>
                <input type="text" placeholder="https://..." />
            </section>
        </div>
        `;

			products.insertAdjacentHTML("beforeend", testNode);
		}
	}

	// render product btn
	if (price) orderBtn.innerHTML = `Submit and Pay ${price} USD`;

	// render product loader
	if (delay) {
		orderBtn.innerHTML = `<div class="loader"></div>`;
	}
}

function removeClass(elemList, className) {
	elemList.forEach((e) => {
		e.classList.remove(className);
	});
}

function deleteBtn(crossCollection) {
	// delete Product btn
	crossCollection.forEach((e) => {
		e.addEventListener("click", () => {
			// amount of Products in LocalStorage
			const amount = getProductInfo()[0];

			if (amount > 1) {
				// delete element
				e.parentNode.parentNode.parentNode.remove();
				const productsUPD = document.querySelectorAll(".product");
				updateProductInfo(productsUPD.length);

				if (amount === 2) {
					// hide cross if the only Product is left
					document.querySelector(".product img").classList.add("product__cross_hidden");
				}
			}

			renderProductCard(undefined, getProductInfo()[1], undefined);
		});
	});
}

function addLoader(event) {
	event.preventDefault();

	renderProductCard(undefined, undefined, 2000);

	// synthetic delay (ajax mock)
	setTimeout(() => {
		const rootPath = location.href.replace("main.html", "payment.html");

		updateProductInfo(0);
		location.href = rootPath;
	}, 2000);
}

orderBtn.addEventListener("click", addLoader);

updateState();
