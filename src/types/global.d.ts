/**
 * 全局类型定义
 * 用于扩展 window 对象和其他全局类型
 */

// 扩展 Window 接口，支持 Web3 钱包
interface Window {
  ethereum?: {
    request: (args: {
      method: string;
      params?: unknown[];
    }) => Promise<unknown>;
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    isPhantom?: boolean;
    on?: (event: string, handler: (...args: unknown[]) => void) => void;
    removeListener?: (
      event: string,
      handler: (...args: unknown[]) => void
    ) => void;
  };
}

// 扩展事件类型，支持自定义事件
interface WindowEventMap {
  'auth:token-expired': CustomEvent;
  'auth:login-success': CustomEvent<{ userId: number }>;
  'auth:logout': CustomEvent;
}
