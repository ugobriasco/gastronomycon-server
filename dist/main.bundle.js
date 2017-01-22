webpackJsonp([0,3],{

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(144);
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
        this.userID = '';
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
    AuthService.prototype.signup = function (email, password) {
        var _this = this;
        return this.http.post(this.authUrl + "/signup", { email: email, password: password })
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
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/auth.service.js.map

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
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
    function UserService(http) {
        this.http = http;
        this.MyUsersUrl = 'http://localhost:3000/api/user';
    }
    UserService.prototype.getUser = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        var token = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + token);
        var myId = localStorage.getItem('userID');
        return this.http.get(this.MyUsersUrl + "/" + myId, { headers: headers }) //usage of ES6 template-string backticks
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.updateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        var token = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + token);
        var myId = localStorage.getItem('userID');
        return this.http.put(this.MyUsersUrl + "/" + myId, user, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
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
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/user.service.js.map

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_user_service__ = __webpack_require__(215);
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
    function AppComponent(authService, userService, router) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.d = new Date();
        this.currentYear = this.d.getFullYear();
        this.userId = this.authService.getUserID();
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
            template: __webpack_require__(668),
            styles: [__webpack_require__(664)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__shared_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.component.js.map

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__ = __webpack_require__(214);
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

/***/ 333:
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

/***/ 334:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__items_service__ = __webpack_require__(335);
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
    ItemsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-items',
            template: __webpack_require__(669),
            styles: [__webpack_require__(665)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__items_service__["a" /* ItemsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__items_service__["a" /* ItemsService */]) === 'function' && _a) || Object])
    ], ItemsComponent);
    return ItemsComponent;
    var _a;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/items.component.js.map

/***/ },

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
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



var ItemsService = (function () {
    function ItemsService(http) {
        this.http = http;
        this.itemsUrl = 'http://localhost:3000/api/item';
        this.selectedItem = '';
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
        return this.http.post("" + this.itemsUrl, item)
            .map(function (res) { return res.json; })
            .catch(this.handleError);
    };
    ItemsService.prototype.updateItem = function (item) {
        return this.http.put(this.itemsUrl + "/" + item._id, item)
            .map(function (res) { return res.json; })
            .catch(this.handleError);
    };
    ItemsService.prototype.deleteItem = function (item) {
        return this.http.delete(this.itemsUrl + "/" + item._id)
            .map(function (res) { return res.json; })
            .catch(this.handleError);
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
    ItemsService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], ItemsService);
    return ItemsService;
    var _a;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/items.service.js.map

/***/ },

/***/ 336:
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
            template: __webpack_require__(670),
            styles: [__webpack_require__(666)]
        }), 
        __metadata('design:paramtypes', [])
    ], LandingComponent);
    return LandingComponent;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/landing.component.js.map

/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_user_service__ = __webpack_require__(215);
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
        this.service.getUser().subscribe(function (user) { return _this.user = user; });
    };
    UserComponent.prototype.updateUser = function () {
        var _this = this;
        this.errorMessage = '';
        this.successMessage = '';
        this.service.updateUser(this.user)
            .subscribe(function (user) {
            _this.successMessage = 'Profile updated';
        }, function (err) {
            _this.errorMessage = err;
            console.log(err);
        });
    };
    UserComponent.prototype.init = function () {
        this.user = {
            email: '',
            role: '',
            profile: {
                name: '',
                avatar: '',
                cover: ''
            }
        };
    };
    UserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-user',
            template: __webpack_require__(671),
            styles: [__webpack_require__(667)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], UserComponent);
    return UserComponent;
    var _a;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/user.component.js.map

/***/ },

/***/ 390:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 390;


/***/ },

/***/ 391:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(509);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_40" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/main.js.map

/***/ },

/***/ 507:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routing__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_auth_service__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_user_service__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__items_items_service__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__landing_landing_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__user_user_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__auth_login_component__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__auth_signup_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__items_items_component__ = __webpack_require__(334);
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
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_14__landing_landing_component__["a" /* LandingComponent */],
                __WEBPACK_IMPORTED_MODULE_15__user_user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_16__auth_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_17__auth_signup_component__["a" /* SignupComponent */],
                __WEBPACK_IMPORTED_MODULE_18__items_items_component__["a" /* ItemsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__app_routing__["a" /* routing */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__shared_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_11__shared_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_12__items_items_service__["a" /* ItemsService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.module.js.map

/***/ },

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__landing_landing_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_signup_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_login_component__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__items_items_component__ = __webpack_require__(334);
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
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/app.routing.js.map

/***/ },

/***/ 509:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(507);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/index.js.map

/***/ },

/***/ 510:
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

/***/ 511:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/ugobriasco/dev/grocerybot/server/grocerybot-server/src/polyfills.js.map

/***/ },

/***/ 664:
/***/ function(module, exports) {

module.exports = ".pointer{\n    cursor:pointer;\n\t}\n\nheader {\n  position: realtive;\n  padding-top:80px; \n}\n\n\n.page-wrap{\n  \n  min-height:100%;\n  margin-bottom: -80px;\n\n}\n\n.page-wrap:after {\n  content: \"\";\n  display: block;\n}\n\nfooter, .page-wrap:after {\n  height: 80px; \n}\n\n/*Footer*/\nfooter {\n\n  background-color: #f5f5f5;\n  border-top: 1px solid #E7E7E7;\n\n}"

/***/ },

/***/ 665:
/***/ function(module, exports) {

module.exports = "#custom-search-input {\n        margin:0;\n        margin-top: 10px;\n        padding: 0;\n    }\n \n    #custom-search-input .search-query {\n        padding-right: 3px;\n        padding-right: 4px \\9;\n        padding-left: 3px;\n        padding-left: 4px \\9;\n        /* IE7-8 doesn't have border-radius, so don't indent the padding */\n \n        margin-bottom: 0;\n        border-radius: 3px;\n    }\n \n    #custom-search-input button {\n        border: 0;\n        background: none;\n        /** belows styles are working good */\n        padding: 2px 5px;\n        margin-top: 2px;\n        position: relative;\n        left: -28px;\n        /* IE7-8 doesn't have border-radius, so don't indent the padding */\n        margin-bottom: 0;\n        border-radius: 3px;\n        color:#D9230F;\n    }\n \n    .search-query:focus + button {\n        z-index: 3;   \n    }\n\n    .pic {\n\t    width: 100px;\n\t    height: 100px;\n\t    max-width: 100px;\n\t    max-height: 100px;\n\t    border-radius: 50%;\n\t    border: 5px solid rgba(255,255,255,0.5);\n\t}\n\n\n.lib-panel {\n    margin-bottom: 20px;\n}\n\n.lib-panel .lib-img-wrapper, .lib-wrapper{\n    max-height: 200px;\n    min-height: 200px;\n    overflow: hidden;\n}\n\n\n.lib-panel .lib-img-wrapper img {\n    width: 100%;\n    background-color: transparent;\n    \n}\n\n.lib-panel .row,\n.lib-panel .col-md-6 {\n    padding: 0;\n    background-color: #FFFFFF;\n}\n\n\n.lib-panel .lib-row {\n    padding: 0 20px 0 20px;\n\n}\n\n.lib-panel .lib-row.lib-header {\n    background-color: #FFFFFF;\n    font-size: 15px;\n    padding: 10px 20px 0 20px;\n}\n\n.lib-panel .lib-row.lib-header .lib-header-seperator {\n    height: 2px;\n    width: 26px;\n    background-color: #d9d9d9;\n    margin: 7px 0 7px 0;\n}\n\n.lib-panel .lib-row.lib-desc {\n    position: relative;\n    height: 100%;\n    display: block;\n    font-size: 13px;\n}\n.lib-panel .lib-row.lib-desc a{\n    position: absolute;\n    width: 100%;\n    bottom: 10px;\n    left: 20px;\n}\n\n.lib-panel .lib-btn-group{\n    position: absolute;\n    bottom: 0;\n    right: 0;\n}\n\n\n\n.row-margin-bottom {\n    margin-bottom: 20px;\n}\n\n.box-shadow {\n    box-shadow: 0 0 10px 0 rgba(0,0,0,.10);\n}\n\n.lib-item{\n    padding-left:40px;\n    padding-right:40px;\n}\n\n.no-padding {\n    padding: 0;\n}\n\nul {\n  list-style-type: none;\n}\n"

/***/ },

/***/ 666:
/***/ function(module, exports) {

module.exports = ".page-header h1 {\n  color: white;\n  font-size: 400%;\n}\n\n.page-header h3 {\n\tfont-size: 200%\n}\n\n/*landing*/\n.landing-page{\n  background-color:rgba(0, 0, 0, 0.4);\n  padding-bottom:5%;\n  padding-top:5%;\n}\n\n#bg {\n  position: fixed; \n  top: -50%; \n  left: -50%; \n  width: 200%; \n  height: 200%;\n  z-index: -1;\n}\n#bg img {\n  position: absolute; \n  top: 0; \n  left: 0; \n  right: 0; \n  bottom: 0; \n  margin: auto; \n  min-width: 50%;\n  min-height: 50%;\n  opacity: 0.3;\n  background-color: rgba(255, 255, 255, 1);\n}\n\n"

/***/ },

/***/ 667:
/***/ function(module, exports) {

module.exports = "\n\n.card {\n    padding-top: 20px;\n    margin: 10px 0 20px 0;\n    background-color: rgba(214, 224, 226, 0.2);\n    border-top-width: 0;\n    border-bottom-width: 2px;\n    border-radius: 3px;\n    box-shadow: none;\n    box-sizing: border-box;\n}\n\n.card .card-heading {\n    padding: 0 20px;\n    margin: 0;\n}\n\n.card .card-heading.simple {\n    font-size: 20px;\n    font-weight: 300;\n    color: #777;\n    border-bottom: 1px solid #e5e5e5;\n}\n\n.card .card-heading.image img {\n    display: inline-block;\n    width: 46px;\n    height: 46px;\n    margin-right: 15px;\n    vertical-align: top;\n    border: 0;\n    border-radius: 50%;\n}\n\n.card .card-heading.image .card-heading-header {\n    display: inline-block;\n    vertical-align: top;\n}\n\n.card .card-heading.image .card-heading-header h3 {\n    margin: 0;\n    font-size: 14px;\n    line-height: 16px;\n    color: #262626;\n}\n\n.card .card-heading.image .card-heading-header span {\n    font-size: 12px;\n    color: #999999;\n}\n\n.card .card-body {\n    padding: 0 20px;\n    margin-top: 20px;\n}\n\n.card .card-media {\n    padding: 0 20px;\n    margin: 0 -14px;\n}\n\n.card .card-media img {\n    max-width: 100%;\n    max-height: 100%;\n}\n\n.card .card-actions {\n    min-height: 30px;\n    padding: 0 20px 20px 20px;\n    margin: 20px 0 0 0;\n}\n\n.card .card-comments {\n    padding: 20px;\n    margin: 0;\n    background-color: #f8f8f8;\n}\n\n.card .card-comments .comments-collapse-toggle {\n    padding: 0;\n    margin: 0 20px 12px 20px;\n}\n\n.card .card-comments .comments-collapse-toggle a,\n.card .card-comments .comments-collapse-toggle span {\n    padding-right: 5px;\n    overflow: hidden;\n    font-size: 12px;\n    color: #999;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.card-comments .media-heading {\n    font-size: 13px;\n    font-weight: bold;\n}\n\n.card.people {\n    position: relative;\n    display: inline-block;\n    width: 170px;\n    height: 300px;\n    padding-top: 0;\n    margin-left: 20px;\n    overflow: hidden;\n    vertical-align: top;\n}\n\n.card.people:first-child {\n    margin-left: 0;\n}\n\n.card.people .card-top {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: inline-block;\n    width: 170px;\n    height: 150px;\n    background-color: #ffffff;\n}\n\n.card.people .card-top.green {\n    background-color: #53a93f;\n}\n\n.card.people .card-top.blue {\n    background-color: #427fed;\n}\n\n.card.people .card-info {\n    position: absolute;\n    top: 150px;\n    display: inline-block;\n    width: 100%;\n    height: 101px;\n    overflow: hidden;\n    background: #ffffff;\n    box-sizing: border-box;\n}\n\n.card.people .card-info .title {\n    display: block;\n    margin: 8px 14px 0 14px;\n    overflow: hidden;\n    font-size: 16px;\n    font-weight: bold;\n    line-height: 18px;\n    color: #404040;\n}\n\n.card.people .card-info .desc {\n    display: block;\n    margin: 8px 14px 0 14px;\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 16px;\n    color: #737373;\n    text-overflow: ellipsis;\n}\n\n.card.people .card-bottom {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    display: inline-block;\n    width: 100%;\n    padding: 10px 20px;\n    line-height: 29px;\n    text-align: center;\n    box-sizing: border-box;\n}\n\n.card.hovercard {\n    position: relative;\n    padding-top: 0;\n    overflow: hidden;\n    text-align: center;\n    background-color: rgba(214, 224, 226, 0.2);\n}\n\n.card.hovercard .cardheader .img {\n    /*background: url(\"http://lorempixel.com/850/280/nature/4/\");*/\n    background-size: cover;\n\n    height: 135px;\n}\n\n.card.hovercard .avatar {\n    position: relative;\n    top: -50px;\n    margin-bottom: -50px;\n}\n\n.card.hovercard .avatar img {\n    width: 100px;\n    height: 100px;\n    max-width: 100px;\n    max-height: 100px;\n    border-radius: 50%;\n    border: 5px solid rgba(255,255,255,0.5);\n}\n\n.card.hovercard .info {\n    padding: 4px 8px 10px;\n}\n\n.card.hovercard .info .title {\n    margin-bottom: 4px;\n    font-size: 24px;\n    line-height: 1;\n    color: #262626;\n    vertical-align: middle;\n}\n\n.card.hovercard .info .desc {\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 20px;\n    color: #737373;\n    text-overflow: ellipsis;\n}\n\n.card.hovercard .bottom {\n    padding: 0 20px;\n    margin-bottom: 17px;\n}\n\n.btn-rounded{ border-radius: 50%; width:32px; height:32px; line-height:18px;  }\n"

/***/ },

/***/ 668:
/***/ function(module, exports) {

module.exports = "<div class=\"page-wrap\">\n  <nav class=\"navbar navbar-inverse\">\n    <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a href=\"./\" class=\"navbar-brand glyphicon glyphicon-home\"></a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n          <li><a href=\"#\">API</a></li>\n          <li><a href=\"#\">Products</a></li>\n          \n        </ul>\n        <ul class=\"nav navbar-nav navbar-right\">\n        <li *ngIf=\"!isLoggedIn\"><a routerLink=\"/signup\">Sign Up</a></li>\n        <li *ngIf=\"!isLoggedIn\"><a routerLink=\"/login\">Login</a></li>\n        <li *ngIf=\"isLoggedIn\" class=\"dropdown\">\n                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> Welcome back! <span class=\"caret\"></span></a>\n                <ul class=\"dropdown-menu\">\n                  <li><a href=\"/profile\">Profile</a></li>\n                  <li><a href=\"#\">User list</a></li>\n                  <li><a href=\"/items\">Items</a></li>\n                  <li role=\"separator\" class=\"divider\"></li>\n                  <li><a (click)=\"logout()\" class=\"pointer\">Logout</a></li>\n                </ul>\n        </li>\n        <li *ngIf=\"isLoggedIn\"></li>\n      </ul>\n    </div><!-- /.navbar-collapse -->\n    </div><!-- /.container-fluid -->\n  </nav>\n\n  <router-outlet></router-outlet>\n    \n\n</div>\n\n<footer class=\"text-center\">\n  <p>Grocerybot &copy; {{currentYear}} - by <a href=\"http://matchyourtie.com\">matchyourtie</a></p>\n</footer>"

/***/ },

/***/ 669:
/***/ function(module, exports) {

module.exports = "\n<div class=\"container\">\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\n            <div class=\"input-group\">\n\t\t      <input type=\"text\" class=\"form-control\" placeholder=\"Search for...\" >\n\t\t      <span class=\"input-group-btn\">\n\t\t        <button class=\"btn btn-success\" type=\"button\" (click)=\"addItem()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n\t\t      </span>\n\t\t    </div><!-- /input-group -->\n        </div>\n    </div>\n\n    <hr>\n\n    <div class=\"row\">\n\t    \t<div class=\"col-md-6 lib-item\" *ngFor =\"let item of items\">\n\t            <div class=\"lib-panel\">\n\t                <div class=\"row box-shadow\">\n\t                    <div class=\"col-md-6 lib-img-wrapper\">\n\t                        <img class=\"lib-img\" src=\"{{item.pic}}\">\n\t                    </div>\n\t                    <div class=\"col-md-6 lib-wrapper\">\n\t                        <div class=\"lib-row lib-header\">\n\t                            <p><strong>{{item?.name?.it?.main}}</strong> <span class=\"text-muted\"><i>{{item?.name?.it?.spec}}</i> (it)</span></p>\n\t                            <p><strong>{{item?.name?.de?.main}}</strong> <span class=\"text-muted\"><i>{{item?.name?.de?.spec}}</i> (de)</span></p>\n\t                            <p><strong>{{item?.name?.pl?.main}}</strong> <span class=\"text-muted\"><i>{{item?.name?.de?.spec}}</i> (pl)</span></p>\n\t                            \n\t                        </div>\n\t                        <div class=\"lib-row lib-desc\">\n\t\t                       \n\t                        </div>\n\t                         <div class=\"btn-group lib-btn-group\">\n\t\t                        \t <button type=\"button\" class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" data-target=\"#editModal\" (click)=\"selectId(item._id)\">\n\t\t\t\t\t\t\t\t  \t\t<i class=\"fa fa-pencil right\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t                            <button type=\"button\" class=\"btn btn-danger btn-sm\" data-toggle=\"modal\" data-target=\"#deleteModal\" (click)=\"selectId(item._id)\">\n\t\t\t\t\t\t\t\t  \t\t<i class=\"fa fa-trash right\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div> \n\t                    </div>\n\t                </div>\n\t            </div>\n\t        </div>\n    </div>\n\n</div>\n\n\n\n<!-- Edit Modal -->\n<div class=\"modal fade\" id=\"editModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Edit Item\">\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n  \t<form (ngSubmit)=\"updateItem()\">\n\t  \t<div class=\"modal-content\">\n\t      <div class=\"modal-header\">\n\t        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t        <h4 class=\"modal-title\" id=\"myModalLabel\">Edit Item {{$item.id}}</h4>\n\t      </div>\n\t      <div class=\"modal-body\">\n\t      \t<div class=\"form-group\">\n\t      \t\t<label for=\"Image url\">Img url</label>\n\t      \t\t<input type=\"text\" class=\"form-control\" name=\"pic-url\" [(ngModel)] = \"$item.data.pic\">\n\t      \t</div>\n\t\t    <div class=\"sidebar-category\">\n\t\t        <ul class=\"nav nav-tabs\">\n\t\t          <li [class.active]=\"panelshow == 'DE'\"> <a (click)=\"setPanel('DE')\">DE</a></li>\n\t\t          <li [class.active]=\"panelshow == 'PL'\"> <a (click)=\"setPanel('PL')\">PL</a></li>\n\t\t          <li [class.active]=\"panelshow == 'IT'\"> <a (click)=\"setPanel('IT')\">IT</a></li>\n\t\t        </ul>\n\t\t        <div *ngIf=\"panelshow == 'DE'\"> \n\t\t\t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Main name</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"de-main\" [(ngModel)] = \"$item.data.name.de.main\">\n\t      \t\t\t</div>\n\t      \t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Spec</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"de-spec\" [(ngModel)] = \"$item.data.name.de.spec\">\n\t      \t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"panelshow == 'PL'\"> \n\t\t\t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Main name</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"pl-main\" [(ngModel)] = \"$item.data.name.pl.main\">\n\t      \t\t\t</div>\n\t      \t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Spec</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"pl-spec\" [(ngModel)] = \"$item.data.name.pl.spec\">\n\t      \t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"panelshow == 'IT'\"> \n\t\t\t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Main name</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"it-main\" [(ngModel)] = \"$item.data.name.it.main\">\n\t      \t\t\t</div>\n\t      \t\t\t<div class=\"form-group\">\n\t      \t\t\t\t<label for=\"Image url\">Spec</label>\n\t      \t\t\t\t<input type=\"text\" class=\"form-control\" name=\"it-spec\" [(ngModel)] = \"$item.data.name.it.spec\">\n\t      \t\t\t</div>\n\t\t\t\t</div>\n\t\t        <p>{{$item.data | json}}</p>\n\t\t     </div>\n\t\t   </div>\n\t      <div class=\"modal-footer\">\n\t        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n\t        <button type=\"submit\" class=\"btn btn-primary\" >Save changes</button>\n\t      </div>\n\t    </div>\n    </form>\n  </div>\n</div>\n\n<!--DELETE Modal-->\n<div class=\"modal fade\" id=\"deleteModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Delete Item\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\" id=\"myModalLabel\">Delete Item</h4>\n      </div>\n      <div class=\"modal-body\">\n        <h3 class=\"centered\">Are you sure you want to delete this item?</h3>\n        <div class=\"row\">\n        \t<div class=\"col-md-12\">{{$item.data | json}}</div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">No</button>\n        <button type=\"button\" class=\"btn btn-primary\"  (click)=\"deleteItem($item.data)\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n"

/***/ },

/***/ 670:
/***/ function(module, exports) {

module.exports = "<div id=\"bg\">\n  <img src=\"http://thelala.com/wp-content/uploads/2015/10/o-GROCERY-SHOPPING-facebook.jpg\" alt=\"\">\n</div>\n\n<header>\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t<div class=\"page-header text-center landing-page circleBase\">\n\t\t\t\t\t<h1>Welcome in Grocerybot</h1>\n\t\t\t\t\t<h3>Your personal assistant for daily grocery shopping</h3>\n\t\t\t\t\t<p> Multilingual grocery lists\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</header>\n\n\n"

/***/ },

/***/ 671:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n  <div *ngIf=\"user\">\n    <div *ngIf=\"successMessage\" class=\"alert alert-success\">{{successMessage}}</div>\n    <div *ngIf=\"errorMessage\" class=\"alert alert-danger\">{{errorMessage}}</div>\n    \t<div class=\"row\">\n    \t\t<div class=\"col-lg-4  col-lg-offset-4 col-sm-6 col-sm-offset-3\">\n                <div class=\"card hovercard\">\n                    <div class=\"cardheader\">\n                      <img alt=\"\" src=\"{{user?.profile?.cover}}\" onError=\"this.src='http://lorempixel.com/850/280/nature/4/'\">\n                    </div>\n                    <div class=\"avatar\">\n                        <img alt=\"\" src=\"{{user?.profile?.avata}}\" onError=\"this.src= './assets/img/default-avatar.png';\">\n                    </div>\n                    <div class=\"info\">\n                        <div class=\"title\">\n                            {{user?.profile?.name}}\n                        </div>\n                        <div class=\"desc\">{{user?.email}}</div>\n                        <div class=\"desc\">{{user?.role}}</div>\n                    </div>\n                    <div class=\"bottom\">\n                      <button type=\"button\" class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" data-target=\"#myModal\">\n                        <span class=\"fa fa-edit\"></span> Update your profile\n                      </button>\n                        \n                    </div>\n                </div>\n                \n            </div>\n    \t</div>\n    </div>\n  </div>\n\n\n\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <form (ngSubmit) = \"updateUser()\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\" id=\"myModalLabel\">Editing your profile..</h4>\n        </div>\n        <div class=\"modal-body\">\n\n          <div class=\"form-group\">\n            <label>Name</label>\n            <p>{{user?.profile?.name}}</p>\n            <input type=\"text\" class=\"form-control\" name=\"name\" [(ngModel)] = \"user.profile.name\" />\n          </div>\n\n          <div class=\"form-group\">\n            <label>Email</label>\n            <input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\"/>\n          </div>\n          \n        </div>\n\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          <button class=\"btn btn-success\" type=\"submit\" >Update User</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n\n\n"

/***/ },

/***/ 695:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(391);


/***/ }

},[695]);
//# sourceMappingURL=main.bundle.map