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
                        <p class="card-text">${phone.brand}</p>
                    </div>
                </div>
        `
        phoneContainer.appendChild(div)
    })
}