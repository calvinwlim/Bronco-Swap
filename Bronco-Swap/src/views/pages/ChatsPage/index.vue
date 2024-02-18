<template>
    <div style="height: 90vh">
      <PrettyChatWindow
        :projectId="projectId"
        :username="username"
        :secret="secret"
      />
    </div>
  </template>
  
  <style>
  .ce-new-chat-button {
    width: 32px;
    position: relative;
    bottom: 22px;
  }
  </style>
  
  <script>
  import { PrettyChatWindow } from "react-chat-engine-pretty";
  import { applyReactInVue } from "veaury";
  import { VITE_CHAT_ENGINE_PROJECT_ID, VITE_CHAT_ENGINE_PRIVATE_KEY } from '../AuthPage/keys';
  
  export default {
    data() {
      return {
        //projectId: import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
        projectId: VITE_CHAT_ENGINE_PROJECT_ID,
      };
    },
    components: {
      PrettyChatWindow: applyReactInVue(PrettyChatWindow),
    },
    props: {
      username: {
        type: String,
        required: true,
      },
      secret: {
        type: String,
        required: true,
      },
    },
  };
  </script>