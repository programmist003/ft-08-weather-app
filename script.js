const apikey = '7ea82d25aa9841ac93085830251105';
const form = document.querySelector('form');
const icon = document.querySelector('#icon');
const temperature = document.querySelector('#temperature');
const speed = document.querySelector('#speed');
const direction = document.querySelector('#direction');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const place = document.querySelector('#place').value.trim();
    if (place) {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${place}`)
            .then(response => response.json())
            .then(data => {
                icon.innerHTML = `<img src="${data.current.condition.icon}" alt="">`;
                temperature.textContent = data.current.temp_c;
                speed.textContent = data.current.wind_kph;
                direction.textContent = getArrow(data.current.wind_degree);
            })
            .catch(error => console.error(error));   
    }
    return false;
});
form.dispatchEvent(new Event('submit', {
    cancelable: true
  }))

function getArrow(deg) {
    const arrows = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↩'];
    return arrows[Math.floor((deg % 360) / 45)];
}
