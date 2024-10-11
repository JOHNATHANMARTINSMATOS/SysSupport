// Carregar categorias, subcategorias e erros na inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    fetchErrors();
    loadCategories();
    loadSubcategories();
});

// Carregar categorias
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

// Carregar subcategorias
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

// Carregar erros na tabela
function fetchErrors() {
    fetch('/api/errors')
        .then(response => response.json())
        .then(errors => {
            const errorsTableBody = document.querySelector('#errorsTable tbody');
            errorsTableBody.innerHTML = ''; 

            errors.forEach(error => {
                const row = document.createElement('tr');
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

// Exibir modal com detalhes do erro
function showErrorModal(id) {
    fetch(`/api/errors/${id}`)
        .then(response => response.json())
        .then(error => {
            // Atualizar conteúdo do modal
            document.getElementById('modalTitle').textContent = error.title;
            document.getElementById('title').value = error.title;
            document.getElementById('category').value = error.category;
            document.getElementById('subcategory').value = error.subcategory;
            document.getElementById('description').value = error.description;
            document.getElementById('responsible').value = error.responsible;
            document.getElementById('resolutionDate').value = error.resolutionDate ? new Date(error.resolutionDate).toISOString().split('T')[0] : '';

            const modalImage = document.getElementById('modalImage');
            if (error.image) {
                modalImage.src = error.image;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }

            document.getElementById('errorModal').style.display = 'block';
            document.getElementById('errorModal').dataset.errorId = id;
        })
        .catch(error => console.error('Erro ao carregar detalhes do erro:', error));
}

// Fechar o modal
function closeModal() {
    document.getElementById('errorModal').style.display = 'none';
}

// Excluir erro
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

// Submeter o formulário de erro (usado para PUT)
function submitErrorForm(method) {
    const formData = new FormData(document.getElementById('errorForm'));
    const id = document.getElementById('errorId').value;
    const url = method === 'PUT' ? `/api/errors/${id}` : '/api/errors';

    fetch(url, {
        method: method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(method === 'PUT' ? 'Erro atualizado com sucesso!' : 'Erro cadastrado com sucesso!');
        document.getElementById('errorForm').reset();
        fetchErrors();
    })
    .catch(error => console.error('Erro ao salvar:', error));
}

// Limpar filtros
function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('subcategoryFilter').value = '';
    document.getElementById('filterDescription').value = '';
    fetchErrors();
}
