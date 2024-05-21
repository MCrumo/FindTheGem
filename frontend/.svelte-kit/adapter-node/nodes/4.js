import * as server from '../entries/pages/expenses/_id_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/expenses/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/expenses/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.DQmiy0BV.js","_app/immutable/chunks/scheduler.zOPVm9UK.js","_app/immutable/chunks/index.CRI0LGqC.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/label.DittN4fT.js","_app/immutable/chunks/index.BSI70JBw.js","_app/immutable/chunks/index.uo9447RN.js","_app/immutable/chunks/each.DLjCess3.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.CM2U4_-u.js","_app/immutable/chunks/entry.ChQJoGXI.js","_app/immutable/chunks/stores.Ts1R9On4.js"];
export const stylesheets = ["_app/immutable/assets/4.Crp_yK76.css","_app/immutable/assets/Toaster.CqNDpgoD.css"];
export const fonts = [];
