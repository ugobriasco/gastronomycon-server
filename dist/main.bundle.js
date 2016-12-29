webpackJsonp([0,3],{

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
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



var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.authUrl = 'http://localhost:3000/api';
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
    AuthService.prototype.connectivityCheck = function () { return this.authUrl; };
    AuthService.prototype.isLoggedIn = function () { return this.loggedIn; };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(this.authUrl + "/login", { email: email, password: password })
            .map(function (res) { return res.json(); })
            .do(function (res) {
            if (res.token) {
                _this.getToken(res.token);
            }
        })
            .catch(this.handleError);
    };
    AuthService.prototype.signup = function (email, password) {
        var _this = this;
        return this.http.post(this.authUrl + "/signup", { email: email, password: password })
            .map(function (res) { return res.json(); })
            .do(function (res) {
            if (res.token) {
                _this.getToken(res.token);
            }
        })
            .catch(this.handleError);
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    };
    AuthService.prototype.getToken = function (token) {
        localStorage.setItem('auth_token', token);
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
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/auth.service.js.map

/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__ = __webpack_require__(213);
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
    function AppComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.d = new Date();
        this.currentYear = this.d.getFullYear();
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(AppComponent.prototype, "isLoggedIn", {
        get: function () {
            return this.authService.isLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(665),
            styles: [__webpack_require__(662)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.component.js.map

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__ = __webpack_require__(213);
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
            .subscribe(function (data) { _this.router.navigate(['']); console.log(data); }, function (err) { _this.errorMessage = err; console.log(err); });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-login',
            template: "\n  \t<div class=\"container\">\n\t\t<form (ngSubmit) =\"login()\">\n\n\t\t <div class=\"form-group\">\n\t\t \t<label>Email</label>\n\t\t \t<input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)] = \"credentials.email\"/>\n\t \t</div>\n\t \t<div class=\"form-group\">\n\t\t \t<label>Password</label>\n\t\t \t<input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)] = \"credentials.password\"/>\n\t \t</div>\n\n\t \t<!--messages-->\n\t\t<div class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</div>\n\n\t \t<div>\n\t \t\t<button type=\"submit\"class=\"btn btn-primary\">Login</button>\n\t \t</div>\n\t\t</form>\n\t</div>\n\n\n  ",
            styles: [""]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/login.component.js.map

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function SignupComponent() {
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-signup',
            template: "\n\t<p>signup</p>\n\n  ",
            styles: [""]
        }), 
        __metadata('design:paramtypes', [])
    ], SignupComponent);
    return SignupComponent;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/signup.component.js.map

/***/ },

/***/ 333:
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
    LandingComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-landing',
            template: __webpack_require__(666),
            styles: [__webpack_require__(663)]
        }), 
        __metadata('design:paramtypes', [])
    ], LandingComponent);
    return LandingComponent;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/landing.component.js.map

/***/ },

/***/ 334:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function UserComponent() {
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-user',
            template: __webpack_require__(667),
            styles: [__webpack_require__(664)]
        }), 
        __metadata('design:paramtypes', [])
    ], UserComponent);
    return UserComponent;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/user.component.js.map

/***/ },

/***/ 387:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 387;


/***/ },

/***/ 388:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(506);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_40" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/main.js.map

/***/ },

/***/ 504:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routing__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_auth_service__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_user_service__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__landing_landing_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__user_user_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__auth_login_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__auth_signup_component__ = __webpack_require__(332);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_13__landing_landing_component__["a" /* LandingComponent */],
                __WEBPACK_IMPORTED_MODULE_14__user_user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_15__auth_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_16__auth_signup_component__["a" /* SignupComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__app_routing__["a" /* routing */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__shared_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_11__shared_user_service__["a" /* UserService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.module.js.map

/***/ },

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__landing_landing_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_signup_component__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_login_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user_component__ = __webpack_require__(334);
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
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.routing.js.map

/***/ },

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(504);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/index.js.map

/***/ },

/***/ 507:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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

var UserService = (function () {
    function UserService() {
    }
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/user.service.js.map

/***/ },

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/environment.js.map

/***/ },

/***/ 509:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/polyfills.js.map

/***/ },

/***/ 662:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 663:
/***/ function(module, exports) {

module.exports = ".page-header h1 {\n  color: white;\n  font-size: 400%;\n}\n\n.page-header h3 {\n\tfont-size: 200%\n}\n\n/*landing*/\n.landing-page{\n  background-color:rgba(0, 0, 0, 0.4);\n  padding-bottom:5%;\n  padding-top:5%;\n}\n\n#bg {\n  position: fixed; \n  top: -50%; \n  left: -50%; \n  width: 200%; \n  height: 200%;\n  z-index: -1;\n}\n#bg img {\n  position: absolute; \n  top: 0; \n  left: 0; \n  right: 0; \n  bottom: 0; \n  margin: auto; \n  min-width: 50%;\n  min-height: 50%;\n  opacity: 0.3;\n  background-color: rgba(255, 255, 255, 1);\n}\n\n"

/***/ },

/***/ 664:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 665:
/***/ function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a href=\"./\" class=\"navbar-brand glyphicon glyphicon-home\"></a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-1\">\n\t    <ul class=\"nav navbar-nav\">\n\t    \t<li><a routerLink=\"/profile\">Profile </a></li>\n\t    </ul>\n      \t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t<li *ngIf=\"!isLoggedIn\"><a routerLink=\"/signup\">Sign Up</a></li>\n\t\t\t<li *ngIf=\"!isLoggedIn\"><a routerLink=\"/login\">Login</a></li>\n\t\t\t<li *ngIf=\"isLoggedIn\"><a (click)=\"logout()\" class=\"pointer\">Logout</a></li>\n\t\t</ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n\n<router-outlet></router-outlet>\n<footer class=\"text-center\">\n\t<p>Grocerybot &copy; {{currentYear}} - by <a href=\"http://matchyourtie.com\">matchyourtie</a></p>\n</footer>\n"

/***/ },

/***/ 666:
/***/ function(module, exports) {

module.exports = "<div id=\"bg\">\n  <img src=\"http://thelala.com/wp-content/uploads/2015/10/o-GROCERY-SHOPPING-facebook.jpg\" alt=\"\">\n</div>\n\n<header>\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t<div class=\"page-header text-center landing-page circleBase\">\n\t\t\t\t\t<h1>Welcome in Grocerybot</h1>\n\t\t\t\t\t<h3>Your personal assistant for daily grocery shopping</h3>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</header>\n\n"

/***/ },

/***/ 667:
/***/ function(module, exports) {

module.exports = "<p>\n  user works!\n</p>\n"

/***/ },

/***/ 691:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(388);


/***/ }

},[691]);
//# sourceMappingURL=main.bundle.map