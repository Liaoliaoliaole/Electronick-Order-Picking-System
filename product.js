function displayProduct(index) {
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	htmlGenerateProduct(orders[index]);
	updateOrderStatus("yellow");
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
		result += "<tr><td><input type='checkbox'></td>"
			+ "<td>" + order.products[i].pName + "</td>"
			+ "<td>" + order.products[i].pCode + "</td>"
			+ "<td>" + order.products[i].sPos + "</td>"
			+ "<td>" + order.products[i].qty + "</td>"
			+ "<td><input id='delivered" + i + "' type='text' value='" + order.products[i].collection + "'></td></tr>";
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
	document.getElementById("orders").style.display = "none";
	document.getElementById("products" ).style.display = "none";
	document.getElementById("receipt").style.display = "";	
	htmlGenerateReceiptOrderInfo(orders[i]);
	htmlGenerateReceiptProductInfo(orders[i]);
	if(document.getElementById("print")==null){
		console.log(document.getElementById("print"));
		htmlGenerateReceiptPrintButton();
	}else{
		document.getElementById("print").style.display = "";
	}
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
		result += "<tr><td>" + order.products[i].pName + "</td>"
			+ "<td>" + order.products[i].pCode + "</td>"
			+ "<td>" + order.products[i].uPrice + "</td>"
			+ "<td>" + order.products[i].qty + "</td>"
			+ "<td>" + order.products[i].collection + "</td></tr>";
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


function updateOrderData(status){
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	let orderIndex = localStorage.getItem("currentOrderIndex");
	for(let i in orders[orderIndex].products){
		let input_value = document.getElementById("delivered"+i).value;
		orders[orderIndex].products[i].collection = input_value == "" ? 0 : input_value;
		console.log("delivered:", input_value);
	}
	console.log("orderinfo", orders[orderIndex].products);
	if(orders[orderIndex].status != "green" && status != ""){ 
		orders[orderIndex].status = status;
	}
	localStorage.setItem("localOrderData", JSON.stringify(orders));
}

function updateOrderStatus(status){
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	let orderIndex = localStorage.getItem("currentOrderIndex");

	if(orders[orderIndex].status != "green" && status != ""){ 
		orders[orderIndex].status = status;
	}
	localStorage.setItem("localOrderData", JSON.stringify(orders));
}
