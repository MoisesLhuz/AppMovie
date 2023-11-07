import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home';
import { Routes } from './src/routes';
import { MovieProvider } from './src/contents/MoviesContents';

export default function App() {
  return (
    <>
      <MovieProvider>
        <Routes />
        <StatusBar style="light" translucent backgroundColor='#242a32' />
      </MovieProvider>
    </>
  );
}

