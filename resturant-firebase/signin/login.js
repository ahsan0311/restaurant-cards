import{auth,signInWithEmailAndPassword} from "../firebase.js"
let login_form = document.querySelectorAll("#loginForm input");
let login_btn = document.getElementById("login_btn");
let login_error = document.getElementById("login_error");

const [ login_email , login_password ] = login_form;

const login_user = () =>{
    event.preventDefault()
    console.log(auth)

    if(login_email.value.trim() === "" && login_password.value.trim === ""){
        alert("Please fill all fields")
        return;
    }

    else{
        login_btn.innerText = "Loading........"
        signInWithEmailAndPassword(auth,login_email.value,login_password.value)
        .then((userCredential) => {
        const user = userCredential.user;
        login_btn.innerText = "Login"
        alert("Login Successfully")
        window.location.href = "../dasboard/home.html"
  })
        .catch((error) => {
         const errorCode = error.code;
        const errorMessage = error.message;
        login_error.innerText = errorMessage;
        login_error.style.color = "Red"
        setTimeout(()=>{
            login_error.innerText = ""
        },3000)
        login_btn.innerText = "Login"
  });
    }
}


login_btn.addEventListener("click" , login_user)