// Load search input
const searchPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    // Clear input field
    searchField.value = '';
    // load phones
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data.slice(0, 20)))
}

// display search result
const displayPhones = (phones) => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    // Clear previous result
    phoneContainer.textContent = '';
    document.getElementById('details-container').textContent = '';

    // error handling
    if (phones.length == 0) {
        document.getElementById('error-msg').classList.remove('d-none')
    }
    // display phones
    phones.forEach(phone => {
        document.getElementById('error-msg').classList.add('d-none')

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
// Load phone details by phone id
const loadDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

// Display phone details
const displayDetails = phone => {
    const detailsContainer = document.getElementById('details-container')
    // Clear previous details result
    detailsContainer.textContent = '';

    const detailsBox = document.createElement('div');
    detailsBox.classList.add('col');
    detailsBox.innerHTML = `
    <div class="card h-100 bg-success bg-opacity-25">
                    <img src="${phone.image}" class="card-img-top w-50 m-auto pt-4" alt="...">
                    <div class="card-body p-5">
                    <h3 class="text-center">${phone.name}</h3>
                        <h4 class="card-title text-center">${phone.releaseDate ? phone.releaseDate : 'No Released Date Found'}</h4>
                        <h4 class="card-text">Main Features:</h4>
                        <p class="card-text">Chip Set: ${phone.mainFeatures.chipSet}</p>
                        <p class="card-text">Display Size: ${phone.mainFeatures.displaySize}</p>
                        <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
                        <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>


                        <h4 class="card-text">Sensors: </h4>
                        <p class="card-text">${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[0] : ''}</p>
                        <p class="card-text">${phone.mainFeatures.sensors[1] ? phone.mainFeatures.sensors[1] : ''}</p>
                        <p class="card-text">${phone.mainFeatures.sensors[2] ? phone.mainFeatures.sensors[2] : ''}</p>
                        <p class="card-text">${phone.mainFeatures.sensors[3] ? phone.mainFeatures.sensors[3] : ''}</p>
                        <p class="card-text">${phone.mainFeatures.sensors[4] ? phone.mainFeatures.sensors[4] : ''}</p>
                        <p class="card-text">${phone.mainFeatures.sensors[5] ? phone.mainFeatures.sensors[5] : ''}</p>
                        <p class="card-text">${phone.mainFeatures.sensors[6] ? phone.mainFeatures.sensors[6] : ''}</p>
                        <p class="card-text">${phone.mainFeatures.sensors[7] ? phone.mainFeatures.sensors[7] : ''}</p>


                        <h4 class="card-text">Other Features:</h4>
                        <p class="card-text">Bluetooth: ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'Not Available'}</p>
                        <p class="card-text">GPS: ${phone.others?.GPS ? phone.others.GPS : 'Not Available'}</p>
                        <p class="card-text">NFC: ${phone.others?.NFC ? phone.others.NFC : 'Not Available'}</p>
                        <p class="card-text">Radio: ${phone.others?.Radio ? phone.others.Radio : 'Not Available'}</p>
                        <p class="card-text">USB: ${phone.others?.USB ? phone.others.USB : 'Not Available'}</p>
                        <p class="card-text">WLAN: ${phone.others?.WLAN ? phone.others.WLAN : 'Not Available'}</p> 
                        
                    </div>
                </div>
    `
    detailsContainer.appendChild(detailsBox);
}

