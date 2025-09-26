// Check if user is logged in
fetch('/protected')
  .then(res => res.json())
  .then(data => {
    const authDiv = document.getElementById('auth');
    if (data.user) {
      // User is logged in
      authDiv.innerHTML = `
        <p>Hello, ${data.user.displayName} (@${data.user.username})</p>
        <img src="${data.user.avatarUrl}" alt="avatar" />
        <br /><br />
        <a href="/logout">Logout</a>
      `;
    } else {
      // User not logged in
      authDiv.innerHTML = `<a href="/auth/github">Login with GitHub</a>`;
    }
  })
  .catch(() => {
    document.getElementById('auth').innerHTML = `<a href="/auth/github">Login with GitHub</a>`;
  });
