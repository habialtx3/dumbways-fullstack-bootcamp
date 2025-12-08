const form = document.getElementById('projectForm')
const fileInput = document.getElementById('file_input')
let idEdit = null


let projects = JSON.parse(localStorage.getItem("projects")) || [];
createCard(projects);

const project_name = document.getElementById('project_name');
const start_date = document.getElementById('start_date');
const end_date = document.getElementById('end_date');
const description = document.getElementById('description');

console.log(projects)

function deleteProject(id, event) {
    event.stopPropagation()

    newproject = projects.filter(project => project.id !== id)
    localStorage.setItem('projects', JSON.stringify(newproject))

    createCard(newproject)
    alert('Item telah dihapus')
}

function editProject(id, event) {
    event.stopPropagation()

    const editedProject = projects.find(project => project.id === id)
    if (!editedProject) {
        return alert('project tidak ada')
    }

    idEdit = id

    project_name.value = editedProject.name
    start_date.value = editedProject.start_date
    end_date.value = editedProject.end_date
    description.value = editedProject.description

    document.querySelectorAll("input[type=checkbox]").forEach(checked_item => {
        checked_item.checked = editedProject.technologies.includes(checked_item.value)
    })

    document.getElementById('submitBtn').innerText = "Update Project";
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
            <div class="card" onclick="goToDetailPage('${project.id}')">
            <img src="${imgUrl}" class="card-img">
            <div class="card-body">
            <h5 class="card-title">${project.name}</h5>
            <p class="card-text">${project.description}</p>
            <p class="text-muted">${project.start_date} to ${project.end_date} </p>
            <p class="fw-bold">${project.technologies}</p>
            <div class="d-flex gap-3 mb-3 align-content-center justify-content-center">
            <a class="btn btn-dark" onclick="editProject('${project.id}',event)">Edit</a>
                        <a class="btn btn-dark" onclick="deleteProject('${project.id}',event)">Delete</a>
            </div>
            </div>
            </div>
            `

        cardList.appendChild(containerCard)

        form.reset()

    })

}

function goToDetailPage(id) {
    window.location.href = `detail.html?id=${id}`
}

form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const file = fileInput.files[0]
    const technologies = [];
    document.querySelectorAll("input[type='checkbox']:checked").forEach(
        item => {
            technologies.push(item.value)
        })

    let fileBase64String = null;
    if (file) {
        fileBase64String = await fileBase64(file)
    }

    if (idEdit) {
        const id = projects.findIndex(p => p.id === idEdit)

        projects[id].name = project_name.value
        projects[id].description = description.value
        projects[id].start_date = start_date.value
        projects[id].end_date = end_date.value
        projects[id].technologies = technologies

        if (fileBase64String) {
            projects[id].file = fileBase64String
        }

        localStorage.setItem('projects', JSON.stringify(projects))
        idEdit = null
        document.getElementById('submitBtn').innerText = 'Submit'

        alert('Proyek berhasil diperbarui')
        form.reset()

        createCard(projects)
        return
    }

    const project = {
        id: `Proyek-${Date.now()}`,
        name: project_name.value,
        start_date: start_date.value,
        end_date: end_date.value,
        description: description.value,
        technologies: technologies,
        file: fileBase64String
    }

    // console.log(project)
    projects.push(project)
    localStorage.setItem('projects', JSON.stringify(projects))
    // console.log(projects)

    createCard(projects)
})

