async function newWhiskeyHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('#whiskey').value.trim();
    const bottle_size = document.querySelector('#size').value.trim();
    const price_paid = document.querySelector('#retail-price').value.trim();
    const resell_value = document.querySelector('#resale-price').value.trim();
    const notes = document.querySelector('#notes').value.trim();

    const response = await fetch(`/api/whiskey`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        bottle_size,
        price_paid,
        resell_value,
        notes
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/inventory');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-whiskey').addEventListener('submit', newWhiskeyHandler);