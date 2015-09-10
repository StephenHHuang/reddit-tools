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
            
            $.each(listing, function(){
                var obj = $(listing.data);
                console.log(obj.title);
            });
        });
    });
})