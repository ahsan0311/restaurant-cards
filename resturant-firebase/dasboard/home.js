import {doc, deleteDoc, auth,db,collection, addDoc ,getDocs ,signOut,storage ,ref,uploadBytesResumable,getDownloadURL} from "../firebase.js";

let year =  document.getElementById('year')
let currentYear = new Date().getFullYear();
 year.innerText = currentYear;

 let dish_img = document.getElementById("dish_img")
 let dish_name = document.getElementById("dish_name")
 let dish_description = document.getElementById("dish_description")
 let dish_price = document.getElementById("dish_price")
 let get_dishes = document.querySelector(".get_dishes")
 let image;
 let add_dish = document.getElementById("add_dish")
 let logout = document.getElementById("logout")
 let icon = document.querySelector(".icon")
 let blogs_inputs = document.querySelector(".blogs-inputs");
 let loading = document.querySelector("#loading");

 function get_img (){
  const file = dish_img.files[0]
  const imagesRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(imagesRef, file);
  uploadTask.on('state_changed', 
    (snapshot) => {
     
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      loading.innerText = 'Upload is ' + progress + '% done';
      console.log('Upload is ' + progress + '% done')
      setTimeout(() => {
        loading.innerText = '';
      },4000)
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
     
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        image = downloadURL;
        console.log('File available at',downloadURL);
        console.log(image)
      });
    }
  );
}



dish_img.addEventListener("change", get_img)





 const dish_adding = async () =>{

   
    if(dish_name.value.trim() == ""  ){
        alert("Please fill this")
    }
    
     else if(dish_description.value.trim() == ""){
        alert("Please fill this")
    }

    else if(dish_img.value.trim() == ""){
      alert("Please fill this")
  }
  else if(dish_price.value.trim() == ""){
    alert("Please fill this")
}
    else{
     
      
        console.log("ho gaya")
        add_dish.innerText = "Adding........"

        try {
          get_dishes.innerHTML = ""
            const docRef = await addDoc(collection(db, "Dishes"), {
             dishes_name: dish_name.value,
             dishes_description: dish_description.value,
             dishes_price: dish_price.value,
             dishes_img: image,            
            });
            console.log(db)
            get_added_dish();
            alert("Dish Added Successfully")
            add_dish.innerText = "Dish Add"
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
             add_dish.innerText = "Add Dish"
          }

          dish_name.value = ""
          dish_description.value = ""
          dish_price.value = ""
          dish_img.value = ""
    }

    
 }

 add_dish.addEventListener("click", dish_adding)

 const get_added_dish = async() =>{
    get_dishes.innerHTML = ""
    const querySnapshot = await getDocs(collection(db, "Dishes"));
    querySnapshot.forEach((doc) => {

        const {dishes_name ,dishes_description, dishes_img,dishes_price} = doc.data();
        get_dishes.innerHTML += `
         <div class="dish_card">
            <img src="${dishes_img}" alt="">
            <h3>${dishes_name}</h3>
            <p>${dishes_description}</p>
            <h4>${dishes_price} PKR</h4>
            <br>
            <a href=""><i class="fa-solid fa-bag-shopping"></i> Add To Card</a>
            <button class="edit_btn" onclick="edit_dish('${doc.id}',this)"><i class="fa-solid fa-edit"></i>Edit</button>
            <button class="delete_btn" onclick="delete_dish('${doc.id}',this)"><i class="fa-solid fa-trash"></i>Delete</button>
            </div>
            `
            
          });
        }
        
        get_added_dish();


 const logout_user = () =>{
    signOut(auth).then(() => {
        alert("Logout Successfully")
       window.location.href = "../signin/login.html"
      }).catch((error) => {
        // An error happened.
      });
 }

 logout.addEventListener("click", logout_user)




 const display_blog = () =>{
  blogs_inputs.style.display = "block"
 }

 icon.addEventListener("click", display_blog)

window.edit_dish = (edit_id) =>{
  alert("is function pr abhi kam chl raha hn")
}

window.delete_dish  = async (delete_id,delete_btn) =>{
  console.log(delete_id)
  delete_btn.innerText = "Deleting.............."
  get_dishes.innerHTML = ""
  try{
    await deleteDoc(doc(db, "Dishes", delete_id));
    get_added_dish()
    alert("Dish deleted Successfully")
  }
   catch(error){
    console.error( error);
   }
 
}