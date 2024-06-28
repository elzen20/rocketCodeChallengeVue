/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SOME_KEY: string; // Define aquí tus variables de entorno
    // Otras variables de entorno...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  