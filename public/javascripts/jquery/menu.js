/**
 * Created by D on 09.09.14.
 */
var checkUrl = function(){
    var current_url = String(window.location);
    $(".nav-tabs a").each(function(){
        if(current_url.indexOf($(this).attr("href")) > -1){
            $(this).parent("li").addClass("active");
        }else{
            $(this).parent("li").removeClass("active");
        }
    });
}

$(document).ready(function(){
    checkUrl();
    $(".nav-tabs a").click(function(){
        $(".nav-tabs li").removeClass("active");
        $(this).parent("li").addClass("active");
    });
});