document.addEventListener('DOMContentLoaded', () => {
    fetchErrors();
});

function fetchErrors() {
    fetch('/api/errors')
        .then(response => response.json())
        .then(errors => {
            const errorsTableBody = document.querySelector('#errorsTable tbody');
            errorsTableBody.innerHTML = ''; 

            errors.forEach(error => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${error.id}</td>
                    <td>${error.title}</td>
                    <td>${error.category}</td>
                    <td>${error.subcategory}</td>
                    <td>${error.description.substring(0, 20)}...</td>
                    <td>${error.responsible}</td>
                    <td>${error.resolutionDate ? new Date(error.resolutionDate).toLocaleDateString() : ''}</td>
                    <td><img src="${error.image}" alt="Imagem do Erro" style="width: 50px; height: auto;"></td>
                `;
                row.addEventListener('click', () => showErrorModal(error));
                errorsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar erros:', error);
        });
}

function showErrorModal(error) {
    document.getElementById('modalTitle').textContent = error.title;
    document.getElementById('modalCategory').textContent = error.category;
    document.getElementById('modalSubcategory').textContent = error.subcategory;
    document.getElementById('modalDescription').textContent = error.description;
    document.getElementById('modalResponsible').textContent = error.responsible;
    document.getElementById('modalResolutionDate').textContent = error.resolutionDate ? new Date(error.resolutionDate).toLocaleDateString() : 'N/A';
    
    const modalImage = document.getElementById('modalImage');
    if (error.image) {
        modalImage.src = error.image;
        modalImage.style.display = 'block';
    } else {
        modalImage.style.display = 'none';
    }

    // Exibe o modal
    document.getElementById('errorModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('errorModal').style.display = 'none';
}
