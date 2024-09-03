const form = document.getElementById('form');

const url= 'http://localhost:3000'



form.addEventListener('submit', signup);

async function signup(e){
    e.preventDefault();

    const name= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;

    const obj= {
        name: name,
        email: email,
        password: password
    }


    let resp= await axios.post(`${url}/signup`, obj);
     if(resp.data===false)
     {
        alert("user already exists")
     }
     else {
      // alert(resp.message)
      alert(resp.data.message);
      
        window.location.href= './login.html'
        
     }

     


}
