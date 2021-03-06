var TAP = ('ontouchend' in window) ? 'touchend' : 'click';
var item = '<li>{{ name }}</li>';
document.addEventListener('DOMContentLoaded', function () {
    x$('#friendSubmit').on(TAP, function () {
        var filter = x$('#friendName')[0].value;
        if (!filter) {
            // 沒有聯絡資訊
            return;
        } else {
            findContactByName(filter, function (contacts) {
                var i = 0, contactItem, data;
                for (i; i<contacts.length; i++) {
                    data = { name: contacts[i].name.formatted }
                    contactItem = Mustache.to_html(item, data);
                    x$('#friendsList').bottom(contactItem);
                    x$('#friendsList').bottom(contacts[i].name);
                }
            });
        }
    });
});

function findContactByName(name, callback) {
    function onError() {
        alert('Error: unable to read contacts');
    };
    var fields = ["displayName", "name"],
        options = new ContactFindOptions();
    options.filter = name;
    options.multiple = true;
    // 找到聯絡資訊
    navigator.service.contacts.find(fields, callback, onError, options);
}

