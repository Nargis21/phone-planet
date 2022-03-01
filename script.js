// Load search input
const searchPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    // Clear input field
    searchField.value = '';
    // Error handling
    if (searchText == '') {
        document.getElementById('error-msg1').classList.remove('d-none')
    }
    // load phones
    else {
        document.getElementById('error-msg1').classList.add('d-none')
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data.slice(0, 20)))
    }
}
// display search input
const displayPhones = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    // Clear previous search result
    phoneContainer.textContent = '';
    // error handling
    if (phones.length == 0) {
        document.getElementById('error-msg2').classList.remove('d-none')
    }
    // display phones
    phones.forEach(phone => {

        document.getElementById('error-msg1').classList.add('d-none')
        document.getElementById('error-msg2').classList.add('d-none')

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
               <div class="card h-100 bg-success bg-opacity-25">
                    <img src="${phone.image}" class="card-img-top w-75 m-auto pt-4" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">Brand: ${phone.brand}</p>
                        <button onclick="loadDetails('${phone.slug}')" class="text-white bg-primary border-0 rounded-pill py-2 px-5">Explore</button>
                    </div>
                </div>
        `
        phoneContainer.appendChild(div)
    })
}
const loadDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

const displayDetails = phone => {
    console.log(phone)
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.textContent = ''
    const detailsBox = document.createElement('div');
    detailsBox.classList.add('col');
    detailsBox.innerHTML = `
    <div class="card h-100 bg-success bg-opacity-25">
                    <img src="${phone.image}" class="card-img-top w-50 m-auto pt-4" alt="...">
                    <div class="card-body p-5">
                        <h4 class="card-title"> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Released Date Found'}</h4>
                        <p class="card-text">Chip Set: ${phone.mainFeatures.chipSet}</p>
                        <p class="card-text">Display Size: ${phone.mainFeatures.displaySize}</p>
                        <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
                        <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
                        <h4 class="card-text">Sensors:</h4>
                        <li class="card-text">${phone.mainFeatures.sensors[0]}</li>
                        <li class="card-text">${phone.mainFeatures.sensors[1]}</li>
                        <li class="card-text">${phone.mainFeatures.sensors[2]}</li>
                        <li class="card-text">${phone.mainFeatures.sensors[3]}</li>
                        <li class="card-text">${phone.mainFeatures.sensors[4]}</li>
                         <br>
                        <h4 class="card-text">Others:</h4>
                        <p class="card-text">Bluetooth: ${phone.others.Bluetooth}</p>
                        <p class="card-text">GPS: ${phone.others.GPS}</p>
                        <p class="card-text">NFC: ${phone.others.NFC}</p>
                        <p class="card-text">Radio: ${phone.others.Radio}</p>
                        <p class="card-text">USB: ${phone.others.USB}</p>
                        <p class="card-text">WLAN: ${phone.others.WLAN}</p>
                    </div>
                </div>
    `
    detailsContainer.appendChild(detailsBox);

}