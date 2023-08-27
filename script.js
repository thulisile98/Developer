const searchInput = document.getElementById('searchInput');
const projectList = document.getElementById('projectList');
let activeIndex = -1;

searchInput.addEventListener('input', handleSearch);
searchInput.addEventListener('keydown', handleKeyDown);

// Sample project data (replace with data from API)
const projects = [
    { id: 1, name: 'Group A', projects: ['sweet A1', 'Project A2'] },
    { id: 2, name: 'Group B', projects: ['Project B1', 'red B2'] },
 
    // ...
];

function renderProjects(query = '') {
    projectList.innerHTML = '';

    projects.forEach((group, index) => {
        const groupName = group.name.toLowerCase();
        const projectMatches = group.projects.filter(p => p.toLowerCase().includes(query));

        if (groupName.includes(query) || projectMatches.length > 0) {
            const listItem = document.createElement('li');
            listItem.classList.add('project');

            let highlightedGroupName = groupName.replace(new RegExp(query, 'gi'), match => `<span class="highlighted">${match}</span>`);

            const highlightedProjects = projectMatches.map(project => {
                return project.replace(new RegExp(query, 'gi'), match => `<span class="highlighted">${match}</span>`);
            });

            const groupContent = highlightedGroupName;
            const projectsContent = highlightedProjects.join(', ');

            listItem.innerHTML = `${groupContent} (${projectsContent})`;

            if (index === activeIndex) {
                listItem.classList.add('highlight');
            }

            listItem.addEventListener('click', () => goToProject(index));
            projectList.appendChild(listItem);
        }
    });
}






function handleSearch() {
    const query = searchInput.value.toLowerCase();
    renderProjects(query);
    activeIndex = -1;
    renderProjectsList();
}

// Rest of the code remains the same



function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveActiveItem(-1);
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveActiveItem(1);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        goToProject(activeIndex);
    }
}

function moveActiveItem(direction) {
    const projectsCount = projectList.children.length;

    if (projectsCount === 0) {
        return;
    }

    activeIndex = (activeIndex + direction + projectsCount) % projectsCount;
    renderProjectsList();
}

function renderProjectsList() {
    const projectItems = projectList.children;
    for (let i = 0; i < projectItems.length; i++) {
        const projectItem = projectItems[i];
        if (i === activeIndex) {
            projectItem.classList.add('highlight');
        } else {
            projectItem.classList.remove('highlight');
        }
    }
}

function goToProject(index) {
    if (index >= 0 && index < projects.length) {
        // Redirect to the project page or perform other actions
        console.log(`Navigating to ${projects[index].name}`);
    }
}

// Initial rendering
renderProjectsList();
