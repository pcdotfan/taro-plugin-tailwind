import React, { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import Logo from "../../logo.svg";
import "./index.css";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index min-h-screen bg-gray-100 p-6 flex flex-col justify-center">
        <View className="relative px-4 py-10 bg-white shadow-lg rounded-3xl p-20">
          <Image src={Logo} className="h-7" />
          <View className="py-8 text-base leading-6 text-gray-700">
            <View className="py-4">
              An advanced online playground for Tailwind CSS, including support
              for things like:
            </View>
            <View className="list-disc">
              <View className="flex items-start mb-1">
                <View className="h-6 flex items-center">
                  <View className="flex-shrink-0 h-2 w-2 bg-cyan-500 rounded-full"></View>
                </View>
                <Text className="ml-2">
                  Customizing your
                  <Text className="px-2 text-sm font-bold text-gray-900">
                    tailwind.config.js
                  </Text>
                  file
                </Text>
              </View>
              <View className="flex items-start mb-1">
                <View className="h-6 flex items-center">
                  <View className="flex-shrink-0 h-2 w-2 bg-cyan-500 rounded-full"></View>
                </View>
                <Text className="ml-2">
                  Extracting classes with
                  <Text className="px-2 text-sm font-bold text-gray-900">
                    @apply
                  </Text>
                </Text>
              </View>
              <View className="flex items-start">
                <View className="h-6 flex items-center">
                  <View className="flex-shrink-0 h-2 w-2 bg-cyan-500 rounded-full"></View>
                </View>
                <Text className="ml-2">
                  Code completion with instant preview
                </Text>
              </View>
            </View>
            <View className="py-4">
              Perfect for learning how the framework works, prototyping a new
              idea, or creating a demo to share online.
            </View>
          </View>
          <View className="pt-6 leading-6 font-bold text-lg">
            <Text>Want to dig deeper into Tailwind?</Text>
            <Text className="text-cyan-600">Read the docs &rarr;</Text>
          </View>
        </View>
      </View>
    );
  }
}
