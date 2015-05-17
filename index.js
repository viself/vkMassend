function pasceURL() {

    var x = document.getElementById("frm1");

    var text = "";

    text += x.elements[0].value;

  text = text.substr(text.indexOf("access_token"));
   
var forParse = String.fromCharCode(123) + '"' + decodeURI(text).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"' + String.fromCharCode(125);

   var tokendata = JSON.parse(forParse);


   if (tokendata.access_token) { 



$.ajax({
  url: "https://api.vk.com/method/users.get?access_token="+tokendata.access_token,
  dataType: 'jsonp',
  success: function(data){

    var resp_userId = data.response[0].uid;

    if (tokendata.user_id == resp_userId) {

   window.localStorage.setItem("access_token", tokendata.access_token);
   window.localStorage.setItem("user_id", parseInt(tokendata.user_id.replace(/\D+/g,"")));

   $( "#login" ).hide();
   }

  }
});

 }
 
}


function openInstallWindow() {

  var myWindowVar = 0;
  
     myWindowVar = window.open('https://oauth.vk.com/authorize?client_id=3682744&v=5.7&scope=wall&redirect_uri=http://oauth.vk.com/blank.html&display=page&response_type=token', 'myWindow1', 'scrollbars=1,height='+Math.min(200, screen.availHeight)+',width='+Math.min(500, screen.availWidth));

     
}


function addVideo () {
  var video_url = prompt("Введите ссылку на видео загруженное в vk Пример: \"https://vk.com/video505917_171070038\"", "");


  video_ids = video_url.match(/video-?[0-9]+_[0-9]+/,"");
  VideoCount++;

  $("#atachments").html($("#atachments").html()+"<div id=\"VideoCount"+VideoCount +"\" class=\"video_url\"><a class=\"text_dec\" target=\"_blank\" href=\""+video_url+"\">"+video_ids+"</a><a class=\"text_dec\" style=\"color: red;\" href=\"#\" onclick=\"dellVideo('VideoCount"+VideoCount+"')\">X</a></div>");
}

function addMessage() {

 var attrVideoStr = "";

  for (var i = 1; i <= VideoCount; i++) {
    var pre_url = $("#VideoCount"+i).text();
    pre_url = pre_url.substring(0, pre_url.length - 1);
    if (pre_url != "") {
    attrVideoStr += pre_url + ",";
    }
  }

  var regMes = /message/;
  var messArr = [];

  for (var i = 0; i < localStorage.length; i++) {
     if (localStorage.key(i).search(regMes) != -1) {
      var msgId = localStorage.key(i);

       msgId = msgId.substring(7);
       messArr.push(msgId);
    }    
  }
  messArr.sort();
  var msgID = 1;
  if (parseInt(messArr[messArr.length-1])) msgID = parseInt(messArr[messArr.length-1]) + 1;
  

  var msgcont = $("#message").val() +"(txtend)" + attrVideoStr;

  window.localStorage.setItem("message"+msgID, msgcont);
  location.reload();
}



function dellVideo (id) {
$("#"+id).remove();

}

function loudMsgs()
{

  var regMes = /message/;

  for (var i = 0; i < localStorage.length; i++) {
     if (localStorage.key(i).search(regMes) != -1) {
      var msgId = localStorage.key(i);
      var msgcont = window.localStorage.getItem(msgId);

      var msgtxt = "";
      var msgvideo = "";

      if (msgcont.indexOf("(txtend)") != -1) {
      msgtxt = msgcont.substring(0,msgcont.indexOf("(txtend)"));
      }

      if (msgcont.indexOf("video") != -1)
      {
        msgvideo = msgcont.substring(msgcont.indexOf("video"));

        var msgVideoArr = msgvideo.split(","); 
        msgvideo = "";
        for (var x = 0; x < msgVideoArr.length - 1; x++) {

        msgvideo += "<a class=\"text_dec\" target=\"_blank\" href=\"https://vk.com/"+msgVideoArr[x]+"\">"+msgVideoArr[x]+"</a>";

        }

      }   

      $( "#messages" ).append( "<div class=\"msg\" id=\""+msgId+"\"><p>"+msgtxt+"</p><div id=\"msg_attach\">"+msgvideo+"</div><a class=\"text_dec\" style=\"color: red;\" href=\"#\" onclick=\"dellMess('"+msgId+"')\">X</a></div>" );

    }    
  }

}


function loudGrp() {

  var regMes = /grp/;


  for (var i = 0; i < localStorage.length; i++) {
     if (localStorage.key(i).search(regMes) != -1) {
      var grpId = localStorage.key(i);
      var grpCont = window.localStorage.getItem(grpId);
      var grpName = grpCont.substring(0,grpCont.indexOf("(photo)"));
      var grpPhoto = grpCont.substring(grpCont.indexOf("(photo)")+"(photo)".length);

      $( "#grp_cont" ).append("<div class=\"grpclss\"id=\""+grpId+"\"><img src=\""+grpPhoto+"\"><a class=\"text_dec grpclssname\">"+grpName+"</a><a class=\"text_dec grpclssDel\" style=\"color: red;\" href=\"#\" onclick=\"dellGrp('"+grpId+"')\">X</a></div>");

    }    
  }


}

function addGrp() {

if ($("#grpText").val()) {

$.ajax({
  url: "https://api.vk.com/method/groups.getById?group_ids="+$("#grpText").val(),
  dataType: 'jsonp',
  success: function(data){
    if (data.response[0].gid) {
    window.localStorage.setItem("grp"+data.response[0].gid, data.response[0].name+"(photo)"+data.response[0].photo);
    location.reload();
    }
  }
});
}
}

function dellGrp(id) {
 window.localStorage.removeItem(id);
location.reload();
}


function dellMess(id) {
 window.localStorage.removeItem(id);
location.reload();
}

function sendAll() {
	
    var regMes = /grp/;


  for (var y = 0; y < localStorage.length; y++) {
     if (localStorage.key(y).search(regMes) != -1) {
      var grpId = localStorage.key(y);

       var regMs = /message/;

    for (var i = 0; i < localStorage.length; i++) {
     if (localStorage.key(i).search(regMs) != -1) {
      var msgId = localStorage.key(i);
      var msgcont = window.localStorage.getItem(msgId);

      var msgtxt = "";
      var msgvideo = "";

      if (msgcont.indexOf("(txtend)") != -1) {
      msgtxt = msgcont.substring(0,msgcont.indexOf("(txtend)"));
      }

      if (msgcont.indexOf("video") != -1)
      {
        msgvideo = msgcont.substring(msgcont.indexOf("video"),msgcont.length -1);

      }


var grpI = grpId.substring(3);

  $.ajax({
  url: "https://api.vk.com/method/wall.post?owner_id=-"+grpI+"&message="+msgtxt+"&attachments="+msgvideo+"&from_group=1&v=5.29&access_token="+window.localStorage.getItem("access_token"),
  dataType: 'jsonp',
  success: function(data){
  	console.log(data);
  }
});


    }   
  }

  	$( "#"+grpId).css("background-color", "#C6FACC");

  

    }    
  }

}


function exit() {
 window.localStorage.removeItem("access_token");
location.reload();
}

