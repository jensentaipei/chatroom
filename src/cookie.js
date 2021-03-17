export default function () {
    function getCookie(cookieName) {
        let cookie = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cookie) == 0) {
                return c.substring(cookie.length, c.length);
            }
        }
        return "";
    }

    function setCookie(name,cookie) {
        document.cookie = `${name}=${cookie}`;
    }

    return {
        getCookie,
        setCookie
    }
}