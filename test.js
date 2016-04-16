var http = require("http");

var port = 8080;

var obj = {};
var dateUrl = '';

function remove(str)
{ 
	var newStr =[]; 
	for(var i = 0; i < str.split(',').length; i++)
	{
		newStr.push(str.split(',')[i].replace(/%20/, ' '));
		//console.log(newStr);
	}//end of for
	
	newStr[0] = newStr[0].replace(/\//ig, ''); 
	//console.log(newStr);
	return newStr.join(',');
}

function convertMonth(month)
{
	switch(month)
	{
		case 1:
			return "January";
		case 2:
			return "February";
		case 3:
			return 'March';
		case 4:
			return "April";
		case 5:
			return "May";
		case 6:
			return "June";
		case 7: 
			return "July";
		case 8:
			return "August";
		case 9:
			return "September";
		case 10:
			return "October";
		case 11:
			return "November";
		case 12:
			return "December";
		
	}
}

function isValidInput(input)
{
	if(isNaN(Number(input)))
	{
	var month  = input.split(' ')[0];
	var day = parseInt(input.split(' ')[1]);
	var year = parseInt(input.split(' ')[2]);
	//console.log(month, day, year);
	
	if((day >= 1 && day <= 31) && (year >= 1970 && year <= 2200))
	{
		return true;
	}
	else
	{
		return false;
	}
	//console.log("YES!!!");
	
	}//end of if
	else if(!isNaN(Number(input)))
	{
		if(input >= 1)
		{
			return true;
		}
		else
		{
			return false;
		}
		//console.log("Watch the throne");
	}
	
}

function readFile(dateStr)
{
	var obj = {};
	var daDate;// = new Date();
	
	if(isNaN(Number(dateStr)) && isValidInput(remove(dateStr)))
	{
		dateStr = remove(dateStr);
		daDate = new Date(dateStr).getTime();
		obj.unix = daDate;
		obj.natural =  dateStr;
        //console.log(dateStr, "from string function");
        //isNaN(parseInt(dateStr));

	}
	 if(!isNaN(Number(dateStr)) && isValidInput(remove(dateStr)))
	{
	    //dateStr = remove(dateStr);
	    //console.log(dateStr);
		daDate = new Date(parseInt(dateStr));
		obj.unix = dateStr;
		obj.natural = convertMonth(daDate.getMonth() + 1) + ' ' + daDate.getDate() + ',' + daDate.getFullYear();
	}
	if(!isValidInput(dateStr))
	{
		obj.natural = null;
		obj.unix = null;
	}
	return JSON.stringify(obj);
}

http.createServer(function(req,res){
    dateUrl = req.url;
    //dateUrl = dateUrl.split(' ');
    //var nn = dateUrl.replace(/\//,'');
    //console.log(!isNaN(parseInt(nn)));
    if(req.method === 'GET')
    {
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.write(readFile(dateUrl));
        res.end();
    }
    
    res.end();
}).listen(port);

console.log('server is running...');

