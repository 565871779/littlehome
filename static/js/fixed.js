//固定导航
let fx1 = document.querySelector(".fx1")
let fx1_k= document.querySelector(".fx1-k");
let fx4 = document.querySelector(".fx4")
let fx4_k= document.querySelector(".fx4-k");
let fk = document.querySelectorAll(".fk ")
let ft = document.querySelectorAll(".ft")

fx1.onmouseover=function(){
	fx1_k.style.display="block";
}
fx1.onmouseleave=function(){
	fx1_k.style.display="none";
}
fx4.onmouseover=function(){
	fx4_k.style.display="block";
}
fx4.onmouseleave=function(){
	fx4_k.style.display="none";
}
fx4_k.onmouseover=function(){
	this.style.display="block"
}
fx4_k.onmouseleave=function(){
	this.style.display="none"
}

console.log(fk)
console.log(ft)

for(let a=0;a<fk.length;a++){
	fk[a].onmouseover = function(){
		ft[a].style.display="block"
	}
	fk[a].onmouseleave = function(){
		ft[a].style.display="none"
	}
}

