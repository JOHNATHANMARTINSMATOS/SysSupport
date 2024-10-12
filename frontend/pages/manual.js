document.addEventListener('DOMContentLoaded', () => {
    fetchManuals();
    loadCategories();

    // Adiciona o evento de input para filtrar dinamicamente
    document.getElementById('filterDescription').addEventListener('input', applyFilters);
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
});

let cachedManuals = []; // Armazena a lista de manuais carregada inicialmente

function loadCategories() {
    fetch('/api/manuals/categories')
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

function fetchManuals() {
    fetch('/api/manuals')
        .then(response => response.json())
        .then(manuals => {
            cachedManuals = manuals; // Armazena a lista completa de manuais carregada inicialmente
            renderManuals(manuals);
        })
        .catch(error => console.error('Erro ao buscar manuais:', error));
}

function renderManuals(manuals) {
    const manualsTableBody = document.querySelector('#manualsTable tbody');
    manualsTableBody.innerHTML = ''; 

    manuals.forEach(manual => {
        const row = document.createElement('tr');
        
        row.addEventListener('click', () => showManualModal(manual.id));
        
        row.innerHTML = `
            <td>${manual.id}</td>
            <td>${manual.title}</td>
            <td>${manual.category}</td>
            <td>${manual.description ? manual.description.substring(0, 20) + '...' : ''}</td>
            <td><a href="${manual.file}" target="_blank">Baixar</a></td>
        `;
        manualsTableBody.appendChild(row);
    });
}

function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const description = removeDiacritics(document.getElementById('filterDescription').value.toLowerCase());

    const filteredManuals = cachedManuals.filter(manual => {
        const matchesCategory = category === '' || manual.category === category;
        const normalizedDescription = removeDiacritics(manual.description ? manual.description.toLowerCase() : '');
        const matchesDescription = description === '' || normalizedDescription.includes(description);

        return matchesCategory && matchesDescription;
    });

    renderManuals(filteredManuals);
}

// Função para remover acentos e caracteres especiais
function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function showManualModal(id) {
    fetch(`/api/manuals/${id}`)
        .then(response => response.json())
        .then(manual => {
            document.getElementById('modalTitle').textContent = manual.title;
            document.getElementById('modalCategory').textContent = manual.category;
            document.getElementById('modalDescription').textContent = manual.description;

            const modalFile = document.getElementById('modalFile');
            if (manual.file) {
                modalFile.href = manual.file;
                modalFile.style.display = 'block';
            } else {
                modalFile.style.display = 'none';
            }

            document.getElementById('manualModal').style.display = 'block';
            document.getElementById('manualModal').dataset.manualId = id;
        });
}

function closeModal() {
    document.getElementById('manualModal').style.display = 'none';
}

function deleteManual() {
    const id = document.getElementById('manualModal').dataset.manualId;
    if (confirm('Tem certeza de que deseja excluir este manual?')) {
        fetch(`/api/manuals/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Manual excluído com sucesso!');
                    closeModal();
                    fetchManuals();
                } else {
                    alert('Falha ao excluir manual.');
                }
            });
    }
}

// Selecionando o formulário e a mensagem de feedback
const manualForm = document.getElementById('manualForm');
const messageDiv = document.getElementById('message');

// Adicionando um evento de escuta para o envio do formulário
manualForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Captura os dados do formulário
    const formData = new FormData(manualForm);

    try {
        // Enviando o formulário para o servidor
        const response = await fetch('/api/manuals', {
            method: 'POST',
            body: formData
        });

        // Verificando a resposta do servidor
        if (response.ok) {
            const result = await response.json();
            messageDiv.textContent = result.message || 'Manual cadastrado com sucesso!';
            manualForm.reset();
            fetchManuals();
        } else {
            const errorResult = await response.json();
            messageDiv.textContent = errorResult.message || 'Erro ao cadastrar o manual.';
        }
    } catch (error) {
        messageDiv.textContent = 'Ocorreu um erro ao enviar o formulário.';
    }
});

// Função para limpar filtros
function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('filterDescription').value = '';
    renderManuals(cachedManuals); // Restaura a tabela para a lista completa de manuais
}
