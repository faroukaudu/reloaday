//   'use strict';
// $(document).ready(function () {
// //Basic alert
// 	document.querySelector('.sweet-1').onclick = function(){
// 		swal("Here's a message!", "It's pretty, isn't it?")
// 	};
// 	//success message
// 	document.querySelector('.alert-success-msg').onclick = function(){
// 		swal("Good job!", "You clicked the button!", "success");
// 	};

const { name } = require("ejs");

// 	//Alert confirm
// 	document.querySelector('.alert-confirm').onclick = function(){
// 		swal({
// 					title: "Are you sure?",
// 					text: "Your will not be able to recover this imaginary file!",
// 					type: "warning",
// 					showCancelButton: true,
// 					confirmButtonClass: "btn-danger",
// 					confirmButtonText: "Yes, delete it!",
// 					closeOnConfirm: false
// 				},
// 				function(){
// 					swal("Deleted!", "Your imaginary file has been deleted.", "success");
// 				});
// 	};

// 	//Success or cancel alert
// 	document.querySelector('.alert-success-cancel').onclick = function(){
// 		swal({
// 					title: "Are you sure?",
// 					text: "You will not be able to recover this imaginary file!",
// 					type: "warning",
// 					showCancelButton: true,
// 					confirmButtonClass: "btn-danger",
// 					confirmButtonText: "Yes, delete it!",
// 					cancelButtonText: "No, cancel plx!",
// 					closeOnConfirm: false,
// 					closeOnCancel: false
// 				},
// 				function(isConfirm) {
// 					if (isConfirm) {
// 						swal("Deleted!", "Your imaginary file has been deleted.", "success");
// 					} else {
// 						swal("Cancelled", "Your imaginary file is safe :)", "error");
// 					}
// 				});
// 	};
// 	//prompt alert
// 	document.querySelector('.alert-prompt').onclick = function(){
// 		swal({
// 			title: "An input!",
// 			text: "Write something interesting:",
// 			type: "input",
// 			showCancelButton: true,
// 			closeOnConfirm: false,
// 			inputPlaceholder: "Write something"
// 		}, function (inputValue) {
// 			if (inputValue === false) return false;
// 			if (inputValue === "") {
// 				swal.showInputError("You need to write something!");
// 				return false
// 			}
// 			swal("Nice!", "You wrote: " + inputValue, "success");
// 		});
// 	};

// 	//Ajax alert
// 	document.querySelector('.alert-ajax').onclick = function(){
// 		swal({
// 			title: "Ajax request example",
// 			text: "Submit to run ajax request",
// 			type: "info",
// 			showCancelButton: true,
// 			closeOnConfirm: false,
// 			showLoaderOnConfirm: true
// 		}, function () {
// 			setTimeout(function () {
// 				swal("Ajax request finished!");
// 			}, 2000);
// 		});
// 	};


// 		$('#openBtn').on('click',function () {
// 			$('#myModal').modal({
// 				show: true
// 			})
// 		});

// 		$(document).on('show.bs.modal', '.modal', function (event) {
// 			var zIndex = 1040 + (10 * $('.modal:visible').length);
// 			$(this).css('z-index', zIndex);
// 			setTimeout(function() {
// 				$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
// 			}, 0);
// 		});
// 	});



function mypull (mypin) {
	// var param1 = $(element).data('param1');
// document.querySelector('.alert-prompt').onclick = function(){
	
	swal({
		title: "Enter Pin!",
		text: "Kindly provide your transaction pin:"+mypin,
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		inputPlaceholder: "******"
	}, function (inputValue) {
		// var param1 = element.getAttribute('data-param1');
		if (inputValue === false) return false;
		if (inputValue === '') {
			swal.showInputError("Declined!");
			return false
		}else if(inputValue !== mypin){
			swal.showInputError("Incorrect Pin; Try Again!");
			return false
		}
		swal("Accepted!", "Transaction in progress, Please wait: " + inputValue, "success");
		setTimeout(function() {
			$('#swaForm').submit();
		  }, 1000);
		
	});
// };

// $('#openBtn').on('click',function () {
// 	$('#myModal').modal({
// 		show: true
// 	})
// });

// $(document).on('show.bs.modal', '.modal', function (event) {
// 	var zIndex = 1040 + (10 * $('.modal:visible').length);
// 	$(this).css('z-index', zIndex);
// 	setTimeout(function() {
// 		$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
// 	}, 0);
// });
};

function createPin () {
	
        Swal.fire({
			title: 'Welcome!',
			text: 'Welcome to our website!',
			icon: 'info',
			confirmButtonText: 'Next'
		}).then((result) => {
			if (result.isConfirmed) {
				// Step 2: Prompt for PIN
				Swal.fire({
					title: 'Enter PIN',
					input: 'password',
					inputLabel: 'Please enter your PIN:',
					inputPlaceholder: 'Enter PIN',
					inputAttributes: {
						maxlength: 4,
						autocapitalize: 'off',
						autocorrect: 'off'
					},
					allowOutsideClick: false, // Prevent closing by clicking outside the alert
					allowEscapeKey: false,   // Prevent closing with the Escape key
					allowEnterKey: false,    // Prevent closing with the Enter key
					showCancelButton: true,
					confirmButtonText: 'Submit',
					cancelButtonText: 'Cancel',
					preConfirm: (pin) => {
						if (!pin || pin.length !== 4) {
							Swal.showValidationMessage('Please enter a valid 4-digit PIN');
							return false; // Prevent form submission
						}
						return pin; // Return PIN to be used in next step
					}
				}).then((pinResult) => {
					if (pinResult.isConfirmed) {
						// Process the PIN (e.g., submit it to the server)
						$.ajax({
							url: '/submitpin', // Your server endpoint
							method: 'POST',
							data: {
								pin: pinResult.value // Sending the input value with the name 'pin'
							},
							success: function(response) {
								Swal.fire({
									title: 'PIN Submitted',
									text: 'Your PIN has been submitted successfully!',
									icon: 'success',
									confirmButtonText: 'OK'
								});
							},
							error: function(error) {
								Swal.fire({
									title: 'Error!',
									text: 'There was a problem submitting your request.',
									icon: 'error'
								});
							}
						});

						// Log the PIN value to the console
						console.log('Submitted PIN:', pinResult.value);
					}
				});
			}
		});
    
};

function dangerOpenLink(title, message, url) {
  swal({
    title: title || "Notice",
    text: message || "",
    type: "error",              // or "warning"
    confirmButtonText: "Top Up",
    closeOnConfirm: true
  }, function () {
    // ✅ runs when OK is clicked
    window.location.href = url;          // same tab
    // window.open(url, "_blank");       // new tab instead
  });
}