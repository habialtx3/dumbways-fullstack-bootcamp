const urlParameter = new URLSearchParams(window.location.search);
const projectId = urlParameter.get('id')

document.titl

const project_name = document.getElementById('project_name')
const description = document.getElementById('project_description')
const date = document.getElementById('project_date')
const technology = document.getElementById('project_technology')
const project_image = document.getElementById('project_image')

const projects = JSON.parse(localStorage.getItem("projects")) || []
const project = projects.find(index => index.id === projectId)

technology.innerHTML = ""

!project ? console.log("project tidak ditemukan") :
    document.title = `${project.name} | My Project`
project_name.innerHTML = project.name

const startDate = new Date(project.start_date)
const endDate = new Date(project.end_date)

const timeLength = endDate - startDate

const timeLengthDays = Math.ceil(timeLength / (1000 * 60 * 60 * 24))


date.innerHTML = `
<div class="d-flex flex-column gap-1">
<div class="d-flex gap-2">
<div class="d-flex gap-2">
<i class="bi bi-calendar"> </i>   
<p>${project.start_date}</p> 
</div>
 - 
<div class="d-flex gap-2">
<i class="bi bi-calendar-check"></i> 
<p>${project.end_date}</p>
</div>
</div>
</div>

<div class="d-flex gap-2">
<i class="bi bi-clock"> </i>   
<p>${timeLengthDays} Days </p> 
</div>

`
description.innerHTML = project.description

function createTechBtn(tech_name) {
    const btn = document.createElement('a')
    btn.className = "btn btn-primary"
    btn.style = "width: fit"
    btn.innerText = `${tech_name}`
    technology.appendChild(btn)
}


project.technologies.forEach(techName => {
    createTechBtn(techName)
});
project_image.src = project.file || "https://via.placeholder.com/300x200"