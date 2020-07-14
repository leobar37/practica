/* CONSTANTS */
const SUCCESS_ICON = "fas fa-thumbs-up";
const ERROR_ICON = "fas fa-times";
const WRNING_ICON = "fas fa-exclamation-triangle";
let modalRender = function(icon_name, message, idModal, option) {
    let content = `
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="productos_modal">
            <div class="card border-info">
               <h1 class="card-title text-center"> <i class=" ${icon_name} error_icon"></i></h1>
                   <div class="card-body text-center">
                       <p class="card-text text-center"> ${message}.</p>
                        
                 </div>
            </div>
        </div>
    </div>
    `;
    let modal = $(`#${idModal}`);
    document.getElementById(idModal).innerHTML = content;
    setTimeout(() => {
        modal.modal('show');
    }, 100)
}