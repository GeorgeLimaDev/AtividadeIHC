let body = document.querySelector('body')
let toggle = document.getElementById('toggle')
toggle.addEventListener('click', changeTheme)
let slider = document.getElementById('slider')

function changeTheme () {
    if (!toggle.checked) {
        body.style.backgroundColor = '#ffffff' //Light
        body.style.color = 'black'
        slider.style.backgroundColor = '#ccc'
    } else {
        body.style.backgroundColor = '#1f1f1f' //Dark
        body.style.color = 'white'
        slider.style.backgroundColor = '#2196F3'
    }
}