dtmail = function(){
	dt.bulkMail = function bulkMail() {
		// This runs when the tool is first called.
		dt.bm = {};
		dt.bm.current = 0;
		
		dt_input.innerHTML = '<h4>Bulk Mail Tool</h4><p>The maximum number of recipients is currently set to 5. This is to discourage players from sending spam messages to large numbers of others. Names are case sensitive (My Name is not the same as my name) so be carefull when typing them.</p>'
		dt_input.setAttribute('class', 'see');
		dt.addElement(dt_input, 'input', ['id', 'class', 'type', 'value', 'style', 'placeholder', 'name', 'aria-autocomplete', 'aria-haspopup'], ['mailList', 'myinp', 'text', '', 'width:90%', 'Enter names separated by comas', 'dt_mailList', 'list', 'true']);
		dt.addElement(dt_input, 'input', ['onclick', 'name', 'value', 'id', 'type'], ['dt.sendMail()', 'dt_sendMail', 'Process List', 'dt_sendMail', 'button']);
		dt.addElement(dt_input, 'input', ['onclick', 'name', 'value', 'id', 'type', 'class'], ['dt.doMessage()', 'dt_doMessage', 'Send First', 'dt_doMessage', 'button', 'nosee']);
		var rubbish = '';
	};

	dt.doMessage = function doMessage() {
		// If this is not the first recipient then reload the new message page
		if (dt.bm.current !== 0) {
			var currentHash = location.hash;
			if (currentHash !== '#/Communication/ComposeMail') {
	//	location.hash = '#/Communication/ComposeMail';
				location.hash = '#/Communication/ComposeMail';
				// Delay calling the function to fill in the message form
				timeoutID = window.setTimeout(dt.messageFill, 2000);
			}
		} else {
			// First recipient so call the message fill function immediately
			dt.messageFill();
		}
	};
	dt.messageFill = function messageFill() {
		$(document).ready(function () {
			var inpName = document.querySelector('#finderPlayerName');
			var inpId = document.querySelector('#finderPlayerID');
			var msgSubj = document.querySelector('#MsgSubject');
			var msgEditorBody = document.getElementsByTagName("iframe")[ 0 ].contentDocument;
			var msgEditorActive = msgEditorBody.activeElement;
			msgSubj.value = dt.bm.subjText;
			msgEditorActive.innerHTML = dt.bm.msgContent;
			inpName.value = dt.bm.targetNames[dt.bm.current];
			inpId.value = dt.bm.servResp[inpName.value];
			dt.checkNext();
			var rubbish = '';
		});
	};
	dt.checkNext = function checkNext() {
		if (dt.bm.current + 1 == dt.bm.targetNames.length) {
			document.querySelector('#dt_doMessage').setAttribute('class', 'nosee');
		} else {
	//		location.hash = '#/Communication/ComposeMail';
	//		$(document).ready(function () {
			document.querySelector('#dt_doMessage').setAttribute('value', 'Send Next');
			dt.bm.current = dt.bm.current + 1;
	//		});
		}
	};
	dt.sendMail = function sendMail() {
		document.querySelector('#dt_sendMail').setAttribute('class', 'nosee');
		var targets = dt_input.querySelector('#mailList').value;
		dt.bm.targetNames = targets.split(',');
		for (i = 0; i < dt.bm.targetNames.length; i++) {
			dt.bm.targetNames[i] = dt.bm.targetNames[i].trim();
		}
		var inpName = document.querySelector('#finderPlayerName');
		var inpId = document.querySelector('#finderPlayerID');
		var msgSubj = 'DTBM: ' + document.querySelector('#MsgSubject');
		var msgEditorBody = document.getElementsByTagName("iframe")[ 0 ].contentDocument;
		var msgEditorActive = msgEditorBody.activeElement;
		dt.bm.subjText = msgSubj.value;
		dt.bm.msgContent = msgEditorActive.innerHTML;
		$.ajax({
			url: dt.server + "/php/getplayerid.php",
			data: {names: dt.bm.targetNames},
			type: "POST",
			dataType: "json",
			cache: false,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: function (data) {
				dt.bm.reject = [];
				var ok = [];
				dt.bm.servResp = data;
				// Compare the servResp object and targetNames array. Any targetNames not in the servResp go into a reject array.
				var keys = Object.keys(dt.bm.servResp);
				for (i = 0; i < dt.bm.targetNames.length; i++) {
					if (dt.bm.servResp.hasOwnProperty(dt.bm.targetNames[i])) {
						ok.push(dt.bm.targetNames[i]);
					} else {
						dt.bm.reject.push(dt.bm.targetNames[i]);
					}
				}
				dt.bm.targetNames = ok;
				if (dt.bm.reject.length > 0) {
					var rejected = dt.bm.reject.join(', ');
					window.alert('The following names were not found and have been rejected: ' + rejected);
				}
				// Trim the array if it is > 5 names
				if (dt.bm.targetNames.length > 5) {
					var remove = dt.bm.targetNames.length - 5;
					var removed = dt.bm.targetNames.splice(5, remove);
					window.alert('Maximum number of recipients is 5. The following were removed: ' + removed.join(', '));
				}

				document.querySelector('#dt_doMessage').setAttribute('class', 'see');
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert("You can not send Cross Domain AJAX requests: " + errorThrown);
			}
		});
	};
}