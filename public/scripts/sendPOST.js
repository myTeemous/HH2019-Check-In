const myForm = document.querySelector('#myForm');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for(const pair of formData) {
        searchParams.append(pair[0], pair[1]);
    }

    fetch('localhost:3000', {
        method: 'post',
        body: searchParams
    }).then((response) => {
        console.log('from script' + ' ' + response);
    }).catch((error) => {
        console.error(error);
    })
});