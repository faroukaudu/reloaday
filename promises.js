cal = function(x,y){
    console.log("x="+x, "y="+y);
    
    checking(x,y).then(function(result){
      console.log("result= "+result);
    }  ).catch(function(e){
      console.log(e);
    })
    console.log("DOne!");
  }
  
  
  checking = function(x,y){
    return new Promise(function(resolve,reject){
      if(x+y>0){
        resolve(x+y);
      }else{
        reject("Sum is less than zero");
      }
    })
  }
  
  cal(10,-20);