const form = document.getElementById('form');

const url= 'http://localhost:3000'



form.addEventListener('submit', signup);

function signup(e){
    e.preventDefault();

    const name= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;

    const obj= {
        name: name,
        email: email,
        password: password
    }


    axios.post(`${url}/signup`, obj);


}
