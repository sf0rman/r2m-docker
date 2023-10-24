import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CookieContextType {
  setCookie: (name: string, value: string, options?: { path?: string }) => void;
  getCookie: (name: string) => string | undefined;
  reloadCookies: () => void;
  clearCookies: () => void;
}

const CookieContext = createContext<CookieContextType>({
  setCookie: () => {},
  getCookie: () => undefined,
  reloadCookies: () => {},
  clearCookies: () => {},
});

interface CookieProviderProps {
  children: ReactNode;
}

const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const [cookies, setCookies] = useState<Record<string, string>>({});

  const setCookie = (
    name: string,
    value: string,
    options: { path?: string } = {}
  ) => {
    const cookieOptions = {
      path: "/",
      ...options,
    };
    const cookieString = `${name}=${value}; path=${cookieOptions.path}`;
    document.cookie = cookieString;
    setCookies({ ...cookies, [name]: value });
  };

  const getCookie = (name: string) => {
    return cookies[name];
  };

  const clearCookies = () => {
    document.cookie = ``;
    setCookies({});
  };

  const reloadCookies = () => {
    const cookieArray = document.cookie.split("; ");
    const cookieObject = cookieArray.reduce((prev, current) => {
      const [name, value] = current.split("=");
      prev[name] = value;
      return prev;
    }, {} as Record<string, string>);
    setCookies(cookieObject);
  };

  useEffect(() => {
    reloadCookies();
  }, [document.cookie]);

  return (
    <CookieContext.Provider
      value={{ setCookie, getCookie, clearCookies, reloadCookies }}
    >
      {children}
    </CookieContext.Provider>
  );
};

const useCookies = () => {
  const context = useContext(CookieContext);
  return context;
};

export { CookieProvider, useCookies };
