const ulTag=document.querySelector('ul')
const aTag=document.querySelectorAll('a')
const btn=document.querySelectorAll('button')
const input=document.querySelector('input')
const HOME=document.querySelector('.Home')
const btns=document.querySelectorAll('.btn-food')




//input
const Urlin='https://www.themealdb.com/api/json/v1/1/search.php?s='
async function getMils() {
   const res=await fetch(Urlin + input.value)
   const data=await res.json()
   console.log(data.meals);
   foodMealsInfo(data.meals)
}

input.onchange=()=>{
  getMils()
}
getMils()

//Browse By Name
const NameUrl='https://www.themealdb.com/api/json/v1/1/search.php?f='

btns.forEach(btn=>{
  btn.onclick=()=>{
    fetch(NameUrl+btn.innerText)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      foodMealsInfo(data.meals)
    })
   
  }
})




//Home
const Con='https://www.themealdb.com/api/json/v1/1/search.php?f=b'


 async function GetHome() {
  const res=await fetch(Con)
  const data=await res.json()
  console.log(data.meals);
  foodMealsInfo(data.meals) 
 }

 HOME.onclick=()=>{
   GetHome()
 }
 GetHome()


function foodMealsInfo(arr) {
  ulTag.innerHTML = '';

  arr.forEach((food, index) => {
    let ingrList=''
    for (let i = 0; i < 20; i++) {
      const element = food['strIngredient'+i];
      const strMeasure= food['strMeasure'+i];
       const img=`https://www.themealdb.com/images/ingredients/${element}.png`;
       
      
      if (element) {
        ingrList+=`
        <li>
        <img src="${img}"/>
        <h3>${strMeasure}  ${element}</h3>
        </li>
        `
       
      }
      
    }
      ulTag.innerHTML += `
      <li>
          <img src='${food.strMealThumb}' />
          <div class='details' onclick='toggleAccordion(${index})' >
              <button class="btnjs">${food.strMeal}</button>
          </div>
          <div class='recipe rec-screen' id='recipe-${index}'>
              <h4>${food.strArea}</h4>
              
              <ol class='Resepter'>${ingrList}</ol>
              <h4>Instructions</h4>
              <p>${food.strInstructions}</p>
          </div>
      </li>`;
  });
}


function toggleAccordion(food) {
  const recipeElement = document.getElementById(`recipe-${food}`);
  console.log(recipeElement);
  recipeElement.classList.toggle('active')
}


