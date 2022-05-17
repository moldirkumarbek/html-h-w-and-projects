function add(){
    var name =prompt("Plase enter your name: ");
    alert("Welcome " + name +"!");
    var n = prompt("How many food did your eat today? plase enter the number! ");
    
    
    let eats=[];
    for (let i = 1; i <= n; i++) {
        eats.push(prompt('Plase enter name of foods!' + (i)));
    }
    
    alert("Plase enter how many calories did you input on each food ? ");
    
    let calories = [];
    for (let i = 1; i <= n; i++) {
        calories.push(prompt('What calories in that food ' + (i)));
    }
    
    function addcal(){
        let sum = 0 ;
        for (let i = 0; i < calories.length; i++){sum = Number(sum) + Number(calories[i]);}
        alert("Your daily food intake is: " + sum);
        if (sum > 2500) 
            {
                alert("To maintain your health, keep the balanced number of calories");
            } 
        else 
            {
                alert("Daily norm is maintained.");
            }
    }
    addcal();
    
    let restart = prompt ("Do you want again ? Plase enter yes if you want , enter no if you do not want!");
    if (restart == "yes"){
        let eats=[];
    for (let i = 1; i <= n; i++) {
        eats.push(prompt('Plase enter name of foods!' + (i)));
    }
    alert("Plase enter how many calories did you input on each food ? ");
        
    let calories = [];
    for (let i = 1; i <= n; i++) {
        calories.push(prompt('What calories in that food ' + (i)));
    }
        
    function addcal() {
        let sum = 0 ;
        for (let i = 0; i < calories.length; i++){sum = Number(sum) + Number(calories[i]);}
        alert("Your daily food intake is: " + sum);
        if (sum > 2500) 
            {
                alert("To maintain your health, keep the balanced number of calories");
            } 
        else 
            {
                alert("Daily norm is maintained.");
            }
    }
    addcal(); 
    }
    else (restart == "no")
    {
        alert("Thank you for using my culculater!!!!!");
    }
}