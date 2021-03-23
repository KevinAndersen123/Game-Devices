function square(n)
{
  return n*n;
}

function main()
{
	if(square(5)===25)
	{
		console.log("OK");
	}	
	else
	{
		console.log("square FAIL");
	}
	//enter name
	var name = prompt("Please Enter your name");
	var number = howManyLightsabersDoYouOwn(name); //checks how many lightsabers you own
	console.log(name + " you have "+ number + " lightsabers"); //outputs num of lightsabers
	var marks = []; //creates array of marks
	var numOfSubjects = 0; 
	var averageMarks = 0;
	numOfSubjects = prompt("Please enter number of subjects"); //asks to enter number of subjects

	//asks marks for each subject
	for(var i =0; i < numOfSubjects;i++)
	{
		marks.push(parseFloat(prompt("Please enter marks for subject "+(i+1)))); //adds marks to array
	}
	averageMarks = getAverage(marks); //calculates average marks
	console.log("Your average marks is " + averageMarks); //outputs average marks

	//lab 2-4
	var pirates = {};
	pirates["Espen"] = "nay";
	pirates["John-Erik"] = "aye";
	pirates["Rolo"] = "nay";
	pirates["Ragnar"] = "aye";
	console.log(cannonsReady(pirates));
	aliasGen();

	//Lab2-6
	var titanic = new Ship(15, 10);
	console.log(titanic.isWorthIt());
}

//lab 2-2
function howManyLightsabersDoYouOwn(t_name)
{
  if(t_name === "Zach")
  {
	  return 18;
  }
  else
  {
	  return 0;
  }
}

//gets average of marks lab 2-3
function getAverage(marks)
{
	var average = 0.0;
	//asks if you want foreach loop or traditional loop
	var method = prompt("Enter method 1 or 2, 1 = trad, 2 = forEach"); 
	if(method === 1)
	{
		//loops through array of marks
		for (var i = 0; i < marks.length;i++)
		{
			average += marks[i]; 
		}
	}
	else //forEach method
	{
		marks.forEach((element)=>{
			average += element;
		});
	}
	average = Math.floor(average/marks.length); //rounds down to nearest int

	return average; //returns average
}

//lab 2-4
const cannonsReady = (gunners) => 
{
	var canFire = true;
	for(var gunnersName in gunners)
	{
		if(gunners[gunnersName] === "nay") //checks if one of the names is no
		{
			canFire = false;
		}
	}
	if(canFire === true)
	{
		return "Fire!";
	}
	else 
	{
		return "Shiver me timbers!";
	}
}

//lab 2-5
function aliasGen(){
	var userNameFirst = "";
	var userNameLast = "";
	var firstName = {A: 'Alpha',B: 'Bravo',C: 'Charlie',D: 'Delta'};
	var surname = {A: ' Analogue', B: ' Bomb', C: ' Catalyst', D: ' Deep'};
	var alias;

	userNameFirst = prompt("Enter First name: (A-D)");
	userNameLast = prompt("Enter Last name: (A-D)");

	if(isNaN(userNameFirst) && isNaN(userNameLast))
	{
		userNameFirst = userNameFirst.charAt(0).toUpperCase();
		userNameLast = userNameLast.charAt(0).toUpperCase();

		alias = firstName[userNameFirst]+surname[userNameLast];
	}
	
	console.log(alias);
}

 //lab 2-6
function Ship(draft,crew) 
{
	this.draft = draft;
	this.crew = crew;
}  

Ship.prototype.isWorthIt = function()
{
	if(this.draft -(this.crew*1.5) >= 20) //checks if draft is more than 20 
	{
		return true;
	}
	else 
	return false;
}
   