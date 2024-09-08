// base code used by all domains

const API_URL = 'https://detect.truemedia.org/api/'; // TODO

function init(func, recheckInterval) {
  func(createBtn);

  // keep checking if we have more loaded
  const id = setInterval(() => {
    func(createBtn);
  }, recheckInterval);

  async function send(button, url) {
    button.disabled = true;
    button.textContent = 'Sent to TrueMedia';
    fetch(API_URL, {
      body: JSON.stringify(url),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
    })
      .then((res) => {
        button.textContent = res;
        button.title = `TrueMedia says: ${res}`;
      })
      .catch((_) => {
        button.textContent = 'Try again later';
        button.title = 'TrueMedia is experiencing a huge spike in usage';
      });
  }

  function createBtn(id, url) {
    const button = document.createElement('button');
    button.id = id;
    button.classList.add('btn');
    button.innerHTML = 'Is this Fake?';
    button.title = 'Click to ask TrueMedia to analyze this post';
    button.onclick = () => {
      button.disabled = true;
      button.textContent = 'Sent to TrueMedia';
      send(button, url);
    };
    return button;
  }
}

// Make available globally
window.init = init;
