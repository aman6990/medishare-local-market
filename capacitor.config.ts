
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3dcc18ce1eb74e4492b69cc5ab8637f3',
  appName: 'medishare-local-market',
  webDir: 'dist',
  server: {
    url: 'https://3dcc18ce-1eb7-4e44-92b6-9cc5ab8637f3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
      keystorePassword: null,
      keystoreAliasPassword: null,
      releaseType: null,
    }
  }
};

export default config;
