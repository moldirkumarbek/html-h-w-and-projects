$('.txt').click(function (e) { 
    e.preventDefault();
    if($(this).css('border') != '1px dotted rgb(0, 0, 255)'){
        $(this).css('border', '1px dotted blue');
    } else{
        $(this).css('border', 'none');
    }
});
///////////4 task//////////

let a = 0;
let b = 0;
function calculate(){
    return Math.sqrt(a*a+b*b);
}
$('#A').change(function (e) { 
    e.preventDefault();
    a = parseInt($(this).val());
    if(a > 0 && b > 0){
        $("#result").html(calculate());
    }
});
$('#B').change(function (e) { 
    e.preventDefault();
    b = parseInt($(this).val());
    if(a > 0 && b > 0){
        $("#result").html(calculate());
    }
});