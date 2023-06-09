import {defineStore} from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            username: "cliffosego2000@gmail.com",
        }
    }
})