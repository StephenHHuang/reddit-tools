$(function(){

    $('#searchform').on('submit', function(event){
        event.preventDefault();
        console.log("submitted");
        
        var domain = $('#searchinput').val();
        //console.log(domain + " was submitted");
        var searchDomain = domain.replace(/\//g, '');
        var redditUrl = "https://www.reddit.com/domain/" + searchDomain + "/top/.json";
        var htmlItems = '';
        //console.log("json url: " + redditUrl);
        
        $.getJSON(redditUrl, function(json){
            var listing = $(json.data.children);
            
            //loop through json objects
            $.each(listing, function(i, data){
                var post = listing[i].data;
                
                htmlItems += generateList(post);
                //console.log(htmlItems);
                
            }); //end listing loop
            
            $('#results').html(htmlItems)
            //console.log(htmlList);
            
        }); //end json
    }); //end event listener


    //write html list of items
    function generateList(post) {
        var htmlList= '';
        var title = post.title;
        var score = post.score;
        var subreddit = post.subreddit;
        var linkUrl = post.url;
        var thumbnail = post.thumbnail;
        var created = post.created_utc;
        var author = post.author;
        var authorUrl = "reddit.com/user/"+author;
        
        thumbnail = thumbnail.replace('http:' , 'https:');
        
        console.log("thumbnail url: " + thumbnail);
        
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
        htmlList += '<h2>'+title+'</h2>';
        htmlList += '<p1>submitted by <a href="'+authorUrl+'">'+author+'</a> to /r/'+subreddit+'</p1>';
        htmlList += '</div>';
        htmlList += '</li>'
        //console.log(htmlList);
        
        return htmlList;
    }
    
});