async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('#whiskey').value;
  
    const response = await fetch(`/api/whiskey`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-whiskey').addEventListener('submit', newFormHandler);