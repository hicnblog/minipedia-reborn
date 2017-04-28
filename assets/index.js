(function($){
    $(document).ready(function(){
        var _apiUrl = "http://id.wikipedia.org/w/api.php?";
        var _aEQ = "action=query&prop=extracts&exintro&indexpageids=true&format=json";
        $(".progress").hide();
        $("#content").html("<h3>Menampilkan ringkasan konten dari wikipedia. Konsep dari <a href='https://meta.wikimedia.org/wiki/Concise_Wikipedia' target='_blank'>Concise Wikipedia.</a></h3>");

        function preload(){
            $("#content").html("");
            $("#content").html('<div class="progress"><div class="indeterminate"></div></div>');
            $(".progress").show();
        }

        function on_search(val_s){
            preload();
            setTimeout(function(){
                a_j_x( _aEQ + "&generator=search&gsrlimit=1&gsrsearch=" + val_s );
            },1500);
        }

        function on_random(){
            preload();
            setTimeout(function(){
                a_j_x( _aEQ + "&generator=random&grnnamespace=0" );
            },1500);
            
        }
        function a_j_x(qs){
            $.ajax({
                url : _apiUrl + qs,
                data : {
                    format : "json"
                },
                dataType : "jsonp",
                success: function(os){
                    if(typeof os.query !== "undefined" ){
                        var _idWikiContent = os.query.pageids[0];
                        var _wikiContent = os.query.pages[_idWikiContent];
                        _wikiContent.url = "http://id.wikipedia.org/wiki/" + encodeURIComponent(_wikiContent.title);
                        _wikiContent.link = "<a href='" + _wikiContent.url + "'>" + _wikiContent.title + "</a>";
                        var _editUrl = "<a href='" + _wikiContent.url + "?action=edit&section=0' class='edit-link'>edit</a>";
                        $(".progress").hide();
                        $("#content").html("<h2>" + _wikiContent.link + "&nbsp;&nbsp;|&nbsp;&nbsp;" +_editUrl + "</h2>");
                        $("#content").append( _wikiContent.extract );
                        $("input#cari").val("");
                    } else {
                        $(".progress").hide();
                        $("#content").html("<h2 class='error'>Data tidak ditemukan.</h2>");
                        $("input#cari").val("");
                    }
                    
                }
            })
        }

        $("button#search").click(function(){
            var c_cri = $("input#cari").val();
            if(c_cri){
                on_search(c_cri);
            } else {
                on_random();
            }
            
        });

        $("button#random").click(function(){
            on_random();
            $("input#cari").val("");
        });
    });
})(jQuery)