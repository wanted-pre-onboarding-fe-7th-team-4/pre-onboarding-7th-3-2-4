import { getCookie, removeCookies, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { COOKIE_KEY } from "lib/constants/constants";
import { NextApiResponse } from "next";

class CookieService {
  static getCookies(res: NextApiResponse, config?: OptionsType) {
    try {
      const cookies = JSON.parse(getCookie(COOKIE_KEY, config) as string);
      return cookies;
    } catch {
      return res.redirect("/");
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
