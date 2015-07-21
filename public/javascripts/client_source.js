
$(document).ready(function () {

    var tmInput = null;
    var server = null;

    /**
     * Init & connect websockets
     */
    //var socket = io.connect('http://sod.spsy.eu:3000');
    console.debug(window.location.host);
    var socket = io.connect(window.location.host);
    socket.on('event', function(event) {
        console.debug(event);
    });

    /**
     * Draw template
     * @param res
     * @param t
     * @returns {*}
     */
    function tplawesome(res, t) {
        for(var n = 0; n < t.length; n++) {
            res = res.replace(/\{\{(.*?)\}\}/g, function(x, ix) {
                return t[n][ix];
            });
        }
        return res;
    }

    /**
     * Search Youtube for a specified string
     * @param keyword
     */
    function search(keyword) {
        var search_string = keyword.replace(/%20/g, '+');
        console.log('Search for phrase: ' + search_string);
        gapi.client.setApiKey("AIzaSyDUi0ACtLSVZtoUTqLalt1xeUpHKx1F-HU");
        gapi.client.load('youtube', "v3", function() {
            var request = gapi.client.youtube.search.list({
                part: 'snippet',
                type: 'video',
                q: encodeURIComponent(search_string),
                maxResults: 10,
                order: 'viewCount'
            });

            request.execute(function (response) {
                $('#search-info-container').html('Currently showed ' + response.pageInfo.resultsPerPage + ' / ' + response.pageInfo.totalResults + " items");
                var html = '';
                $.each(response.items, function(index, item) {
                    html += tplawesome($('#tplresult').html(), [{
                            "title": item.snippet.title,
                            "videoId" : item.id.videoId
                    }])
                });
                $('#search-container').html(html);

                $('button').on('click', function(e) {
                    socket.emit('event', { state: 'incoming_media', media_id: $(e.target).attr('data-id')});
                    console.log('media_query sended to server');
                    e.preventDefault();
                });
            });
        });
    }

    $('input#media_id').keypress(function(e) {
        if(tmInput) {
            clearTimeout(tmInput);
            $('#search-info-container').html('Break typing for search');
        }

        tmInput = setTimeout(function() {
            tmInput = null;
            search($(e.target).val());
            $('#search-info-container').html('Searching...');
        }, 2000);
    });

    /*
    TODO: how to get media informations
    http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=VfdfGgdyB9E&format=json
    */

});
