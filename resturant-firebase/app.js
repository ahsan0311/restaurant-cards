import {db,collection ,getDocs} from "./firebase.js";


let get_dishes = document.querySelector(".get_dishes")

const get_added_dish = async() =>{
    const querySnapshot = await getDocs(collection(db, "Dishes"));
    querySnapshot.forEach((doc) => {

        const {dishes_name ,dishes_description, dishes_img,dishes_price} = doc.data();
        console.log(doc.data())
        get_dishes.innerHTML += `
         <div class="dish_card">
            <img src="${dishes_img}" alt="">
            <h3>${dishes_name}</h3>
            <p>${dishes_description}</p>
            <h4>${dishes_price} PKR</h4>
            <br>
            <a href=""><i class="fa-solid fa-bag-shopping"></i> Add To Card</a>
          </div>
        `

        console.log(dishes_name ,dishes_description, dishes_img ,dishes_price)
    });
 }

 get_added_dish();

 let year =  document.getElementById('year')
 let currentYear = new Date().getFullYear();
  year.innerText = currentYear;


  console.log("dkk")