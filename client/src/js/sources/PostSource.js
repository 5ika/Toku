const api = require('../../../package.json').config.api;
const put = (url, data, success) => $.ajax({type: 'PUT', dataType: 'json', success, url, data});
const PostSource = {
    fetch: () => {
        return new Promise(function (resolve, reject) {
            $.get(api + "/last/20", resolve).fail(reject);
        });
    },
    add: (formData) => {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: api,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: resolve,
                error: reject
            })
        });
    },
    remove: (id, password) => {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: api + '/' + id,
                data: {
                    password
                },
                type: 'DELETE',
                success: resolve,
                error: reject
            });
        });
    },
    like: (id) => {
        return new Promise(function (resolve, reject) {
            put(api + '/up/' + id, null, resolve).fail(reject);
        });
    }
}

module.exports = PostSource;
