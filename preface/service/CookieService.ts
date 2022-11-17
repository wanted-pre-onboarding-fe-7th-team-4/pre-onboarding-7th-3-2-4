import { getCookie, removeCookies, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { COOKIE_KEY } from "lib/constants/constants";

class CookieService {
  static getCookies(config?: OptionsType) {
    try {
      const cookies = JSON.parse(getCookie(COOKIE_KEY, config) as string);
      return cookies;
    } catch {
      return { ok: false };
    }
  }
  static setCookie(value: string, config?: OptionsType) {
    try {
      setCookie(COOKIE_KEY, value, config);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
  static removeCookie(config?: OptionsType) {
    removeCookies(COOKIE_KEY, config);
  }
}

export default CookieService;
