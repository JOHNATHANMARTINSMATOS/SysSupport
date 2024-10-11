document.addEventListener('DOMContentLoaded', () => {
    fetchErrors();
    loadCategories();
    loadSubcategories();
});

function loadCategories() {
    fetch('/api/errors/categories')
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById('categoryFilter');
            categorySelect.innerHTML = '<option value="">Buscar por Categoria</option>';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));
}

function loadSubcategories() {
    fetch('/api/errors/subcategories')
        .then(response => response.json())
        .then(subcategories => {
            const subcategorySelect = document.getElementById('subcategoryFilter');
            subcategorySelect.innerHTML = '<option value="">Buscar por Subcategoria</option>';
            subcategories.forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory;
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar subcategorias:', error));
}

function fetchErrors() {
    fetch('/api/errors')
        .then(response => response.json())
        .then(errors => {
            const errorsTableBody = document.querySelector('#errorsTable tbody');
            errorsTableBody.innerHTML = ''; 

            errors.forEach(error => {
                const row = document.createElement('tr');
                
                // Atribui o evento de clique à linha para abrir o modal com os detalhes
                row.addEventListener('click', () => showErrorModal(error.id));
                
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
                errorsTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar erros:', error));
}

function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const subcategory = document.getElementById('subcategoryFilter').value;
    const description = document.getElementById('filterDescription').value.toLowerCase();

    fetch(`/api/errors?category=${category}&subcategory=${subcategory}&description=${description}`)
        .then(response => response.json())
        .then(errors => {
            const errorsTableBody = document.querySelector('#errorsTable tbody');
            errorsTableBody.innerHTML = ''; 

            errors.forEach(error => {
                const row = document.createElement('tr');
                
                // Atribui o evento de clique à linha para abrir o modal com os detalhes
                row.addEventListener('click', () => showErrorModal(error.id));
                
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
                errorsTableBody.appendChild(row);
            });
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

function deleteError() {
    const id = document.getElementById('errorModal').dataset.errorId;
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

function editError() {
    const id = document.getElementById('errorModal').dataset.errorId;

    // Primeiro, obtemos os dados atuais do erro
    fetch(`/api/errors/${id}`)
        .then(response => response.json())
        .then(error => {
            // Exibe o prompt com os valores existentes como valores iniciais
            const newTitle = prompt('Digite o novo título:', error.title);
            const newCategory = prompt('Digite a nova categoria:', error.category);
            const newSubcategory = prompt('Digite a nova subcategoria:', error.subcategory);
            const newDescription = prompt('Digite a nova descrição:', error.description);
            const newResponsible = prompt('Digite o novo responsável:', error.responsible);
            const newResolutionDate = prompt('Digite a nova data de resolução (AAAA-MM-DD):', error.resolutionDate ? error.resolutionDate.split('T')[0] : '');

            // Verificar se todos os campos foram preenchidos
            if (newTitle && newCategory && newSubcategory && newDescription && newResponsible && newResolutionDate) {
                // Atualizar o erro com os novos valores
                fetch(`/api/errors/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: newTitle,
                        category: newCategory,
                        subcategory: newSubcategory,
                        description: newDescription,
                        responsible: newResponsible,
                        resolutionDate: newResolutionDate
                    })
                })
                .then(response => response.json())
                .then(data => {
                    alert('Erro atualizado com sucesso!');
                    closeModal();
                    fetchErrors();
                })
                .catch(error => console.error('Erro ao atualizar:', error));
            } else {
                alert('Por favor, preencha todos os campos para atualizar o erro.');
            }
        })
        .catch(error => console.error('Erro ao obter dados do erro:', error));
}
// Função para limpar filtros
function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('subcategoryFilter').value = '';
    document.getElementById('filterDescription').value = '';
    fetchErrors();
}