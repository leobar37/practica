let valideCamps = function(values) {
    let value = values.filter(property => {
        return String(property).trim() == "";
    })

    return value.length > 0 ? false : true;
}

let resetPrevieww = function() {
    document.getElementById('pr_image').src = 'img/no-image.png';
    document.getElementById('pr_name').innerHTML = ".....";
    document.getElementById('pr_price').innerHTML = "...";
}