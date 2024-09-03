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
        
        
        if(resp.status===200)
        {
            // console.log(resp);
            localStorage.setItem('token', resp.data.token)
            
            alert(resp.data.message);
            window.location.href= './expense.html'
            

        }
        

        
    } catch (error) {
        
        

        if(error.response)
        {
            if(error.response.status== 404)
                {
                    console.log('this run');
                    
                    alert(error.response.data)
                }
                else{
                    console.log('no this run');
                    
                    alert(error.response.data)
                }
        }

        
    
        
        
    }

    


    
}
