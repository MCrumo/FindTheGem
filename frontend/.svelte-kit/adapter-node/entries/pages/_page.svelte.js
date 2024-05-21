import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-yyjjjs">Welcome to SvelteKit</h1> <p data-svelte-h="svelte-jl9sbz">Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Click me`;
    }
  })}`;
});
export {
  Page as default
};
