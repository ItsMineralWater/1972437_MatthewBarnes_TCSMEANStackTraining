import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class MyAuthGuard implements CanActivate {
    canActivate(){
        let key = localStorage.getItem("token");
        if (key != null) {
            return true;
        }
        return false;
    }

}