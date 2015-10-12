$(function(){

    $('#startbutton').click(function(){
        $(this).fadeOut('slow');
        $("h1").fadeOut('slow');
        $("#headline").toggle(1000);
        $('#headline').html('<img src="https://media.giphy.com/media/IgQ8E05Dpg2ze/giphy.gif" class="center-block">');
        getPost();
    });

    var game = {
        score: 0,
        seenOnion: [],
        seenNotTheOnion: []
    };
    
    var post = {
        title: '',
        subreddit: ''
    }
    
    function generateRandom(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    function getPost(){
        var notTheOnion = "https://www.reddit.com/r/NotTheOnion/top/.json?sort=top&t=week";
        var theOnion = "https://www.reddit.com/r/theonion/top/.json?sort=top&t=year";
        var random = generateRandom(0,2);
        
        if(random == 0){
            $.getJSON(theOnion, function(json){
                var listing = $(json.data.children);
                var postNum = generateRandom(0,24);
                
                post.title = listing[postNum].data.title;
                post.subreddit = listing[postNum].data.subreddit;
                
                generateHeadline(post.title);
            });
        }
        else{
            $.getJSON(notTheOnion, function(json){
                var listing = $(json.data.children);
                var postNum = generateRandom(0,24);
                
                post.title = listing[postNum].data.title;
                post.subreddit = listing[postNum].data.subreddit;
                
                generateHeadline(post.title);
            });
        }
    }   
    
    function generateHeadline(post){
        var title = post;
        
        $('#headline').html('<h1>'+title+'<h2>');
        $('#onionbutton').fadeIn(1000);
        $('#notbutton').fadeIn(1000);
    }
    
    function showLink(answer){
        
        if (answer){
            
        }
        else{
            
        }
    }
    
    $('#onionbutton').click(function(){
        console.log(post.subreddit); 
        $('#notbutton').prop("disabled",true);
        $('#onionbutton').prop("disabled",true);
        
        $('#onionbutton').fadeOut();
        $('#notbutton').fadeOut();
        
        $('#notbutton').prop("disabled",false);
        $('#onionbutton').prop("disabled",false);
        
        if(post.subreddit == "TheOnion"){
            game.score++;
            console.log("Correct, current score: " + game.score);
            showLink(true);
        }
        else{
            console.log("Incorrect, current score: " + game.score);
            showLink(false);
        }
    });
    
    $('#notbutton').click(function() {
        console.log(post.subreddit);
        $('#notbutton').prop("disabled",true);
        $('#onionbutton').prop("disabled",true);
        
        $('#onionbutton').fadeOut(1000);
        $('#notbutton').fadeOut(1000);
        
        $('#notbutton').prop("disabled",false);
        $('#onionbutton').prop("disabled",false);
        
        if(post.subreddit == "TheOnion"){
            console.log("Incorrect, current score: " + game.score);
            showLink(false);
        }
        else{
            game.score++;
            console.log("Correct, current score: " + game.score);
            showLink(true);
        }
    });

});
