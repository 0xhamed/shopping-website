
export const request = async (path, method = 'GET', body = null) => {

    body ? body = JSON.stringify(body) : body

    try {
        const res = await fetch(path, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method,
            body
        })

        if (res.redirected) return location.href = res.url

        if (res.body) {
            const { data, meta } = await res.json()
            if (meta) {
                const { success, errorM } = meta
                const alert = document.querySelector('.alert')
                alert.removeAttribute('hidden')
                setTimeout(() => { alert.setAttribute('hidden', '') }, 3000)
                if (success) {
                    alert.classList = 'alert alert-success'
                    alert.textContent = success
                } else if (errorM) {
                    alert.classList = 'alert alert-danger'
                    alert.textContent = errorM
                }
            }
            if (data) return data
        }

    } catch (ex) {
        alert(`Something went wrong! \n your action wasn't successful.`)
        location.href = location.href
        // don't use location.reload() because the same request will be repeated
        // and if the old error still exists, the window will get stuck in an alert loop.
    }
}
