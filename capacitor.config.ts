import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eventmanager.com',
  appName: 'Eventsace',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
