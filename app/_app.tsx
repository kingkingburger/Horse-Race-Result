"use client";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { Component } from "react";

class MyApp extends Component<any> {
  render() {
    let { Component, pageProps } = this.props;
    return (
      // 2. Use at the root of your app
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    );
  }
}

export default MyApp;
