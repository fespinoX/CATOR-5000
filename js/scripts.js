// Initial catos object

var catos = [
    	{
    		name: 'Zelda',
    		description: 'A supercute alien cat',
    		image: 'img/base-catos/zelda.jpg'
    	},
      	{
      		name: 'Minerva',
      		description: 'The office favourite one.',
      		image: 'img/base-catos/minerva.jpg'
      	},
      	{
      		name: 'Mariah',
      		description: 'The one that purrs all the time.',
      		image: 'img/base-catos/mariah.jpg'
      	}
    ]






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




function storeTheImage() {

    let imgCanvas = document.getElementById('canvas-element');
	let imgContext = imgCanvas.getContext("2d");
    let img = document.getElementById('image-preview');


    // Get canvas contents as a data URL
    let imgAsDataURL = imgCanvas.toDataURL("image/png");

    console.log(imgAsDataURL);
	
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











function getCatos() {






// Loop through the object and print the count for each fruit
for (var key in catosData) {
  console.log('Key: ' + key + ' Name: ' + catosData[key].name + ' Desc: ' + catosData[key].description + ' Img: ' + catosData[key].image );
}





}






function showCatos() {



	




}








$( document ).ready(function() {


	
	$('.file-input').on('change', function() {
	    readURL(this);
	});




//const values = Object.values(catos)
//console.log(values) // [28, 17, 54]

	getCatos();
	showCatos();



});	


