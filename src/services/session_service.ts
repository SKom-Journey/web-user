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
    const userInfo = localStorage.getItem('info');
    if(userInfo == 'null') {
        clearSession();
        location.href = '/auth/login';
        return;
    }

    return JSON.parse(userInfo ?? "{}");
}

export function clearSession() {
    localStorage.clear();
    sessionStorage.clear();
}