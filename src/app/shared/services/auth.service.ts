export class AuthService{

    private isAuthenticated = false;

    login() {
        this.isAuthenticated = true;
    }

    loguot(){
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggetIn(): boolean {
        return this.isAuthenticated;
    }

}