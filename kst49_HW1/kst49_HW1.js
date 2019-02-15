
//This function is called when the compute button is pressed. 
//It displays the result. 
function display(){
	var n = parseInt(document.getElementById("n").value); // gets the value of n from the textbox and change it to integer. 
	
	if (n < 0){ //if n is negative, diplays error
		var msg = "Cannot compute Fib of a negative integer"; 
		 error(msg);
	}
	else if (isNaN(n)){//if n is not a number, displays error
		var msg = "Invalid Input"
		error(msg);
	}
	else{ //if n is a valid input, displays a table
		table(n)		
	}
}


//The function below a recursive function that takes in n as a paramenter and returns f(n).
function calculate(n){	
    if (n==0 || n==1){ //base case
		return n; 
	}
	else{
		return calculate(n-1)+calculate(n-2); //recursive case
	}			
}

//The function below takes in an error message and displays the message on the webpage 
function error(m){
	//The next a few lines of codes create a new div and a text node, and display the text in the new div. 
	var newdiv = document.createElement("div");
	var msg = document.createTextNode(m); 
	newdiv.setAttribute("id","err");
	var currentDiv = document.getElementById("result");  //get the result div so that changes can be made to it.
	currentDiv.removeChild(currentDiv.firstChild); //removes the previous table or error message.
	newdiv.appendChild(msg); //appends the error message to newdiv
	currentDiv.appendChild(newdiv);//appends newdiv to currentDiv 
}


// The following function takes in n as a paramenter. It creates a n+1 by 2 table
// and in the table it displays n and f(n) for all non-negative integers lessthan
// or equal to n.
function table(n){		
	//The next few lines of code create a table, a table header, a table body 
	//and diplay "n" and "fib(n)" as the header of the table.  
	var table = document.createElement("table"); 
	table.setAttribute("id","t"); 
	var header = table.createTHead(); 
	var body = table.createTBody(); 
    var row = header.insertRow(0);  
	var cell1 = row.insertCell(0);  
	var cell2 = row.insertCell(1);  
	cell1.innerHTML = "n"; 
	cell2.innerHTML = "fib(n)";
	//The following for loop create n+1 rows in the body of the table and display the values of n and f(n). 
	for (var i = 0;  i<n+1 ; i++){
		var row = body.insertRow(i); 
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = i;
		cell2.innerHTML = calculate(i); 
	}

	var currentDiv = document.getElementById("result");  
	currentDiv.removeChild(currentDiv.firstChild); 
	currentDiv.appendChild(table); //displays the new table. 
}		