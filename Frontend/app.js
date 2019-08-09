document.getElementById('modalButton').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
});

let editing = false;

(function($){
    function processForm( e ){
        var endpoint = "https://localhost:44366/api/Movies";
        var dict = {
            Title : this["title"].value,
            Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: endpoint,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
                // $("#tableBody").empty();
                // document.getElementById('create-title').value = '';
                // document.getElementById('create-genre').value = '';
                // document.getElementById('create-director').value = '';
                // getData();
                location.reload();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);

function getData(){
    var endpoint = "https://localhost:44366/api/Movies";

    $.ajax({
        url: endpoint,
        dataType: 'json',
        type: 'get',
        success: appendDataToTable
    });
};

(function(){
    var endpoint = "https://localhost:44366/api/Movies";

    $.ajax({
        url: endpoint,
        dataType: 'json',
        type: 'get',
        success: appendDataToTable
    });
})();

function appendDataToTable(data){
    $.each(data, function(i, d) {
        var editButton = `<button id="button-${i}">Edit</button>`; //This adds the movie index to an id in the button, so as to make each button unique
        var deleteButton = `<button id="deleteButton-${i}">Delete</button>`;
        var row='<tr class="editRow">';
        row+='<td>'+d.Title+'</td>'+'<td>'+d.Genre+'</td>'+'<td>'+d.Director+'</td>'+'<td>'+editButton+'</td>'+'<td>'+deleteButton+'</td>';
        row+='</tr>';
        $('#tableBody').append(row);
        $('#button-'+i).on("click", function() {
            getById(d.MovieId);
          })
          $('#deleteButton-'+i).on("click", function() {
            confirmDelete(d.MovieId);
          })
        // document.getElementById('edit-submit').addEventListener('click', function() {
        //     document.querySelector('.bg-modal').style.display = 'flex';
        // });

        // document.querySelector('.close').addEventListener('click', function(){
        //     document.querySelector('.bg-modal').style.display = 'none';
        // });
     });
}

function getById(id){
    if(editing === false){
        var endpoint = "https://localhost:44366/api/Movies";
        var foundEndpoint = endpoint+"/"+id;
    
        $.ajax({
        url: foundEndpoint,
        dataType: 'json',
        type: 'get',
        success: function(result){
            editing = true;
            var title = document.getElementById("edit-title");
            var genre = document.getElementById("edit-genre");
            var director = document.getElementById("edit-director");
            title.value = result.Title;
            genre.value = result.Genre;
            director.value = result.Director;
            $('#edit-form').on("submit", function(e) {
                putMethod(id, this); 
                e.preventDefault();
              })
        }
    });
    }
    else{
        return alert('TESTING')
    }

}

function confirmDelete(id){
    if (confirm('Are you sure you want to delete this movie?')) {
        deleteMovie(id);
    } else {
        location.reload();
    }
}

function deleteMovie(id){
    var endpoint = "https://localhost:44366/api/Movies";
    var foundEndpoint = endpoint+"/"+id;

    $.ajax({
    url: foundEndpoint,
    dataType: 'json',
    type: 'delete',
    success: function(result){
        location.reload();
    }
});

function putMethod(id, form){
    var endpoint = "https://localhost:44366/api/Movies";
    var foundEndpoint = endpoint+"/"+id;
    var dict = {
        MovieId: id,
        Title : form["edits-title"].value,
        Genre : form["edits-genre"].value,
        Director: form["edits-director"].value
    };

    $.ajax({
        url: foundEndpoint,
        type: "put",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(dict),
        success: function(data) {
            // $("#tableBody").empty();
            // document.getElementById('edit-title').value = '';
            // document.getElementById('edit-genre').value = '';
            // document.getElementById('edit-director').value = '';
            // id = null;
            // getData();
            editing = true;
            location.reload();
        }
      });
}}