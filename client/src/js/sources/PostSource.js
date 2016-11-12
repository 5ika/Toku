const api = "http://cumulus:7042";
const put = (url, data, success) => $.ajax({type: 'PUT', dataType: 'json', success, url, data});
const PostSource = {
    fetch: () => {
        return new Promise(function (resolve, reject) {
            $.get(api + "/last/20", resolve).fail(reject);
        });
    },
    add: (post) => {
        return new Promise(function (resolve, reject) {
            $.post(api, post, resolve).fail(reject);
        });
    },
    like: (id) => {
        return new Promise(function (resolve, reject) {
            put(api + '/up/' + id, null, resolve).fail(reject);
        });
    }
}

module.exports = PostSource;
