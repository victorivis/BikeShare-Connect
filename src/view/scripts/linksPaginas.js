const destino = document.querySelector('body');
const divLinks = document.createElement("div");

const links = [
  { text: "Estações", href: "../Estacoes/estacoes.html" },
  { text: "Mapa das Estações", href: "../Estacoes/mapaEstacoes.html" },
  { text: "Bicicletas", href: "../Bicicletas/bicicletas.html" },
  { text: "Cadastro de Usuário", href: "../Mapa/cadastroUsuario.html" },
  { text: "Login", href: "../Mapa/login.html" }
];

for (let i = 0; i < links.length; i++) {
  const a = document.createElement('a');
  a.textContent = links[i].text;
  a.href = links[i].href;
  a.style.display = "block";
  divLinks.appendChild(a);
}

destino.appendChild(divLinks);
