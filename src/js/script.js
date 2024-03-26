const fotoPerfil = document.querySelector("#foto")
const nomePerfil = document.querySelector("#perfil")
const repositorios = document.querySelector("#folder")
const seguidores = document.querySelector("#logo p")

async function githubAPI () {
    
    try {
        const url = "https://api.github.com/users/RickM19"
        // pegando o json com as informaçoes de meu usuário
        const responseData = await fetch(url).then(res => res.json())
        // integrando nome e foto de perfil
        nomePerfil.textContent = responseData.name
        fotoPerfil.setAttribute("src", responseData.avatar_url)

        // integrando o seguindo/seguidores
        seguidores.innerHTML = `
            <img src="Assets/users.svg" alt="">
            ${responseData.followers} followers ${responseData.following} following
        `

        // integrando os repositórios
        const repos = await fetch(responseData.repos_url).then(r => r.json())
        repos.map(rep => {
            if (rep.name != responseData.login) {
                const box = document.createElement("a")
                box.classList.add("container")
                box.setAttribute("href", rep.html_url)
                box.setAttribute("target", "_blank")

                let descricao = ""
                if (rep.description != null) {
                    descricao = rep.description
                }
                box.innerHTML = `
                    
                        <span><img src="/Assets/folder.svg" alt="arquivo"><h3>${rep.name}</h3></span>
                        <p>${descricao}</p>
                        <div class="bottom-card">
                            <div>
                            <span class="stats"><img src="Assets/star.svg" alt="star"><p>${rep.stargazers_count}</p></span>
                            <span class="stats"><img src="Assets/eye.svg" alt="views"><p>${rep.watchers_count}</p></span>
                            </div>
                            <p>Main Tech:  ${rep.language}
                            
                        
                        
                        
                        </div>
                
                
                `
                repositorios.appendChild(box)
            
            }
            
        })
        
    }catch(e) {
        console.log(e)
    }
    
    
}

githubAPI()