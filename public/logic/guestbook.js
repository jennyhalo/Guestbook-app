$(function(){
$.getJSON( "data.json", function(data) {
    var message_data = '';
    $.each(data, function(key, value){
        message_data += '<tr>';
        message_data += '<td>'+value.username+'</td>';
        message_data += '<td>'+value.country+'</td>';
        message_data += '<td>'+value.message+'</td>';
        message_data += '</tr>';
    });
    $('#table_body').append(message_data);
   });
});