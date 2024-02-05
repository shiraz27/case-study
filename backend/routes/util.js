var num = 0;
var users = {};

module.exports = {
    getNextUserId: function() {
        return num++;
    },
    addUser: function(user, token) {
        users[token] = user;
    },
    checkAuthHeader: function(req) {
        var h = req.header('Authorization')?.split(' ');
        if (!h || h.length != 2 || h[0] !== 'Bearer') {
            return undefined;
        }

        return users[h[1]];
    }
}