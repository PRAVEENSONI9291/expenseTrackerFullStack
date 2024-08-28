const form = document.getElementById('form')

form.addEventListener('submit', login );


const url= 'http://localhost:3000/login'



async function login(e){
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const element= {
        email: email,
        password: password
    }

     

    try {

        let resp= await axios.post(url, element );
        console.log(resp.status);
        
        if(resp.status===200)
        {
            alert("login successfull");
            form.reset();

        }
        

        
    } catch (error) {

        if(error.response)
        {
            if(error.response.status=== 403)
                {
                    alert("password did not match")
                }
                else{
                    alert("user does not exist")
                }
        }

        
    
        
        
    }

    


    
}
