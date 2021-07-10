const title = document.querySelector(".payment h3");
const info = document.querySelector(".payment p");
const image = document.querySelector(".payment img");
const btn = document.querySelector(".payment button");

const status = Math.random();
let isSucsess = status >= 0.5 ? true : false;

function setNodes(state) {
	let titleText = state ? "Successfull payment" : "Your payment failed";
	let infoText = state
		? "Your request has been accepted and will be processed within 24 working hours. We will send you a payment details and all information to your email."
		: "Sorry, but we’ve having trouble processing your payment. You have been not charged for this transaction.";
	let imageLink = state ? "/public/sucsess.png" : "/public/fail.png";
	let btnText = state ? "Back" : "Try to pay again";

	let btnClass = state ? "formbtn_sucsess" : "formbtn_failed";

	renderPayment(titleText, infoText, imageLink, btnText, btnClass);
}

function renderPayment(...args) {
	title.append(args[0]);
	info.append(args[1]);
	image.src = args[2];
	btn.append(args[3]);

	btn.classList.add(args[4]);
}

setNodes(isSucsess);

isSucsess
	? window.history.pushState(null, "paymentsuccess", "/src/payment.html/paymentsuccess")
	: window.history.pushState(null, "paymenterror", "/src/payment.html/paymenterror");
