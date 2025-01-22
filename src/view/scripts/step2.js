function setTipoUsuario(tipo) {
    sessionStorage.setItem('tipousuario', tipo);
    window.location.href = '../Signin Step 3/index.html';
    console.log('Tipo de usuário salvo:', tipo); // Para depuração
}

document.getElementById('usuario').addEventListener('click', ()=>{setTipoUsuario('Comum');});
document.getElementById('adm').addEventListener('click', ()=>{setTipoUsuario('Administrador de Bicicletas');});

console.log(sessionStorage);