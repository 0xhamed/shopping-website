
export const readFile = (fileInput, output) => {
    fileInput.addEventListener('change', () => {
        const reader = new FileReader()
        reader.onload = (e) => {
            output.imageData = e.target.result
            output.changed = true
        }
        reader.readAsDataURL(fileInput.files[0])
    }, false);
}
