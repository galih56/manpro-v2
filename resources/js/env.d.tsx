
interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string
    readonly VITE_APP_NAME: string
    readonly VITE_APP_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }