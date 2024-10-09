// listErrors.js

const errorsTable = document.getElementById('errorsTable').getElementsByTagName('tbody')[0];
const messageDiv = document.getElementById('message');

async function fetchErrors() {
    try {
        const response = await fetch('/api/errors');
        
        if (response.ok) {
            const errors = await response.json();
            
            errorsTable.innerHTML = '';

            errors.forEach(error => {
                const row = errorsTable.insertRow();

                row.insertCell(0).textContent = error.id;
                row.insertCell(1).textContent = error.title;
                row.insertCell(2).textContent = error.category;
                row.insertCell(3).textContent = error.subcategory || '-';
                row.insertCell(4).textContent = error.description;
                row.insertCell(5).textContent = error.responsible || '-';
                row.insertCell(6).textContent = error.resolutionDate ? new Date(error.resolutionDate).toLocaleDateString() : '-';
                
                const imageCell = row.insertCell(7);
                if (error.image) {
                    const imgLink = document.createElement('a');
                    imgLink.href = error.image;
                    imgLink.target = '_blank';
                    imgLink.textContent = 'Ver Imagem';
                    imageCell.appendChild(imgLink);
                } else {
                    imageCell.textContent = '-';
                }
            });
        } else {
            messageDiv.textContent = 'Erro ao buscar a lista de erros.';
        }
    } catch (error) {
        messageDiv.textContent = 'Ocorreu um erro ao buscar os erros: ' + error.message;
    }
}

window.onload = fetchErrors;
