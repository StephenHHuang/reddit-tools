$(function(){
    $('#searchform').on('submit', function(event){
        event.preventDefault();
        
        var domain = $('#searchinput').val();
        console.log(domain + " was submitted");
        var searchDomain = domain.replace(/\//g, '');
        console.log(searchDomain);
        var redditUrl = "https://www.reddit.com/domain/" + searchDomain + "/top/.json";
        
        $.getJSON(redditUrl, function(json){
            var listing = $(json.data.children);
            
            //loop through json objects
            $.each(listing, function(i, data){
                var post = listing[i].data;
                
                var title = post.title;
                var score = post.score;
                var subreddit = post.subreddit;
                var linkUrl = post.url;
                var thumbnail = post.thumbnail;
                var created = post.created;
                
            });
            
            
        });
    });
})