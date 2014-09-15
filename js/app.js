var JSONTest =
	{
		jsonResult:null,
		connectButton:null,
		facebookIDfield:null,
		resultWindow:null,
		//initialize function
		init:function()
		{
			console.log("INITIALIZE");
			JSONTest.connectButton = $("#connectButton");
			JSONTest.facebookIDfield = $("#facebookIDfield");
			JSONTest.resultWindow = $("#resultWindow");
			JSONTest.initEvent();
		},
		//INITIALIZE EVENTS
		initEvent:function()
		{
			JSONTest.connectButton.click(JSONTest.onConnect);
		},
		onConnect:function(e)
		{
			var fbuid = JSONTest.facebookIDfield.val();
			console.log(fbuid);
			JSONTest.resultWindow.text('');
			if(fbuid)
			{
 				fbuid = fbuid.trim();
				if(fbuid.length>1)
				{
					//call connect funtion
					JSONTest.connect(fbuid);
					return;
				}
				
			}
			JSONTest.resultWindow.text('You made an invalid input');
			
		},
		//Connect to Facebook RESTful API
		connect:function(userid)
		{
			$.ajax
			(
				{
					url:"https://graph.facebook.com/v1.0/",
					dataType:"json",
					data:
						{
							fields:'id,name,picture.type(large)',
							id:userid
						},
					success: JSONTest.onSuccess
				}				
			);
		},
		//Handle JSON RESPONSE
		onSuccess:function(response)
		{
			JSONTest.jsonResult = response;
			$("#fbProfileImage").prop("src",JSONTest.jsonResult.picture.data.url);
			$("#fbName").text(JSONTest.jsonResult.name);
		}
	}
	$(document).ready(JSONTest.init);