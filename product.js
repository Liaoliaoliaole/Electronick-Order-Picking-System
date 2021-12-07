/* Siyuan Xu */
function displayProduct(index) {
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	htmlGenerateProduct(orders[index]);
	//	orders[index].status = "yellow";
	document.getElementById("orderList").style.display = "none";
	document.getElementById("products").style.display = "table";
	localStorage.setItem("currentOrderIndex",index);
}

//generate html code for picking list (LILI)
/* changed the name and moved style settings to parent function */
/* added dynamic id for each Delieverd text input */
/* edited by siyuan 3.12.2021 */
function htmlGenerateProduct(order) {
	let result = "<tr>\
	<th>CheckBox</th>\
    <th>Product Name</th>\
	<th>Product ID</th>\
	<th>Shelf Place</th>\
    <th>Quantity</th>\
	<th>Delivered</th></tr>";

	for (let i in order.products) {
		result += "<tr><th><input type='checkbox'></th>"
			+ "<th>" + order.products[i].pName + "</th>"
			+ "<th>" + order.products[i].pCode + "</th>"
			+ "<th>" + order.products[i].sPos + "</th>"
			+ "<th>" + order.products[i].qty + "</th>"
			+ "<th><input id='delivered" + i + "' type='text'></th></tr>";
	}
	document.getElementById("productList").innerHTML = result;
}

// onclick events to view final version before print (LILI)
/* changed the name for consistency */ 
/* moved html generation functionality to own function */
/* edited by Siyuan Xu 3.12.2021*/
function displayReceipt(){
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	let i = localStorage.getItem("currentOrderIndex");

    orders[i].status = "green";

	document.getElementById("orders").style.display = "none";
	document.getElementById("products" ).style.display = "none";
	document.getElementById("receipt").style.display = "";
	
	htmlGenerateReceiptOrderInfo(orders[i]);
	htmlGenerateReceiptProductInfo(orders[i]);
	htmlGenerateReceiptPrintButton();
}

//show single order info list Final (LILI)
/* changed the name */ 
/* moved CSS style settings to parent function */
/* edited by siyuan 3.12.2021 */
function htmlGenerateReceiptOrderInfo(order) {
	let result = "<dl><dt>Order ID:</dt>"
		+ "<dd>" + order.orderID + "</dd>"
		+ "<dt>Customer:</dt>"
		+ "<dd>" + order.cName + "</dd>"
		+ "<dt>Address:</dt>"
		+ "<dd>" + order.delivAddr + "</dd>"
		+ "<dt>Sales Rep:</dt>"
		+ "<dd>" + order.rPerson + "</dd>"
		+ "<dt>DElivery date:</dt>"
		+ "<dd>" + order.delivDate + "</dd>"
		+ "<dt>Customers comment:</dt>"
		+ "<dd>" + order.comment + "</dd></dl>";

	document.getElementById("receiptOrderInfo").innerHTML = result;
}

// Final version of products (LILI)
/* changed the name */ 
/* moved CSS style settings to parent function */
/* edited by siyuan 3.12.2021 */
function htmlGenerateReceiptProductInfo(order) {
	let result = "<tr>\
    <th>Product Name</th>\
	<th>Product ID</th>\
	<th>Unit Price(Euro)</th>\
    <th>Quantity Ordered</th>\
	<th>Delivered</th></tr>";

	for (let i in order.products) {
		result += "<tr><th>" + order.products[i].pName + "</th>"
			+ "<th>" + order.products[i].pCode + "</th>"
			+ "<th>" + order.products[i].uPrice + "</th>"
			+ "<th>" + order.products[i].qty + "</th>"
			+ "<th>" + order.products[i].collection + "</th></tr>";
	}
	document.getElementById("receiptProductInfo").innerHTML = result;
};

/* Content made by Lily */
/* Moved the functionality to own function - Siyuan Xu */
function htmlGenerateReceiptPrintButton(){
	let printButton = document.createElement("button");
	printButton.innerHTML = "Print";
	printButton.setAttribute("id","print");
	printButton.onclick = function printPage(){
		document.getElementById("print").style.display = "none";
		window.print();
	}; 
	document.body.appendChild(printButton);
}

/* Push/Update the current order data in localstorage - siyuan xu */
function updateOrderData(){
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	let orderIndex = localStorage.getItem("currentOrderIndex");
	for(let i in orders[orderIndex].products){
		orders[orderIndex].products[i].collection = document.getElementById("delivered"+i).value;
		console.log(document.getElementById("delivered"+i).value);
		console.log(orders[orderIndex].products[i].collection);
	}
	orders[orderIndex].status = "green";
	localStorage.setItem("localOrderData", JSON.stringify(orders));
}