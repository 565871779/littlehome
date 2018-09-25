window.onload=function(){
let grcard=document.querySelector('.grcard');
console.log(grcard);
let w = grcard.offsetWidth;
let h = grcard.offsetHeight;
console.log(w,h)

window.onclick=function(event){
	console.log(333)
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    console.log(x,y)
    console.log(y-h,x-w/2)
    grcard.style.left=x-w/2 +'px';
    grcard.style.top=y-h+'px';
}
}