function createForm(e){var t=1;for(i=0;i<e;i++)$("#displayform").append("<p><span class='gradeboxlabel'>Grades "+t+"</span><span class='weighboxlabel'>Weight</span></p><input type='text' name='grade"+t+"' id='grade"+t+"'/> <input type='number' name='weight"+t+"' id='weight"+t+"'/>"),t+=1;$("#displayform").append("<br><br><a onclick='startCalc();'><input type='button' id='calculate' value='Calculate' name='calculate'/></a>"),$("#displayform").append("&nbsp;&nbsp;&nbsp;&nbsp;<a onclick='LockWeights();'><input type='button' id='weight-lock' value='Weight Lock' name='weight-lock'/></a>"),$("#displayform").append("&nbsp;&nbsp;&nbsp;&nbsp;<a onclick='Refresh();'><input type='button' id='refresh' value='Start Over' name='refresh' /></a>")}function LockWeights(){if(0==weightLocker){var e=numboxes;for(e++,q=1;q<e;q++)$("#weight"+q).prop("disabled",!0);$("#weight-lock").attr("value","Un-Lock"),weightLocker=!0}else if(1==weightLocker){var e=numboxes;for(e++,q=1;q<e;q++)$("#weight"+q).prop("disabled",!1);$("#weight-lock").attr("value","Weight Lock"),weightLocker=!1}}function Refresh(){location.reload(!0)}function startCalc(){if(0==WeightIsCorrect(numboxes)){var e=numboxes,t=[];for(e++,i=1;i<e;i++)t.push(WeightedGrade(LetterToNumber($("#grade"+i).val().toUpperCase()),$("#weight"+i).val()/100)),console.log($("#weight"+i).val()),console.log($("#weight"+i).val()/100);var a=0;for(z=0;z<t.length;z++)a+=t[z];DisplayGrade(a)}else alert("REALLY?! Your weights do not equal 100%. Check your math sucka!")}function WeightIsCorrect(e){var t=e;t++;var a=100;for(j=1;j<t;j++)a-=$("#weight"+j).val();return a}function DisplayGrade(e){switch(!0){case e>94.9:alert("They got a "+e+"! This student gets an A! This kid must have tried really hard.");break;case e<95&&e>89.9:alert("They got a "+e+"! This student gets an A-! This kid must have tried really hard.");break;case e<90&&e>86.9:alert("They got a "+e+"! This student gets an B+! This kid must have tried.");break;case e<87&&e>83.9:alert("They got a "+e+"! This student gets an B! This kid must have tried.");break;case e<84&&e>79.9:alert("They got a "+e+"! This student gets an B-! This kid must have barely tried.");break;case e<80&&e>75.9:alert("They got a "+e+"! This student gets an C+! This kid must not have tried.");break;case e<75&&e>69.9:alert("They got a "+e+"! This student gets an C! This kid must not have given a shit. You should fail them.");break;case e<70&&e>64.9:alert("They got a "+e+"! This student gets an D! This kid is a waste to society. Just fail them because it doesnt make a difference.");break;case e<65:alert("They got a "+e+"! This student gets an F! This kid should have been aborted. Push them in front of a bus.")}}function WeightedGrade(e,t){return e*t}function LetterToNumber(e){switch(e){case"A":return"98";case"A-":return"92";case"B+":return"88";case"B":return"85";case"B-":return"82";case"C+":return"78";case"C":return"75";case"C-":return"72";case"D+":return"68";case"D":return"65";case"D-":case"F":return"62";default:alert("I said what to put in! Why are you going against the directions that were provided to you? DO IT AGAIN AND FOLLOW DIRECTIONS!")}}$(document).ready(function(){$("#input-grades").click(function(){numboxes=$("#number-of-grades").val(),$("h3,form").removeClass("hide"),$("p.display,form.display").addClass("hide"),createForm(numboxes),weightLocker=!1}),$("#initForm input").keydown(function(e){13==e.keyCode&&(e.preventDefault(),numboxes=$("#number-of-grades").val(),$("h3,form").removeClass("hide"),$("p.display,form.display").addClass("hide"),createForm(numboxes),weightLocker=!1)})});