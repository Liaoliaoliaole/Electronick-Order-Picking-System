function getData() {
	fetch("http://www.cc.puv.fi/~asa/json/project.json")
		.then(r => r.text())
		.then(data => initOrder(data));
}

function Product(pCode, pName, pDesc, sCode, quantity, uPrice, sPos, collection, status) {
	this.pCode = pCode;
	this.pName = pName;
	this.pDesc = pDesc;
	this.sCode = sCode;
	this.qty = quantity;
	this.uPrice = uPrice;
	this.sPos = sPos;
	this.collection = collection;	//number of actually collected products
	this.status = status;			//product status will be true if collection == qty, otherwise it will be false.

	function setStatus() {
		status = qty == collection ? true : false;
	}
};

function initProducts(oldProducts) {
	let newProducts = new Array();
	for (let i in oldProducts) {
		newProducts.push(new Product(oldProducts[i].code,
			oldProducts[i].product,
			oldProducts[i].description,
			oldProducts[i].suppliercode,
			oldProducts[i].qty,
			oldProducts[i].unit_price,
			oldProducts[i].shelf_pos,
			0,
			false)
		)
	}
	return newProducts;
}

/*
function initProducts(products) {
	for (let i in products) {
		products[i]["collection"] = 0;
		products[i]["status"] = false;
	}
	return products;
}
*/

function Order(orderID, cID, cName, invAddr, deliAddr, deliDate, rPerson, comment, tPrice, products, status) {
	this.orderID = orderID;
	this.cID = cID;
	this.cName = cName;
	this.invAddr = invAddr;
	this.delivAddr = deliAddr;
	this.delivDate = deliDate;
	this.rPerson = rPerson;
	this.comment = comment;
	this.tPrice = tPrice;
	this.products = products;
	this.status = status;		//default: red, ready:green
};
/*
function initOrder(data) {
	let orders = JSON.parse(data);
	for (let i in orders) {
		orders[i].products = initProducts(orders[i].products);
		orders[i]["status"] = "red";
	}
	localStorage.setItem("localOrderData", orders)
}
*/

//6-10-2020

function toDate(dateStr) {
	let parts = dateStr.split("-")
	return new Date(parts[2], parts[1] - 1, parts[0])
}

function initOrder(data) {
	let oldOrder = JSON.parse(data);
	let orders = new Array();
	for (let i in oldOrder) {
		orders.push(new Order(oldOrder[i].orderid,
			oldOrder[i].customerid,
			oldOrder[i].customer,
			oldOrder[i].invaddr,
			oldOrder[i].delivaddr,
			oldOrder[i].deliverydate,
			oldOrder[i].respsalesperson,
			oldOrder[i].comment,
			oldOrder[i].totalprice,
			initProducts(oldOrder[i].products),
			"red")
		)
	}
	//sort order list by delivery date in descending order
	orders.sort((a, b) => toDate(b.delivDate) - toDate(a.delivDate));
	localStorage.setItem("localOrderData", JSON.stringify(orders));
}

function updateOrderList() {
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	dispOrder(orders);
	document.getElementById("oList").style.display = "none";//hide individual order  (LILI)
	document.getElementById("products").style.display = "none";//hide products (LILI)
	document.getElementById("orderList").style.display = "";//show oeder table again (LILI)
}

function dispOrder(orders) {
	console.log(orders);
	//	let sortedOrders = sortOrders(orders);
	//	orders.sort((a,b) => toDate(b.delivDate) - toDate(a.delivDate));

	let result = "<tr>\
	<th>STATUS</th>\
    <th>ORDER ID</th>\
	<th>CUSTOMER ID</th>\
	<th>COMMENTS</th>\
    <th>DELIV. DATE</th></tr>";

	for (let i in orders) {
			result += "<tr><th>" + orders[i].status + "</th>"
				+ "<th onClick='callProduct(" + i + ");'>" + orders[i].orderID + "</th>"
				+ "<th>" + orders[i].cID + "</th>"
				+ "<th>" + orders[i].comment + "</th>"
				+ "<th>" + orders[i].delivDate + "</th></tr>";
	}
	document.getElementById("orderList").innerHTML = result;
}

function callProduct(index){
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	//dispOrderInfo(orders[index]);
	dispProduct(orders[index]);		
	console.log(index);
	console.log(orders[index]);
	localStorage.setItem("currentOrder",index);
}

// onclick events to view final version before print (LILI)
function goFinalView(){
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	let i = localStorage.getItem("currentOrder");
	console.log(i);
    //orders[i].status = "green";
	document.getElementById("pList").style.display = "none";
	document.getElementById("searchText" ).style.display = "none";
	document.getElementById("searchButton").style.display = "none";
	document.getElementById("showOrder").style.display = "none";
	document.getElementById("goPrint").style.display = "none";
	
	dispOrderInfo(orders[i]);
	dispProductFinal(orders[i]);
	
	/*let but2 = document.createElement("button");
	but2.setAttribute("id","back");
	but2.innerHTML = "Back";
	but2.onclick = function backToOrder(){
        document.getElementById("oList").style.display = "none";
	    document.getElementById("searchText" ).style.display = "";
	    document.getElementById("searchButton").style.display = "";
		document.getElementById("showOrder").style.display = "";
        dispProduct(orders[i]);
		document.getElementById("print").style.display = "none";
		document.getElementById("back").style.display = "none";
	}
	document.body.appendChild(but2);*/

	let but1 = document.createElement("button");
	but1.innerHTML = "Print";
	but1.setAttribute("id","print");
	but1.onclick = function printPage(){
		document.getElementById("print").style.display = "none";
		window.print();
	}; 
	document.body.appendChild(but1);
}


//sort the orders in descending order by delivery Date 
function sortOrders(orders) {
	let temp = new Order;
	for (let i in orders) {
		for (let j in orders) {
			if (toDate(orders[i].delivDate) < toDate(orders[(j + 1)].delivDate)) {
				temp = orders[i];
				orders[i] = orders[j + 1];
				orders[j + 1] = temp;
			}
		}
	}
	return orders;
}

//search by orderID, customerID, customerName
function searchOrder() {
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	let keyword = document.getElementById("searchText").value;
	let result = new Array;
	let rIndex = 0;
	for (let i in orders) {
		if (keyword == orders[i].orderID
			|| keyword == orders[i].cID
			|| keyword == orders[i].cName
		) {
			result.push(new Order);
			result[rIndex] = orders[i];
//			console.log(result[rIndex], orders[i]);
			rIndex++;
		}
	}
	console.log(result);
	dispOrder(result);
}


//show products picking list (LILI)
function dispProduct(order) {
    document.getElementById("orderList").style.display = "none";
    document.getElementById("pList").style.display = "";
	document.getElementById("products").style.display = "";
	console.log(order);
	//	let sortedOrders = sortOrders(orders);
	//	orders.sort((a,b) => toDate(b.delivDate) - toDate(a.delivDate));

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
				+ "<th><input type='text'></th></tr>";
	}
	document.getElementById("pList").innerHTML = result;
    document.getElementById("goPrint").style.display = "";
}

//show single order info list Final (LILI)
function dispOrderInfo(order) {
	document.getElementById("oList").style.display = "";
	document.getElementById("products").style.display = "";
	console.log(order);	
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

	document.getElementById("oList").innerHTML = result;
}

// Final version of products (LILI)
function dispProductFinal(order){
	//document.getElementById("orderList").style.display = "none";
    document.getElementById("pList").style.display = "table";
	console.log(order);
	//	let sortedOrders = sortOrders(orders);
	//	orders.sort((a,b) => toDate(b.delivDate) - toDate(a.delivDate));

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
				+ "<th>" + " empty " + "</th></tr>";
	}
	document.getElementById("pList").innerHTML = result;
    //document.getElementById("goPrint").style.display = "";
}	;

//Search for order with different criterias
//what is clean packing list.
//set status for ORDER and PRODUCT
//Login needed




