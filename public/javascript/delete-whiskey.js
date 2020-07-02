async function deleteFormHandler(event) {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/whiskey/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          whiskey_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/inventory/');
      } else {
        alert(response.statusText);
      }
    
  }
  
  document.querySelector('#delete-whiskey-btn').addEventListener('click', deleteFormHandler);