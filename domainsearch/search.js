$(function(){

    $('#searchform').on('submit', function(event){
        event.preventDefault();
        console.log("submitted");
        
        //loading gif
        $('#results').html('<img src="https://media.giphy.com/media/IgQ8E05Dpg2ze/giphy.gif" class="center-block">')
        
        var domain = $('#searchinput').val();
        //console.log(domain + " was submitted");
        
        //empty search box
        if(domain == ''){
            $('#results').html('<div class="container text-center"><h2>No results found!</h2></div>');
            return;
        }
        var searchDomain = domain.replace(/\//g, '');
        var redditUrl = "https://www.reddit.com/domain/" + searchDomain + "/top/.json?sort=top&t=all";
        var htmlItems = '';
        //console.log("json url: " + redditUrl);
        
        $.getJSON(redditUrl, function(json){
            var listing = $(json.data.children);
            var l=listing.length;
            console.log(l);
            
            if(listing.length == 0){
                 $('#results').html('<div class="container text-center"><h2>No results found!</h2></div>');
                return;
            }
            
            //loop through json objects
            $.each(listing, function(i, data){
                var post = listing[i].data;
                htmlItems += generateList(post);
            }); //end listing loop
            
            $('#results').html(htmlItems)
            
        }); //end json
    }); //end event listener


    //write html list of items
    function generateList(post) {
        var htmlList= '';
        var title = post.title;
        var thumbnail = post.thumbnail;
        var linkUrl = post.url;
        var author = post.author;
        var subreddit = post.subreddit;
        var created = post.created_utc;
        
        var permalink = "https://www.reddit.com/"+post.permalink;
        var authorUrl = "https://www.reddit.com/user/"+author;
        var subredditUrl = "https://www.reddit.com/r/"+subreddit;
        
        thumbnail = thumbnail.replace('http:' , 'https:');
        
        if(post.thumbnail == '' || post.thumbnail == 'default'){
            thumbnail = 'https://a.thumbs.redditmedia.com/PDQadCzYX_x1bU3KrYuhTptu6eDdOVVagFG6q_Afyb4.jpg';
        }
        if(post.thumbnail == 'nsfw'){
            thumbnail = 'https://i.imgur.com/UHzw6.png';
        }
        
        htmlList += '<li class="row list-group-item">\n';
        htmlList += '<div class="col-xs-5 col-sm-3 col-md-2">\n';
        htmlList += '<div class="thumbnail center-block"><img src="'+ thumbnail +'"></div>\n';
        htmlList += '</div>\n';
        htmlList += '<div class="col-xs-7 col-sm-9 col-md-10">\n';
        htmlList += '<h2><a href="'+linkUrl+'" target="_blank">'+title+'</a></h2>';
        htmlList += '<p>submitted by <a href="'+authorUrl+'" target="_blank">/u/'+author+'</a>';
        htmlList += ' to <a href="'+subredditUrl+'" target="_blank">/r/'+subreddit+'</a></p>\n';
        htmlList += '<p><a href="'+permalink+'" target="_blank">view comments on reddit</a></p>';
        htmlList += '</div>';
        htmlList += '</li>'
        console.log(htmlList);
        
        return htmlList;
    }
    
});