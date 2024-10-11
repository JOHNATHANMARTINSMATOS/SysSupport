// Selecionando o formulário e a mensagem de feedback
const errorForm = document.getElementById('errorForm');
const messageDiv = document.getElementById('message');

// Adicionando um evento de escuta para o envio do formulário
errorForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Captura os dados do formulário
    const formData = new FormData(errorForm);

    try {
        // Enviando o formulário para o servidor
        const response = await fetch('/api/errors', {
            method: 'POST',
            body: formData
        });

        // Verificando a resposta do servidor
        if (response.ok) {
            const result = await response.json();
            messageDiv.textContent = result.message || 'Erro cadastrado com sucesso!';
            errorForm.reset(); // Reseta o formulário após o envio
        } else {
            const errorResult = await response.json();
            messageDiv.textContent = errorResult.message || 'Erro ao cadastrar o erro.';
        }
    } catch (error) {
        messageDiv.textContent = error.message || 'Ocorreu um erro ao enviar o formulário.';
    }
});
