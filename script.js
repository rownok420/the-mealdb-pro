const spinner = document.getElementById('spinner')
const welcome = document.getElementById('welcome')
const inputField = document.getElementById('input-field')
const errorMessage1 = document.getElementById('error1')
const errorMessage2 = document.getElementById('error2')
const showCatagory = document.getElementById('show-catagory');
const errorSpan = document.getElementById('error-span')




// searce food 

const searceFood = () => {
    spinner.style.display = 'block'

    const inputText = inputField.value;
    inputField.value = '';
    if(inputText == ''){
        spinner.style.display = 'none'
        errorMessage1.style.display = 'block'
        errorMessage2.style.display = 'none'

        showCatagory.innerText = '';

    }
    else{
        errorMessage1.style.display = 'none'
        errorMessage2.style.display = 'none'


        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
            .catch(() => errorMessage())
    }
}

const errorMessage = () => {
    errorMessage2.style.display = 'block'
    errorMessage1.style.display = 'none'

}






const displayFood = (meals) => {
    spinner.style.display = 'none'
    // clear display
    const showCatagory = document.getElementById('show-catagory');
    showCatagory.innerText = '';
    const showDetails = document.getElementById('catagory-details');
    showDetails.innerText = '';
    const showSearce = document.getElementById('searce-food');
    showSearce.innerText = '';
    meals.forEach(meal => {
        console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title fw-bold">${meal.strMeal}</h3>
                </div>
                <div class="card-footer text-center">
                    <div class="d-flex justify-content-between">
                    <button onclick="seeDetails(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#see-details" class="btn btn-outline-secondary">See Details</button>
                    <button class="btn btn-outline-secondary">Add to Cart</button>
                    </div>
                </div>
            </div>
        
        `
        showSearce.appendChild(div)

    })
}



// show all food catagory
const loadCatagory = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => displayCatagoris(data.categories))
}
loadCatagory()

const displayCatagoris = (catagories) => {
    spinner.style.display = 'none';
    welcome.style.display = 'none'
    catagories.forEach(catagory => {
        const showCatagory = document.getElementById('show-catagory');
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img src="${catagory.strCategoryThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title fw-bold">${catagory.strCategory}</h3>
                </div>
                <div class="card-footer text-center">
                    <button onclick="loadCaragoryDetails('${catagory.strCategory}')" class="btn btn-outline-secondary">See Catagories</button>
                </div>
            </div>
        
        `
        showCatagory.appendChild(div)


    });
}

// show catagory details 

const loadCaragoryDetails = (names) => {
    spinner.style.display = 'block'

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${names}`)
        .then(res => res.json())
        .then(data => displayCatagoryDetails(data.meals))
}

const displayCatagoryDetails = (meals) => {
    spinner.style.display = 'none'
    window.scrollTo(0,40)
    // clear display 
    const showCatagory = document.getElementById('show-catagory');
    showCatagory.innerText = '';
    meals.forEach(meal => {
        const showDetails = document.getElementById('catagory-details');
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title fw-bold">${meal.strMeal}</h3>
                </div>
                <div class="card-footer text-center">
                    <div class="d-flex justify-content-between">
                    <button onclick="seeDetails(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#see-details" class="btn btn-outline-secondary">See Details</button>
                    <button class="btn btn-outline-secondary">Add to Cart</button>
                    </div>
                </div>
            </div>
        
        `
        showDetails.appendChild(div)
    })
}


// see details with modal 

const seeDetails = (mealId) => {
    spinner.style.display = 'block'

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => seeModals(data.meals[0]))
}

const seeModals = (meal) => {
    spinner.style.display = 'none'

    console.log(meal)
    const modalTitle = document.getElementById('see-title')
    const modalImage = document.getElementById('modal-img')
    const modalDesciption = document.getElementById('modal-desciption')
    const visitNow = document.getElementById('visit-now')
    modalTitle.innerText = `${meal.strMeal}`
    modalImage.src = `${meal.strMealThumb}`
    modalDesciption.innerText = `${meal.strInstructions.slice(0,200)}`
    visitNow.href = `${meal.strYoutube}`
}
