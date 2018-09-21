//img
let imgf = document.querySelectorAll('.imgf');
let befor = document.querySelector('.befor');
let next = document.querySelector('.next');
let num = document.querySelectorAll('.num')
console.log(imgf)

imgf[0].style.display='block';
    var a = 0;
next.onclick=function(){
	 if(a<imgf.length-1){  
	 	a+=1;
        imgf[a].style.display='block';	
        a=a;
        } 
        else{
        	a=imgf.length-1
        }
	}
befor.onclick=function(){
	 if(a>0){  
	 	a-=1;
        imgf[a].style.display='block';	
        imgf[a+1].style.display='none'
        a=a;
        } 
        else{
        	a=0
        }
	}


 for(let j=0;j<num.length;j++){	
    num[j].onclick=function(){		
        for(let i=0;i<num.length;i++){
    	imgf[i].style.display='none';
		}		
	    imgf[j].style.display='block';
	    a=j;
    }
}