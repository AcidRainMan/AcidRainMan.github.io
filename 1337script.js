var x;
$(document).ready(function() {
	
	var displaySuperSecretDOXXData = function(incredibleSecretDoxData) {
		x = incredibleSecretDoxData;
		var output = "";
		$.each(x, function(k, v) {
			output += k + " " + v + "\n";
		});
		console.log(output);
		$("#doxx").html(output);
	};
 
	var extractSecretData = function(secretData, DOXXXvictim) {
		var HyperTML = $( '<div></div>' );
		HyperTML.html(secretData);
		
		var superDOXX = {
			'Victim:': DOXXXvictim,
			'Address:': $.trim(HyperTML.find("#details .info .adr").html()).replace("<br>", "\n")
		}; 
		
		var objSecretKey;
		var objSecretInformation;
		
		$.each(HyperTML.find("#details .extra li"), function(k, v) {
			if(k % 2 == 0) {
				objSecretKey = $(this).text();
			} else {
				superDOXX[objSecretKey] = $(this).text();
			}
		});
		superDOXX = decypherSecretData(superDOXX);
		displaySuperSecretDOXXData(superDOXX);
	};
	
	var decypherSecretData = function(superSecretDataObject) {
		superSecretDataObject['Email Address:'] =  superSecretDataObject['Victim:'].replace(/\s/, "") 
								+ (Math.floor(Math.random()  * 1000 + 1)).toString()
								+ "@" + superSecretDataObject["Email Address:"].split(" ")[0].split("@")[1];
		delete superSecretDataObject["QR Code:"];
		superSecretDataObject["SSN:"] = superSecretDataObject["SSN:"].split(" ")[0].replace("XXXX", Math.floor(Math.random() * 8999 + 1000));
		return superSecretDataObject;
	};
	
    var getSecretDoxxxData = function(victim) {
        // ONLY FEMALE DOXXING!
	    var secretData;
		
		secretData = $.getJSON(
		'http://whateverorigin.org/get?url=' 
			+ encodeURIComponent('http://www.fakenamegenerator.com/gen-female-us-us.php') + '&callback=?', 
		function(data){
			secretData = data.contents;
			extractSecretData(secretData, victim);
		});
	};
	
	
	var getReadyToRumble = function() {
		$('#victim').keyup(function(e){
			if(e.keyCode == 13)
			{
				getSecretDoxxxData($(this).val());
			}
		});
		
	};
	
	getReadyToRumble();


});
