<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  body {
    margin: 0;
    font-family: scada, Tahoma, sans-serif;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  button:disabled,
  button[disabled] {
    background-color: #cccccc !important;
    color: #666666 !important;
  }
</style>