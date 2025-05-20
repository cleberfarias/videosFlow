const containerVideos = document.querySelector(".videos__container")

async function buscarVidosAPI (){
const buscaVideo = await fetch("http://localhost:3000/videos")
const videos = await buscaVideo.json()
    
        videos.forEach((video)=>{ //para cada video vai ser exibido // o innerHTML vai colocar os videos dentro do HTML - cada video vai ser acrescendo 
            containerVideos.innerHTML += `
            <li class="videos__item">
             <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="titulo-canal">${video.descricao}</p>
            
            </div>
            </li>`;
        })        


    
}
buscarVidosAPI();