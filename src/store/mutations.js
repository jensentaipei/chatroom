import cookie from '../cookie.js';

const { setCookie:setCookie } = cookie();

export default {
    checkUser(state, payload) {
        state.user = payload;
    },
    setUser(state, payload) {
        setCookie('user',payload);
        state.user = payload;
    },
}