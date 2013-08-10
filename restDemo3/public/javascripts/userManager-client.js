function onDelete(id) {
  sel = '#id_' + id;
  userId = $(sel).find('td:eq(0)').text();

  $.ajax({url:'/users/' + userId,type:'DELETE'}).done(function() {
    window.location.href = "/";
  });
}

function onUpdate(id) {
  sel = '#id_' + id;
  user = {};
  user._id = $(sel).find('td:eq(0)').text();
  user.name = $(sel).find('td:eq(1) input').val();
  user.city = $(sel).find('td:eq(2) input').val();
  user.state = $(sel).find('td:eq(3) input').val();

  request = $.ajax({url:'/users/' + user._id,type:'POST', data:user});

  request.done(function() {
    alert('user updated');
    window.location.href = "/";
  });

  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}

function onAdd() {
  user = {};
  user.name = $('#txtName').val();
  user.city = $('#txtCity').val();
  user.state = $('#txtState').val();

  request = $.ajax({url:'/users', type:'POST', data:user});

  request.done(function(msg) {
    window.location.href = "/";
  });
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}
