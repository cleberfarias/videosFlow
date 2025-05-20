const containerVideos = document.querySelector(".videos__container");

async function buscarVidosAPI() {
  try {
    const buscaVideo = await fetch("http://localhost:3000/videos");
    const videos = await buscaVideo.json();

    videos.forEach((video) => {
      //para cada video vai ser exibido // o innerHTML vai colocar os videos dentro do HTML - cada video vai ser acrescendo
      containerVideos.innerHTML += `
                <li class="videos__item">
                            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                            <div class="descricao-video">
                                <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                                <h3 class="titulo-video">${video.titulo}</h3>
                                <p class="titulo-canal">${video.descricao}</p>
                                <p class="categoria" hidden>${video.categoria}</p>
                            </div>
                        </li>`;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os videos: ${error}</p>`;
  }
}
buscarVidosAPI();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const videos = document.querySelectorAll(".videos__item");

  if (barraDePesquisa.value != "") {
    for (let video of videos) {
      let title = video
        .querySelector(".titulo-video")
        .textContent.toLocaleLowerCase();
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      if (!title.includes(valorFiltro)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    }
  } else {
    for (let video of videos) {
      video.style.display = "block";
    }
  }
}
const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name");
  botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");
  for (let video of videos) {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    if (valorFiltro !== "tudo" && !categoria.includes(valorFiltro)) {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}
