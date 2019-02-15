// the function display gets the current geolocation then calls the getWeather function. 
function display(){
	
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			var ID = document.getElementById("clientId").value; 
			var SECRET = document.getElementById("password").value;
			getWeather(lat,lon,ID, SECRET);
		});
	}
}

//takes in the geolocation, the client id, and password as a paramenter and 
//uses these paramenters to make an http request. Then, upon successful request
// it diplays a table that contains 7 days forcast of the minTemp, maxTemp, avgTemp, 
//humidity of the current location.
function getWeather(x,y,id,pd){
	
	var URL =  "https://api.aerisapi.com/forecasts/" + x + ","+y +"?&format=json&filter=day&client_id="+id+"&client_secret="+pd; 
	$.ajax({
		type: "GET",
		url: URL,
		dataType: "jsonp",
		contentType: "application/json; charset=utf-8",		
		//data: "{}",
		
		success: function(msg){
			table(msg);			 
		},
		error: function (xhr, ajaxOptions, thrownError){
			$("#display").html("Error fetching " + URL); 
		}
	});
	
}

//This function obtains the info needed from the response message and displays the info
//in  a table
function table(msg){		
	var table = document.createElement("table"); 
	table.setAttribute("id","t"); 
	var header = table.createTHead(); 
	var body = table.createTBody(); 
    var row = header.insertRow(0);  
	var cell0 = row.insertCell(0);  
	var cell1 = row.insertCell(1); 
	var cell2 = row.insertCell(2);  
	var cell3 = row.insertCell(3);
	var cell4 = row.insertCell(4);  
	cell0.innerHTML = "date(yy,mm,dd)";
	cell1.innerHTML = "minT(c)"; 
	cell2.innerHTML = "maxT(c)";
	cell3.innerHTML = "avgT(c)";
	cell4.innerHTML = "humidity"; 
	for (var i = 0;  i<7 ; i++){
		var d = msg.response[0].periods[i].validTime;
		var date = d.slice(2,10);
		var mintemp = msg.response[0].periods[i].minTempC;
		var maxtemp = msg.response[0].periods[i].maxTempC;
		var avgtemp = msg.response[0].periods[i].avgTempC;
		var humidity = msg.response[0].periods[i].humidity;
		
		var row = body.insertRow(i); 
		var cell0 = row.insertCell(0);  
		var cell1 = row.insertCell(1); 
		var cell2 = row.insertCell(2);  
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);  
		
		cell0.innerHTML = date;
		cell1.innerHTML = mintemp; 
		cell2.innerHTML = maxtemp;
		cell3.innerHTML = avgtemp;
		cell4.innerHTML = humidity;
	}

	var currentDiv = document.getElementById("display");  
	currentDiv.removeChild(currentDiv.firstChild); 
	currentDiv.appendChild(table); //displays the new table. 
}

