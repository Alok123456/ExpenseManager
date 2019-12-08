import { shallowMount } from "@vue/test-utils";
import Planned from "@/views/Planned.vue";
import store from "@/store";
import router from "@/router";

let wrapper;

describe("Planned.vue", () => {
    beforeEach(() => {
        wrapper = shallowMount(Planned, {store, router});
    })

    it("should show table header, input and button initially", ()=> {
         
    })
});