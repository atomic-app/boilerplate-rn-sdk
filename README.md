# README

## About

This template can be used to quickly bootstrap a React Native app that integrates the [Atomic.io SDK](https://documentation.atomic.io/sdks/react-native). 
It uses the React Native CLI and is based on the default react-native init [template](https://github.com/facebook/react-native/tree/main/template). 

## Getting Started

To create a project using this template, in your terminal run the following command:

```
npx react-native init MyAtomicApp --template "atomic-app/boilerplate-rn-sdk" --npm
```

To include setup for push notifications, append #push-notification-support to the argument given to the `--template` flag. For example:

```
npx react-native init MyAtomicApp --template "atomic-app/boilerplate-rn-sdk#push-notification-support" --npm
```

To run the app and setup authentication. Refer to the README.md file in the generated project. 

## Troubleshooting

If you have issues bootstrapping this project, first make sure that you have followed the [environment setup](https://reactnative.dev/docs/environment-setup) for the React Native CLI, and then try calling the `init` command without the template argument. 

```
npx react-native init MyAtomicApp --npm
```

If the base template succeeds, but the Atomic template fails. Get in touch with [support@atomic.io](mailto:support@atomic.io) or file an issue in this repository. 
