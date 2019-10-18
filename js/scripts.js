
// Initial catos object

var catos = [
    	{
    		name: 'Zelda',
    		description: 'A supercute alien cat',
    		image: 'img/base-catos/zelda.jpg',
    		order: 0
    	},
      	{
      		name: 'Minerva',
      		description: 'The office favourite one.',
      		image: 'img/base-catos/minerva.jpg',
      		order: 1
      	},
      	{
      		name: 'Mariah',
      		description: 'The one that purrs all the time.',
      		image: 'img/base-catos/mariah.jpg',
      		order: 2
      	}
    ];




/* Local storage generation */

// if catosData already exists, we pull it

if (localStorage.getItem('catosData')) {

    catosData = JSON.parse(localStorage.getItem('catosData'));


// if not, we create it

} else {

    localStorage.removeItem('catosData');
    localStorage.setItem('catosData', JSON.stringify(catos));

    catosData = JSON.parse(localStorage.getItem('catosData'));

 }





/* DOM functions */

// Variable declarations

const catosList = $('#js-catos-list');









function storeTheImage() {

    let imgCanvas = document.getElementById('canvas-element');
	let imgContext = imgCanvas.getContext("2d");
    let img = document.getElementById('image-preview');


    // Get canvas contents as a data URL
    let imgAsDataURL = imgCanvas.toDataURL("image/png");

	
    // Save image into localStorage
    try {
        window.localStorage.setItem("imageStore", imgAsDataURL);
        $('.localstorage-output').html( window.localStorage.getItem('imageStore') );
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}



function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            $('#image-preview').attr('src', e.target.result);
            storeTheImage(); 
        }
        reader.readAsDataURL(input.files[0]);
    }
}







function emptyCatoList() {

	$('#js-catos-list').empty();

}



function getCatosQty() {


	let catosQty = $( catosData ).length;

	$('#js-catos-qty').html(catosQty);


}



function showCatos() {



	emptyCatoList();


	catosData = JSON.parse(localStorage.getItem('catosData'));



	$.each(catosData, function(i)
	{
	    let li = $('<li/>')
	        //.addClass('ui-menu-item')
	        .appendTo(catosList);
	    let name = $('<p/>')
	        .addClass('cato-name')
	        .text(catosData[i].name)
	        .appendTo(li);
		let description = $('<p/>')
	        .addClass('cato-desc')
	        .text(catosData[i].description)
	        .appendTo(li);
	    let image = $('<img/>')
	        .addClass('cato-photo')
	        .attr('src', catosData[i].image)
	        .appendTo(li);
	    let btndelete = $('<button/>')
	    	.addClass('js-cato-delete')
	    	.attr('id', 'catodelete-' + i)
	        .text("Delete Cato")
	        .appendTo(li);
	    let btnedit = $('<button/>')
	    	.addClass('js-cato-edit')
	        .attr('id', 'catoedit-' + i)
	        .text("Edit Cato")
	        .appendTo(li);
	});




	getCatosQty();


	
}



function emptyCatoForm() {

	$('.file-input').val('');
	$('.js-newcato-name').val('');
	$('.js-newcato-desc').val('');
	$('#image-preview').attr('src', '');


}






function saveCato() {


	let newCato = {

		name: $('.js-newcato-name').val(),
		description: $('.js-newcato-desc').val(),
		image: $('#image-preview').attr('src')
		//order: 1


	};


	catosData = JSON.parse(localStorage.getItem('catosData'));

	catosData.push(newCato);




	localStorage.setItem('catosData', JSON.stringify(catosData));

    catosData = JSON.parse(localStorage.getItem('catosData'));



    emptyCatoForm();

    showCatos();



}



function deleteCato(key) {








	catosNewData = JSON.parse(localStorage.getItem('catosData'));


	catosNewData.splice(key, 1);

    localStorage.removeItem('catosData');
    localStorage.setItem('catosData', JSON.stringify(catosNewData));


    showCatos();




}







$( document ).ready(function() {


	


// Button listeners

$( "#js-save-cato" ).on("click", function() {
      saveCato();
});






$(document).on('click', '.js-cato-delete', function () {
    // your function here


    let arrayPos =  this.id.split('-')[1];


    deleteCato(arrayPos);

});






	showCatos();


	$('.file-input').on('change', function() {
	    readURL(this);
	});



});	


