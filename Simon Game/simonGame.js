$(function(){
var randPattern=[];
var buttonId=['red','yellow','green','blue'];
var origColor=['#B40404','#D7DF01','#0B610B','#0B0B61'];
var patternColor=['#F78181','#F4FA58','#A9BCF5','#81F781'];
var level=1;
var userSelect=[];
var count=0;
var state='normal';
var mouse = 'Up';
var time=[];
var removeDisplay = false;

//____________________________________________________________________________________________________
document.getElementById('restart').addEventListener('click',reset);
document.getElementById('strict').addEventListener('click',mode);
const grids= document.querySelectorAll('.select');
clickUnable();
//___________________________________________________________________________________________________
function initialPattern(){
	for(let i=0; i<level; i++){
		randPattern.push(Math.floor( Math.random()*4));
	}
} //used for checkVictory test to check situation after level 20 is finished.
//____________________________________________________________________________________________________
$('#start').click(function gameStart() {
	removeDisplay = false;
	document.getElementById('start').style.backgroundColor='#00FF00';
	document.getElementById('count').value=level;
	patternGenerate();
	// initialPattern(); //--
	displayPattern(1000);
	clickAble();
    
});
//________________________________________________________________________________________________________      	
 function patternGenerate() {   
     	 randPattern.push( Math.floor( Math.random()*4) );
 }
//_________________________________________________________________________________________________________computer shows the pattern
 function displayChange (a){
   if(removeDisplay === false){
	  document.getElementById(buttonId[randPattern[a]]).style.backgroundColor = patternColor[randPattern[a]];
	  document.getElementById(randPattern[a]).play();
   }
   else
   	  return false;
}

function displayToOrigin (b){
	if(removeDisplay === false)
	   document.getElementById(buttonId[randPattern[b]]).style.backgroundColor = origColor[randPattern[b]];
    else
       return false;	
}

function displayPattern(startTime){
    clickUnable();
	for(let i=0;i<randPattern.length;i++){
	        time[0]=setTimeout(displayChange,(startTime+1000*i),i);
	        time[1]=setTimeout(displayToOrigin,(startTime+750+1000*i),i);
	}
}

//_________________________________________________________________________________________________________
function user(){
   // console.log(this.id);
   var i;
	for(i=0;i<buttonId.length;i++){
         if(buttonId[i] == this.id){
         	break; 
         }
     }
  	 document.getElementById(buttonId[i]).style.backgroundColor = patternColor[i];
	 document.getElementById(i).play();
	
 
  $(this).mouseup(function(){
     document.getElementById(buttonId[i]).style.backgroundColor = origColor[i];  
     });

     if( i===randPattern[count] ){
     	userSelect.push(i);
        check();
        // console.log('check');
     }  	
     else if(i !== randPattern[count]){
     	// console.log(i,randPattern[count]);
     	error();
     	// console.log('error');
     }
  
     	
}
//_____________________________________________________________________________________________________
function check(){
	if(userSelect.length === randPattern.length ){
		   levelUP();		  
	}
	else{
		count ++;
	}
}
//_____________________________________________________________________________________________________
function error(){
	if(state == 'strict'){
		document.getElementById('result').innerText='Back to Level 1!'

		time[4]=setTimeout(function(){document.getElementById('result').innerText=''},1000);
		document.getElementById('wrong').play();
		level = 1;
		document.getElementById('count').value=level;
	    count=0;
	    userSelect = [];
	    randPattern = [];
	    patternGenerate(); 
	    displayPattern(2000);
	    clickAble();
	}
	if(state == 'normal'){
		userSelect=[];
		count=0;
		document.getElementById('result').innerText='Try Again!'

		time[2]=setTimeout(function(){document.getElementById('result').innerText=''},1000);
		document.getElementById('wrong').play();
		displayPattern(2000);
		clickAble();
		
	}

}
//_____________________________________________________________________________________________________
function levelUP(){
	level++;
	// checkVictory();
    if(checkVictory()==false){
	   time[3]=setTimeout(function(){document.getElementById('count').value=level;},1400);
       count=0;
       userSelect=[];
	   patternGenerate();
       displayPattern(1400);
       clickAble();
    }
    
}
//_____________________________________________________________________________________________________
function checkVictory(){
	if(level ==21){
		document.getElementById('success').play();
        document.getElementById('result').innerText= 'You Won!!'; 
        setTimeout(reset,400);
        return true;      
	}
    else return false;
}
//___________________________________________________________________________________________________
function reset() {
	for(let i=0;i<5;i++){
		clearTimeout(time[i]);
	}
	clickUnable();
	document.getElementById('result').innerText='';
	document.getElementById('count').value ='----';
	level = 1;
	count=0;
	userSelect = [];
	randPattern = [];
	state = 'normal';
	
	removeDisplay = true;
	

	document.getElementById('start').style.backgroundColor='#0B3B0B';
	
}
//__________________________________________________________________________________________________
function mode() {
	if(state == 'normal'){
		state = 'strict';
		document.getElementById('strict').style.backgroundColor='yellow';

	}
	else if(state == 'strict'){
		state='normal';
		document.getElementById('strict').style.backgroundColor='#868A08';
	}
}
//_______________________________________________________________________________________________
function clickUnable() {
	for(let i=0; i<4; i++){
		grids[i].removeEventListener('mousedown',user);
	}
}
//_______________________________________________________________________________________________
function clickAble(){
	for(let i=0; i<4 ; i++){
		grids[i].addEventListener('mousedown',user);
		
	}
}
});