/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: 'dev' | 'prod';
  readonly VITE_BACK_URL: string;
  readonly VITE_YAMAP_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
