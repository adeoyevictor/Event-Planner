const form = document.getElementById('login')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const userName = form.elements[0].value
  localStorage.removeItem('user')
  localStorage.setItem('user', userName)
  form.elements[0].value = ''
  window.location.href = '/main.html'
})