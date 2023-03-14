const searchInput = document.querySelector('#search')
const searchButton = document.querySelector('#searchBtn')
const resultsDiv = document.querySelector('#results')

searchButton.addEventListener('click', searchRepositories)
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchRepositories()
    }
})

function searchRepositories() {
    const searchText = searchInput.value.trim()

    if (searchText.length < 3) {
        resultsDiv.innerHTML = '<p>Введите не менее 3 символов</p>'
        return
    }

    const apiUrl = `https://api.github.com/search/repositories?q=${searchText}&per_page=10`

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items.length === 0) {
                resultsDiv.innerHTML = '<p>Ничего не найдено</p>'
            } else {
                const repos = data.items
                resultsDiv.innerHTML = ''

                repos.forEach(repo => {
                    const repoDiv = document.createElement('div')
                    repoDiv.classList.add('repo')

                    const repoLink = document.createElement('a')
                    repoLink.href = repo.html_url
                    repoLink.target = '_blank'
                    repoLink.textContent = repo.name

                    const repoDescription = document.createElement('p')
                    repoDescription.textContent = repo.description

                    const repoLanguage = document.createElement('p')
                    repoLanguage.textContent = `Язык программирования: ${repo.language}`

                    repoDiv.appendChild(repoLink)
                    repoDiv.appendChild(repoDescription)
                    repoDiv.appendChild(repoLanguage)

                    resultsDiv.appendChild(repoDiv)
                })
            }
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p>Произошла ошибка: ${error.message}</p>`
        })
}