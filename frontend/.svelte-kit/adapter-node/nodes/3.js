import * as server from '../entries/pages/expenses/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/expenses/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/expenses/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.Q-Uq-60e.js","_app/immutable/chunks/scheduler.zOPVm9UK.js","_app/immutable/chunks/index.CRI0LGqC.js","_app/immutable/chunks/each.DLjCess3.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/index.uo9447RN.js","_app/immutable/chunks/index.BSI70JBw.js","_app/immutable/chunks/label.DittN4fT.js","_app/immutable/chunks/entry.ChQJoGXI.js"];
export const stylesheets = [];
export const fonts = [];
