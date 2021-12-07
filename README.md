# Electronick-Order-Picking-System
We have a middle sized retailer, who sells spareparts for machines.
Their customers are ordering the spareparts via web shop, which is integrated into the shop ordering system.
Order has following information: order id, customer id, customer name, invoicing address, delivery address, delivery date, responsible sales person, free comments, total price and list of ordered products.
Product has following information: code, name, description, supplier code, quantity, unit price and shelf position.

In current situation, customer prints the order into paper from the order system. This paper is used in collecting ordered products from the warehouse.
SO customer opens the ordering system, finds the order (there are different search criteria's, for example customer number, order id, delivery date etc ).
After opening the order, he prints the PDF and starts collecting the products.
During the collection customer marks to paper which products he has picked, and writes comments if some products are missing or not all were able to pick.
After all products have been picked, customer sends the products to their customer with the paper ( which has lots of these internal markings done ).
There are always questions from foreign customers, what does this and that marking mean, since surely they don't understand the Finnish and they get mixed since there are internal writings added.

Now the customer wants to start a new decade and get rid of the printed papers and pens. He contacts you and wants to start a co-operation with your team.

The orders are still coming via the existing system, and they can be exported in JSON-file: http://www.cc.puv.fi/~asa/json/project.json.

Customer has decided to purchase tablets for warehouse workers. With tablet they want to use our application for searching orders and picking them for delivery. User needs to be able to search orders with different criteria's, and once opening an order to see what has been ordered. Users needs to be able to mark each product as picked and/ or write comments for ordered products. 
After all products have been picked, user needs to be able to mark the whole order as ” ready ”. He also needs to be able to print a clean packing list to be sent with the products. Marking the order as ready is important so that sales person sees the status and can answer customer questions.

Our application needs to be secure, so login into the application is required

---------------------------

1. Specification:
What are the requirements of electric picking list application? List all requirements on paper
 

2. Design:
What kind of UI we need?
Draw into paper different pages  
What are the main components in our application?
How shall we implement login?
What should the printed packing list look like?
 

3. Implementation:
Who is in response of what?
HTML, CSS, Javascript
Login, listing orders, printing etc
Version contrl to help working with teams?
 

4. Project results:
UI design
Electric picking list -application delivered to VAMK server (public_html)
Presentation of your project
Demo
How did the project go, who did what etc
 
5. Project grading:
Usability
Functionalities
Implementation
for example how the login was implemented
