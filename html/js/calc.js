$(document).ready(function() { 
    $('#input-grades').click(function() {
 		numboxes = $('#number-of-grades').val();
 		$("h3,form").removeClass("hide");
 		$("p.display,form.display").addClass("hide");
 		createForm(numboxes);
 		weightLocker = false;
   	}); 
	$('#initForm input').keydown(function(e) {
	    if (e.keyCode == 13) {
	    	e.preventDefault();
			numboxes = $('#number-of-grades').val();
			$("h3,form").removeClass("hide");
			$("p.display,form.display").addClass("hide");
			createForm(numboxes);
			weightLocker = false;
	    }
	});
});

function Refresh(){
	location.reload(true);
}

function createForm(fieldnums){
	var boxes=1;
	for (i=0; i<fieldnums; i++)
	{
		$("#displayform").append("<p><span class='gradeboxlabel'>Grades "+boxes+"</span><span class='weighboxlabel'>Weight"+boxes+"</span></p><input type='text' name='grade"+boxes+"' id='grade"+boxes+"'/> <input type='number' name='weight"+boxes+"' id='weight"+boxes+"'/> <a onclick='LockWeights();'><input type='button' id='weight-lock"+boxes+"' value='Weight Lock' name='weight-lock'/></a>");
		boxes=boxes+1;
	}
	addMainBtns();
}

function addMainBtns(){
	var displayBtns = $("#form-buttons");
	var calcBtn = "<a onclick='startCalc();'><input type='button' id='calculate' value='Calculate' name='calculate'/></a>";
	displayBtns.append(calcBtn);
	//var weightBtn = "<a onclick='LockWeights();'><input type='button' id='weight-lock' value='Weight Lock' name='weight-lock'/></a>";
	//displayBtns.append(weightBtn);
	var startOvBtn = "<a onclick='Refresh();'><input type='button' id='refresh' value='Start Over' name='refresh' /></a>";
	displayBtns.append(startOvBtn);
}

function LockWeights(){
	if (weightLocker==false)
		{
			var lockem = numboxes;
			lockem++;
			for (q=1; q<lockem; q++)
			{
				$('#weight'+q).prop('disabled', true);
			}
			$('#weight-lock').attr('value', 'Un-Lock');
			weightLocker=true;
		}
	else if (weightLocker==true)
		{
			var lockem = numboxes;
			lockem++;
			for (q=1; q<lockem; q++)
			{
				$('#weight'+q).prop('disabled', false);
			}
			$('#weight-lock').attr('value', 'Weight Lock');
			weightLocker=false;
		}	
}

function startCalc(){
	var checkW = WeightIsCorrect(numboxes);
	$(".displaygrade").remove();
	if (checkW ==0){
		var needVars = numboxes;
		var arr = [];
		needVars++;
		for (i=1; i<needVars; i++)
		{
			//arr.push($('#grade'+i).val().toUpperCase());
			//arr.push(($('#weight'+i).val())/100);
			//arr.push( [ (LetterToNumber($('#grade'+i).val().toUpperCase())),(($('#weight'+i).val())/100) ] );
			arr.push( WeightedGrade( (LetterToNumber($('#grade'+i).val().toUpperCase())) , (($('#weight'+i).val())/100) ) );
			//console.log($('#weight'+i).val());
			//console.log(($('#weight'+i).val())/100);
		}
		var total=0;
		for(z=0;z<arr.length;z++)
		{
			total=total+arr[z];
		}

		DisplayGrade(total);
	}
	else{
		alert("REALLY?! Your weights do not equal 100%. Check your math sucka!")
	}
}

function WeightIsCorrect(numboxes){
	var weightc = numboxes;
	weightc++;
	var WeightTrue=100;

	for (j=1; j<weightc; j++)
	{
		WeightTrue = WeightTrue - ($('#weight'+j).val());
	}

	return WeightTrue;
}

function DisplayGrade(grade){
	var whatgot = "This student got a ";
	switch (true){
		case (grade>94.9):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an A! This kid must have tried really hard.</p>").insertAfter(".mainform1");
			break;
		case( (grade<95) && (grade>89.9) ):
			$("<p>"+whatgot+grade+"! This student gets an A-! This kid must have tried really hard.</p>").insertAfter(".mainform1");
			break;
		case( (grade<90) && (grade>86.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an B+! This kid must have tried.</p>").insertAfter(".mainform1");
			break;
		case( (grade<87) && (grade>83.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an B! This kid must have tried.</p>").insertAfter(".mainform1");
			break;
		case( (grade<84) && (grade>79.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an B-! This kid must have barely tried.</p>").insertAfter(".mainform1");
			break;
		case( (grade<80) && (grade>75.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an C+! This kid must not have tried.</p>").insertAfter(".mainform1");
			break;
		case( (grade<75) && (grade>69.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an C! This kid must not have cared.</p>").insertAfter(".mainform1");
			break;
		case( (grade<70) && (grade>64.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an D! Just fail them because it doesnt make a difference.</p>").insertAfter(".mainform1");
			break;
		case (grade<65):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an F! Enjoy teaching them next year</p>").insertAfter(".mainform1");
			break;	
	}	
}

function WeightedGrade (grade, weight){
	var val = grade * weight;
	return val;
}

//var numberGrades = { 'A' : 98, 'A-': 92, 'B+': 88, 'B' : 85, 'B-': 82, 'C+': 78, 'C' : 75, 'C-': 72, 'D+': 68, 'D' : 65, 'D-': 62, 'F': 62}

function LetterToNumber(letter){
	switch (letter){
		case "A":
			return "98";
			break;
		case "A-":
			return "92";
			break;
		case "B+":
			return "88";
			break;
		case "B":
			return "85";
			break;
		case "B-":
			return "82";
			break;
		case "C+":
			return "78";
			break;			
		case "C":
			return "75";
			break;
		case "C-":
			return "72";
			break;
		case "D+":
			return "68";
			break;
		case "D":
			return "65";
			break;
		case "D-":
			return "62";
			break;
		case "F":
			return "62";
			break;
		default:
			alert("I said what to put in! Why are you going against the directions that were provided to you? DO IT AGAIN AND FOLLOW DIRECTIONS!");
			break;			
	}
}
