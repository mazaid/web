function User() {
    this._user = null;
    this._authToken = null;
};

User.prototype.isAuth = function () {
    return (this._user) ? true : false;
};

User.prototype.getId = function () {
    return this._user.id;
};

User.prototype.setAuthToken = function (token) {
    this._authToken = token;
};

User.prototype.getAuthToken = function () {
    return (this._authToken.token) ? this._authToken.token : null;
};

User.prototype.setUser = function (user) {
    this._user = user;
};

User.prototype.getUser = function () {
    return this._user;
};

module.exports = User;
