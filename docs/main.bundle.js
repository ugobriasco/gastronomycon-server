webpackJsonp([0,3],{

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AuthService = (function () {
    function AuthService(http, config) {
        this.http = http;
        this.config = config;
        this.authUrl = '';
        this.loggedIn = false;
        this.userID = '';
        this.authUrl = config.apiEndpoint;
        this.loggedIn = !!localStorage.getItem('auth_token');
        this.userID = localStorage.getItem('userID');
    }
    AuthService.prototype.connectivityCheck = function () { return this.authUrl; };
    AuthService.prototype.isLoggedIn = function () { return this.loggedIn; };
    AuthService.prototype.getUserID = function () { return this.userID; };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(this.authUrl + "/login", { email: email, password: password })
            .map(function (res) { return res.json(); })
            .do(function (res) {
            if (res.token) {
                _this.setToken(res.token);
            }
            if (res.user._id) {
                _this.setUserID(res.user._id);
            }
        })
            .catch(this.handleError);
    };
    AuthService.prototype.signup = function (email, password, signupCode) {
        var _this = this;
        return this.http.post(this.authUrl + "/signup", { email: email, password: password, signupCode: signupCode })
            .map(function (res) { return res.json(); })
            .do(function (res) {
            if (res.token) {
                _this.setToken(res.token);
            }
            if (res.user._id) {
                _this.setUserID(res.user._id);
            }
        })
            .catch(this.handleError);
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('userID');
        this.loggedIn = false;
    };
    AuthService.prototype.setToken = function (token) {
        localStorage.setItem('auth_token', token);
        this.loggedIn = true;
    };
    AuthService.prototype.setUserID = function (userID) {
        localStorage.setItem('userID', userID);
        this.loggedIn = true;
    };
    AuthService.prototype.handleError = function (err) {
        var errMessage;
        if (err instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Response */]) {
            var body = err.json() || '';
            var error = body.error || JSON.stringify(body);
            errMessage = err.status + " - " + (err.statusText || '') + " " + error;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMessage);
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["IAppConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_config__["IAppConfig"]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/auth.service.js.map

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var UserService = (function () {
    function UserService(http, config) {
        this.http = http;
        this.config = config;
        this.userUrl = '';
        this.userUrl = config.apiEndpoint + 'user';
    }
    UserService.prototype.getUser = function () {
        var myId = this.token2user();
        var headers = this.setHeaders();
        return this.http.get(this.userUrl + "/" + myId, { headers: headers }) //usage of ES6 template-string backticks
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.getUserFromId = function (id) {
        var myId = this.token2user();
        var headers = this.setHeaders();
        return this.http.get(this.userUrl + "/" + id)
            .map(function (res) { return res.json; })
            .catch(this.handleError);
    };
    UserService.prototype.getAllUsers = function () {
        var headers = this.setHeaders();
        return this.http.get(this.userUrl, { headers: headers })
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.updateCurrentUser = function (user) {
        var headers = this.setHeaders();
        var myId = localStorage.getItem('userID');
        return this.http.put(this.userUrl + "/" + myId, user, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updateUser = function (user) {
        var headers = this.setHeaders();
        return this.http.put(this.userUrl + "/" + user._id, user, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.deleteUser = function (user) {
        var headers = this.setHeaders();
        return this.http.delete(this.userUrl + "/" + user._id, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.setHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        var token = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', "Bearer " + token);
        //headers.append('x-access-token', token)
        return headers;
    };
    UserService.prototype.token2user = function () {
        return localStorage.getItem('userID');
    };
    //Error handling from API
    UserService.prototype.handleError = function (err) {
        //super duper error handling
        var errMessage;
        if (err instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Response */]) {
            var body = err.json() || ''; //Uncaught SyntaxError: Unexpected token C in JSON at position 0
            var error = body.error || JSON.stringify(body);
            errMessage = err.status + " - " + (err.statusText || '') + " " + error;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMessage);
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["IAppConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_config__["IAppConfig"]) === "function" && _b || Object])
], UserService);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/user.service.js.map

/***/ },

/***/ 155:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AdminService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AdminService = (function () {
    function AdminService(http, config) {
        this.http = http;
        this.config = config;
        this.settingsUrl = '';
        this.settingsUrl = config.apiEndpoint + 'settings';
    }
    AdminService.prototype.setSignupCode = function (setting) {
        var headers = this.setHeaders();
        //let setting = {'enabled': enabled, 'value': value};
        console.log(setting);
        return this.http.put(this.settingsUrl + "/signupCode", setting, { headers: headers })
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    AdminService.prototype.getSignupCode = function () {
        var headers = this.setHeaders();
        return this.http.get(this.settingsUrl + "/signupCode", { headers: headers })
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    AdminService.prototype.setHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        var token = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', "Bearer " + token);
        //headers.append('x-access-token', token)
        return headers;
    };
    AdminService.prototype.handleError = function (err) {
        //super duper error handling
        var errMessage;
        if (err instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Response */]) {
            var body = err.json() || ''; //Uncaught SyntaxError: Unexpected token C in JSON at position 0
            var error = body.error || JSON.stringify(body);
            errMessage = err.status + " - " + (err.statusText || '') + " " + error;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMessage);
    };
    return AdminService;
}());
AdminService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["IAppConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_config__["IAppConfig"]) === "function" && _b || Object])
], AdminService);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/admin.service.js.map

/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_user_service__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_admin_service__ = __webpack_require__(155);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminComponent = (function () {
    function AdminComponent(userService, adminService) {
        this.userService = userService;
        this.adminService = adminService;
        this.users = [];
        this.signupCode = { 'name': 'aa', 'value': 'aa', 'enabled': true };
        this.errorMessage = '';
        this.successMessage = '';
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getSignupCode().subscribe(function (http_setting) { return _this.signupCode = http_setting; });
    };
    AdminComponent.prototype.setSignupCode = function () {
        console.log(this.signupCode);
        var setting = {
            "value": this.signupCode.value,
            "enabled": this.signupCode.enabled
        };
        this.adminService.setSignupCode(setting)
            .subscribe(function (signupCode) { console.log(signupCode); }, function (err) { console.log(err); });
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-admin',
        template: __webpack_require__(685),
        styles: [__webpack_require__(678)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_admin_service__["a" /* AdminService */]) === "function" && _b || Object])
], AdminComponent);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/admin.component.js.map

/***/ },

/***/ 334:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () { };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(686),
        styles: [__webpack_require__(679)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.component.js.map

/***/ },

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__ = __webpack_require__(108);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(service, router) {
        this.service = service;
        this.router = router;
        this.credentials = { email: '', password: '' };
        this.errorMessage = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.service.login(this.credentials.email, this.credentials.password)
            .subscribe(function (data) { _this.router.navigate(['items']); console.log(data); }, function (err) { _this.errorMessage = err; console.log(err); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-login',
        template: "\n  \t<div class=\"container\">\n\t  \t<div class=\"row\">\n\t  \t\t<div class=\"col-md-6 col-md-offset-3\">\n\t  \t\t\t<form (ngSubmit) =\"login()\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t \t<label>Email</label>\n\t\t\t\t\t \t<input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)] = \"credentials.email\"/>\n\t\t\t\t \t</div>\n\t\t\t\t \t<div class=\"form-group\">\n\t\t\t\t\t \t<label>Password</label>\n\t\t\t\t\t \t<input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)] = \"credentials.password\"/>\n\t\t\t\t \t</div>\n\n\t\t\t\t \t<!--messages-->\n\t\t\t\t\t<div class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</div>\n\n\t\t\t\t \t<div>\n\t\t\t\t \t\t<button type=\"submit\"class=\"btn btn-primary\">Login</button>\n\t\t\t\t \t</div>\n\t\t\t\t</form>\n\t  \t\t</div>\n\t  \t</div>\n\t</div>\n\n\n  ",
        styles: ["\n\n  \t.container{\n  \t\tmargin-top: 10%;\n  \t\t\n  \t}\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/login.component.js.map

/***/ },

/***/ 336:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_admin_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_validation_service__ = __webpack_require__(341);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SignupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupComponent = (function () {
    function SignupComponent(router, authService, adminService, valService) {
        this.router = router;
        this.authService = authService;
        this.adminService = adminService;
        this.valService = valService;
        this.credentials = { email: '', psw1: '', psw2: '', signupCode: '' };
        this.errorMessage = '';
        this.code = { 'name': '', 'value': '', 'enabled': true };
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getSignupCode().subscribe(function (http_setting) { return _this.code = http_setting; });
    };
    SignupComponent.prototype.signup = function () {
        var _this = this;
        if (this.valService.emailValidator(this.credentials.email) == false)
            return this.errorMessage = "The email is not valid";
        if (this.credentials.psw1 == "")
            return this.errorMessage = "Please enter a password";
        if (this.credentials.psw1 != this.credentials.psw2)
            return this.errorMessage = "The passwords are not matching";
        this.authService.signup(this.credentials.email, this.credentials.psw1, this.credentials.signupCode)
            .subscribe(function (data) { _this.router.navigate(['']); console.log(data); }, function (err) { _this.errorMessage = err; console.log(err); _this.clearMessages(); });
    };
    SignupComponent.prototype.clearMessages = function () {
        var _this = this;
        setTimeout(function () {
            _this.errorMessage = '';
        }, 3000);
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-signup',
        template: "\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-6 col-md-offset-3\">\n\t\t\t\t<form (ngSubmit) =\"signup()\">\n\n\t\t\t\t\t<h1>Join Us!</h1>\n\n\t\t\t\t\t <div class=\"form-group\">\n\t\t\t\t\t \t\n\t\t\t\t\t \t<input type=\"text\" class=\"form-control\" name=\"email\" placeholder=\"Email\"[(ngModel)] = \"credentials.email\"/>\n\t\t\t\t \t</div>\n\t\t\t\t \t<div class=\"form-group\">\n\t\t\t\t\t \t\n\t\t\t\t\t \t<input type=\"password\" class=\"form-control\" placeholder=\"Super secret password\" name=\"psw1\" [(ngModel)] = \"credentials.psw1\"/>\n\t\t\t\t \t</div>\n           <div class=\"form-group\" *ngIf =\"credentials.psw1\">\n             \n             <input type=\"password\" class=\"form-control\" placeholder=\"Repeat password\" name=\"psw2\" [(ngModel)] = \"credentials.psw2\"/>\n           </div>\n\n\t\t\t\t \t<div class=\"form-group\" *ngIf=\"code.enabled\">\n\t\t\t\t\t \t<label>Signup Code</label>\n\t\t\t\t\t \t<input type=\"text\" class=\"form-control\" name=\"signupCode\" [(ngModel)] = \"credentials.signupCode\"/>\n\t\t\t\t \t</div>\n\n\n\t\t\t\t \t<!--messages-->\n\t\t\t\t\t<div class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</div>\n\n\t\t\t\t \t<div>\n\t\t\t\t \t\t<button type=\"submit\"class=\"btn btn-primary\">Signup</button>\n\t\t\t\t \t</div>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t</div>\n\n  ",
        styles: ["\n\t.container{\n  \t\tmargin-top: 5%;\n  \t\t\n  \t}\n\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_admin_service__["a" /* AdminService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_validation_service__["a" /* ValidationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_validation_service__["a" /* ValidationService */]) === "function" && _d || Object])
], SignupComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/signup.component.js.map

/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__items_service__ = __webpack_require__(338);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ItemsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ItemsComponent = (function () {
    function ItemsComponent(service) {
        this.service = service;
        this.items = [];
        this.$item = { id: '', data: {} };
        this.panelshow = 'DE';
        this.successMessage = '';
        this.errorMessage = '';
    }
    ItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getItems()
            .subscribe(function (http_items) { return _this.items = http_items; });
        this.$item.data =
            {
                pic: '',
                name: {
                    it: { main: '', spec: '' },
                    de: { main: '', spec: '' },
                    pl: { main: '', spec: '' },
                }
            };
    };
    ItemsComponent.prototype.selectId = function (id) {
        var _this = this;
        this.$item.id = id;
        this.service.getItem(id)
            .subscribe(function (http_item) { return _this.$item.data = http_item; });
        return this.$item;
    };
    ItemsComponent.prototype.updateItem = function () {
        var _this = this;
        this.service.updateItem(this.$item.data)
            .subscribe(function ($item) {
            _this.successMessage = 'Item updated';
            console.log('item updated');
            _this.service.getItems()
                .subscribe(function (http_items) { return _this.items = http_items; });
            jQuery("#editModal").modal("hide");
        }, function (err) {
            _this.errorMessage = err;
            console.log(err);
        });
    };
    ItemsComponent.prototype.addItem = function () {
        var _this = this;
        var item = {
            pic: '',
            name: {
                it: { main: '', spec: '' },
                de: { main: '', spec: '' },
                pl: { main: '', spec: '' },
            }
        };
        this.service.createItem(item)
            .subscribe(function ($item) {
            _this.successMessage = "Item added";
            console.log('item created');
            _this.service.getItems()
                .subscribe(function (http_items) { return _this.items = http_items; });
        }, function (err) {
            _this.errorMessage = err;
            console.log(err);
        });
    };
    ItemsComponent.prototype.deleteItem = function () {
        var _this = this;
        this.service.deleteItem(this.$item.data)
            .subscribe(function ($item) {
            console.log('item deleted');
            _this.successMessage = 'Item deleted';
            _this.service.getItems()
                .subscribe(function (http_items) { return _this.items = http_items; });
            jQuery("#deleteModal").modal("hide");
        }, function (err) { console.log(err); _this.errorMessage = err; });
    };
    ItemsComponent.prototype.setPanel = function (name) { return this.panelshow = name; };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-items',
        template: __webpack_require__(687),
        styles: [__webpack_require__(680)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__items_service__["a" /* ItemsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__items_service__["a" /* ItemsService */]) === "function" && _a || Object])
], ItemsComponent);

var _a;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/items.component.js.map

/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ItemsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ItemsService = (function () {
    function ItemsService(http, config) {
        this.http = http;
        this.config = config;
        this.itemsUrl = '';
        this.selectedItem = '';
        this.itemsUrl = config.apiEndpoint + 'item';
    }
    ItemsService.prototype.getItems = function () {
        return this.http.get(this.itemsUrl)
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    ItemsService.prototype.getItem = function (id) {
        return this.http.get(this.itemsUrl + "/" + id)
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    ItemsService.prototype.createItem = function (item) {
        var headers = this.setHeaders();
        return this.http.post("" + this.itemsUrl, item, { headers: headers })
            .map(function (res) { return res.json; })
            .catch(this.handleError);
    };
    ItemsService.prototype.updateItem = function (item) {
        var headers = this.setHeaders();
        return this.http.put(this.itemsUrl + "/" + item._id, item, { headers: headers })
            .map(function (res) { return res.json; })
            .catch(this.handleError);
    };
    ItemsService.prototype.deleteItem = function (item) {
        var headers = this.setHeaders();
        return this.http.delete(this.itemsUrl + "/" + item._id, { headers: headers })
            .map(function (res) { return res.json; })
            .catch(this.handleError);
    };
    ItemsService.prototype.setHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        var token = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', "Bearer " + token);
        //headers.append('x-access-token', token)
        return headers;
    };
    ItemsService.prototype.handleError = function (err) {
        //super duper error handling
        var errMessage;
        if (err instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Response */]) {
            var body = err.json() || ''; //Uncaught SyntaxError: Unexpected token C in JSON at position 0
            var error = body.error || JSON.stringify(body);
            errMessage = err.status + " - " + (err.statusText || '') + " " + error;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMessage);
    };
    return ItemsService;
}());
ItemsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["IAppConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_config__["IAppConfig"]) === "function" && _b || Object])
], ItemsService);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/items.service.js.map

/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LandingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LandingComponent = (function () {
    function LandingComponent() {
    }
    LandingComponent.prototype.ngOnInit = function () {
    };
    return LandingComponent;
}());
LandingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-landing',
        template: __webpack_require__(688),
        styles: [__webpack_require__(681)]
    }),
    __metadata("design:paramtypes", [])
], LandingComponent);

//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/landing.component.js.map

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ApiDocComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var ApiDocComponent = (function () {
    function ApiDocComponent(http, config) {
        var _this = this;
        this.http = http;
        this.config = config;
        //apiUrlo = '';
        this.apiDoc = [];
        this.route = [];
        this.$route = {};
        this.apiUrl = config.apiEndpoint;
        this.http.get(this.apiUrl)
            .subscribe(function (res) {
            _this.apiDoc = res.json().apiDoc.endpoints;
            //this.apiUrlo = res.json().apiDoc.apiUrl; 
            //console.log(this.apiUrl)
        });
    }
    ApiDocComponent.prototype.ngOnInit = function () {
        this.$route = this.route[0];
    };
    ApiDocComponent.prototype.selectRoute = function (route) {
        return this.$route = route;
    };
    /*
    STYLE classes avaiable:
  
    default
    muted
    primary
    success
    info
    warnindg
    danger
  
     */
    ApiDocComponent.prototype.getReqTypeColor = function (reqType) {
        if (reqType == "GET")
            return "label-primary";
        if (reqType == "POST")
            return "label-warning";
        if (reqType == "PUT")
            return "label-info";
        if (reqType == "DELETE")
            return "label-danger";
        else
            return "label-default";
    };
    ApiDocComponent.prototype.getResStatusColor = function (status) {
        if ([200, 201].indexOf(status) !== -1)
            return "text-success";
        if ([404, 400].indexOf(status) !== -1)
            return "text-danger";
        else
            return "text-muted";
    };
    return ApiDocComponent;
}());
ApiDocComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-api-doc',
        template: __webpack_require__(689),
        styles: [__webpack_require__(682)]
    }),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_config__["IAppConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_config__["IAppConfig"]) === "function" && _b || Object])
], ApiDocComponent);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/api-doc.component.js.map

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ValidationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.getValidationErrorMessage = function (name, value) {
        var config = {
            'required': 'Required',
            'invalidEmail': 'Invalid email address',
            'invalidPassword': 'Invalid password. It must be at least 6 character long, and contain a number.',
            'invalidCreditCard': 'Is invalid credit card number',
            'minLength': "Minimum length " + value.requiredLength
        };
        return config[name];
    };
    ValidationService.prototype.emailValidator = function (control) {
        //RFC 2822 compilant regex
        if (control.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return true;
        }
        else {
            return false;
        }
    };
    ValidationService.prototype.passwordValidator = function (control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return true;
        }
        else {
            return false;
        }
    };
    ValidationService.prototype.creditCardValidator = function (control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return true;
        }
        else {
            return false;
        }
    };
    return ValidationService;
}());
ValidationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ValidationService);

//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/validation.service.js.map

/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_user_service__ = __webpack_require__(109);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserComponent = (function () {
    function UserComponent(service) {
        this.service = service;
        this.successMessage = '';
        this.errorMessage = '';
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.init();
        this.service.getUser().subscribe(function (user) {
            _this.user = user;
        });
    };
    UserComponent.prototype.updateUser = function () {
        var _this = this;
        this.errorMessage = '';
        this.successMessage = '';
        this.service.updateCurrentUser(this.user)
            .subscribe(function (user) {
            _this.successMessage = 'Profile updated';
            _this.clearMessages();
            jQuery("#editModal").modal("hide");
        }, function (err) {
            _this.errorMessage = err;
            console.log(err);
            _this.clearMessages();
            jQuery("#editModal").modal("hide");
        });
    };
    UserComponent.prototype.init = function () {
        this.user = {
            email: '',
            role: '',
            password: '',
            profile: {
                name: '',
                avatar: '',
                cover: ''
            }
        };
    };
    UserComponent.prototype.clearMessages = function () {
        var _this = this;
        setTimeout(function () {
            _this.successMessage = '';
            _this.errorMessage = '';
        }, 3000);
    };
    return UserComponent;
}());
UserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-user',
        template: __webpack_require__(693),
        styles: [__webpack_require__(380)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_user_service__["a" /* UserService */]) === "function" && _a || Object])
], UserComponent);

var _a;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/user.component.js.map

/***/ },

/***/ 380:
/***/ function(module, exports) {

module.exports = "\n\n.card {\n    padding-top: 20px;\n    margin: 10px 0 20px 0;\n    background-color: rgba(214, 224, 226, 0.2);\n    border-top-width: 0;\n    border-bottom-width: 2px;\n    border-radius: 3px;\n    box-shadow: none;\n    box-sizing: border-box;\n}\n\n.card .card-heading {\n    padding: 0 20px;\n    margin: 0;\n}\n\n.card .card-heading.simple {\n    font-size: 20px;\n    font-weight: 300;\n    color: #777;\n    border-bottom: 1px solid #e5e5e5;\n}\n\n.card .card-heading.image img {\n    display: inline-block;\n    width: 46px;\n    height: 46px;\n    margin-right: 15px;\n    vertical-align: top;\n    border: 0;\n    border-radius: 50%;\n}\n\n.card .card-heading.image .card-heading-header {\n    display: inline-block;\n    vertical-align: top;\n}\n\n.card .card-heading.image .card-heading-header h3 {\n    margin: 0;\n    font-size: 14px;\n    line-height: 16px;\n    color: #262626;\n}\n\n.card .card-heading.image .card-heading-header span {\n    font-size: 12px;\n    color: #999999;\n}\n\n.card .card-body {\n    padding: 0 20px;\n    margin-top: 20px;\n}\n\n.card .card-media {\n    padding: 0 20px;\n    margin: 0 -14px;\n}\n\n.card .card-media img {\n    max-width: 100%;\n    max-height: 100%;\n}\n\n.card .card-actions {\n    min-height: 30px;\n    padding: 0 20px 20px 20px;\n    margin: 20px 0 0 0;\n}\n\n.card .card-comments {\n    padding: 20px;\n    margin: 0;\n    background-color: #f8f8f8;\n}\n\n.card .card-comments .comments-collapse-toggle {\n    padding: 0;\n    margin: 0 20px 12px 20px;\n}\n\n.card .card-comments .comments-collapse-toggle a,\n.card .card-comments .comments-collapse-toggle span {\n    padding-right: 5px;\n    overflow: hidden;\n    font-size: 12px;\n    color: #999;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.card-comments .media-heading {\n    font-size: 13px;\n    font-weight: bold;\n}\n\n.card.people {\n    position: relative;\n    display: inline-block;\n    width: 170px;\n    height: 300px;\n    padding-top: 0;\n    margin-left: 20px;\n    overflow: hidden;\n    vertical-align: top;\n}\n\n.card.people:first-child {\n    margin-left: 0;\n}\n\n.card.people .card-top {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: inline-block;\n    width: 170px;\n    height: 150px;\n    background-color: #ffffff;\n}\n\n.card.people .card-top.green {\n    background-color: #53a93f;\n}\n\n.card.people .card-top.blue {\n    background-color: #427fed;\n}\n\n.card.people .card-info {\n    position: absolute;\n    top: 150px;\n    display: inline-block;\n    width: 100%;\n    height: 101px;\n    overflow: hidden;\n    background: #ffffff;\n    box-sizing: border-box;\n}\n\n.card.people .card-info .title {\n    display: block;\n    margin: 8px 14px 0 14px;\n    overflow: hidden;\n    font-size: 16px;\n    font-weight: bold;\n    line-height: 18px;\n    color: #404040;\n}\n\n.card.people .card-info .desc {\n    display: block;\n    margin: 8px 14px 0 14px;\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 16px;\n    color: #737373;\n    text-overflow: ellipsis;\n}\n\n.card.people .card-bottom {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    display: inline-block;\n    width: 100%;\n    padding: 10px 20px;\n    line-height: 29px;\n    text-align: center;\n    box-sizing: border-box;\n}\n\n.card.hovercard {\n    position: relative;\n    padding-top: 0;\n    overflow: hidden;\n    text-align: center;\n    background-color: rgba(214, 224, 226, 0.2);\n}\n\n.card.hovercard .cardheader img {\n    /*background: url(\"http://lorempixel.com/850/280/nature/4/\");*/\n    background-size: cover;\n\n    max-height: 200px;\n}\n\n.card.hovercard .avatar {\n    position: relative;\n    top: -50px;\n    margin-bottom: -50px;\n}\n\n.card.hovercard .avatar img, .pic-round img {\n    width: 100px;\n    height: 100px;\n    max-width: 100px;\n    max-height: 100px;\n    border-radius: 50%;\n    border: 5px solid rgba(255,255,255,0.5);\n}\n\n.card.hovercard .info {\n    padding: 4px 8px 10px;\n}\n\n.card.hovercard .info .title {\n    margin-bottom: 4px;\n    font-size: 24px;\n    line-height: 1;\n    color: #262626;\n    vertical-align: middle;\n}\n\n.card.hovercard .info .desc {\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 20px;\n    color: #737373;\n    text-overflow: ellipsis;\n}\n\n.card.hovercard .bottom {\n    padding: 0 20px;\n    margin-bottom: 17px;\n}\n\n.btn-rounded{ border-radius: 50%; width:32px; height:32px; line-height:18px;  }\n\n.container{\n    margin-bottom: 200px\n}\n\n\n"

/***/ },

/***/ 396:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 396;


/***/ },

/***/ 397:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(516);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_40" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/main.js.map

/***/ },

/***/ 513:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_config__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_routing__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_auth_service__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_user_service__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__items_items_service__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_admin_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_validation_service__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__landing_landing_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__user_user_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__auth_login_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__auth_signup_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__items_items_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__items_items_filterItem_pipe__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__shared_pipes_orderby_pipe__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__shared_pipes_prettyjson_pipe__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__shared_navbar_navbar_component__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__shared_footer_footer_component__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__admin_admin_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__user_user_list_user_list_component__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__auth_reset_password_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__landing_pages_api_doc_api_doc_component__ = __webpack_require__(340);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































//Since RC6, all Directives and Pipes should be moved to module's declarations.
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_17__landing_landing_component__["a" /* LandingComponent */],
            __WEBPACK_IMPORTED_MODULE_18__user_user_component__["a" /* UserComponent */],
            __WEBPACK_IMPORTED_MODULE_19__auth_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_20__auth_signup_component__["a" /* SignupComponent */],
            __WEBPACK_IMPORTED_MODULE_21__items_items_component__["a" /* ItemsComponent */],
            __WEBPACK_IMPORTED_MODULE_22__items_items_filterItem_pipe__["a" /* SearchPipe */],
            __WEBPACK_IMPORTED_MODULE_23__shared_pipes_orderby_pipe__["a" /* OrderBy */],
            __WEBPACK_IMPORTED_MODULE_24__shared_pipes_prettyjson_pipe__["a" /* PrettyJsonPipe */],
            __WEBPACK_IMPORTED_MODULE_25__shared_navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_26__shared_footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_27__admin_admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_28__user_user_list_user_list_component__["a" /* UserListComponent */],
            __WEBPACK_IMPORTED_MODULE_29__auth_reset_password_component__["a" /* ResetPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_30__landing_pages_api_doc_api_doc_component__["a" /* ApiDocComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_10__app_routing__["a" /* routing */]
        ],
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_9__app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_9__app_config__["c" /* AppConfig */] },
            __WEBPACK_IMPORTED_MODULE_11__shared_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_12__shared_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_13__items_items_service__["a" /* ItemsService */],
            __WEBPACK_IMPORTED_MODULE_14__shared_admin_service__["a" /* AdminService */],
            __WEBPACK_IMPORTED_MODULE_15__shared_validation_service__["a" /* ValidationService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.module.js.map

/***/ },

/***/ 514:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__landing_landing_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_signup_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_login_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__items_items_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_admin_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__landing_pages_api_doc_api_doc_component__ = __webpack_require__(340);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return routing; });








var routes = [
    {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        component: __WEBPACK_IMPORTED_MODULE_1__landing_landing_component__["a" /* LandingComponent */],
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_3__auth_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'signup',
        component: __WEBPACK_IMPORTED_MODULE_2__auth_signup_component__["a" /* SignupComponent */]
    },
    {
        path: 'profile',
        component: __WEBPACK_IMPORTED_MODULE_4__user_user_component__["a" /* UserComponent */]
    },
    {
        path: 'items',
        component: __WEBPACK_IMPORTED_MODULE_5__items_items_component__["a" /* ItemsComponent */]
    },
    {
        path: 'admin',
        component: __WEBPACK_IMPORTED_MODULE_6__admin_admin_component__["a" /* AdminComponent */]
    },
    {
        path: 'documentation',
        component: __WEBPACK_IMPORTED_MODULE_7__landing_pages_api_doc_api_doc_component__["a" /* ApiDocComponent */]
    },
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.routing.js.map

/***/ },

/***/ 515:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__ = __webpack_require__(108);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ResetPasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(service, router) {
        this.service = service;
        this.router = router;
        this.credentials = { pws1: '', psw2: '' };
        this.errorMessage = '';
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
    };
    ResetPasswordComponent.prototype.reset = function () {
    };
    return ResetPasswordComponent;
}());
ResetPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-reset-password',
        template: "\n  \t<div class=\"container\">\n\t  \t<div class=\"row\">\n\t  \t\t<div class=\"col-md-6 col-md-offset-3\">\n\t  \t\t\t<form (ngSubmit) =\"reset()\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t \t<label>Password</label>\n\t\t\t\t\t \t<input type=\"password\" class=\"form-control\" name=\"email\" [(ngModel)] = \"credentials.psw1\"/>\n\t\t\t\t \t</div>\n\t\t\t\t \t<div class=\"form-group\">\n\t\t\t\t\t \t<label>Repete password</label>\n\t\t\t\t\t \t<input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)] = \"credentials.psw2\"/>\n\t\t\t\t \t</div>\n\n\t\t\t\t \t<!--messages-->\n\t\t\t\t\t<div class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</div>\n\n\t\t\t\t \t<div>\n\t\t\t\t \t\t<button type=\"submit\"class=\"btn btn-primary\">Login</button>\n\t\t\t\t \t</div>\n\t\t\t\t</form>\n\t  \t\t</div>\n\t  \t</div>\n\t</div>\n\n\n  ",
        styles: ["\n\n  \t.container{\n  \t\tmargin-top: 10%;\n  \t\t\n  \t}\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], ResetPasswordComponent);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/reset-password.component.js.map

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(513);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/index.js.map

/***/ },

/***/ 517:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SearchPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (items, arg) {
        var low_arg = arg.toLowerCase();
        if (!arg) {
            return items; //return all if no entry
        }
        else {
            return items.filter(function (item) {
                return item.name.it.main.toLowerCase().indexOf(low_arg) > -1
                    || item.name.it.spec.toLowerCase().indexOf(low_arg) > -1
                    || item.name.de.main.toLowerCase().indexOf(low_arg) > -1
                    || item.name.de.spec.toLowerCase().indexOf(low_arg) > -1
                    || item.name.pl.main.toLowerCase().indexOf(low_arg) > -1
                    || item.name.pl.spec.toLowerCase().indexOf(low_arg) > -1;
            });
        }
    };
    return SearchPipe;
}());
SearchPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Pipe */])({
        name: 'search',
        pure: false
    })
], SearchPipe);

//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/items.filterItem.pipe.js.map

/***/ },

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
        this.d = new Date();
        this.currentYear = this.d.getFullYear();
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-footer',
        template: __webpack_require__(690),
        styles: [__webpack_require__(683)]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/footer.component.js.map

/***/ },

/***/ 519:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(109);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(authService, userService, router) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.user = user;
            _this.userRole = _this.user.role;
        });
    };
    Object.defineProperty(NavbarComponent.prototype, "isLoggedIn", {
        get: function () {
            return this.authService.isLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavbarComponent.prototype, "isAdmin", {
        get: function () {
            if (this.userRole == 'Admin')
                return true;
            else
                return false;
        },
        enumerable: true,
        configurable: true
    });
    NavbarComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-navbar',
        template: __webpack_require__(691),
        styles: [__webpack_require__(684)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _c || Object])
], NavbarComponent);

var _a, _b, _c;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/navbar.component.js.map

/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return OrderBy; });
/*
 * Example use
 *		Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : '-'"
 *		Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | orderBy : ['-status']"
 *		Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | orderBy : ['status', '-title']"
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var OrderBy = OrderBy_1 = (function () {
    function OrderBy() {
    }
    OrderBy._orderByComparator = function (a, b) {
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0; //equal each other
    };
    OrderBy.prototype.transform = function (input, _a) {
        var _b = _a[0], config = _b === void 0 ? '+' : _b;
        if (!Array.isArray(input))
            return input;
        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            //Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return input.sort(function (a, b) {
                    return !desc
                        ? OrderBy_1._orderByComparator(a[property], b[property])
                        : -OrderBy_1._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return input.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? OrderBy_1._orderByComparator(a[property], b[property])
                        : -OrderBy_1._orderByComparator(a[property], b[property]);
                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0)
                        return comparison;
                }
                return 0; //equal each other
            });
        }
    };
    return OrderBy;
}());
OrderBy = OrderBy_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Pipe */])({ name: 'orderBy', pure: false })
], OrderBy);

var OrderBy_1;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/orderby.pipe.js.map

/***/ },

/***/ 521:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PrettyJsonPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PrettyJsonPipe = (function () {
    function PrettyJsonPipe() {
    }
    PrettyJsonPipe.prototype.transform = function (val) {
        return JSON.stringify(val, null, 2)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                }
                else {
                    cls = 'string';
                }
            }
            else if (/true|false/.test(match)) {
                cls = 'boolean';
            }
            else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };
    return PrettyJsonPipe;
}());
PrettyJsonPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Pipe */])({
        name: 'prettyjson'
    })
], PrettyJsonPipe);

//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/prettyjson.pipe.js.map

/***/ },

/***/ 522:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_user_service__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_admin_service__ = __webpack_require__(155);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserListComponent = (function () {
    function UserListComponent(userService, adminService) {
        this.userService = userService;
        this.adminService = adminService;
        this.users = [];
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAllUsers()
            .subscribe(function (http_users) { return _this.users = http_users; });
        this.deleteOrder = false;
        this.userService.getUser()
            .subscribe(function (http_user) {
            var currentUser = http_user;
            if (currentUser.role == "Admin")
                _this.isAdmin = true;
            else
                _this.isAdmin = false;
            console.log(_this.isAdmin);
        });
    };
    UserListComponent.prototype.selectUser = function (user) {
        return this.$user = user;
    };
    UserListComponent.prototype.updateUser = function ($user) {
        this.userService.updateUser($user)
            .subscribe(function (user) {
            console.log($user);
            jQuery("#editModal").modal("hide");
        }, function (err) {
            console.log(err);
            jQuery("#editModal").modal("hide");
        });
    };
    UserListComponent.prototype.deleteUser = function ($user) {
        this.userService.deleteUser($user)
            .subscribe(function (user) {
            console.log('user deleted');
            location.reload();
        }, function (err) {
            console.log(err);
            jQuery("#editModal").modal("hide");
        });
        jQuery("#editModal").modal("hide");
    };
    return UserListComponent;
}());
UserListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-user-list',
        template: __webpack_require__(692),
        styles: [__webpack_require__(380)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_admin_service__["a" /* AdminService */]) === "function" && _b || Object])
], UserListComponent);

var _a, _b;
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/user-list.component.js.map

/***/ },

/***/ 523:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/environment.js.map

/***/ },

/***/ 524:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/polyfills.js.map

/***/ },

/***/ 678:
/***/ function(module, exports) {

module.exports = ".container{\n    margin-bottom: 200px\n}"

/***/ },

/***/ 679:
/***/ function(module, exports) {

module.exports = ".page-wrap{\n  \n  min-height:100%;\n  margin-bottom: -80px;\n\n}\n\n.page-wrap:after {\n  content: \"\";\n  display: block;\n}\n\n\n\n\n\n\n"

/***/ },

/***/ 680:
/***/ function(module, exports) {

module.exports = "#custom-search-input {\n        margin:0;\n        margin-top: 10px;\n        padding: 0;\n    }\n \n    #custom-search-input .search-query {\n        padding-right: 3px;\n        padding-right: 4px \\9;\n        padding-left: 3px;\n        padding-left: 4px \\9;\n        /* IE7-8 doesn't have border-radius, so don't indent the padding */\n \n        margin-bottom: 0;\n        border-radius: 3px;\n    }\n \n    #custom-search-input button {\n        border: 0;\n        background: none;\n        /** belows styles are working good */\n        padding: 2px 5px;\n        margin-top: 2px;\n        position: relative;\n        left: -28px;\n        /* IE7-8 doesn't have border-radius, so don't indent the padding */\n        margin-bottom: 0;\n        border-radius: 3px;\n        color:#D9230F;\n    }\n \n    .search-query:focus + button {\n        z-index: 3;   \n    }\n\n    .pic {\n\t    width: 100px;\n\t    height: 100px;\n\t    max-width: 100px;\n\t    max-height: 100px;\n\t    border-radius: 50%;\n\t    border: 5px solid rgba(255,255,255,0.5);\n\t}\n\n\n.lib-panel {\n    margin-bottom: 20px;\n}\n\n.lib-panel .lib-img-wrapper, .lib-wrapper{\n    max-height: 200px;\n    min-height: 200px;\n    overflow: hidden;\n    \n}\n\n\n.lib-panel .lib-img-wrapper img {\n    width: 100%;\n    background-color: transparent;\n    -o-object-fit: cover;\n       object-fit: cover;\n    height: 200px;\n        \n}\n\n.lib-img-wrapper:hover{\n\n}\n\n.lib-panel .row,\n.lib-panel .col-md-6 {\n    padding: 0;\n    background-color: #FFFFFF;\n}\n\n\n.lib-panel .lib-row {\n    padding: 0 20px 0 20px;\n\n}\n\n.lib-panel .lib-row.lib-header {\n    background-color: #FFFFFF;\n    font-size: 15px;\n    padding: 10px 20px 0 20px;\n}\n\n.lib-panel .lib-row.lib-header .lib-header-seperator {\n    height: 2px;\n    width: 26px;\n    background-color: #d9d9d9;\n    margin: 7px 0 7px 0;\n}\n\n.lib-panel .lib-row.lib-desc {\n    position: relative;\n    height: 100%;\n    display: block;\n    font-size: 13px;\n}\n.lib-panel .lib-row.lib-desc a{\n    position: absolute;\n    width: 100%;\n    bottom: 10px;\n    left: 20px;\n}\n\n.lib-panel .lib-btn-group{\n    position: absolute;\n    bottom: 0;\n    right: 0;\n}\n\n.row-margin-bottom {\n    margin-bottom: 20px;\n}\n\n.box-shadow {\n    box-shadow: 0 0 10px 0 rgba(0,0,0,.10);\n}\n\n.lib-item{\n    padding-left:40px;\n    padding-right:40px;\n}\n\n.no-padding {\n    padding: 0;\n}\n\nul {\n  list-style-type: none;\n}\n\n.container{\n    margin-bottom: 200px\n}"

/***/ },

/***/ 681:
/***/ function(module, exports) {

module.exports = ".page-header h1 {\n  color: white;\n  font-size: 400%;\n}\n\n.page-header h3 {\n\tfont-size: 200%\n}\n\n/*landing*/\n.landing-page{\n  background-color:rgba(0, 0, 0, 0.4);\n  padding-bottom:5%;\n  padding-top:5%;\n}\n\n#bg {\n  position: fixed; \n  top: -50%; \n  left: -50%; \n  width: 200%; \n  height: 200%;\n  z-index: -1;\n}\n#bg img {\n  position: absolute; \n  top: 0; \n  left: 0; \n  right: 0; \n  bottom: 0; \n  margin: auto; \n  min-width: 50%;\n  min-height: 50%;\n  opacity: 0.3;\n  background-color: rgba(255, 255, 255, 1);\n}\n\nheader {\n  position: realtive;\n  padding-top:80px;\n\n}\n\nbody {\n  margin-top: 300px;\n  height:1000px;\n}\n"

/***/ },

/***/ 682:
/***/ function(module, exports) {

module.exports = ".justify {\n \n  word-wrap: break-word;\n\n  /* Required for text-overflow to do anything \n   text-overflow: ellipsis-word;\n  white-space: nowrap;\n  overflow: hidden;*/\n}\n\npre {outline: 0px solid #ccc; padding: 5px; margin: 5px; background-color: white;}\n.string { color: green; }\n.number { color: darkorange; }\n.boolean { color: blue; }\n.null { color: magenta; }\n.key { color: red; }\n\nstrong{color:black;}"

/***/ },

/***/ 683:
/***/ function(module, exports) {

module.exports = "footer, .page-wrap:after {\n  height: 80px; \n}\n\n/*Footer*/\nfooter {\n\n\tpadding-top: 30px;\n\t\n\n  \tbackground-color: #f5f5f5;\n  \tborder-top: 1px solid #E7E7E7;\n\n}"

/***/ },

/***/ 684:
/***/ function(module, exports) {

module.exports = ".pointer{\n    cursor:pointer;\n}\n\n.round-image {\n    background-color: white;\n    border: 1px solid #d9d9d9;\n    border-radius: 25px;\n    -moz-border-radius: 25px;\n    -webkit-border-radius: 25px;\n    height: 30px;\n    width: 30px;\n    overflow: hidden;\n    text-align: center;\n    img { width: 100% }\n}"

/***/ },

/***/ 685:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n\t<div class=\"row\">\n\t\t\n\t\t<div class=\"col-md-8\">\n\t\t\t<div *ngIf=\"signupCode\">\n\t\t\t\t<form (ngSubmit) = \"setSignupCode()\">\n\t\t\t\t\t<label>{{signupCode?.name}}</label>\n\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<span class=\"input-group-addon checkbox-success\">\n\t\t\t\t        <input type=\"checkbox\" name=\"enabled\" [(ngModel)] =\"signupCode.enabled\" />\n\t\t\t\t     </span>\n\t\t\t\t     <input [disabled]=\"!signupCode.enabled\" type=\"text\" class=\"form-control\" name=\"value\" [(ngModel)] = \"signupCode.value\" />\n\t\t\t\t    </div>\n\t\t\t\t    <br>\n\t\t\t\t    <button class=\"btn btn-md btn-primary pull-right\" type=\"submit\">Save <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></button>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-md-4\">\n\t\t<h2>List of users</h2>\n\t\t<app-user-list></app-user-list>\n\t\t</div>\n\t</div>\n</div>\n\n\n\n"

/***/ },

/***/ 686:
/***/ function(module, exports) {

module.exports = "<div class=\"page-wrap\">\n  <app-navbar></app-navbar>\n  <router-outlet></router-outlet>\n</div>\n<app-footer></app-footer>"

/***/ },

/***/ 687:
/***/ function(module, exports) {

module.exports = "\n<div class=\"container\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\n            <div class=\"input-group\">\n\t\t      <input type=\"text\" class=\"form-control\" placeholder=\"Search for...\" #query (keyup)=\"0\">\n\t\t      <span class=\"input-group-btn\">\n\t\t        <button class=\"btn btn-success\" type=\"button\" (click)=\"addItem()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n\t\t      </span>\n\t\t    </div><!-- /input-group -->\n\t\t    {{query.value}}\n        </div>\n    </div>\n\n    <hr>\n\n    <div class=\"row\">\n\t    \t<div class=\"col-md-6 lib-item\" *ngFor =\"let item of items | search:query.value | orderBy : ['-_id'] \">\n\t            <div class=\"lib-panel\">\n\t                <div class=\"row box-shadow\">\n\t                    <div class=\"col-md-6 lib-img-wrapper\">\n\t                        <img class=\"lib-img cover\" src=\"{{item.pic}}\">\n\t                    </div>\n\t                    <div class=\"col-md-6 lib-wrapper\">\n\t                        <div class=\"lib-row lib-header\">\n\t                            <p><strong>{{item?.name?.it?.main}}</strong> <span class=\"text-muted\"><i>{{item?.name?.it?.spec}}</i> (it)</span></p>\n\t                            <p><strong>{{item?.name?.de?.main}}</strong> <span class=\"text-muted\"><i>{{item?.name?.de?.spec}}</i> (de)</span></p>\n\t                            <p><strong>{{item?.name?.pl?.main}}</strong> <span class=\"text-muted\"><i>{{item?.name?.pl?.spec}}</i> (pl)</span></p>\n\t                            \n\t                        </div>\n\t                        <div class=\"lib-row lib-desc\">\n\t                        \t<p>ID: {{item?._id}}</p> \n\t                        </div>\n\t                         <div class=\"btn-group lib-btn-group\">\n\t\t                        \t <button type=\"button\" class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" data-target=\"#editModal\" (click)=\"selectId(item._id)\">\n\t\t\t\t\t\t\t\t  \t\t<i class=\"fa fa-pencil right\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t                            <button type=\"button\" class=\"btn btn-danger btn-sm\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"selectId(item._id)\">\n\t\t\t\t\t\t\t\t  \t\t<i class=\"fa fa-trash right\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div> \n\t                    </div>\n\t                </div>\n\t            </div>\n\t        </div>\n    </div>\n</div>\n\n\n\n<!-- Edit Modal -->\n<div class=\"modal fade\" id=\"editModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Edit Item\">\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n  \t<form (ngSubmit)=\"updateItem()\">\n\t  \t<div class=\"modal-content\">\n\t      <div class=\"modal-header\">\n\t        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t        <h4 class=\"modal-title\" id=\"myModalLabel\">Edit Item {{$item.id}}</h4>\n\t      </div>\n\t      <div class=\"modal-body\">\n\t      \t<div class=\"form-group\">\n\t      \t\t<label for=\"Image url\">Img url</label>\n\t      \t\t<input type=\"text\" class=\"form-control\" name=\"pic-url\" [(ngModel)] = \"$item.data.pic\">\n\t      \t</div>\n\t\t    <div class=\"sidebar-category\">\n\t\t        <ul class=\"nav nav-tabs\">\n\t\t          <li [class.active]=\"panelshow == 'DE'\"> <a (click)=\"setPanel('DE')\">DE</a></li>\n\t\t          <li [class.active]=\"panelshow == 'PL'\"> <a (click)=\"setPanel('PL')\">PL</a></li>\n\t\t          <li [class.active]=\"panelshow == 'IT'\"> <a (click)=\"setPanel('IT')\">IT</a></li>\n\t\t        </ul>\n\t\t        <div *ngIf=\"panelshow == 'DE'\"> \n\t\t\t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Main name</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"de-main\" [(ngModel)] = \"$item.data.name.de.main\">\n\t      \t\t\t</div>\n\t      \t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Spec</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"de-spec\" [(ngModel)] = \"$item.data.name.de.spec\">\n\t      \t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"panelshow == 'PL'\"> \n\t\t\t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Main name</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"pl-main\" [(ngModel)] = \"$item.data.name.pl.main\">\n\t      \t\t\t</div>\n\t      \t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Spec</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"pl-spec\" [(ngModel)] = \"$item.data.name.pl.spec\">\n\t      \t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"panelshow == 'IT'\"> \n\t\t\t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Main name</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"it-main\" [(ngModel)] = \"$item.data.name.it.main\">\n\t      \t\t\t</div>\n\t      \t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Spec</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"it-spec\" [(ngModel)] = \"$item.data.name.it.spec\">\n\t      \t\t\t</div>\n\t\t\t\t</div>\n\t\t        \n\t\t     </div>\n\t\t   </div>\n\t      <div class=\"modal-footer\">\n\t        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n\t        <button type=\"submit\" class=\"btn btn-primary\" >Save changes</button>\n\t      </div>\n\t    </div>\n    </form>\n  </div>\n</div>\n\n<!--DELETE Modal-->\n<div class=\"modal fade\" id=\"deleteModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Delete Item\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\" id=\"myModalLabel\">Delete Item</h4>\n      </div>\n      <div class=\"modal-body\">\n        <h3 class=\"centered\">Are you sure you want to delete this item?</h3>\n        <div class=\"row\">\n        \t<div class=\"col-md-12\">{{$item.data | json}}</div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">No</button>\n        <button type=\"button\" class=\"btn btn-primary\"  (click)=\"deleteItem($item.data)\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n"

/***/ },

/***/ 688:
/***/ function(module, exports) {

module.exports = "<div id=\"bg\">\n  <img src=\"../../assets/img/bg.jpg\" alt=\"\">\n</div>\n\n<header>\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t<div class=\"page-header text-center landing-page circleBase\">\n\t\t\t\t\t<h1>Welcome in Grocerybot</h1>\n\t\t\t\t\t<h3>Your personal assistant for daily grocery shopping</h3>\n\t\t\t\t\t<p>A server-side application for suppoprting multilingual grocery lists</p>\n\t\t\t\t\t<p><a href=\"https://github.com/ugobriasco/grocerybot-server\">Open Source! <i class=\"fa fa-github fa-2x\" aria-hidden=\"true\"></i></a></p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</header>\n<body hidden>\n\t<section class=\"container\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\t<hr>\n\t\t\t<div class=\"jumbotron\">\n\t\t\t<h1>Grocerybot helps foreingers to integrate better in theyr host country, making daily grocery shopping easyer</h1>\n\t\t\t</div>\n\t\t\t<hr>\n\t\t</div>\n\t</div>\n\t\n\t<div class=\"row\">\n\t\t<div class=\"col-md-6\">\n\t\t<h1>Title</h1>\n\t\t<hr>\n\t\t\t<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam felis mi, semper commodo egestas sit amet, mollis et erat. Praesent eu malesuada urna. Praesent viverra dolor ac sem porta condimentum. Suspendisse finibus, felis placerat consectetur sagittis, turpis eros tempus dui, ac imperdiet tortor velit id nisl. Sed vestibulum diam eget erat consequat, ac bibendum diam malesuada. Nunc in posuere augue. Donec posuere lectus sit amet turpis venenatis hendrerit. Ut efficitur elit at imperdiet lacinia. Morbi facilisis neque dapibus efficitur convallis. Praesent hendrerit porttitor nisl quis viverra.</p>\n\t\t</div>\n\t\t<h1>Title</h1>\n\t\t<hr>\n\t\t<div class=\"col-md-6\">Integer in sapien consequat, imperdiet purus nec, bibendum nulla. Sed et nibh vitae sem dapibus egestas. Aenean ut quam ac metus varius facilisis eu sed leo. Duis vel vulputate leo. Nulla pharetra, tortor eget ultricies hendrerit, arcu ante aliquet leo, quis consequat erat dui et erat. Vestibulum aliquet ligula posuere diam dictum, eget rhoncus quam maximus. Sed eget leo ipsum. Suspendisse a velit ex. Pellentesque eu nisi non magna ullamcorper porttitor facilisis at sem. Suspendisse velit diam, efficitur eget sem nec, vulputate posuere nibh. Aliquam vitae condimentum justo. Maecenas non accumsan dolor. Vestibulum vehicula tortor in pharetra mollis.</div>\n\t</div>\n\t\n\t</section>\n</body>\n\n\n"

/***/ },

/***/ 689:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n\n<div class=\"page-header\">\n    <h1>API Documentation</h1>\n    <small>Public endpoints under:<pre>{{apiUrl}}</pre></small> \n  </div>\n  \n<hr>\n<section>\n\t<div class=\"row\" *ngIf=\"apiDoc\">\n\t\t<div class=\"col-md-3 col-sm-3 col-xs-3\">\n\t\t\t\n\t\t\t<div class=\"list-group\" *ngFor = \"let route of apiDoc\">\n\t\t\t  <button type=\"button\" class=\"list-group-item\" (click) = \"selectRoute(route)\"><span class=\"label\" [ngClass] = \"getReqTypeColor(route.req.type)\" >{{route?.req?.type}}</span><span class=\"pull-right text-uppercase\"> {{route?.name}}</span></button>\n\t\t\t</div>\t\t\t\t\t\n\t\t</div>\n\t\t<div *ngIf =\"$route\">\n\t\t\t<div class=\"col-md-9 col-sm-9 col-xs-9\">\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t<div class=\"panel-heading justify\">\n\t\t\t\t\t\t\t<strong>Request</strong>\n\t\t\t\t\t\t\t<p class=\"text-success\">{{$route?.req?.params}}</p>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"panel-body justify\"*ngIf = \"$route.req.body\">\n\t\t\t\t\t\t\t<pre [innerHTML]=\"$route.req.body | prettyjson\"></pre>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t<strong>Response</strong>\n\t\t\t\t\t\t\t<p [ngClass]=\"getResStatusColor($route?.res?.status)\">{{$route?.res?.status}}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t\t<pre [innerHTML]=\"$route.res.body | prettyjson\"></pre>\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t</div>\n</section>\n</div>\n\n"

/***/ },

/***/ 690:
/***/ function(module, exports) {

module.exports = "<footer class=\"footer\">\n\t<div class=\"container text-center\">\n\t\t<span class=\"text-muted small\">\n\t\t<a href=\"#\">Grocerybot</a> &copy; 2016 - {{currentYear}}  <a href=\"http://matchyourtie.com\">matchyourtie</a> | <a href=\"http://matchyourtie.com/docs/disclaimer.html#impressum\">Impressum</a>\n\t\t</span>\n\t</div>\n  \n</footer>\n"

/***/ },

/***/ 691:
/***/ function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse\">\n    <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a href=\"./\" class=\"navbar-brand fa fa-shopping-cart fa-2x\"></a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n          <li><a href=\"/documentation\">API</a></li>\n          \n        </ul>\n        <ul class=\"nav navbar-nav navbar-right\">\n        <li *ngIf=\"!isLoggedIn\"><a routerLink=\"/signup\">Sign Up</a></li>\n        <li *ngIf=\"!isLoggedIn\"><a routerLink=\"/login\">Login</a></li>\n\n        <li *ngIf=\"isLoggedIn\"><a href=\"/items\">Items</a></li>\n        <li *ngIf=\"isLoggedIn\" class=\"dropdown\">\n                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> \n                  <img src=\"{{user?.profile?.avatar}}\" class=\"round-image\" onError=\"this.src= './assets/img/default-avatar.png';\" alt=\"\">\n                  <span class=\"caret\"></span>\n                </a>\n                <ul class=\"dropdown-menu\">\n                  <li><a href=\"/profile\">Profile</a></li>\n                  <li *ngIf=\"isAdmin\"><a href=\"/admin\">Admin</a></li>\n                  <li role=\"separator\" class=\"divider\"></li>\n                  <li><a (click)=\"logout()\" class=\"pointer\">Logout</a></li>\n                </ul>\n        </li>\n        \n      </ul>\n    </div><!-- /.navbar-collapse -->\n    </div><!-- /.container-fluid -->\n  </nav>\n"

/***/ },

/***/ 692:
/***/ function(module, exports) {

module.exports = "\n\n\t<div *ngFor = \"let user of users\">\n\t\t<div class=\"card hovercard\">\n                    <div class=\"cardheader\">\n                      <img alt=\"\" src=\"{{user?.profile?.cover}}\" onError=\"this.src='http://lorempixel.com/850/280/nature/4/'\">\n                    </div>\n                    <div class=\"avatar\">\n                        <img alt=\"\" src=\"{{user?.profile?.avatar}}\" onError=\"this.src= './assets/img/default-avatar.png';\">\n                    </div>\n                    <div class=\"info\">\n                        <div class=\"title\">\n                            {{user?.profile?.name}}\n                        </div>\n                        <div class=\"desc\">{{user?.email}}</div>\n                        <div class=\"desc\">{{user?.role}}</div>\n\n                    </div>\n                    <div class=\"bottom\">\n                        <div *ngIf =\" isAdmin\" class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-success btn-sm pull-right\" data-toggle=\"modal\" data-target=\"#editModal\"(click) = \"selectUser(this.user)\"><i class=\"fa fa-cog\"></i></button>\n                        </div>\n                    </div>\n            </div>\n\t</div>\n\n    <div class=\"modal fade\" id=\"editModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Edit User\">\n  <div class=\"modal-dialog\" role=\"document\" *ngIf =\"$user\">\n    <div class=\"modal-content\">\n      <form (ngSubmit) = \"updateUser($user)\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\" id=\"myModalLabel\">Edit user rights</h4>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"row\">\n            <div class=\"col-md-8 col-sm-8\">\n                  \n                  \n                  <label>User Role</label>\n                    <div class=\"fotm-group\">\n                        <input type=\"radio\" name=\"radio\" id=\"radio1\" [(ngModel)] = \"$user.role\" value=\"User\" />\n                        <label for=\"radio1\">User</label>\n                    </div>\n                    <div class=\"form-group\">\n                        <input type=\"radio\" name=\"radio\" id=\"radio2\" [(ngModel)] = \"$user.role\" value=\"Admin\"/>\n                        <label for=\"radio2\">Admin</label>\n                    </div>\n              \n                  <hr>\n                    <div class=\"form-group\">\n                      <input type=\"checkbox\" name=\"deleteOrder\" id=\"checkbox1\" [(ngModel)] =\"deleteOrder\"/>\n                      <label for=\"checkbox1\"><i class=\"fa fa-trash fa-fw text-danger \" aria=\"hidden\"></i>Delete User</label>\n                    </div>\n\n              \n\n         \n            </div>\n            <div class=\"col-md-4 col-sm-4\">\n            <div class=\"panel panel-default\">\n            \n            <div class=\"panel-heading\">\n              <div class=\"pic-round\">\n                    <img alt=\"\" src=\"{{$user?.profile?.avatar}}\" class=\"center-block\" onError=\"this.src= './assets/img/default-avatar.png';\">\n              </div>\n              <p><strong>{{$user?.profile?.name}}</strong></p>\n              <p><small>{{$user?.email}}</small></p>\n              <p><small>{{$user?.role}}</small></p>\n            </div>\n              \n            </div>\n            </div>\n          </div>      \n        </div>\n        <div class=\"modal-footer\">\n\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n          <button type=\"submit\" class=\"btn btn-primary\" *ngIf = \"!deleteOrder\">Submit</button>\n          <button type=\"button\" class=\"btn btn-danger\" *ngIf = \"deleteOrder\" (click) = \"deleteUser($user)\">Delete User</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n\n\n\n\n\n"

/***/ },

/***/ 693:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n  <div *ngIf=\"user\">\n    <div *ngIf=\"successMessage\" class=\"alert alert-success\">{{successMessage}}</div>\n    <div *ngIf=\"errorMessage\" class=\"alert alert-danger\">{{errorMessage}}</div>\n    \t<div class=\"row\">\n    \t\t<div class=\"col-lg-4  col-lg-offset-4 col-sm-6 col-sm-offset-3\">\n                <div class=\"card hovercard\">\n                    <div class=\"cardheader\">\n                      <img alt=\"\" src=\"{{user?.profile?.cover}}\" onError=\"this.src='http://lorempixel.com/850/280/nature/4/'\">\n                    </div>\n                    <div class=\"avatar\">\n                        <img alt=\"\" src=\"{{user?.profile?.avatar}}\" onError=\"this.src= './assets/img/default-avatar.png';\">\n                    </div>\n                    <div class=\"info\">\n                        <div class=\"title\">\n                            {{user?.profile?.name}}\n                        </div>\n                        <div class=\"desc\">{{user?.email}}</div>\n                        <div class=\"desc\">{{user?.role}}</div>\n                    </div>\n                    <div class=\"bottom\">\n                      \n                        \n                    </div>\n                </div>\n                <button type=\"button\" class=\"btn btn-primary btn-sm center-block\" data-toggle=\"modal\" data-target=\"#editModal\">\n                        <span class=\"fa fa-edit\"></span> Update your profile\n                </button>\n            </div>\n    \t</div>\n    </div>\n  </div>\n\n\n\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"editModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <form (ngSubmit) = \"updateUser()\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\" id=\"myModalLabel\">Editing your profile..</h4>\n        </div>\n        <div class=\"modal-body\">\n\n          <div class=\"form-group\">\n            <label>Name</label>\n            <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)] = \"user.profile.name\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label>Email</label>\n            <input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\"/>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Avatar</label>\n            <input type=\"text\" class=\"form-control\" name=\"avatar\" [(ngModel)]=\"user.profile.avatar\"/>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Cover</label>\n            <input type=\"text\" class=\"form-control\" name=\"cover\" [(ngModel)]=\"user.profile.cover\"/>\n          </div>\n\n\n\n\n          \n        </div>\n\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          <button class=\"btn btn-success\" type=\"submit\" >Update User</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n\n\n"

/***/ },

/***/ 718:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(397);


/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return AppConfig; });

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* OpaqueToken */]("app.config");
;
var AppConfig = {
    apiEndpoint: "http://46.101.201.71:3000/api/"
    //apiEndpoint: "http://localhost:3000/api/"   
};
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.config.js.map

/***/ }

},[718]);
//# sourceMappingURL=main.bundle.map