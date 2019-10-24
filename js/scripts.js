/* Local storage generation */

// Initial catos object

var catos = [
    	{
    		name: 'Zelda',
    		description: 'A supercute alien cat from the planet Pawtron 5000.',
    		image: 'img/base-catos/zelda.jpg',
    		order: 0
    	},
      	{
      		name: 'Minerva',
      		description: 'The office favourite one even though she has no neck.',
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


// Checks if we ran out of catos

function checkIfNoCatos(catosQty) {

	if (catosQty < 1) {
		$('#js-no-catos-msg').removeClass('d-none');
		$('#js-total-catos').addClass('d-none');
	} else {
		$('#js-no-catos-msg').addClass('d-none');
		$('#js-total-catos').removeClass('d-none');
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
	    	.addClass('cato-container')
	    	.addClass('d-flex')
	        .appendTo($('#js-catos-list'));
		let key = $('<span/>')
	        .addClass('js-cato-key')
	        .addClass('d-none')
	        .text(i)
	        .appendTo(li);
        let image = $('<img/>')
	        .addClass('cato-photo')
	        .attr('src', catosData[i].image)
	        .appendTo(li);
	    let infoContainer = $('<div/>')
	    	.addClass('info-container')
	    	.appendTo(li);
	    let name = $('<h2/>')
	        .addClass('cato-name')
	        .text(catosData[i].name)
	        .appendTo(infoContainer);
		let description = $('<p/>')
	        .addClass('cato-desc')
	        .text(catosData[i].description)
	        .appendTo(infoContainer);
		let btnedit = $('<button/>')
	    	.addClass('js-cato-edit')
	    	.addClass('btn')
	    	.addClass('btn-pr')
	        .attr('id', 'catoedit-' + i)
	        .text("Edit Cato")
	        .appendTo(infoContainer);	        
	    let btndelete = $('<button/>')
	    	.addClass('js-cato-delete')
	    	.addClass('btn')
	    	.addClass('btn-sc')
	    	.attr('id', 'catodelete-' + i)
	        .text("Delete Cato")
	        .appendTo(infoContainer);
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





  // Validate name

 function catoNameValidation(name) {

 	if(name.length > 0) {
 		$("#js-new-cato-form").find("#js-name-validation").addClass('d-none');
 		console.log("name ok");
 		return true;

 	} else {
 		$("#js-new-cato-form").find("#js-name-validation").removeClass('d-none');
 		$("#js-new-cato-form").find("#js-name-validation").html("Please enter a name for this cato");

 		
 		
 		console.log("name too short");

 	}

 }


 // Validate description

 function catoDescValidation(desc) {

 	if(desc.length < 1) {
 		console.log("desc too short");
 		$("#js-new-cato-form").find("#js-desc-validation").removeClass('d-none');
 		$("#js-new-cato-form").find("#js-desc-validation").html("Please enter a description for this cato");
 	} else if (desc.length > 300) {
 		console.log("desc too long");
 		$("#js-new-cato-form").find("#js-desc-validation").removeClass('d-none');
 		$("#js-new-cato-form").find("#js-desc-validation").html("You don't need to say so much about this cato. 300 characters should be enough, human!");
 	} else {
 		$("#js-new-cato-form").find("#js-desc-validation").addClass('d-none');
 		console.log("name ok");
 		return true;
 	}
 		
 }



 // Validate image

 function catoImgValidation(img) {

 	if($(img).attr('src') == undefined) {
 		console.log("no valid image uploaded");
 		$("#js-new-cato-form").find("#js-img-validation").removeClass('d-none');
 		$("#js-new-cato-form").find("#js-img-validation").html("Please upload a picture of your cato!");
 	}else if (img.width != 320 || img.height != 320) {
 		$("#js-new-cato-form").find("#js-img-validation").removeClass('d-none');
 		$("#js-new-cato-form").find("#js-img-validation").html("Wrong picture size, should be 320px x 320px");
 	} else {
 		$("#js-new-cato-form").find("#js-img-validation").addClass('d-none');
 		console.log("image ok");
 		return true;
 	}




}


// New cat validation

function newCatoValidation(name, desc, img) {


	if (catoNameValidation(name) & catoDescValidation(desc) & catoImgValidation(img) ) {
		return true;
	} else {
		console.log("failed validation, cato not saved");
	}

}


function validateFileType(fileName) {

	let re = /(\.jpg|\.gif|\.png)$/i;
	if(re.exec(fileName)) 	{

		return true;
	} else {

		$("#js-new-cato-form").find("#js-img-validation").removeClass('d-none');
 		$("#js-new-cato-form").find("#js-img-validation").html("Invalid file type, sorry, only .jpg, .gif or .png allowed");

	}


}






// Encode image as base64

function imageTo64(cb) {
    return function(){
        let file = this.files[0];


        let fileName = file.name;

        if (validateFileType(fileName)) {

        	$("#js-new-cato-form").find("#js-img-validation").addClass('d-none');

        	let reader  = new FileReader();
	        reader.onloadend = function () {
	            cb(reader.result);
	        }
	        reader.readAsDataURL(file);

        } else {

        	console.log("file ext invalid");



        }



        
    }
}


// Encodes edited image as base64

function editImageTo64(cb) {

    return function(){
        let editfile = this.files[0];
        let editreader  = new FileReader();
        editreader.onloadend = function () {
            cb(editreader.result);
        }
        editreader.readAsDataURL(editfile);
    }
}


// Saves cato

function saveNewCato() {

	let catoName = $('.js-newcato-name').val();
	let catoDesc = $('.js-newcato-desc').val();
	let catoImg = document.getElementById("js-image-preview");

	let catoPic = $('#js-image-preview').attr('src');

	if (newCatoValidation(catoName, catoDesc, catoImg)) {


		// gets new cato details

		if (confirmCatoAction('Are you sure you want to save this new cato?')) {
			let newCato = {

				name: catoName,
				description: catoDesc,
				image: catoPic,
				order: $( catosData ).length

			};

			// adds new cato to the list and saves it to the LS

			catosData.push(newCato);
			localStorage.setItem('catosData', JSON.stringify(catosData));
		    catosData = JSON.parse(localStorage.getItem('catosData'));

		    emptyCatoForm();
		    showCatos();
		} else {

			console.log("failed validation");

		}

		

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


	$('#editFileToLoad').change(editImageTo64(function(editBase64Img){

	    $('#js-image-edit-preview')
	        .attr('src', editBase64Img);
	}));

}


// Edits cato

function editCato(key) {

	editCatoForm(key);

}


// Saves edited cato

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


// Re-assigns catos order

function reassignOrder() {

	$(catosData).each(function(key){

		catosData[key].order = key;

    });

}


// Re-sorts catos order

function reSortCatos() {

	let newOrder = [];
    $("#js-catos-list").find(".js-cato-key").each(function(){
        if(($.trim($(this).text()).length>0)){
	         newOrder.push(parseInt($(this).text()));
	    }

    	reassignOrder();

    });

	let sortedCatosData = _.sortBy(catosData, function(obj){ 
	    return _.indexOf(newOrder, obj.order);
	});

    localStorage.setItem('catosData', JSON.stringify(sortedCatosData));
	catosData = JSON.parse(localStorage.getItem('catosData'));

	showCatos();
  

}


/* On Doc ready listeners */

$( document ).ready(function() {


	// Show catos when doc is ready

	showCatos();


	// Img input listener


	$('#inputFileToLoad').change(imageTo64(function(base64Img){
	    $('.output')
	  		.find('img')
	        .attr('src', base64Img);
	}));


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



	$('.file-input').on('change', function() {
	    readURL(this);
	});


});	


// Calls Sortable

$( function() {
    $( "#js-catos-list" ).sortable();
    $( "#js-catos-list" ).disableSelection();
});


// Makes catos list sortable

$('#js-catos-list').sortable({
    axis: 'y',
    update: function (event, ui) {        
        reSortCatos();
    }
});

