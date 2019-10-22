/* Local storage generation */

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

// if catosData already exists, we pull it

if (localStorage.getItem('catosData')) {

    catosData = JSON.parse(localStorage.getItem('catosData'));

} else {

	// if not, we create it

    localStorage.removeItem('catosData');
    localStorage.setItem('catosData', JSON.stringify(catos));
    catosData = JSON.parse(localStorage.getItem('catosData'));

 }




/* Functions */




// Encode image as base64

function imageTo64(cb) {
    return function(){
        let file = this.files[0];
        let reader  = new FileReader();
        reader.onloadend = function () {
            cb(reader.result);
        }
        reader.readAsDataURL(file);
    }
}

$('#inputFileToLoad').change(imageTo64(function(base64Img){
    $('.output')
  		.find('img')
        .attr('src', base64Img);
}));






// Checks if we ran out of catos

function checkIfNoCatos(catosQty) {

	if (catosQty < 1) {
		$('#js-no-catos-msg').removeClass('d-none');
	} else {
		$('#js-no-catos-msg').addClass('d-none');
	}

}



// Shows the amount of catos

function getCatosQty() {

	let catosQty = $( catosData ).length;

	$('#js-catos-qty').html(catosQty);

	checkIfNoCatos(catosQty);

}


// Empties the list that shows the catos

function emptyCatoList() {

	$('#js-catos-list').empty();

}


// Show catos in a list

function showCatos() {

	removeCatEditForm();

	emptyCatoList();

	//catosData = JSON.parse(localStorage.getItem('catosData'));

	$.each(catosData, function(i)
	{
	    let li = $('<li/>')
	        .appendTo($('#js-catos-list'));
		let key = $('<span/>')
	        .addClass('cato-key')
	        .text(i)
	        .appendTo(li);	        
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


// Empties the form to create a new cato

function emptyCatoForm() {

	$('#inputFileToLoad').val('');
	$('.js-newcato-name').val('');
	$('.js-newcato-desc').val('');
	$('#js-image-preview').attr('src', '');


}





// Confirm before action

function confirmCatoAction ( message ) {

	let confirmAction = confirm( message );

    if (confirmAction) {

      return true;

    } 

 }


// Saves cato

function saveNewCato() {


	if (confirmCatoAction('Are you sure you want to save this new cato?')) {

		// gets new cato details

		let newCato = {

			name: $('.js-newcato-name').val(),
			description: $('.js-newcato-desc').val(),
			image: $('#js-image-preview').attr('src'),
			order: $( catosData ).length

		};

		// adds new cato to the list and saves it to the LS

		catosData.push(newCato);
		localStorage.setItem('catosData', JSON.stringify(catosData));
	    catosData = JSON.parse(localStorage.getItem('catosData'));

	    emptyCatoForm();
	    showCatos();

    } else {

		console.log("nothing happened");

	}

}

// Deletes cato

function deleteCato(key) {


	if (confirmCatoAction('Are you sure you want to delete this cute cato?')) {

		catosNewData = JSON.parse(localStorage.getItem('catosData'));
		catosNewData.splice(key, 1);

	    localStorage.removeItem('catosData');
	    localStorage.setItem('catosData', JSON.stringify(catosNewData));
	    catosData = JSON.parse(localStorage.getItem('catosData'));

	    showCatos();

	} else {

		console.log("nothing happened");

	}


	


}


// Deletes cat edit form

function removeCatEditForm() {

	$( ".cato-edit-container" ).remove();

}


// Generates form to edit cato

function editCatoForm(key) {

	// DOM: Deletes any previous edit form

	removeCatEditForm();

	// DOM: Generates edit DIV

	let editcontainer = $('<div/>')
        .addClass('cato-edit-container')
		.insertAfter( '#catoedit-' + key );

    let name = $('<input/>')
        .addClass('cato-edit-name')
        .addClass('js-cato-edit-name')
        .val(catosData[key].name)
        .appendTo(editcontainer);
    let description = $('<textarea/>')
        .addClass('cato-edit-desc')
        .addClass('js-cato-edit-desc')
        .val(catosData[key].description)
        .appendTo(editcontainer);
    let file = $('<input/>')
    	.addClass('file-input')
    	.attr('id', 'editFileToLoad')
    	.attr('type', 'file')
    	.appendTo(editcontainer);
    let preview = $('<img/>')
    	.attr('id', 'js-image-edit-preview')
    	.appendTo(editcontainer);
    let button = $('<button/>')
    	.addClass('js-save-this-cato')
    	.text("Save Cato")
    	.attr('id', 'editcato-' + key)
    	.appendTo(editcontainer);



	// Encodes edited image as base64

	function editImageTo64(cb) {

	    return function(){
	    	console.log(this);
	        let editfile = this.files[0];
	        let editreader  = new FileReader();
	        editreader.onloadend = function () {
	            cb(editreader.result);
	        }
	        editreader.readAsDataURL(editfile);
	    }
	}

	$('#editFileToLoad').change(editImageTo64(function(editBase64Img){

	    $('#js-image-edit-preview')
	        .attr('src', editBase64Img);
	}));

}


// Edits cato

function editCato(key) {

	editCatoForm(key);

	

}






function saveThisCato(key) {

	catosData[key].name = $('.js-cato-edit-name').val();
	catosData[key].description = $('.js-cato-edit-desc').val();

	if ($('#js-image-edit-preview').attr('src') != undefined) {
		catosData[key].image = $('#js-image-edit-preview').attr('src');
	}

	



	localStorage.setItem('catosData', JSON.stringify(catosData));

    catosData = JSON.parse(localStorage.getItem('catosData'));

    showCatos();


}





$( document ).ready(function() {


	


// Button listeners

$( "#js-save-cato" ).on("click", function() {
      saveNewCato();
});






$(document).on('click', '.js-cato-delete', function () {


    let arrayPos =  this.id.split('-')[1];


    deleteCato(arrayPos);

});




$(document).on('click', '.js-cato-edit', function () {


    let arrayPos =  this.id.split('-')[1];


    editCato(arrayPos);

});



$(document).on('click', '.js-save-this-cato', function () {


	if (confirmCatoAction('Are you sure you want to edit this cato?')) {

		let arrayPos =  this.id.split('-')[1];
	    saveThisCato(arrayPos);

	} else {
		console.log("nothin happened");
	}

});








	showCatos();


	$('.file-input').on('change', function() {
	    readURL(this);
	});












	function reassignOrder() {

		$(catosData).each(function(key){

			catosData[key].order = key;

        });





	}








	function reSortCatos() {

		//let newOrder = $(".cato-key").text();

		//console.log(newOrder);



		var newOrder = [];
	    $("#js-catos-list").find(".cato-key").each(function(){
	        if(($.trim($(this).text()).length>0)){
	         newOrder.push(parseInt($(this).text()));
        }


        reassignOrder();


	    });





		var sortedCatosData = _.sortBy(catosData, function(obj){ 
		    return _.indexOf(newOrder, obj.order);
		});





	    localStorage.setItem('catosData', JSON.stringify(sortedCatosData));
    	catosData = JSON.parse(localStorage.getItem('catosData'));


    	showCatos();

	    

	}







$( function() {
    $( "#js-catos-list" ).sortable();
    $( "#js-catos-list" ).disableSelection();
  } );



$('#js-catos-list').sortable({
    axis: 'y',
    update: function (event, ui) {
        
        reSortCatos();
    }
});











});	


