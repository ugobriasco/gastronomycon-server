"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var subject_1 = require("rxjs/subject");
var UserService = (function () {
    /**
     * http handling
     */
    function UserService(http) {
        this.http = http;
        this.usersUrl = 'http://localhost:3000/api/user';
        /**
         * EVENT EMITTER SERVICE any component can emmit/listen events
         * Generally in a separated file
         */
        //observable source
        this.userCreatedSource = new subject_1.Subject();
        this.userDeletedSource = new subject_1.Subject();
        //observable stream
        this.userCreated$ = this.userCreatedSource.asObservable();
        this.userDeleted$ = this.userDeletedSource.asObservable();
    }
    //add to the stream the info that the user was created
    UserService.prototype.userCreated = function (user) {
        this.userCreatedSource.next(user); //pass into the subject
    };
    //add to the stream the info that the user was deleted
    UserService.prototype.userDeleted = function () {
        this.userDeletedSource.next();
    };
    //GET all users
    UserService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.usersUrl)
            .map(function (res) { return res.json().data; })
            .map(function (users) { return users.map(_this.toUser); }) //remaps users to our format
            .catch(this.handleError);
    };
    //GET single user
    UserService.prototype.getUser = function (id) {
        //attaching a token
        var headers = new http_1.Headers();
        var token = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + token);
        return this.http.get(this.usersUrl + "/" + id, { headers: headers }) //usage of ES6 template-string backticks
            .map(function (res) { return res.json().data; })
            .map(this.toUser) //in this cas we have a single user, so we dont need to map them
            .catch(this.handleError);
    };
    //PUT  update a user
    UserService.prototype.updateUser = function (user) {
        return this.http.put(this.usersUrl + "/" + id, user)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //DELETE a user
    UserService.prototype.deleteUser = function (id) {
        var _this = this;
        return this.http.delete(this.usersUrl + "/" + id)
            .do(function (res) { return _this.userDeleted(); })
            .catch(this.handleError);
    };
    //Convert user info from API to our standard format
    UserService.prototype.toUser = function (user) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        };
    };
    //Error handling from API
    UserService.prototype.handleError = function (err) {
        //super duper error handling
        var errMessage;
        if (err instanceof http_1.Response) {
            var body = err.json() || ''; //Uncaught SyntaxError: Unexpected token C in JSON at position 0
            var error = body.error || JSON.stringify(body);
            errMessage = err.status + " - " + (err.statusText || '') + " " + error;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable_1.Observable.throw(errMessage);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map