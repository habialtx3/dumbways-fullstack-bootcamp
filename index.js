const form = document.getElementById('projectForm')
const fileInput = document.getElementById('file_input')
let id = 0;

let projects = JSON.parse(localStorage.getItem("projects")) || [];
createCard(projects);

function deleteProject(id) {
    console.log(`menghapus ${id}`)
}

function editProject(id) {
    console.log(`mengedit ${id}`)
}

function fileBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file); // hasilnya base64
    });
}


function createCard(projects) {
    const cardList = document.getElementById('cardList')
    cardList.innerHTML = "";

    projects.map(project => {
        let imgUrl = "https://via.placeholder.com/300x200?text=No+Image"
        if (project.file) {
            imgUrl = project.file
        }

        const containerCard = document.createElement('div')
        containerCard.classList.add('col-md-4', 'mb-4')

        containerCard.innerHTML = `
            <div class="card">
            <img src="${imgUrl}" class="card-img">
            <div class="card-body">
            <h5 class="card-title">${project.name}</h5>
            <p class="card-text">${project.description}</p>
            <p class="text-muted">${project.start_date} to ${project.end_date} </p>
            <p class="fw-bold">${project.technologies}</p>
            <div class="d-flex gap-3 mb-3 align-content-center justify-content-center">
            <button class="btn btn-dark" onclick="editProject(${project.id})">Edit</button>
                        <button class="btn btn-dark" onclick="deleteProject(${project.id})">Delete</button>
            </div>
            </div>
            </div>
            `

        cardList.appendChild(containerCard)
        id++

        form.reset()

    })

}

form.addEventListener('submit', async function (e) {
    e.preventDefault()


    const project_name = document.getElementById('project_name').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const description = document.getElementById('description').value;
    const file = fileInput.files[0]

    const technologies = [];
    document.querySelectorAll("input[type='checkbox']:checked").forEach(
        item => {
            technologies.push(item.value)
        })

    let fileBase64String = null;
    if(file){
        fileBase64String = await fileBase64(file)
    }
    const project = {
        id: id,
        name: project_name,
        start_date: start_date,
        end_date: end_date,
        description: description,
        technologies: technologies,
        file: fileBase64String
    }

    // console.log(project)
    projects.push(project)
    localStorage.setItem('projects', JSON.stringify(projects))
    // console.log(projects)

    createCard(projects)
})


