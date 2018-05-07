import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { User } from "../models/user.models";
import { BaseApi } from "../core/base-api";


@Injectable()

export class UserService extends BaseApi{
    constructor(public http: Http) {
        super(http);
    }

    getUserByEmail(email: string): Observable<User> {
        return this.get(`users?email=${email}`);
    }

    createNewUser(user: User): Observable<User> {
        return this.post('user', user);
    }
}