
export const listener = (selector, event, cb) => document.querySelector(selector).addEventListener(event, cb)

export const mapInputs = (selector, obj) => {
    Array.from(document.querySelectorAll(selector)).forEach((elm) => {
        for (let i in obj) {
            if (elm.getAttribute('name') === i) {
                if (elm.value) obj[i] = elm.value
                else obj[i] = undefined
            }
        }
    })
}

export const setInputs = (selector, obj) => {
    Array.from(document.querySelectorAll(selector)).forEach((elm) => {
        for (let i of Object.keys(obj)) {
            if (elm.getAttribute('name') === i) {
                if (elm.getAttribute('name') === 'image') {
                    elm.textContent = obj[i]
                    continue
                }
                elm.value = obj[i]
            }
        }
    })
}

export const sForm = (e) => {
    e.preventDefault()
    e.target.querySelector('[type=submit]').disabled = true
}

export const resetModal = (e, cb) => {
    e.target.querySelector('[type=submit]').disabled = false
    e.target.reset()
    $('.modal').modal('hide')
    e.target.removeEventListener('submit', cb)
}
