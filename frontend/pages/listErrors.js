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
                    <td>
                        <button onclick="showErrorModal(${error.id})">Ver</button>
                        <button onclick="deleteError(${error.id})">Excluir</button>
                        <button onclick="editError(${error.id})">Editar</button>
                    </td>
                `;
                errorsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar erros:', error);
        });
}

function showErrorModal(id) {
    fetch(`/api/errors/${id}`)
        .then(response => response.json())
        .then(error => {
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

            document.getElementById('errorModal').style.display = 'block';
            document.getElementById('errorModal').dataset.errorId = id;
        });
}

function closeModal() {
    document.getElementById('errorModal').style.display = 'none';
}

function deleteError(id) {
    if (confirm('Tem certeza de que deseja excluir este erro?')) {
        fetch(`/api/errors/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Erro excluído com sucesso!');
                    closeModal();
                    fetchErrors();
                } else {
                    alert('Falha ao excluir erro.');
                }
            });
    }
}

function editError(id) {
    const newDescription = prompt('Digite a nova descrição:');
    if (newDescription) {
        fetch(`/api/errors/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: newDescription })
        })
        .then(response => response.json())
        .then(data => {
            alert('Erro atualizado com sucesso!');
            closeModal();
            fetchErrors();
        })
        .catch(error => console.error('Erro ao atualizar:', error));
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();
    const subcategoryFilter = document.getElementById('subcategoryFilter').value.toLowerCase();
    const descriptionFilter = document.getElementById('descriptionFilter').value.toLowerCase();

    fetch('/api/errors')
        .then(response => response.json())
        .then(errors => {
            const filteredErrors = errors.filter(error => 
                error.category.toLowerCase().includes(categoryFilter) &&
                error.subcategory.toLowerCase().includes(subcategoryFilter) &&
                error.description.toLowerCase().includes(descriptionFilter)
            );

            const errorsTableBody = document.querySelector('#errorsTable tbody');
            errorsTableBody.innerHTML = ''; 

            filteredErrors.forEach(error => {
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
                    <td>
                        <button onclick="showErrorModal(${error.id})">Ver</button>
                        <button onclick="deleteError(${error.id})">Excluir</button>
                        <button onclick="editError(${error.id})">Editar</button>
                    </td>
                `;
                errorsTableBody.appendChild(row);
            });
        });
}

function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('subcategoryFilter').value = '';
    document.getElementById('descriptionFilter').value = '';
    fetchErrors();
}
