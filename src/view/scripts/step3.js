function guardarInformacoes(){
    let telefone = document.getElementById('telefone').value;
    let cpf = document.getElementById('cpf').value;
    let endereco = document.getElementById('endereco').value;
    
    if (telefone === '' || cpf === '' || endereco === '') {
        alert('Por favor, preencha todos os campos!');
    }
    else {
        sessionStorage.setItem('telefone', telefone);
        sessionStorage.setItem('cpf', cpf);
        sessionStorage.setItem('endereco', endereco);
        
        window.location.href = '../Signin Step 4/index.html';
    }
}

document.getElementById('next-button').addEventListener('click', guardarInformacoes);
console.log(sessionStorage);