//Dynamic Categories Sections using JS

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayData(data.data.news_category))
        .catch(error => {
            console.log('There is an Error to loading data', error)
        })
}

const displayData = categories => {
    categories.forEach(category => {
        const categoriesContainer = document.getElementById('categories-container');
        const categoryLi = document.createElement('li');
        categoryLi.innerHTML = `
    <a onclick="loadNews('${category.category_id}')" href="#" class="text-decoration-none text-dark">${category.category_name}</a>
    
    `;
        categoriesContainer.classList.add('d-flex');
        categoriesContainer.classList.add('list-unstyled');
        categoryLi.classList.add('p-4', 'fw-bold');
        categoriesContainer.appendChild(categoryLi);



    })
}

loadData();

const loadNews = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => {
            console.log('There is an Error to loading data', error)
        })
}


const displayNews = allNews => {
    // console.log(allNews)
    const allNewsContainer = document.getElementById('all-news');
    allNewsContainer.innerHTML = '';
    allNews.forEach(news => {
        // console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
    <div class="card mb-3 p-3" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title mb-3">${news.title}</h5>
              <p class="card-text mb-3">${news.details.length > 300 ? news.details.slice(0, 300) + '...' : news.details}</p>
              
            </div>
            <div class="last-line d-flex content-justify-center align-items-center ">
             <div class="d-flex">
              <div>
                <img src="${news.author.img} " alt="" class="rounded-circle" height="50x" width="50px">
              </div>
              <div class="m-1">
                <h6>${news.author.name ? news.author.name : 'No Data Found'}</h6>
                <p>${news.author.published_date ? news.author.published_date : 'No Data Found'} </p>
                <p></p>
              </div>
             </div>
             <div class="view d-flex ms-5 content-justify-center align-items-center">
              <i class="fa-regular fa-eye mb-2"></i>
             <p class="ms-3 mt-1">${news.total_view ? news.total_view + 'm' : 'No Data Found'}</p>
             </div>
             <div class="review ms-5">
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
             </div>
             <div class="button ms-5">
              
              <button onclick="loadModalData('${news._id}')"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              See Details
        </button>
             </div>
            </div>
          </div>
       
        </div>
      </div>
    
    `;
        allNewsContainer.appendChild(newsDiv);
    })



}

const loadModalData = (IdNews) => {
    fetch(` https://openapi.programming-hero.com/api/news/${IdNews}`)
        .then(res => res.json())
        .then(data => displayModalData(data.data[0]))
        .catch(error => {
            console.log('Here is an Error', error)
        })
}
const displayModalData = (data) => {
    // console.log(data)
    const modalTitle = document.getElementById('exampleModalLabel')
    modalTitle.innerText = `${data.author.name ? data.author.name : 'No data Found'}`
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
    <p>${data.author.published_date ? data.author.published_date : 'No Data Found'}</p>
    <p>${data.details.length > 300 ? data.details.slice(0, 300) + '...' : data.details}</p>
    `

}
// loadModalData()

loadNews();