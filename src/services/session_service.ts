export function checkUserSession() {
    const token = localStorage.getItem('info');
    if(token == null) {
        localStorage.clear();
        return false;
    }
    return true;
}

export function storeSession(info: any) {
    localStorage.setItem('info', JSON.stringify(info));
}

export function getUserInfo() {
    return JSON.parse(localStorage.getItem('info') ?? "{}");
}

export function clearSession() {
    localStorage.clear();
    sessionStorage.clear();
}