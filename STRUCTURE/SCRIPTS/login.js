const validarUsuario  = (e) =>{
    e.preventDefault();
       if($inputUser.value === user.username &&
          $inputPassword.value === user.password){
            
           window.location.replace("menu.html");
           
   
       } else{
           alert("Datos Invalidos");
       }
   }
   
   let user = {
       username: "admin",
       password: "123",
   }
   
   let $inputUser = document.querySelector("#user"),
       $inputPassword = document.querySelector("#password"),
       $button = document.querySelector("#send"),
       $formInput = document.querySelector(".form");
   
   $formInput.addEventListener("submit", (e)=>{
       
           validarUsuario(e);
         
       
   });
   $button.addEventListener("click", (e)=>{
       e.preventDefault();
      validarUsuario(e);
   })