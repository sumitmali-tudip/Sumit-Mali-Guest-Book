				function validateEmail(){
					var email = document.getElementById('email_id').value;
					
					var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    				
					if(filter.test(email)){
							document.getElementById('message_email').innerHTML = "Correct Format...!";
							document.getElementById('message_email').style.color = "green";
					}else{
							document.getElementById('message_email').innerHTML = "Wrong Format...!";
							document.getElementById('message_email').style.color = "red";
					}
				}
				
				function validatePassword(){
					var password = document.getElementById('password').value;
					var confirm_password = document.getElementById('confirm_password').value;
					if(password === confirm_password){
							document.getElementById('message_pass').innerHTML = "Match...!";
							document.getElementById('message_pass').style.color = "green";
					}else{
							document.getElementById('message_pass').innerHTML = "Don't Match...!";
							document.getElementById('message_pass').style.color = "red";
					}
				}