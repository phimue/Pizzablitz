function sendMail() {
    var link = "mailto:max@muster.de"
             + "&subject=" + encodeURIComponent("This is my subject")
             + "&body=" + encodeURIComponent(document.getElementById('myText').value)
    ;
    
	window.location.href = link;
}

var cart = [];

function totalPrice() {
	var completePrice = 0.00;
	for(var i = 0; i<cart.length; i++)
	{
		completePrice += (cart[i].price*cart[i].amount);
	}
	document.getElementById("price").innerHTML = completePrice.toFixed(2) + ' €';
	return completePrice;
}

function createCartForm(){
	let form = document.createElement("FORM");
	form.setAttribute("action", "index.html");
	form.setAttribute("id", "orderform");
	form.setAttribute("method", "POST");
	for(var j = 0; j < cart.length; j++){
		let formelem = document.createElement("INPUT");
		formelem.setAttribute("type", "hidden");
		formelem.setAttribute("form", "orderform");
		formelem.setAttribute("value", 'Pizza: ' + cart[j].name + ' | Größe: ' + cart[j].size + ' | Preis: ' + cart[j].price + ' | Anzahl: ' + cart[j].amount);
		form.appendChild(formelem);
		console.log(formelem);
	}
	let priceelem = document.createElement("INPUT");
	priceelem.setAttribute("type", "hidden");
	priceelem.setAttribute("form", "orderform");
	priceelem.setAttribute("value", totalPrice());
	form.appendChild(priceelem);
	console.log(form);
}

function emptyCart(){
	var temp = document.getElementsByClassName('Bestellung');
	while (temp[0]) {
		temp[0].parentNode.removeChild(temp[0]);
	}
}

function clearCart(){
	if(cart.length === 0){
		alert('Warenkorb ist leer!');
	}
	else{
		emptyCart();
		cart = [];
		totalPrice();
	}
}

function checkout() {
	if(cart.length === 0){
		alert('Warenkorb ist leer!');
	}
	else{
		createCartForm();
		clearCart();
		alert('Bestellung abgeschickt!');
	}
}

function printCart(){
	emptyCart();
	for(var j = 0; j < cart.length; j++){
		let div = document.createElement("div");
		div.className = "Bestellung";
		let textelem = document.createElement("span");
		div.appendChild(textelem);
		let text = document.createTextNode(cart[j].name + ', ' + cart[j].size + ' | ');
		textelem.appendChild(text);
		let input = document.createElement("INPUT");
		input.setAttribute("type", "text");
		input.setAttribute("size", "2");
		input.setAttribute("maxlength", "2");
		input.setAttribute("value", cart[j].amount);
		input.setAttribute("required", "true");
		input.setAttribute("readOnly", "true");
		input.className = "inputfield";
		div.appendChild(input);
		let buttoninput = document.createElement("BUTTON");
		buttoninput.textContent = "Remove";
		buttoninput.className = "removebutton";
		buttoninput.onclick = removeItem;
		div.appendChild(buttoninput);
		document.querySelector(".bestellliste").appendChild(div);
	}
	
}

function addItem(pizza, button) {
	totalPrice(button);
	const product = {name: null, size: null, price: 0, amount: 0};
	
	var buttonName = document.getElementById(button).className;
	if (buttonName == "buttonsmall"){
		product.size = document.getElementById("size_klein").innerText;
	}
	if (buttonName == "buttonbig") {
		product.size = document.getElementById("size_gross").innerText;
	}
	
	product.name = document.getElementById(pizza).innerText;
	var x = document.getElementById(button).innerText;
	var y = parseFloat(x);
	product.price = y;

	let item = cart.find(item => (item.name === product.name && item.size === product.size));

	if(item === undefined)
	{
		product.amount += 1;
		cart.push(product);
	}
	else{	
		item.amount += 1;
	}
	printCart();
	totalPrice();
}

function removeItem(){
	let elem = this.parentNode.getElementsByTagName("SPAN");
	let text = elem[0].innerText;
	const splittext = text.split(', ');
	const remover = splittext[1].split(' ')
	splittext[1] = remover[0];	

	let item = cart.find(item => (item.name === splittext[0] && item.size === splittext[1]));
	if(item !== undefined){
		item.amount -= 1;
	}
	const itemindex = cart.indexOf(item);
	let newitem = cart.find(item => (item.name === splittext[0] && item.size === splittext[1]));
	if(newitem !== undefined){
		if(item.amount === 0){
			cart.splice(itemindex, 1);
		}
	}
	printCart();
	totalPrice();
}