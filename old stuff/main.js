$(function(){

alert("1st part")

 $("#submit1").click(function(){
      alert("it worked!")
      submitData();
    });
})
    $.get("/ping", function(data){
        if(data.error == "true"){
            $("#results").prepend("<div class='alert alert-danger'><strong>Error!</strong> "+ data.message +"</div>");
        }
    }, "json")

   


    function submitData(){
      alert("final")
      $.post("/submitData1", {username: $("#username").val(), password: $("#level"+index).val()})
        //.done(function(data){
          /*if(data.result == "failed"){
            console.log(data)
            $("#result").text("Failed to login! " + data.message);
          } else {
            console.log(data)
            $("#result"+index).text("Logged in as: " + data.username + (data.randomCode ? " (CODE: " + data.randomCode + ")" : ""));
          }
          */
        //};
    }


