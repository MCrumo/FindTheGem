import { c as compute_rest_props, a as subscribe, o as onDestroy, g as get_store_value, h as hasContext, b as getContext, s as setContext, n as noop, i as is_promise } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, h as escape_object, a as add_attribute, v as validate_component, g as escape_attribute_value, f as each, e as escape } from "../../../../chunks/ssr.js";
import { b as createBitAttrs, c as createSeparator, e as removeUndefined$1, f as getOptionUpdater$1, I as Icon, L as Label, l as Input, R as Root, T as Trigger, C as CalendarIcon, P as Popover_content, m as Calendar_1 } from "../../../../chunks/label.js";
import { nanoid } from "nanoid/non-secure";
import { w as writable, d as derived } from "../../../../chunks/index2.js";
import { x as cn, B as Button, z as buttonVariants } from "../../../../chunks/index3.js";
import { DateFormatter, parseDate, getLocalTimeZone } from "@internationalized/date";
import "dequal";
import "clsx";
import { a as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
import { s as superForm, d as dateProxy } from "../../../../chunks/formData.js";
import "just-clone";
import "ts-deepmerge";
import "../../../../chunks/index.js";
import "devalue";
function getSeparatorData() {
  const NAME = "separator";
  const PARTS = ["root"];
  return {
    NAME,
    PARTS
  };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getSeparatorData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const separator = { ...createSeparator(removeUndefined$1(props)), getAttrs };
  return {
    ...separator,
    updateOption: getOptionUpdater$1(separator.options)
  };
}
const Separator$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["orientation", "decorative", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { orientation = "horizontal" } = $$props;
  let { decorative = true } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, updateOption, getAttrs } = setCtx$1({ orientation, decorative });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  const attrs = getAttrs("root");
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0)
    $$bindings.decorative(decorative);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("decorative", decorative);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Grip_vertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "9", "cy": "12", "r": "1" }],
    ["circle", { "cx": "9", "cy": "5", "r": "1" }],
    ["circle", { "cx": "9", "cy": "19", "r": "1" }],
    ["circle", { "cx": "15", "cy": "12", "r": "1" }],
    ["circle", { "cx": "15", "cy": "5", "r": "1" }],
    ["circle", { "cx": "15", "cy": "19", "r": "1" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "grip-vertical" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const GripVertical = Grip_vertical;
function safeOnDestroy(fn) {
  try {
    onDestroy(fn);
  } catch {
    return fn();
  }
}
function derivedWithUnsubscribe(stores, fn) {
  let unsubscribers = [];
  const onUnsubscribe = (cb) => {
    unsubscribers.push(cb);
  };
  const unsubscribe = () => {
    unsubscribers.forEach((fn2) => fn2());
    unsubscribers = [];
  };
  const derivedStore = derived(stores, ($storeValues) => {
    unsubscribe();
    return fn($storeValues, onUnsubscribe);
  });
  safeOnDestroy(unsubscribe);
  const subscribe2 = (...args) => {
    const unsub = derivedStore.subscribe(...args);
    return () => {
      unsub();
      unsubscribe();
    };
  };
  return {
    ...derivedStore,
    subscribe: subscribe2
  };
}
function clientEffect(stores, fn) {
  if (!isBrowser)
    return () => {
    };
  const unsub = derivedWithUnsubscribe(stores, (stores2, onUnsubscribe) => {
    return {
      stores: stores2,
      onUnsubscribe
    };
  }).subscribe(({ stores: stores2, onUnsubscribe }) => {
    const returned = fn(stores2);
    if (returned) {
      onUnsubscribe(returned);
    }
  });
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = writable(value);
  });
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
let currentState = null;
let element = null;
function getCursorStyle(state) {
  switch (state) {
    case "horizontal":
      return "ew-resize";
    case "horizontal-max":
      return "w-resize";
    case "horizontal-min":
      return "e-resize";
    case "vertical":
      return "ns-resize";
    case "vertical-max":
      return "n-resize";
    case "vertical-min":
      return "s-resize";
  }
}
function resetGlobalCursorStyle() {
  if (element === null)
    return;
  document.head.removeChild(element);
  currentState = null;
  element = null;
}
function setGlobalCursorStyle(state) {
  if (currentState === state)
    return;
  currentState = state;
  const style = getCursorStyle(state);
  if (element === null) {
    element = document.createElement("style");
    document.head.appendChild(element);
  }
  element.innerHTML = `*{cursor: ${style}!important;}`;
}
function computePaneFlexBoxStyle({ defaultSize, dragState, layout, paneData, paneIndex, precision = 3 }) {
  const size = layout[paneIndex];
  let flexGrow;
  if (size == null) {
    flexGrow = defaultSize ?? "1";
  } else if (paneData.length === 1) {
    flexGrow = "1";
  } else {
    flexGrow = size.toPrecision(precision);
  }
  return styleToString({
    "flex-basis": 0,
    "flex-grow": flexGrow,
    "flex-shrink": 1,
    // Without this, pane sizes may be unintentionally overridden by their content
    overflow: "hidden",
    // Disable pointer events inside of a pane during resize
    // This avoid edge cases like nested iframes
    "pointer-events": dragState !== null ? "none" : void 0
  });
}
function calculateAriaValues({ layout, panesArray, pivotIndices }) {
  let currentMinSize = 0;
  let currentMaxSize = 100;
  let totalMinSize = 0;
  let totalMaxSize = 0;
  const firstIndex = pivotIndices[0];
  for (let i = 0; i < panesArray.length; i++) {
    const { constraints } = panesArray[i];
    const { maxSize = 100, minSize = 0 } = constraints;
    if (i === firstIndex) {
      currentMinSize = minSize;
      currentMaxSize = maxSize;
    } else {
      totalMinSize += minSize;
      totalMaxSize += maxSize;
    }
  }
  const valueMax = Math.min(currentMaxSize, 100 - totalMinSize);
  const valueMin = Math.max(currentMinSize, 100 - totalMaxSize);
  const valueNow = layout[firstIndex];
  return {
    valueMax,
    valueMin,
    valueNow
  };
}
function generateId$1(idFromProps = null) {
  if (idFromProps == null)
    return nanoid(10);
  return idFromProps;
}
const LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;
const PRECISION = 10;
function initializeStorage(storageObject) {
  try {
    if (typeof localStorage === "undefined") {
      throw new Error("localStorage is not supported in this environment");
    }
    storageObject.getItem = (name) => localStorage.getItem(name);
    storageObject.setItem = (name, value) => localStorage.setItem(name, value);
  } catch (err) {
    console.error(err);
    storageObject.getItem = () => null;
    storageObject.setItem = () => {
    };
  }
}
function getPaneGroupKey(autoSaveId) {
  return `paneforge:${autoSaveId}`;
}
function getPaneKey(panes) {
  const sortedPaneIds = panes.map((pane) => {
    const { constraints, id, idIsFromProps, order } = pane;
    return idIsFromProps ? id : order ? `${order}:${JSON.stringify(constraints)}` : JSON.stringify(constraints);
  }).sort().join(",");
  return sortedPaneIds;
}
function loadSerializedPaneGroupState(autoSaveId, storage) {
  try {
    const paneGroupKey = getPaneGroupKey(autoSaveId);
    const serialized = storage.getItem(paneGroupKey);
    const parsed = JSON.parse(serialized || "");
    if (typeof parsed === "object" && parsed !== null) {
      return parsed;
    }
  } catch {
  }
  return null;
}
function loadPaneGroupState(autoSaveId, panes, storage) {
  const state = loadSerializedPaneGroupState(autoSaveId, storage) || {};
  const paneKey = getPaneKey(panes);
  return state[paneKey] || null;
}
function savePaneGroupState(autoSaveId, panes, paneSizesBeforeCollapse, sizes, storage) {
  const paneGroupKey = getPaneGroupKey(autoSaveId);
  const paneKey = getPaneKey(panes);
  const state = loadSerializedPaneGroupState(autoSaveId, storage) || {};
  state[paneKey] = {
    expandToSizes: Object.fromEntries(paneSizesBeforeCollapse.entries()),
    layout: sizes
  };
  try {
    storage.setItem(paneGroupKey, JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
}
const debounceMap = {};
function debounce(callback, durationMs = 10) {
  let timeoutId = null;
  const callable = (...args) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, durationMs);
  };
  return callable;
}
function updateStorageValues({ autoSaveId, layout, storage, paneDataArrayStore, paneSizeBeforeCollapseStore }) {
  const $paneDataArray = get_store_value(paneDataArrayStore);
  if (layout.length === 0 || layout.length !== $paneDataArray.length)
    return;
  let debouncedSave = debounceMap[autoSaveId];
  if (debouncedSave == null) {
    debouncedSave = debounce(savePaneGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);
    debounceMap[autoSaveId] = debouncedSave;
  }
  const clonedPaneDataArray = [...$paneDataArray];
  const $paneSizeBeforeCollapse = get_store_value(paneSizeBeforeCollapseStore);
  const clonedPaneSizesBeforeCollapse = new Map($paneSizeBeforeCollapse);
  debouncedSave(autoSaveId, clonedPaneDataArray, clonedPaneSizesBeforeCollapse, layout, storage);
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function areNumbersAlmostEqual(actual, expected, fractionDigits = PRECISION) {
  return compareNumbersWithTolerance(actual, expected, fractionDigits) === 0;
}
function compareNumbersWithTolerance(actual, expected, fractionDigits = PRECISION) {
  const roundedActual = roundTo(actual, fractionDigits);
  const roundedExpected = roundTo(expected, fractionDigits);
  return Math.sign(roundedActual - roundedExpected);
}
function areArraysEqual(arrA, arrB) {
  if (arrA.length !== arrB.length)
    return false;
  for (let index = 0; index < arrA.length; index++) {
    if (arrA[index] !== arrB[index])
      return false;
  }
  return true;
}
function roundTo(value, decimals) {
  return parseFloat(value.toFixed(decimals));
}
function assert(expectedCondition, message = "Assertion failed!") {
  if (!expectedCondition) {
    console.error(message);
    throw Error(message);
  }
}
function resizePane({ paneConstraints: paneConstraintsArray, paneIndex, initialSize }) {
  const paneConstraints = paneConstraintsArray[paneIndex];
  assert(paneConstraints != null, "Pane constraints should not be null.");
  const { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = paneConstraints;
  let newSize = initialSize;
  if (compareNumbersWithTolerance(newSize, minSize) < 0) {
    newSize = getAdjustedSizeForCollapsible(newSize, collapsible, collapsedSize, minSize);
  }
  newSize = Math.min(maxSize, newSize);
  return parseFloat(newSize.toFixed(PRECISION));
}
function getAdjustedSizeForCollapsible(size, collapsible, collapsedSize, minSize) {
  if (!collapsible)
    return minSize;
  const halfwayPoint = (collapsedSize + minSize) / 2;
  return compareNumbersWithTolerance(size, halfwayPoint) < 0 ? collapsedSize : minSize;
}
function adjustLayoutByDelta({ delta, layout: prevLayout, paneConstraints: paneConstraintsArray, pivotIndices, trigger }) {
  if (areNumbersAlmostEqual(delta, 0))
    return prevLayout;
  const nextLayout = [...prevLayout];
  const [firstPivotIndex, secondPivotIndex] = pivotIndices;
  let deltaApplied = 0;
  {
    if (trigger === "keyboard") {
      {
        const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const paneConstraints = paneConstraintsArray[index];
        assert(paneConstraints);
        if (paneConstraints.collapsible) {
          const prevSize = prevLayout[index];
          assert(prevSize != null);
          const paneConstraints2 = paneConstraintsArray[index];
          assert(paneConstraints2);
          const { collapsedSize = 0, minSize = 0 } = paneConstraints2;
          if (areNumbersAlmostEqual(prevSize, collapsedSize)) {
            const localDelta = minSize - prevSize;
            if (compareNumbersWithTolerance(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
      {
        const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
        const paneConstraints = paneConstraintsArray[index];
        assert(paneConstraints);
        const { collapsible } = paneConstraints;
        if (collapsible) {
          const prevSize = prevLayout[index];
          assert(prevSize != null);
          const paneConstraints2 = paneConstraintsArray[index];
          assert(paneConstraints2);
          const { collapsedSize = 0, minSize = 0 } = paneConstraints2;
          if (areNumbersAlmostEqual(prevSize, minSize)) {
            const localDelta = prevSize - collapsedSize;
            if (compareNumbersWithTolerance(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
    }
  }
  {
    const increment = delta < 0 ? 1 : -1;
    let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
    let maxAvailableDelta = 0;
    while (true) {
      const prevSize = prevLayout[index];
      assert(prevSize != null);
      const maxSafeSize = resizePane({
        paneConstraints: paneConstraintsArray,
        paneIndex: index,
        initialSize: 100
      });
      const delta2 = maxSafeSize - prevSize;
      maxAvailableDelta += delta2;
      index += increment;
      if (index < 0 || index >= paneConstraintsArray.length) {
        break;
      }
    }
    const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
    delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
  }
  {
    const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
    let index = pivotIndex;
    while (index >= 0 && index < paneConstraintsArray.length) {
      const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
      const prevSize = prevLayout[index];
      assert(prevSize != null);
      const unsafeSize = prevSize - deltaRemaining;
      const safeSize = resizePane({
        paneConstraints: paneConstraintsArray,
        paneIndex: index,
        initialSize: unsafeSize
      });
      if (!areNumbersAlmostEqual(prevSize, safeSize)) {
        deltaApplied += prevSize - safeSize;
        nextLayout[index] = safeSize;
        if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, {
          numeric: true
        }) >= 0) {
          break;
        }
      }
      if (delta < 0) {
        index--;
      } else {
        index++;
      }
    }
  }
  if (areNumbersAlmostEqual(deltaApplied, 0)) {
    return prevLayout;
  }
  {
    const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
    const prevSize = prevLayout[pivotIndex];
    assert(prevSize != null);
    const unsafeSize = prevSize + deltaApplied;
    const safeSize = resizePane({
      paneConstraints: paneConstraintsArray,
      paneIndex: pivotIndex,
      initialSize: unsafeSize
    });
    nextLayout[pivotIndex] = safeSize;
    if (!areNumbersAlmostEqual(safeSize, unsafeSize)) {
      let deltaRemaining = unsafeSize - safeSize;
      const pivotIndex2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
      let index = pivotIndex2;
      while (index >= 0 && index < paneConstraintsArray.length) {
        const prevSize2 = nextLayout[index];
        assert(prevSize2 != null);
        const unsafeSize2 = prevSize2 + deltaRemaining;
        const safeSize2 = resizePane({
          paneConstraints: paneConstraintsArray,
          paneIndex: index,
          initialSize: unsafeSize2
        });
        if (!areNumbersAlmostEqual(prevSize2, safeSize2)) {
          deltaRemaining -= safeSize2 - prevSize2;
          nextLayout[index] = safeSize2;
        }
        if (areNumbersAlmostEqual(deltaRemaining, 0))
          break;
        delta > 0 ? index-- : index++;
      }
    }
  }
  const totalSize = nextLayout.reduce((total, size) => size + total, 0);
  if (!areNumbersAlmostEqual(totalSize, 100))
    return prevLayout;
  return nextLayout;
}
const isBrowser = typeof document !== "undefined";
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function isKeyDown(event) {
  return event.type === "keydown";
}
function isMouseEvent(event) {
  return event.type.startsWith("mouse");
}
function isTouchEvent(event) {
  return event.type.startsWith("touch");
}
const defaultStorage = {
  getItem: (name) => {
    initializeStorage(defaultStorage);
    return defaultStorage.getItem(name);
  },
  setItem: (name, value) => {
    initializeStorage(defaultStorage);
    defaultStorage.setItem(name, value);
  }
};
const defaultProps = {
  id: null,
  onLayout: null,
  keyboardResizeBy: null,
  autoSaveId: null,
  direction: "horizontal",
  storage: defaultStorage
};
function createPaneForge(props) {
  const withDefaults = {
    ...defaultProps,
    ...removeUndefined(props)
  };
  const options = toWritableStores(withDefaults);
  const { autoSaveId, direction, keyboardResizeBy, storage, onLayout } = options;
  const groupId = writable(generateId$1());
  const dragState = writable(null);
  const layout = writable([]);
  const paneDataArray = writable([]);
  const paneDataArrayChanged = writable(false);
  const paneIdToLastNotifiedSizeMap = writable({});
  const paneSizeBeforeCollapseMap = writable(/* @__PURE__ */ new Map());
  const prevDelta = writable(0);
  clientEffect([groupId, layout, paneDataArray], ([$groupId, $layout, $paneDataArray]) => {
    const unsub = updateResizeHandleAriaValues({
      groupId: $groupId,
      layout: $layout,
      paneDataArray: $paneDataArray
    });
    return unsub;
  });
  clientEffect([autoSaveId, layout, storage], ([$autoSaveId, $layout, $storage]) => {
    if (!$autoSaveId)
      return;
    updateStorageValues({
      autoSaveId: $autoSaveId,
      layout: $layout,
      storage: $storage,
      paneDataArrayStore: paneDataArray,
      paneSizeBeforeCollapseStore: paneSizeBeforeCollapseMap
    });
  });
  function collapsePane(paneData) {
    const $prevLayout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    if (!paneData.constraints.collapsible)
      return;
    const paneConstraintsArray = $paneDataArray.map((paneData2) => paneData2.constraints);
    const { collapsedSize = 0, paneSize, pivotIndices } = paneDataHelper($paneDataArray, paneData, $prevLayout);
    assert(paneSize != null);
    if (paneSize === collapsedSize)
      return;
    paneSizeBeforeCollapseMap.update((curr) => {
      curr.set(paneData.id, paneSize);
      return curr;
    });
    const isLastPane = findPaneDataIndex($paneDataArray, paneData) === $paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - collapsedSize : collapsedSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: $prevLayout,
      paneConstraints: paneConstraintsArray,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual($prevLayout, nextLayout))
      return;
    layout.set(nextLayout);
    const $onLayout = get_store_value(onLayout);
    if ($onLayout) {
      $onLayout(nextLayout);
    }
    callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
  }
  function getPaneSize(paneData) {
    const $layout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    const { paneSize } = paneDataHelper($paneDataArray, paneData, $layout);
    return paneSize;
  }
  const getPaneStyle = derived([paneDataArray, layout, dragState], ([$paneDataArray, $layout, $dragState]) => {
    return (paneData, defaultSize) => {
      const paneIndex = findPaneDataIndex($paneDataArray, paneData);
      return computePaneFlexBoxStyle({
        defaultSize,
        dragState: $dragState,
        layout: $layout,
        paneData: $paneDataArray,
        paneIndex
      });
    };
  });
  function isPaneExpanded(paneData) {
    const $paneDataArray = get_store_value(paneDataArray);
    const $layout = get_store_value(layout);
    const { collapsedSize = 0, collapsible, paneSize } = paneDataHelper($paneDataArray, paneData, $layout);
    return !collapsible || paneSize > collapsedSize;
  }
  function registerPane(paneData) {
    paneDataArray.update((curr) => {
      const newArr = [...curr, paneData];
      newArr.sort((paneA, paneB) => {
        const orderA = paneA.order;
        const orderB = paneB.order;
        if (orderA == null && orderB == null) {
          return 0;
        } else if (orderA == null) {
          return -1;
        } else if (orderB == null) {
          return 1;
        } else {
          return orderA - orderB;
        }
      });
      return newArr;
    });
    paneDataArrayChanged.set(true);
  }
  clientEffect([paneDataArrayChanged], ([$paneDataArrayChanged]) => {
    if (!$paneDataArrayChanged)
      return;
    paneDataArrayChanged.set(false);
    const $autoSaveId = get_store_value(autoSaveId);
    const $storage = get_store_value(storage);
    const $prevLayout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    let unsafeLayout = null;
    if ($autoSaveId) {
      const state = loadPaneGroupState($autoSaveId, $paneDataArray, $storage);
      if (state) {
        paneSizeBeforeCollapseMap.set(new Map(Object.entries(state.expandToSizes)));
        unsafeLayout = state.layout;
      }
    }
    if (unsafeLayout == null) {
      unsafeLayout = getUnsafeDefaultLayout({
        paneDataArray: $paneDataArray
      });
    }
    const nextLayout = validatePaneGroupLayout({
      layout: unsafeLayout,
      paneConstraints: $paneDataArray.map((paneData) => paneData.constraints)
    });
    if (areArraysEqual($prevLayout, nextLayout))
      return;
    layout.set(nextLayout);
    const $onLayout = get_store_value(onLayout);
    if ($onLayout) {
      $onLayout(nextLayout);
    }
    callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
  });
  function registerResizeHandle(dragHandleId) {
    return function resizeHandler(event) {
      event.preventDefault();
      const $direction = get_store_value(direction);
      const $dragState = get_store_value(dragState);
      const $groupId = get_store_value(groupId);
      const $keyboardResizeBy = get_store_value(keyboardResizeBy);
      const $prevLayout = get_store_value(layout);
      const $paneDataArray = get_store_value(paneDataArray);
      const { initialLayout } = $dragState ?? {};
      const pivotIndices = getPivotIndices($groupId, dragHandleId);
      let delta = getDeltaPercentage(event, dragHandleId, $direction, $dragState, $keyboardResizeBy);
      if (delta === 0)
        return;
      const isHorizontal = $direction === "horizontal";
      if (document.dir === "rtl" && isHorizontal) {
        delta = -delta;
      }
      const paneConstraints = $paneDataArray.map((paneData) => paneData.constraints);
      const nextLayout = adjustLayoutByDelta({
        delta,
        layout: initialLayout ?? $prevLayout,
        paneConstraints,
        pivotIndices,
        trigger: isKeyDown(event) ? "keyboard" : "mouse-or-touch"
      });
      const layoutChanged = !areArraysEqual($prevLayout, nextLayout);
      if (isMouseEvent(event) || isTouchEvent(event)) {
        const $prevDelta = get_store_value(prevDelta);
        if ($prevDelta != delta) {
          prevDelta.set(delta);
          if (!layoutChanged) {
            if (isHorizontal) {
              setGlobalCursorStyle(delta < 0 ? "horizontal-min" : "horizontal-max");
            } else {
              setGlobalCursorStyle(delta < 0 ? "vertical-min" : "vertical-max");
            }
          } else {
            setGlobalCursorStyle(isHorizontal ? "horizontal" : "vertical");
          }
        }
      }
      if (layoutChanged) {
        layout.set(nextLayout);
        const $onLayout = get_store_value(onLayout);
        if ($onLayout) {
          $onLayout(nextLayout);
        }
        callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
      }
    };
  }
  function resizePane2(paneData, unsafePaneSize) {
    const $prevLayout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    const paneConstraintsArr = $paneDataArray.map((paneData2) => paneData2.constraints);
    const { paneSize, pivotIndices } = paneDataHelper($paneDataArray, paneData, $prevLayout);
    assert(paneSize != null);
    const isLastPane = findPaneDataIndex($paneDataArray, paneData) === $paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - unsafePaneSize : unsafePaneSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: $prevLayout,
      paneConstraints: paneConstraintsArr,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual($prevLayout, nextLayout))
      return;
    layout.set(nextLayout);
    const $onLayout = get_store_value(onLayout);
    $onLayout?.(nextLayout);
    callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
  }
  function startDragging(dragHandleId, event) {
    const $direction = get_store_value(direction);
    const $layout = get_store_value(layout);
    const handleElement = getResizeHandleElement(dragHandleId);
    assert(handleElement);
    const initialCursorPosition = getResizeEventCursorPosition($direction, event);
    dragState.set({
      dragHandleId,
      dragHandleRect: handleElement.getBoundingClientRect(),
      initialCursorPosition,
      initialLayout: $layout
    });
  }
  function stopDragging() {
    resetGlobalCursorStyle();
    dragState.set(null);
  }
  function unregisterPane(paneData) {
    const $paneDataArray = get_store_value(paneDataArray);
    const index = findPaneDataIndex($paneDataArray, paneData);
    if (index < 0)
      return;
    paneDataArray.update((curr) => {
      curr.splice(index, 1);
      paneIdToLastNotifiedSizeMap.update((curr2) => {
        delete curr2[paneData.id];
        return curr2;
      });
      paneDataArrayChanged.set(true);
      return curr;
    });
  }
  function isPaneCollapsed(paneData) {
    const $paneDataArray = get_store_value(paneDataArray);
    const $layout = get_store_value(layout);
    const { collapsedSize = 0, collapsible, paneSize } = paneDataHelper($paneDataArray, paneData, $layout);
    return collapsible === true && paneSize === collapsedSize;
  }
  function expandPane(paneData) {
    const $prevLayout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    if (!paneData.constraints.collapsible)
      return;
    const paneConstraintsArray = $paneDataArray.map((paneData2) => paneData2.constraints);
    const { collapsedSize = 0, paneSize, minSize = 0, pivotIndices } = paneDataHelper($paneDataArray, paneData, $prevLayout);
    if (paneSize !== collapsedSize)
      return;
    const prevPaneSize = get_store_value(paneSizeBeforeCollapseMap).get(paneData.id);
    const baseSize = prevPaneSize != null && prevPaneSize >= minSize ? prevPaneSize : minSize;
    const isLastPane = findPaneDataIndex($paneDataArray, paneData) === $paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - baseSize : baseSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: $prevLayout,
      paneConstraints: paneConstraintsArray,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual($prevLayout, nextLayout))
      return;
    layout.set(nextLayout);
    const $onLayout = get_store_value(onLayout);
    $onLayout?.(nextLayout);
    callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
  }
  const paneGroupStyle = derived([direction], ([$direction]) => {
    return styleToString({
      display: "flex",
      "flex-direction": $direction === "horizontal" ? "row" : "column",
      height: "100%",
      overflow: "hidden",
      width: "100%"
    });
  });
  const paneGroupSelectors = derived([direction, groupId], ([$direction, $groupId]) => {
    return {
      "data-pane-group": "",
      "data-direction": $direction,
      "data-pane-group-id": $groupId
    };
  });
  const paneGroupAttrs = derived([paneGroupStyle, paneGroupSelectors], ([$style, $selectors]) => {
    return {
      style: $style,
      ...$selectors
    };
  });
  function setLayout(newLayout) {
    layout.set(newLayout);
  }
  function getLayout() {
    return get_store_value(layout);
  }
  return {
    methods: {
      collapsePane,
      expandPane,
      getSize: getPaneSize,
      getPaneStyle,
      isCollapsed: isPaneCollapsed,
      isExpanded: isPaneExpanded,
      registerPane,
      registerResizeHandle,
      resizePane: resizePane2,
      startDragging,
      stopDragging,
      unregisterPane,
      setLayout,
      getLayout
    },
    states: {
      direction,
      dragState,
      groupId,
      paneGroupAttrs,
      paneGroupSelectors,
      paneGroupStyle,
      layout
    },
    options
  };
}
function updateResizeHandleAriaValues({ groupId, layout, paneDataArray }) {
  const resizeHandleElements = getResizeHandleElementsForGroup(groupId);
  for (let index = 0; index < paneDataArray.length - 1; index++) {
    const { valueMax, valueMin, valueNow } = calculateAriaValues({
      layout,
      panesArray: paneDataArray,
      pivotIndices: [index, index + 1]
    });
    const resizeHandleEl = resizeHandleElements[index];
    if (isHTMLElement(resizeHandleEl)) {
      const paneData = paneDataArray[index];
      resizeHandleEl.setAttribute("aria-controls", paneData.id);
      resizeHandleEl.setAttribute("aria-valuemax", "" + Math.round(valueMax));
      resizeHandleEl.setAttribute("aria-valuemin", "" + Math.round(valueMin));
      resizeHandleEl.setAttribute("aria-valuenow", valueNow != null ? "" + Math.round(valueNow) : "");
    }
  }
  return () => {
    resizeHandleElements.forEach((resizeHandleElement) => {
      resizeHandleElement.removeAttribute("aria-controls");
      resizeHandleElement.removeAttribute("aria-valuemax");
      resizeHandleElement.removeAttribute("aria-valuemin");
      resizeHandleElement.removeAttribute("aria-valuenow");
    });
  };
}
function getResizeHandleElementsForGroup(groupId) {
  if (!isBrowser)
    return [];
  return Array.from(document.querySelectorAll(`[data-pane-resizer-id][data-pane-group-id="${groupId}"]`));
}
function getPaneGroupElement(id) {
  if (!isBrowser)
    return null;
  const element2 = document.querySelector(`[data-pane-group][data-pane-group-id="${id}"]`);
  if (element2) {
    return element2;
  }
  return null;
}
function getResizeHandleElement(id) {
  if (!isBrowser)
    return null;
  const element2 = document.querySelector(`[data-pane-resizer-id="${id}"]`);
  if (element2) {
    return element2;
  }
  return null;
}
function getResizeHandleElementIndex(groupId, id) {
  if (!isBrowser)
    return null;
  const handles = getResizeHandleElementsForGroup(groupId);
  const index = handles.findIndex((handle) => handle.getAttribute("data-pane-resizer-id") === id);
  return index ?? null;
}
function getPivotIndices(groupId, dragHandleId) {
  const index = getResizeHandleElementIndex(groupId, dragHandleId);
  return index != null ? [index, index + 1] : [-1, -1];
}
function paneDataHelper(paneDataArray, paneData, layout) {
  const paneConstraintsArray = paneDataArray.map((paneData2) => paneData2.constraints);
  const paneIndex = findPaneDataIndex(paneDataArray, paneData);
  const paneConstraints = paneConstraintsArray[paneIndex];
  const isLastPane = paneIndex === paneDataArray.length - 1;
  const pivotIndices = isLastPane ? [paneIndex - 1, paneIndex] : [paneIndex, paneIndex + 1];
  const paneSize = layout[paneIndex];
  return {
    ...paneConstraints,
    paneSize,
    pivotIndices
  };
}
function findPaneDataIndex(paneDataArray, paneData) {
  return paneDataArray.findIndex((prevPaneData) => prevPaneData.id === paneData.id);
}
function callPaneCallbacks(paneArray, layout, paneIdToLastNotifiedSizeMap) {
  layout.forEach((size, index) => {
    const paneData = paneArray[index];
    assert(paneData);
    const { callbacks, constraints, id: paneId } = paneData;
    const { collapsedSize = 0, collapsible } = constraints;
    const lastNotifiedSize = paneIdToLastNotifiedSizeMap[paneId];
    if (!(lastNotifiedSize == null || size !== lastNotifiedSize))
      return;
    paneIdToLastNotifiedSizeMap[paneId] = size;
    const { onCollapse, onExpand, onResize } = callbacks;
    onResize?.(size, lastNotifiedSize);
    if (collapsible && (onCollapse || onExpand)) {
      if (onExpand && (lastNotifiedSize == null || lastNotifiedSize === collapsedSize) && size !== collapsedSize) {
        onExpand();
      }
      if (onCollapse && (lastNotifiedSize == null || lastNotifiedSize !== collapsedSize) && size === collapsedSize) {
        onCollapse();
      }
    }
  });
}
function getUnsafeDefaultLayout({ paneDataArray }) {
  const layout = Array(paneDataArray.length);
  const paneConstraintsArray = paneDataArray.map((paneData) => paneData.constraints);
  let numPanesWithSizes = 0;
  let remainingSize = 100;
  for (let index = 0; index < paneDataArray.length; index++) {
    const paneConstraints = paneConstraintsArray[index];
    assert(paneConstraints);
    const { defaultSize } = paneConstraints;
    if (defaultSize != null) {
      numPanesWithSizes++;
      layout[index] = defaultSize;
      remainingSize -= defaultSize;
    }
  }
  for (let index = 0; index < paneDataArray.length; index++) {
    const paneConstraints = paneConstraintsArray[index];
    assert(paneConstraints);
    const { defaultSize } = paneConstraints;
    if (defaultSize != null) {
      continue;
    }
    const numRemainingPanes = paneDataArray.length - numPanesWithSizes;
    const size = remainingSize / numRemainingPanes;
    numPanesWithSizes++;
    layout[index] = size;
    remainingSize -= size;
  }
  return layout;
}
function validatePaneGroupLayout({ layout: prevLayout, paneConstraints }) {
  const nextLayout = [...prevLayout];
  const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
  if (nextLayout.length !== paneConstraints.length) {
    throw Error(`Invalid ${paneConstraints.length} pane layout: ${nextLayout.map((size) => `${size}%`).join(", ")}`);
  } else if (!areNumbersAlmostEqual(nextLayoutTotalSize, 100)) {
    for (let index = 0; index < paneConstraints.length; index++) {
      const unsafeSize = nextLayout[index];
      assert(unsafeSize != null);
      const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
      nextLayout[index] = safeSize;
    }
  }
  let remainingSize = 0;
  for (let index = 0; index < paneConstraints.length; index++) {
    const unsafeSize = nextLayout[index];
    assert(unsafeSize != null);
    const safeSize = resizePane({
      paneConstraints,
      paneIndex: index,
      initialSize: unsafeSize
    });
    if (unsafeSize != safeSize) {
      remainingSize += unsafeSize - safeSize;
      nextLayout[index] = safeSize;
    }
  }
  if (!areNumbersAlmostEqual(remainingSize, 0)) {
    for (let index = 0; index < paneConstraints.length; index++) {
      const prevSize = nextLayout[index];
      assert(prevSize != null);
      const unsafeSize = prevSize + remainingSize;
      const safeSize = resizePane({
        paneConstraints,
        paneIndex: index,
        initialSize: unsafeSize
      });
      if (prevSize !== safeSize) {
        remainingSize -= safeSize - prevSize;
        nextLayout[index] = safeSize;
        if (areNumbersAlmostEqual(remainingSize, 0)) {
          break;
        }
      }
    }
  }
  return nextLayout;
}
function getDeltaPercentage(e, dragHandleId, dir, initialDragState, keyboardResizeBy) {
  if (isKeyDown(e)) {
    const isHorizontal = dir === "horizontal";
    let delta = 0;
    if (e.shiftKey) {
      delta = 100;
    } else if (keyboardResizeBy != null) {
      delta = keyboardResizeBy;
    } else {
      delta = 10;
    }
    let movement = 0;
    switch (e.key) {
      case "ArrowDown":
        movement = isHorizontal ? 0 : delta;
        break;
      case "ArrowLeft":
        movement = isHorizontal ? -delta : 0;
        break;
      case "ArrowRight":
        movement = isHorizontal ? delta : 0;
        break;
      case "ArrowUp":
        movement = isHorizontal ? 0 : -delta;
        break;
      case "End":
        movement = 100;
        break;
      case "Home":
        movement = -100;
        break;
    }
    return movement;
  } else {
    if (initialDragState == null)
      return 0;
    return getDragOffsetPercentage(e, dragHandleId, dir, initialDragState);
  }
}
function getDragOffsetPercentage(e, dragHandleId, dir, initialDragState) {
  const isHorizontal = dir === "horizontal";
  const handleElement = getResizeHandleElement(dragHandleId);
  assert(handleElement);
  const groupId = handleElement.getAttribute("data-pane-group-id");
  assert(groupId);
  const { initialCursorPosition } = initialDragState;
  const cursorPosition = getResizeEventCursorPosition(dir, e);
  const groupElement = getPaneGroupElement(groupId);
  assert(groupElement);
  const groupRect = groupElement.getBoundingClientRect();
  const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
  const offsetPixels = cursorPosition - initialCursorPosition;
  const offsetPercentage = offsetPixels / groupSizeInPixels * 100;
  return offsetPercentage;
}
function getResizeEventCursorPosition(dir, e) {
  const isHorizontal = dir === "horizontal";
  if (isMouseEvent(e)) {
    return isHorizontal ? e.clientX : e.clientY;
  } else if (isTouchEvent(e)) {
    const firstTouch = e.touches[0];
    assert(firstTouch);
    return isHorizontal ? firstTouch.screenX : firstTouch.screenY;
  } else {
    throw Error(`Unsupported event type "${e.type}"`);
  }
}
const PF_GROUP_CTX = Symbol("PF_GROUP_CTX");
function setCtx(props) {
  const paneForge = createPaneForge(removeUndefined(props));
  const updateOption = getOptionUpdater(paneForge.options);
  const ctxValue = { ...paneForge, updateOption };
  setContext(PF_GROUP_CTX, ctxValue);
  return ctxValue;
}
function getCtx(componentName) {
  if (!hasContext(PF_GROUP_CTX)) {
    throw new Error(`${componentName} components must be rendered with a <PaneGroup> container`);
  }
  return getContext(PF_GROUP_CTX);
}
const Pane_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let $$restProps = compute_rest_props($$props, [
    "autoSaveId",
    "direction",
    "id",
    "keyboardResizeBy",
    "onLayoutChange",
    "storage",
    "el",
    "paneGroup",
    "style"
  ]);
  let $paneGroupStyle, $$unsubscribe_paneGroupStyle;
  let $groupId, $$unsubscribe_groupId;
  let $paneGroupSelectors, $$unsubscribe_paneGroupSelectors;
  let { autoSaveId = null } = $$props;
  let { direction } = $$props;
  let { id = null } = $$props;
  let { keyboardResizeBy = null } = $$props;
  let { onLayoutChange = null } = $$props;
  let { storage = defaultStorage } = $$props;
  let { el = void 0 } = $$props;
  let { paneGroup = void 0 } = $$props;
  let { style: styleFromProps = void 0 } = $$props;
  const { states: { paneGroupStyle, paneGroupSelectors, groupId }, methods: { setLayout, getLayout }, updateOption } = setCtx({
    autoSaveId,
    direction,
    id,
    keyboardResizeBy,
    onLayout: onLayoutChange,
    storage
  });
  $$unsubscribe_paneGroupStyle = subscribe(paneGroupStyle, (value) => $paneGroupStyle = value);
  $$unsubscribe_paneGroupSelectors = subscribe(paneGroupSelectors, (value) => $paneGroupSelectors = value);
  $$unsubscribe_groupId = subscribe(groupId, (value) => $groupId = value);
  paneGroup = {
    getLayout,
    setLayout,
    getId: () => $groupId
  };
  if ($$props.autoSaveId === void 0 && $$bindings.autoSaveId && autoSaveId !== void 0)
    $$bindings.autoSaveId(autoSaveId);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.keyboardResizeBy === void 0 && $$bindings.keyboardResizeBy && keyboardResizeBy !== void 0)
    $$bindings.keyboardResizeBy(keyboardResizeBy);
  if ($$props.onLayoutChange === void 0 && $$bindings.onLayoutChange && onLayoutChange !== void 0)
    $$bindings.onLayoutChange(onLayoutChange);
  if ($$props.storage === void 0 && $$bindings.storage && storage !== void 0)
    $$bindings.storage(storage);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  if ($$props.paneGroup === void 0 && $$bindings.paneGroup && paneGroup !== void 0)
    $$bindings.paneGroup(paneGroup);
  if ($$props.style === void 0 && $$bindings.style && styleFromProps !== void 0)
    $$bindings.style(styleFromProps);
  {
    updateOption("autoSaveId", autoSaveId);
  }
  {
    updateOption("direction", direction);
  }
  {
    updateOption("id", id);
  }
  {
    updateOption("keyboardResizeBy", keyboardResizeBy);
  }
  {
    updateOption("onLayout", onLayoutChange);
  }
  {
    updateOption("storage", storage);
  }
  style = $paneGroupStyle + (styleFromProps ?? "");
  $$unsubscribe_paneGroupStyle();
  $$unsubscribe_groupId();
  $$unsubscribe_paneGroupSelectors();
  return `<div${spread(
    [
      { id: escape_attribute_value($groupId) },
      escape_object($paneGroupSelectors),
      { style: escape_attribute_value(style) },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Pane = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let attrs;
  let $$restProps = compute_rest_props($$props, [
    "collapsedSize",
    "collapsible",
    "defaultSize",
    "maxSize",
    "minSize",
    "onCollapse",
    "onExpand",
    "onResize",
    "order",
    "el",
    "pane",
    "id",
    "style"
  ]);
  let $groupId, $$unsubscribe_groupId;
  let $getPaneStyle, $$unsubscribe_getPaneStyle;
  let { collapsedSize = void 0 } = $$props;
  let { collapsible = void 0 } = $$props;
  let { defaultSize = void 0 } = $$props;
  let { maxSize = void 0 } = $$props;
  let { minSize = void 0 } = $$props;
  let { onCollapse = void 0 } = $$props;
  let { onExpand = void 0 } = $$props;
  let { onResize = void 0 } = $$props;
  let { order = void 0 } = $$props;
  let { el = void 0 } = $$props;
  let { pane = void 0 } = $$props;
  let { id: idFromProps = void 0 } = $$props;
  let { style: styleFromProps = void 0 } = $$props;
  const { methods: { getPaneStyle, registerPane, unregisterPane, collapsePane, expandPane, getSize, isCollapsed, isExpanded, resizePane: resizePane2 }, states: { groupId } } = getCtx("Pane");
  $$unsubscribe_getPaneStyle = subscribe(getPaneStyle, (value) => $getPaneStyle = value);
  $$unsubscribe_groupId = subscribe(groupId, (value) => $groupId = value);
  const paneId = generateId$1(idFromProps);
  let paneData;
  pane = {
    collapse: () => {
      collapsePane(paneData);
    },
    expand: () => expandPane(paneData),
    getSize: () => getSize(paneData),
    isCollapsed: () => isCollapsed(paneData),
    isExpanded: () => isExpanded(paneData),
    resize: (size) => resizePane2(paneData, size),
    getId: () => paneId
  };
  if ($$props.collapsedSize === void 0 && $$bindings.collapsedSize && collapsedSize !== void 0)
    $$bindings.collapsedSize(collapsedSize);
  if ($$props.collapsible === void 0 && $$bindings.collapsible && collapsible !== void 0)
    $$bindings.collapsible(collapsible);
  if ($$props.defaultSize === void 0 && $$bindings.defaultSize && defaultSize !== void 0)
    $$bindings.defaultSize(defaultSize);
  if ($$props.maxSize === void 0 && $$bindings.maxSize && maxSize !== void 0)
    $$bindings.maxSize(maxSize);
  if ($$props.minSize === void 0 && $$bindings.minSize && minSize !== void 0)
    $$bindings.minSize(minSize);
  if ($$props.onCollapse === void 0 && $$bindings.onCollapse && onCollapse !== void 0)
    $$bindings.onCollapse(onCollapse);
  if ($$props.onExpand === void 0 && $$bindings.onExpand && onExpand !== void 0)
    $$bindings.onExpand(onExpand);
  if ($$props.onResize === void 0 && $$bindings.onResize && onResize !== void 0)
    $$bindings.onResize(onResize);
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  if ($$props.pane === void 0 && $$bindings.pane && pane !== void 0)
    $$bindings.pane(pane);
  if ($$props.id === void 0 && $$bindings.id && idFromProps !== void 0)
    $$bindings.id(idFromProps);
  if ($$props.style === void 0 && $$bindings.style && styleFromProps !== void 0)
    $$bindings.style(styleFromProps);
  paneData = {
    callbacks: { onCollapse, onExpand, onResize },
    constraints: {
      collapsedSize,
      collapsible,
      defaultSize,
      maxSize,
      minSize
    },
    id: paneId,
    idIsFromProps: idFromProps !== void 0,
    order
  };
  style = $getPaneStyle(paneData, defaultSize) + (styleFromProps ?? "");
  attrs = {
    "data-pane": "",
    "data-pane-id": paneId,
    "data-pane-group-id": $groupId
  };
  $$unsubscribe_groupId();
  $$unsubscribe_getPaneStyle();
  return `<div${spread(
    [
      { style: escape_attribute_value(style) },
      escape_object(attrs),
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Pane_resizer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDragging;
  let style;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["disabled", "onDraggingChange", "tabIndex", "el", "id", "style"]);
  let $groupId, $$unsubscribe_groupId;
  let $direction, $$unsubscribe_direction;
  let $dragState, $$unsubscribe_dragState;
  let { disabled = false } = $$props;
  let { onDraggingChange = void 0 } = $$props;
  let { tabIndex = 0 } = $$props;
  let { el = null } = $$props;
  let { id: idFromProps = void 0 } = $$props;
  let { style: styleFromProps = void 0 } = $$props;
  const { methods: { registerResizeHandle, startDragging, stopDragging }, states: { direction, dragState, groupId } } = getCtx("PaneResizer");
  $$unsubscribe_direction = subscribe(direction, (value) => $direction = value);
  $$unsubscribe_dragState = subscribe(dragState, (value) => $dragState = value);
  $$unsubscribe_groupId = subscribe(groupId, (value) => $groupId = value);
  const resizeHandleId = generateId$1(idFromProps);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.onDraggingChange === void 0 && $$bindings.onDraggingChange && onDraggingChange !== void 0)
    $$bindings.onDraggingChange(onDraggingChange);
  if ($$props.tabIndex === void 0 && $$bindings.tabIndex && tabIndex !== void 0)
    $$bindings.tabIndex(tabIndex);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  if ($$props.id === void 0 && $$bindings.id && idFromProps !== void 0)
    $$bindings.id(idFromProps);
  if ($$props.style === void 0 && $$bindings.style && styleFromProps !== void 0)
    $$bindings.style(styleFromProps);
  isDragging = $dragState?.dragHandleId === resizeHandleId;
  {
    if (disabled)
      ;
    else {
      registerResizeHandle(resizeHandleId);
    }
  }
  style = styleToString({
    cursor: getCursorStyle($direction),
    touchAction: "none",
    userSelect: "none"
  }) + styleFromProps;
  attrs = {
    "data-direction": $direction,
    "data-pane-group-id": $groupId,
    "data-active": isDragging ? "pointer" : void 0,
    "data-enabled": !disabled,
    "data-pane-resizer-id": resizeHandleId,
    "data-pane-resizer": ""
  };
  $$unsubscribe_groupId();
  $$unsubscribe_direction();
  $$unsubscribe_dragState();
  return `   <div${spread(
    [
      { role: "separator" },
      { style: escape_attribute_value(style) },
      {
        tabindex: escape_attribute_value(tabIndex)
      },
      escape_object(attrs),
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Resizable_handle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { withHandle = false } = $$props;
  let { el = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.withHandle === void 0 && $$bindings.withHandle && withHandle !== void 0)
    $$bindings.withHandle(withHandle);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Pane_resizer, "ResizablePrimitive.PaneResizer").$$render(
      $$result,
      {
        class: cn("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-1 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:-translate-y-1/2 data-[direction=vertical]:after:translate-x-0 [&[data-direction=vertical]>div]:rotate-90", className),
        el
      },
      {
        el: ($$value) => {
          el = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${withHandle ? `<div class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">${validate_component(GripVertical, "GripVertical").$$render($$result, { class: "h-2.5 w-2.5" }, {}, {})}</div>` : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Resizable_pane_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "direction", "paneGroup", "el"]);
  let { class: className = void 0 } = $$props;
  let { direction } = $$props;
  let { paneGroup = void 0 } = $$props;
  let { el = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.paneGroup === void 0 && $$bindings.paneGroup && paneGroup !== void 0)
    $$bindings.paneGroup(paneGroup);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Pane_group, "ResizablePrimitive.PaneGroup").$$render(
      $$result,
      Object.assign(
        {},
        { direction },
        {
          class: cn("flex h-full w-full data-[direction=vertical]:flex-col", className)
        },
        $$restProps,
        { el },
        { paneGroup }
      ),
      {
        el: ($$value) => {
          el = $$value;
          $$settled = false;
        },
        paneGroup: ($$value) => {
          paneGroup = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const FORM_FIELD = Symbol("FORM_FIELD_CTX");
function setFormField(props) {
  setContext(FORM_FIELD, props);
  return props;
}
function getFormField() {
  if (!hasContext(FORM_FIELD)) {
    ctxError("Form.Field");
  }
  return getContext(FORM_FIELD);
}
const FORM_CONTROL = Symbol("FORM_CONTROL_CTX");
function setFormControl(props) {
  setContext(FORM_CONTROL, props);
  return props;
}
function getFormControl() {
  if (!hasContext(FORM_CONTROL)) {
    ctxError("<Control />");
  }
  return getContext(FORM_CONTROL);
}
function ctxError(ctx) {
  console.error(`Unable to find \`${ctx}\` context. Did you forget to wrap the component in a \`${ctx}\`?`);
}
function getAriaDescribedBy({ fieldErrorsId = void 0, descriptionId = void 0, errors }) {
  let describedBy = "";
  if (descriptionId) {
    describedBy += descriptionId + " ";
  }
  if (errors.length && fieldErrorsId) {
    describedBy += fieldErrorsId;
  }
  return describedBy ? describedBy.trim() : void 0;
}
function getAriaRequired(constraints) {
  if (!("required" in constraints))
    return void 0;
  return constraints.required ? "true" : void 0;
}
function getAriaInvalid(errors) {
  return errors && errors.length ? "true" : void 0;
}
function getDataFsError(errors) {
  return errors && errors.length ? "" : void 0;
}
function generateId() {
  return nanoid(5);
}
function extractErrorArray(errors) {
  if (Array.isArray(errors))
    return errors;
  if (typeof errors === "object" && "_errors" in errors) {
    if (errors._errors !== void 0)
      return errors._errors;
  }
  return [];
}
const Description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let descriptionAttrs;
  let $$restProps = compute_rest_props($$props, ["id", "asChild", "el"]);
  let $errors, $$unsubscribe_errors;
  let $descriptionId, $$unsubscribe_descriptionId;
  const { descriptionId, errors } = getFormField();
  $$unsubscribe_descriptionId = subscribe(descriptionId, (value) => $descriptionId = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  let { id = generateId() } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    descriptionId.set(id);
  }
  descriptionAttrs = {
    id: $descriptionId,
    "data-fs-error": getDataFsError($errors),
    "data-fs-description": "",
    ...$$restProps
  };
  $$unsubscribe_errors();
  $$unsubscribe_descriptionId();
  return ` ${asChild ? `${slots.default ? slots.default({ descriptionAttrs }) : ``}` : `<div${spread([escape_object(descriptionAttrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ descriptionAttrs }) : ``}</div>`}`;
});
const Field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formErrors;
  let formConstraints;
  let formTainted;
  let formData;
  let isTainted;
  let $formTainted, $$unsubscribe_formTainted = noop, $$subscribe_formTainted = () => ($$unsubscribe_formTainted(), $$unsubscribe_formTainted = subscribe(formTainted, ($$value) => $formTainted = $$value), formTainted);
  let $formConstraints, $$unsubscribe_formConstraints = noop, $$subscribe_formConstraints = () => ($$unsubscribe_formConstraints(), $$unsubscribe_formConstraints = subscribe(formConstraints, ($$value) => $formConstraints = $$value), formConstraints);
  let $formErrors, $$unsubscribe_formErrors = noop, $$subscribe_formErrors = () => ($$unsubscribe_formErrors(), $$unsubscribe_formErrors = subscribe(formErrors, ($$value) => $formErrors = $$value), formErrors);
  let $formData, $$unsubscribe_formData = noop, $$subscribe_formData = () => ($$unsubscribe_formData(), $$unsubscribe_formData = subscribe(formData, ($$value) => $formData = $$value), formData);
  let $errors, $$unsubscribe_errors;
  let $tainted, $$unsubscribe_tainted;
  let { form } = $$props;
  let { name } = $$props;
  const field = {
    name: writable(name),
    errors: writable([]),
    constraints: writable({}),
    tainted: writable(false),
    fieldErrorsId: writable(),
    descriptionId: writable(),
    form
  };
  const { tainted, errors } = field;
  $$unsubscribe_tainted = subscribe(tainted, (value) => $tainted = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  setFormField(field);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$subscribe_formErrors({ errors: formErrors, constraints: formConstraints, tainted: formTainted, form: formData, isTainted } = form, $$subscribe_formConstraints(), $$subscribe_formTainted(), $$subscribe_formData());
  {
    field.name.set(name);
  }
  {
    field.errors.set(extractErrorArray($formErrors[name]));
  }
  {
    field.constraints.set($formConstraints[name] ?? {});
  }
  {
    field.tainted.set($formTainted ? isTainted($formTainted[name]) : false);
  }
  $$unsubscribe_formTainted();
  $$unsubscribe_formConstraints();
  $$unsubscribe_formErrors();
  $$unsubscribe_formData();
  $$unsubscribe_errors();
  $$unsubscribe_tainted();
  return ` ${slots.default ? slots.default({
    value: $formData[name],
    errors: $errors,
    tainted: $tainted,
    constraints: $formConstraints[name]
  }) : ``}`;
});
const Control$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorAttr;
  let attrs;
  let labelAttrs;
  let $idStore, $$unsubscribe_idStore;
  let $constraints, $$unsubscribe_constraints;
  let $errors, $$unsubscribe_errors;
  let $descriptionId, $$unsubscribe_descriptionId;
  let $fieldErrorsId, $$unsubscribe_fieldErrorsId;
  let $name, $$unsubscribe_name;
  let { id = generateId() } = $$props;
  const { name, fieldErrorsId, descriptionId, errors, constraints } = getFormField();
  $$unsubscribe_name = subscribe(name, (value) => $name = value);
  $$unsubscribe_fieldErrorsId = subscribe(fieldErrorsId, (value) => $fieldErrorsId = value);
  $$unsubscribe_descriptionId = subscribe(descriptionId, (value) => $descriptionId = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_constraints = subscribe(constraints, (value) => $constraints = value);
  const controlContext = {
    id: writable(id),
    attrs: writable(),
    labelAttrs: writable()
  };
  const { id: idStore } = controlContext;
  $$unsubscribe_idStore = subscribe(idStore, (value) => $idStore = value);
  setFormControl(controlContext);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    controlContext.id.set(id);
  }
  errorAttr = getDataFsError($errors);
  attrs = {
    name: $name,
    id: $idStore,
    "data-fs-error": errorAttr,
    "aria-describedby": getAriaDescribedBy({
      fieldErrorsId: $fieldErrorsId,
      descriptionId: $descriptionId,
      errors: $errors
    }),
    "aria-invalid": getAriaInvalid($errors),
    "aria-required": getAriaRequired($constraints),
    "data-fs-control": ""
  };
  labelAttrs = {
    for: $idStore,
    "data-fs-label": "",
    "data-fs-error": errorAttr
  };
  {
    controlContext.attrs.set(attrs);
  }
  {
    controlContext.labelAttrs.set(labelAttrs);
  }
  $$unsubscribe_idStore();
  $$unsubscribe_constraints();
  $$unsubscribe_errors();
  $$unsubscribe_descriptionId();
  $$unsubscribe_fieldErrorsId();
  $$unsubscribe_name();
  return ` ${slots.default ? slots.default({ attrs }) : ``}`;
});
const Field_errors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorAttr;
  let fieldErrorsAttrs;
  let errorAttrs;
  let $$restProps = compute_rest_props($$props, ["id", "asChild", "el"]);
  let $fieldErrorsId, $$unsubscribe_fieldErrorsId;
  let $errors, $$unsubscribe_errors;
  const { fieldErrorsId, errors } = getFormField();
  $$unsubscribe_fieldErrorsId = subscribe(fieldErrorsId, (value) => $fieldErrorsId = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  let { id = generateId() } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  errorAttr = getDataFsError($errors);
  {
    fieldErrorsId.set(id);
  }
  fieldErrorsAttrs = {
    id: $fieldErrorsId,
    "data-fs-error": errorAttr,
    "data-fs-field-errors": "",
    "aria-live": "assertive",
    ...$$restProps
  };
  errorAttrs = {
    "data-fs-field-error": "",
    "data-fs-error": errorAttr
  };
  $$unsubscribe_fieldErrorsId();
  $$unsubscribe_errors();
  return ` ${asChild ? `${slots.default ? slots.default({
    errors: $errors,
    fieldErrorsAttrs,
    errorAttrs
  }) : ``}` : `<div${spread([escape_object(fieldErrorsAttrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({
    errors: $errors,
    fieldErrorsAttrs,
    errorAttrs
  }) : ` ${each($errors, (error) => {
    return `<div${spread([escape_object(errorAttrs)], {})}>${escape(error)}</div>`;
  })} `}</div>`}`;
});
const Form_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Description, "FormPrimitive.Description").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-sm text-muted-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ descriptionAttrs }) => {
        return `${slots.default ? slots.default({ descriptionAttrs }) : ``}`;
      }
    }
  )}`;
});
const Form_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $labelAttrs, $$unsubscribe_labelAttrs;
  let { class: className = void 0 } = $$props;
  const { labelAttrs } = getFormControl();
  $$unsubscribe_labelAttrs = subscribe(labelAttrs, (value) => $labelAttrs = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_labelAttrs();
  return `${validate_component(Label, "Label").$$render(
    $$result,
    Object.assign(
      {},
      $labelAttrs,
      {
        class: cn("data-[fs-error]:text-destructive", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({ labelAttrs }) : ``}`;
      }
    }
  )}`;
});
const Form_field_errors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "errorClasses"]);
  let { class: className = void 0 } = $$props;
  let { errorClasses = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.errorClasses === void 0 && $$bindings.errorClasses && errorClasses !== void 0)
    $$bindings.errorClasses(errorClasses);
  return `${validate_component(Field_errors, "FormPrimitive.FieldErrors").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-sm font-medium text-destructive", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ errors, fieldErrorsAttrs, errorAttrs }) => {
        return `${slots.default ? slots.default({ errors, fieldErrorsAttrs, errorAttrs }) : ` ${each(errors, (error) => {
          return `<div${spread(
            [
              escape_object(errorAttrs),
              {
                class: escape_attribute_value(cn(errorClasses))
              }
            ],
            {}
          )}>${escape(error)}</div>`;
        })} `}`;
      }
    }
  )}`;
});
const Form_field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let { name } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Field, "FormPrimitive.Field").$$render($$result, { form, name }, {}, {
    default: ({ constraints, errors, tainted, value }) => {
      return `<div${add_attribute("class", cn("space-y-2", className), 0)}>${slots.default ? slots.default({ constraints, errors, tainted, value }) : ``}</div>`;
    }
  })}`;
});
const Form_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Button, "Button.Root").$$render($$result, Object.assign({}, { type: "submit" }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Control = Control$1;
const Detailed_expense_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $proxyDate, $$unsubscribe_proxyDate;
  let $formData, $$unsubscribe_formData;
  let { data } = $$props;
  let readonly = true;
  const form = superForm(data, {
    multipleSubmits: "prevent",
    invalidateAll: "force",
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success("Expense details updated successfully.");
        readonly = true;
      } else {
        toast.error("There was an error updating the expense details. Please check the form.");
      }
    }
  });
  let formData = form.form;
  $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
  const proxyDate = dateProxy(form, "invoiceReceiptDate", { format: "date" });
  $$unsubscribe_proxyDate = subscribe(proxyDate, (value) => $proxyDate = value);
  const df = new DateFormatter("es-ES", { dateStyle: "long" });
  let expenseDate = $proxyDate ? parseDate($proxyDate) : void 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = ` <form method="POST" class="flex flex-col gap-10" id="detailed-expense-form"><input type="hidden" name="id"${add_attribute("value", $formData.id, 0)}> <section><div class="flex flex-row flex-wrap gap-5">${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "invoiceReceiptId",
        class: "w-64"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Expense ID`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                Object.assign({}, attrs, { readonly: readonly || null }, { value: $formData.invoiceReceiptId }),
                {
                  value: ($$value) => {
                    $formData.invoiceReceiptId = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
            default: () => {
              return `The expense receipt ID is a unique identifier for this expense.`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )} ${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "invoiceReceiptDate",
        class: "w-64"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Date`;
                }
              })} ${validate_component(Root, "Popover.Root").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Trigger, "Popover.Trigger").$$render(
                    $$result,
                    Object.assign({}, attrs, {
                      class: cn(buttonVariants({ variant: "outline" }), "w-full font-normal", !$formData.invoiceReceiptDate && "text-muted-foreground")
                    }),
                    {},
                    {
                      default: () => {
                        return `${escape(expenseDate ? df.format(expenseDate.toDate(getLocalTimeZone())) : "Pick a date")} ${validate_component(CalendarIcon, "CalendarIcon").$$render($$result, { class: "ml-auto h-4 w-4 opacity-50" }, {}, {})}`;
                      }
                    }
                  )} ${validate_component(Popover_content, "Popover.Content").$$render($$result, { class: "w-auto p-0", side: "top" }, {}, {
                    default: () => {
                      return `${validate_component(Calendar_1, "Calendar").$$render(
                        $$result,
                        {
                          calendarLabel: "Expense date",
                          initialFocus: true,
                          disabled: readonly || void 0,
                          onValueChange: (value) => $proxyDate = value ? value.toString() : "",
                          value: expenseDate
                        },
                        {
                          value: ($$value) => {
                            expenseDate = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}`;
                    }
                  })}`;
                }
              })} ${validate_component(Input, "Input").$$render($$result, Object.assign({}, attrs, { type: "hidden" }, { value: $proxyDate }), {}, {})}`;
            }
          })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
            default: () => {
              return `The registered date of the expense.`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )}</div></section> <section><h2 data-svelte-h="svelte-2wr5re">Vendor details</h2> <div class="flex flex-row flex-wrap gap-5">${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "vendorTaxId", class: "w-64" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
              default: () => {
                return `Tax ID`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, attrs, { value: $formData.vendorTaxId }),
              {
                value: ($$value) => {
                  $formData.vendorTaxId = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
          default: () => {
            return `The vendor&#39;s tax ID is a unique identifier for the vendor.`;
          }
        })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
      }
    })} ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "vendorName", class: "w-64" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
              default: () => {
                return `Name`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, attrs, { readonly: readonly || null }, { value: $formData.vendorName }),
              {
                value: ($$value) => {
                  $formData.vendorName = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
          default: () => {
            return `The vendor&#39;s name is the name of the vendor that issued the invoice.`;
          }
        })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
      }
    })} ${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "vendorAddress",
        class: "w-64"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Address`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                Object.assign({}, attrs, { readonly: readonly || null }, { value: $formData.vendorAddress }),
                {
                  value: ($$value) => {
                    $formData.vendorAddress = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
            default: () => {
              return `The vendor&#39;s address is the address of the vendor that issued the invoice.`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )}</div></section> <section><h2 data-svelte-h="svelte-qqpzzh">Receiver details</h2> <div class="flex flex-row flex-wrap gap-5">${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "receiverTaxId",
        class: "w-64"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Tax ID`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                Object.assign({}, attrs, { readonly: readonly || null }, { value: $formData.receiverTaxId }),
                {
                  value: ($$value) => {
                    $formData.receiverTaxId = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
            default: () => {
              return `The receiver&#39;s tax ID is a unique identifier for the receiver.`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )} ${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "receiverName",
        class: "w-64"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Name`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                Object.assign({}, attrs, { readonly: readonly || null }, { value: $formData.receiverName }),
                {
                  value: ($$value) => {
                    $formData.receiverName = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
            default: () => {
              return `The receiver&#39;s name is the name of the person or entity that received the service or
          product.`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )} ${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "receiverAddress",
        class: "w-64"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Address`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                Object.assign({}, attrs, { readonly: readonly || null }, { value: $formData.receiverAddress }),
                {
                  value: ($$value) => {
                    $formData.receiverAddress = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`;
            }
          })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
            default: () => {
              return `The receiver&#39;s address is the address of the person or entity that received the service or
          product.`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )}</div></section> <section><h2 data-svelte-h="svelte-j910v1">Financial information</h2> <div class="flex flex-row flex-wrap gap-5">${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "subtotal", class: "w-64" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
              default: () => {
                return `Subtotal`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, attrs, { readonly: readonly || null }, { type: "number" }, { step: "0.01" }, { value: $formData.subtotal }),
              {
                value: ($$value) => {
                  $formData.subtotal = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
          default: () => {
            return `Amount before taxes.`;
          }
        })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
      }
    })} ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "tax", class: "w-64" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
              default: () => {
                return `Tax`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, attrs, { readonly: readonly || null }, { type: "number" }, { step: "0.01" }, { value: $formData.tax }),
              {
                value: ($$value) => {
                  $formData.tax = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
          default: () => {
            return `Tax amount.`;
          }
        })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
      }
    })} ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "total", class: "w-64" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
              default: () => {
                return `Total`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, attrs, { readonly: readonly || null }, { type: "number" }, { step: "0.01" }, { value: $formData.total }),
              {
                value: ($$value) => {
                  $formData.total = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Form_description, "Form.Description").$$render($$result, {}, {}, {
          default: () => {
            return `Total amount.`;
          }
        })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
      }
    })}</div></section> <div class="flex flex-row flex-wrap gap-5">${readonly ? `${validate_component(Form_button, "Form.FormButton").$$render($$result, { type: "button", class: "w-64" }, {}, {
      default: () => {
        return `Edit`;
      }
    })}` : `${validate_component(Form_button, "Form.FormButton").$$render($$result, { class: "w-64" }, {}, {
      default: () => {
        return `Save`;
      }
    })} ${validate_component(Form_button, "Form.FormButton").$$render(
      $$result,
      {
        type: "button",
        class: cn(buttonVariants({ variant: "outline" }), "w-64")
      },
      {},
      {
        default: () => {
          return `Cancel`;
        }
      }
    )}`}</div></form>`;
  } while (!$$settled);
  $$unsubscribe_proxyDate();
  $$unsubscribe_formData();
  return $$rendered;
});
const Separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "orientation", "decorative"]);
  let { class: className = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { decorative = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0)
    $$bindings.decorative(decorative);
  return `${validate_component(Separator$1, "SeparatorPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )
      },
      { orientation },
      { decorative },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Loader_circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M21 12a9 9 0 1 1-6.219-8.56" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "loader-circle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const LoaderCircle = Loader_circle;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main>${validate_component(Resizable_pane_group, "Resizable.PaneGroup").$$render(
    $$result,
    {
      direction: "horizontal",
      class: "rounded"
    },
    {},
    {
      default: () => {
        return `${validate_component(Pane, "Resizable.Pane").$$render($$result, { defaultSize: 2 / 5 }, {}, {
          default: () => {
            return `${function(__value) {
              if (is_promise(__value)) {
                __value.then(null, noop);
                return ` <div class="flex h-full w-full items-center justify-center gap-2">${validate_component(LoaderCircle, "LoaderCircle").$$render($$result, { class: "animate-spin" }, {}, {})} <span data-svelte-h="svelte-qyjod7">Loading image...</span></div> `;
              }
              return function(image) {
                return ` <div class="flex items-center justify-center"><img${add_attribute("src", image, 0)} alt="Expense details" class="inline-block h-auto max-w-full"></div> `;
              }(__value);
            }(data.image)}`;
          }
        })} ${validate_component(Resizable_handle, "Resizable.Handle").$$render($$result, { withHandle: true }, {}, {})} ${validate_component(Pane, "Resizable.Pane").$$render($$result, { defaultSize: 3 / 5 }, {}, {
          default: () => {
            return `<div class="p-4"><h1 class="text-lg font-extrabold">Expense details for <strong>${escape(data.form.data.invoiceReceiptId)}</strong></h1> ${validate_component(Separator, "Separator").$$render($$result, {}, {}, {})} ${validate_component(Detailed_expense_form, "DetailedExpenseForm").$$render($$result, { data: data.form }, {}, {})}</div>`;
          }
        })}`;
      }
    }
  )}</main>`;
});
export {
  Page as default
};
