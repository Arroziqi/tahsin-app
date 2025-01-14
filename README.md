# Project Documentation

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Overview

This project consists of two main components: a NestJS API and an Expo mobile client. The API serves as the backend, while the mobile client provides a user interface for mobile devices.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Docker**: For containerization of the API. [Install Docker](https://www.docker.com/get-started).
2. **Node.js**: Required for the mobile client development. [Download Node.js](https://nodejs.org/).
3. **Expo CLI**: For running the mobile application. Install it globally using:

   ```bash
   npm install -g expo-cli
   ```

4. **Git**: For version control. [Download Git](https://git-scm.com/).

## API Setup

### Clone the Repository

```bash
git clone https://github.com/Arroziqi/tahsin-app
cd tahsin-app/tahsin-api
```

### Build and Run the API with Docker

1. **Build and Run**:

   ```bash
   docker-compose up --build
   ```

2. **Access the API**:
   - Once the container is running, you can access the API at `http://localhost:5000` (or the port specified in your `docker-compose.yml`).

## Mobile Client Setup

### Clone the Repository

If you haven't already, clone the mobile client repository:

```bash
git clone https://github.com/Arroziqi/tahsin-app
cd tahsin-app/tahsin-mobile-client
```

### Install Dependencies

```bash
npm install
```

### Start the Mobile Application

To run the mobile application, use the following command:

```bash
npx expo start
```

- This will open a browser window with options to run the app in:
  - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
  - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
  - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
  - [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo.

## Project Structure

### API

- The API is built using the [NestJS](https://nestjs.com/) framework.
- To compile and run the project, use:

  ```bash
  # Development
  npm run start

  # Watch mode
  npm run start:dev

  # Production mode
  npm run start:prod
  ```

- To run tests:

  ```bash
  # Unit tests
  npm run test

  # E2E tests
  npm run test:e2e

  # Test coverage
  npm run test:cov
  ```

### Mobile Client

- The mobile client is built using [Expo](https://expo.dev).
- You can start developing by editing the files inside the **app** directory.

## Deployment

For deploying your NestJS application to production, refer to the [NestJS deployment documentation](https://docs.nestjs.com/deployment).

If you want to deploy your application to AWS, you can use [Mau](https://mau.nestjs.com):

```bash
npm install -g mau
mau deploy
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Expo Documentation](https://docs.expo.dev/)
- [Join the Expo Community on Discord](https://chat.expo.dev)

```

```
