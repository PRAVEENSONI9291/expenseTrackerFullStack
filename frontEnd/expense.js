const form = document.getElementById('ipform');
const ul = document.getElementById('oldexpenses');



window.addEventListener('load', fetchData);

form.addEventListener('submit', postDataToDatabase);
ul.addEventListener('click', deleteItem)

const url= 'http://localhost:3000/expense'

let token = localStorage.getItem('token');




async function deleteItem(e){
    // console.log(e.target.id);
    try {
        
        let resp= await axios.delete(url, {params:{id:e.target.id}} );
        // alert(resp.data.message)
        location.reload();
    } catch (error) {
        console.log("error received while deleting", error);
        
        
    }
    



    

}



async function printData(data){

    



    data.forEach(element => {

        let item= document.createElement('li');
        item.id= element.id;
        item.className= "expenseitems";

        item.innerHTML=  ` ${element.expenseAmount} - ${element.description} - ${element.category}  <button id=btn-${element.id}  type="button">Delete</button>`
        

        ul.appendChild(item)
        // console.log(item);
        

        
    });
}



async function fetchData(){

    
    

    let resp= await axios.get(url,{headers:{'Authorization':token}});
    // console.log(resp);

    printData(resp.data);
    

}

async function postDataToDatabase(e){
    e.preventDefault();

// console.log(expenseAmount, category, description);

try {
    
const expenseAmount = document.getElementById('expenseAmount').value;
const category = document.getElementById('category').value;
const description = document.getElementById('description').value;

const data= {
    expenseAmount:expenseAmount,
    description:description,
    category:category,
    token: token


}

let resp= await axios.post(url, data);
// alert(resp.data.message);

location.reload();


    
} catch (error) {
    console.log(error);
    
    
}

    

}