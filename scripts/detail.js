const urlParameter = new URLSearchParams(window.location.search);
const projectId = urlParameter.get('id')

const project_name = document.getElementById('project_name')
const description = document.getElementById('project_description')
const date = document.getElementById('project_date')
const technology = document.getElementById('project_technology')
const project_image = document.getElementById('project_image')

const projects = JSON.parse(localStorage.getItem("projects")) || []
const project = projects.find(index => index.id === projectId)
console.log(project)

technology.innerHTML = ""

!project ? console.log("project tidak ditemukan") :
    project_name.innerHTML = project.name
date.innerHTML = `
<div class="d-flex gap-2">
<i class="bi bi-calendar"> </i>   
<p>${project.start_date}</p> 
</div>

<div class="d-flex gap-2">
<i class="bi bi-calendar-check"></i> 
<p>${project.end_date}</p>
</div>
`
description.innerHTML = project.description
project.technologies.forEach(techName => {
    const btn = document.createElement('a')
    btn.className = "btn btn-primary"
    btn.style = "width: fit"
    btn.innerText = `${techName}`
    technology.appendChild(btn)
});

project_image.src = project.file || "https://via.placeholder.com/300x200"

const obj = {
  0: "apel",
  length: 1
};

console.log(obj[0])