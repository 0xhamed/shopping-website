import { request } from '../utils/request.js'

let current = 1

const sPagination = (container) => {
    document.querySelector('.pagination').classList.add('d-none')
    container.parentNode.classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
}

const ePagination = (container) => {
    document.querySelector('.loading').classList.add('d-none')
    container.parentNode.classList.remove('d-none')
    document.querySelector('.pagination').classList.remove('d-none')
}


const setPages = async (url, container, contentHtml, links) => {
    sPagination(container)

    const newUrl = url.replace('page=1', `page=${current}`)
    const data = await request(newUrl)

    links.forEach(link => { link.classList.remove('active') })
    links[current].classList.add('active')

    if (current !== 1) links[0].classList.remove('disabled')
    else links[0].classList.add('disabled')

    if (current === links.length - 2) links[links.length - 1].classList.add('disabled')
    else if (current !== links.length - 2) links[links.length - 1].classList.remove('disabled')

    if (links.length - 2 <= 5) {
        links[0].classList.add('disabled')
        links[links.length - 1].classList.add('disabled')
    }

    container.innerHTML = ''
    data[Object.keys(data)[0]].forEach(dataElm => {
        container.insertAdjacentHTML('beforeend', contentHtml(dataElm))
    })

    ePagination(container)
}

export const pagination = async (path, container, contentHtml, pageHtml) => {
    sPagination(container)

    const url = `${path}?page=1&width=${document.body.clientWidth}`
    const result = await request(url)
    const data = result[Object.keys(result)[0]]
    const pages = result[Object.keys(result)[1]]

    Array.from(document.querySelectorAll('.page')).forEach(page => { if (page) page.remove() })

    for (let i = 0; i < pages; i++) {
        document.querySelector('.last').insertAdjacentHTML('beforebegin', pageHtml(i))
    }

    let links = Array.from(document.querySelectorAll('.page-item'))
    links[1].classList.add('active')

    if (pages <= 5) {
        links[0].classList.add('disabled')
        links[links.length - 1].classList.add('disabled')
    }

    for (let i = 6; i <= pages; i++) { links[i].classList.add('d-none') }

    container.innerHTML = ''
    data.forEach(dataElm => {
        container.insertAdjacentHTML('beforeend', contentHtml(dataElm))
    })

    ePagination(container)

    for (let i = 1; i < links.length - 1; i++) {
        links[i].addEventListener('click', (e) => {
            const page = parseInt(e.target.textContent)

            if (page === current) return;

            for (let i = 1; i <= pages; i++) { links[i].classList.add('d-none') }

            if (pages >= 5 && page > pages - 3)
                for (let i = pages; i > pages - 5; i--) { links[i].classList.remove('d-none') }
            else if
                (page >= 4) {
                for (let i = page + 2; i > page; i--) { if (links[i]) links[i].classList.remove('d-none') }
                for (let i = page - 2; i <= page; i++) { links[i].classList.remove('d-none') }
            }
            else if (pages > 5)
                for (let i = 1; i <= 5; i++) { links[i].classList.remove('d-none') }
            else
                for (let i = 1; i <= pages; i++) { links[i].classList.remove('d-none') }

            current = i
            setPages(url, container, contentHtml, links)
        })
    }

    for (let i of [0, links.length - 1]) {
        links[i].addEventListener('click', (e) => {
            if (!e.target.classList.contains('disabled')) {
                i === 0 ? current = 1 : current = pages

                for (let i = 1; i <= pages; i++) { links[i].classList.add('d-none') }

                if (i === 0 && pages > 5)
                    for (let i = 1; i <= 5; i++) { links[i].classList.remove('d-none') }
                else if
                    (pages > 5 && current > pages - 3)
                    for (let i = pages; i > pages - 5; i--) { links[i].classList.remove('d-none') }
                else
                    for (let i = 1; i <= pages; i++) { links[i].classList.remove('d-none') }

                setPages(url, container, contentHtml, links)
            }
        })
    }
}
