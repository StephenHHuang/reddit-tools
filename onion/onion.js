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

function generateRandom(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getHeadlines(){
    var notTheOnion = "https://www.reddit.com/r/NotTheOnion/top/.json?sort=top&t=week";
    var theOnion = "https://www.reddit.com/r/theonion/top/.json?sort=top&t=year";
    var random = generateRandom(0,2);
    console.log(random);
    
    if(random == 0){
        $.getJSON(theOnion, function(json){
            var listing = $(json.data.children);
            var postNum = generateRandom(0,24);
            console.log("theOnion, post num " + postNum);
            var post = listing[postNum].data;
            console.log(post.title);
            return post;
        });
    }
    else{
        $.getJSON(notTheOnion, function(json){
            var listing = $(json.data.children);
            var postNum = generateRandom(0,24);
            console.log("notTheOnion, post num " + postNum);
            var post = listing[postNum].data;
            console.log(post.title);
            return post;
        });
    }
}

$(document).ready(function(){
    splash.onReady();
    getHeadlines();
});