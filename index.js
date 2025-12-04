const form = document.getElementById('projectForm')
const fileInput = document.getElementById('file_input')

form.addEventListener('submit',function(e){
    e.preventDefault()

    let id = 0;
    const project_name = document.getElementById('project_name').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const description = document.getElementById('description').value;
    const file = fileInput.files[0]

    const technologies = [];
    document.querySelectorAll("input[type='checkbox']:checked").forEach(
        item => {technologies.push(item.value)
    })

    console.log("Name : ", project_name)
    console.log("Start Date : ", start_date)
    console.log("End Date : ", end_date)
    console.log("Description : ", description)
    console.log("Technologies : ", technologies)
    console.log("File : ", file)

    const cardList = document.getElementById('cardList')
    
    const containerCard = document.createElement('div')
    containerCard.classList.add('col-md-4','mb-4');

    const card = document.createElement('div')
    card.classList.add('card')

    let dummyUrl = "https://via.placeholder.com/300x200?text=No+Image"
    if(file){
        dummyUrl = URL.createObjectURL(file)
    }

    const img = document.createElement('img')
    img.src(dummyUrl)
    img.classList.add('card-img-top')

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    cardBody.innerHTML(
        `
        <h5 class="card-title">${project_name}</h5>
        <h5 class="card-text">${description}</h5>
        <h5 class="text-text-muted">from ${start_date} to ${end_date}</h5>
        <h5 class="fw-bold">Technologies : ${technologies}</h5>
        <a href="item/${id}" class="btn btn-dark">Details</a>
        `
    )

    card.appendChild(img)
    card.appendChild(cardBody)
    containerCard.appendChild(card)
    cardList.appendChild(containerCard)

    form.reset()
})
