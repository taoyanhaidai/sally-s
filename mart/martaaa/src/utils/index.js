//拿到session存储的数据
export function getSession(key) {
    return window.sessionStorage.getItem(key)
}
//存储到Session
export function setSession(key, val) {
    window.sessionStorage.setItem(key, val)
}