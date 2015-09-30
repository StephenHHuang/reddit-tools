function generateRandom(){
    return Math.floor(Math.random()*(25));
}

function getHeadlines(){
    var notTheOnion = "https://www.reddit.com/r/NotTheOnion/top/.json?sort=top&t=all";
    
    $.getJSON(notTheOnion, function(json){
        var listing = $(json.data.children);
        var postNum = generateRandom();
        console.log(postNum);
        var post = listing[postNum].data;
        return post;
        
    });
}

var splash = {
    onReady: function() {
        $('#startbutton').click(function(){
            $(this).fadeOut('slow');
            $("h1").fadeOut('slow');
            $("#headline").toggle(1000);
            $('#headline').html('<img src="https://media.giphy.com/media/IgQ8E05Dpg2ze/giphy.gif" class="center-block">');
        });
    }
};

$(document).ready(function(){
    splash.onReady(); 
    
});