export function storeTableNumber(number: string) {
    sessionStorage.setItem('table', number);
}

export function checkTableNumber() {
    const table = sessionStorage.getItem('table');
    
    if(table == null) {
        sessionStorage.clear();
        return false;
    }

    return true;
}

export function getTableNumber() {
    return sessionStorage.getItem('table');
}