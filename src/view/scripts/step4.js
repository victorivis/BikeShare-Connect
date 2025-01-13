async function guardarInformacoes(){
    const nome = sessionStorage.getItem('nome');
    const email = sessionStorage.getItem('email');
    const senha = sessionStorage.getItem('senha');
    const telefone = sessionStorage.getItem('telefone');
    const cpf = sessionStorage.getItem('cpf');
    const endereco = sessionStorage.getItem('endereco');
    const tipousuario = sessionStorage.getItem('tipousuario');
    
    const fotoInput = document.getElementById('foto');
    const foto = fotoInput ? fotoInput.files[0] : null;
    
    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('telefone', telefone);
    formData.append('cpf_cnpj', cpf);
    formData.append('endereco', endereco);
    formData.append('tipo', tipousuario);
    formData.append('fotoPerfil', foto);

    // Enviando os dados usando fetch
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: formData
        });
        if(!response.ok){
            alert(`Erro: ${response.status} - ${response.statusText}`);

            sessionStorage.removeItem('nome');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('senha');
            sessionStorage.removeItem('telefone');
            sessionStorage.removeItem('cpf');
            sessionStorage.removeItem('endereco');
            sessionStorage.removeItem('tipousuario');


            window.location.href = '../Signin Step 1/index.html';
        }
        else{
            alert("Usuario criado");
            window.location.href = "../Login/index.html"
        }        
    }
    catch(erro){
        alert("Deu erro");
    }
}

console.log(sessionStorage);
document.getElementById('next-button').addEventListener('click', guardarInformacoes);