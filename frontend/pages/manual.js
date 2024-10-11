// Selecionando elementos do DOM
const manualForm = document.getElementById('manualForm');
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const fileInput = document.getElementById('file');
const manualsList = document.getElementById('manualsList');

// Função para listar manuais
async function fetchManuals() {
    try {
        const response = await fetch('/api/manuals');
        const manuals = await response.json();

        // Limpando a lista de manuais
        manualsList.innerHTML = '';
        
        manuals.forEach(manual => {
            const manualItem = document.createElement('li');
            manualItem.innerHTML = `
                <h3>${manual.title}</h3>
                <p>Categoria: ${manual.category}</p>
                <p>${manual.description}</p>
                ${manual.file ? `<a href="${manual.file}" target="_blank">Download</a>` : ''}
            `;
            manualsList.appendChild(manualItem);
        });
    } catch (error) {
        console.error('Erro ao carregar manuais:', error);
    }
}

// Função para cadastrar um novo manual
manualForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', titleInput.value);
    formData.append('category', categoryInput.value);
    formData.append('description', descriptionInput.value);
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/api/manuals', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Manual cadastrado com sucesso!');
            manualForm.reset();  // Limpa o formulário
            fetchManuals();      // Atualiza a lista de manuais
        } else {
            const errorData = await response.json();
            alert(`Erro: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar manual:', error);
        alert('Erro ao cadastrar manual.');
    }
});

// Carregar a lista de manuais ao carregar a página
document.addEventListener('DOMContentLoaded', fetchManuals);
