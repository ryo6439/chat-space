 $(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="main-bar__center__box" data-message-id= message.id >
        <div class="upper-message">
          <div class="main-bar__center__box__name">
            message.user_name 
          </div>
          <div class="main-bar__center__box__tweet">
            message.created_at 
          </div>
        </div> 
        <div class="lower-message"> 
          <p class="lower-message__content">
            message.content 
          </p>
          <img src="` + message.image + `" class="lower-message__image" >
        </div>
      </div>`
    } else if (message.content) {
      var html = `<div class="main-bar__center__box" data-message-id= message.id >
        <div class="upper-message">
          <div class="main-bar__center__box__name">
            message.user_name 
          </div>
          <div class="main-bar__center__box__tweet">
            message.created_at 
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            message.content 
          </p>
        </div> 
      </div>`
    } else if (message.image) {
      var html = `<div class="main-bar__center__box" data-message-id= message.id >
        <div class="upper-message">
          <div class="main-bar__center__box__name">
            message.user_name 
          </div>
          <div class="main-bar__center__box__tweet">
            message.created_at 
          </div>
        </div>
        <div class="lower-message">
          <img src="` + message.image + `" class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
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
      $('.main-bar__center').animate({ scrollTop: $('.main-bar__center')[0].scrollHeight});
      $('.submit-btn').prop('disabled, false');
      $('form')[0].reset();
    })

    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });
  var reloadMessages = function() {
    var last_message_id = $('.main-bar__center__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-bar__center').append(insertHTML);
      $('.main-bar__center').animate({ scrollTop: $('.main-bar__center')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

