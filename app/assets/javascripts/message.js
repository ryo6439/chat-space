$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
           `<div class="main-bar__center__box">
              <div class="upper-message">
                <div class="main-bar__center__box__name">
                  ${message.user_name}
                </div>
                <div class="main-bar__center__box__tweet">
                  ${message.created_at}
                </div>
              </div>
              <div class="lower-message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
                <img src=${message.image} >
            </div>`
        return html;
      } else {
      var html =
        `<div class="main-bar__center__box">
            <div class="upper-message">
                <div class="main-bar__center__box__name">
                  ${message.user_name}
                </div>
                <div class="main-bar__center__box__tweet">
                  ${message.created_at}
                </div>
              </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }  
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-bar__center').append(html);      
      $('.main-bar__center').animate({scrollTop: $('.main-bar__center')[0].scrollHeight}, 'fast'); 
      $('input').prop('disabled', false);
      $('form')[0].reset(); 
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
    return false;
  });
})