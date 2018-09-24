let mtj = document.querySelector('.menu-title-j');
let mtg = document.querySelector('.menu-title-g');
let art2 = document.querySelector('#art-r2');
let art1 = document.querySelector('.art-right1')


mtg.onclick = function(){
	art2.style.display='block';
	art1.style.display='none';
	this.style.backgroundColor='white'
	mtj.style.backgroundColor='ghostwhite'
}
mtj.onclick = function(){
	art2.style.display='none';
	art1.style.display='block';
	this.style.backgroundColor='white'
	mtg.style.backgroundColor='ghostwhite'
}
