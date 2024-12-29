const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.arroziqi.mobiletahsin.dev";
  }

  if (IS_PREVIEW) {
    return "com.arroziqi.mobiletahsin.preview";
  }

  return "com.arroziqi.mobiletahsin";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Tahsin (Dev)";
  }

  if (IS_PREVIEW) {
    return "Tahsin (Preview)";
  }

  return "Tahsin";
};


export default {
  "expo": {
    "name": getAppName(),
    "slug": "tahsin-mobile-client",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": getUniqueIdentifier(),
      "buildNumber": "1",
      "runtimeVersion": "1.0.0",
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": getUniqueIdentifier(),
      "versionCode": 1,
      "runtimeVersion": "1.0.0",
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "acc29af5-fa4f-45e5-b1c5-b85b1ab27bd7"
      }
    },
    "owner": "arroziqi",
    "updates": {
      "url": "https://u.expo.dev/acc29af5-fa4f-45e5-b1c5-b85b1ab27bd7"
    }
  }
}
