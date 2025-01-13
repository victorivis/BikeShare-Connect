function guardarInformacoes(){
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    // Imprimindo os valores no console
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);

    if(!nome || !email || !senha){
        alert("Preencha todos os campos");
    }
    else{
        sessionStorage.setItem('nome', nome);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('senha', senha);

        window.location.href = '../Signin Step 2/index.html';
    }
}

document.getElementById('next-button').addEventListener('click', guardarInformacoes);
