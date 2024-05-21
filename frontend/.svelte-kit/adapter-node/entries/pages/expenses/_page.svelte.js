import { c as create_ssr_component, s as spread, g as escape_attribute_value, h as escape_object, a as add_attribute, v as validate_component, m as missing_component, f as each, e as escape } from "../../../chunks/ssr.js";
import { g as get_store_value, b as getContext, s as setContext, c as compute_rest_props, a as subscribe, d as set_store_value } from "../../../chunks/lifecycle.js";
import { w as writable, d as derived, r as readable } from "../../../chunks/index2.js";
import { i as isBrowser, a as isHTMLElement, w as withGet, b as wrapArray, c as createElHelpers, t as toWritableStores, g as generateIds, m as makeElement, s as styleToString, p as portalAttr, e as effect, d as executeCallbacks, f as addMeltEventListener, F as FIRST_LAST_KEYS, k as kbd, S as SELECTION_KEYS, u as useEscapeKeydown, n as noop, h as isElementDisabled, j as safeOnMount, l as addEventListener, o as overridable, q as disabledAttr, r as omit, v as is_void, x as cn, y as flyAndScale, B as Button } from "../../../chunks/index3.js";
import "dequal";
import { s as sleep, d as derivedVisible, u as usePopper, g as getPortalDestination, a as usePortal, c as createSeparator, h as handleFocus, r as removeScroll, b as createBitAttrs, e as removeUndefined, f as getOptionUpdater, i as getPositioningUpdater, j as createDispatcher, k as disabledAttrs, I as Icon, L as Label, l as Input, R as Root$1, T as Trigger$1, C as CalendarIcon, P as Popover_content, m as Calendar_1 } from "../../../chunks/label.js";
import { t as tick } from "../../../chunks/scheduler.js";
import "clsx";
import "../../../chunks/client.js";
import { E as ExpenseData } from "../../../chunks/expenses.js";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function addHighlight(element) {
  element.setAttribute("data-highlighted", "");
}
function removeHighlight(element) {
  element.removeAttribute("data-highlighted");
}
function debounce(fn, wait = 500) {
  let timeout = null;
  return function(...args) {
    const later = () => {
      timeout = null;
      fn(...args);
    };
    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function handleRovingFocus(nextElement) {
  if (!isBrowser)
    return;
  sleep(1).then(() => {
    const currentFocusedElement = document.activeElement;
    if (!isHTMLElement(currentFocusedElement) || currentFocusedElement === nextElement)
      return;
    currentFocusedElement.tabIndex = -1;
    if (nextElement) {
      nextElement.tabIndex = 0;
      nextElement.focus();
    }
  });
}
function getFocusableElements() {
  return Array.from(document.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'));
}
function getNextFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const nextIndex = currentIndex + 1;
  const nextElement = focusableElements[nextIndex];
  if (nextIndex < focusableElements.length && isHTMLElement(nextElement)) {
    return nextElement;
  }
  return null;
}
function getPreviousFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const previousIndex = currentIndex - 1;
  const prevElement = focusableElements[previousIndex];
  if (previousIndex >= 0 && isHTMLElement(prevElement)) {
    return prevElement;
  }
  return null;
}
const ignoredKeys = /* @__PURE__ */ new Set(["Shift", "Control", "Alt", "Meta", "CapsLock", "NumLock"]);
const defaults$2 = {
  onMatch: handleRovingFocus,
  getCurrentItem: () => document.activeElement
};
function createTypeaheadSearch(args = {}) {
  const withDefaults = { ...defaults$2, ...args };
  const typed = withGet(writable([]));
  const resetTyped = debounce(() => {
    typed.update(() => []);
  });
  const handleTypeaheadSearch = (key, items) => {
    if (ignoredKeys.has(key))
      return;
    const currentItem = withDefaults.getCurrentItem();
    const $typed = get_store_value(typed);
    if (!Array.isArray($typed)) {
      return;
    }
    $typed.push(key.toLowerCase());
    typed.set($typed);
    const candidateItems = items.filter((item) => {
      if (item.getAttribute("disabled") === "true" || item.getAttribute("aria-disabled") === "true" || item.hasAttribute("data-disabled")) {
        return false;
      }
      return true;
    });
    const isRepeated = $typed.length > 1 && $typed.every((char) => char === $typed[0]);
    const normalizeSearch = isRepeated ? $typed[0] : $typed.join("");
    const currentItemIndex = isHTMLElement(currentItem) ? candidateItems.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizeSearch.length === 1;
    if (excludeCurrentItem) {
      wrappedItems = wrappedItems.filter((v) => v !== currentItem);
    }
    const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));
    if (isHTMLElement(nextItem) && nextItem !== currentItem) {
      withDefaults.onMatch(nextItem);
    }
    resetTyped();
  };
  return {
    typed,
    resetTyped,
    handleTypeaheadSearch
  };
}
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, kbd.ARROW_LEFT]
};
const SUB_CLOSE_KEYS = {
  ltr: [kbd.ARROW_LEFT],
  rtl: [kbd.ARROW_RIGHT]
};
const menuIdParts = ["menu", "trigger"];
const defaults$1 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  typeahead: true,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createMenuBuilder(opts) {
  const { name, selector } = createElHelpers(opts.selector);
  const { preventScroll, arrowSize, positioning, closeOnEscape, closeOnOutsideClick, portal, forceVisible, typeahead, loop, closeFocus, disableFocusFirstItem, closeOnItemClick, onOutsideClick } = opts.rootOptions;
  const rootOpen = opts.rootOpen;
  const rootActiveTrigger = opts.rootActiveTrigger;
  const nextFocusable = opts.nextFocusable;
  const prevFocusable = opts.prevFocusable;
  const isUsingKeyboard = withGet.writable(false);
  const lastPointerX = withGet(writable(0));
  const pointerGraceIntent = withGet(writable(null));
  const pointerDir = withGet(writable("right"));
  const currentFocusedItem = withGet(writable(null));
  const pointerMovingToSubmenu = withGet(derived([pointerDir, pointerGraceIntent], ([$pointerDir, $pointerGraceIntent]) => {
    return (e) => {
      const isMovingTowards = $pointerDir === $pointerGraceIntent?.side;
      return isMovingTowards && isPointerInGraceArea(e, $pointerGraceIntent?.area);
    };
  }));
  const { typed, handleTypeaheadSearch } = createTypeaheadSearch();
  const rootIds = toWritableStores({ ...generateIds(menuIdParts), ...opts.ids });
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const rootMenu = makeElement(name(), {
    stores: [isVisible, portal, rootIds.menu, rootIds.trigger],
    returned: ([$isVisible, $portal, $rootMenuId, $rootTriggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $rootMenuId,
        "aria-labelledby": $rootTriggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal),
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          setMeltMenuAttribute(node, selector);
          unsubPopper = usePopper(node, {
            anchorElement: $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              modal: {
                closeOnInteractOutside: $closeOnOutsideClick,
                shouldCloseOnInteractOutside: (e) => {
                  onOutsideClick.get()?.(e);
                  if (e.defaultPrevented)
                    return false;
                  if (isHTMLElement($rootActiveTrigger) && $rootActiveTrigger.contains(e.target)) {
                    return false;
                  }
                  return true;
                },
                onClose: () => {
                  rootOpen.set(false);
                  $rootActiveTrigger.focus();
                },
                open: $isVisible
              },
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          }).destroy;
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement(target) || !isHTMLElement(menuEl))
          return;
        const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, loop.get() ?? false);
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const rootTrigger = makeElement(name("trigger"), {
    stores: [rootOpen, rootIds.menu, rootIds.trigger],
    returned: ([$rootOpen, $rootMenuId, $rootTriggerId]) => {
      return {
        "aria-controls": $rootMenuId,
        "aria-expanded": $rootOpen,
        "data-state": $rootOpen ? "open" : "closed",
        id: $rootTriggerId,
        tabindex: 0
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      rootActiveTrigger.update((p) => {
        if (p)
          return p;
        return node;
      });
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const $rootOpen = rootOpen.get();
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        handleOpen(triggerEl);
        if (!$rootOpen)
          e.preventDefault();
      }), addMeltEventListener(node, "keydown", (e) => {
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        if (!(SELECTION_KEYS.includes(e.key) || e.key === kbd.ARROW_DOWN))
          return;
        e.preventDefault();
        handleOpen(triggerEl);
        const menuId = triggerEl.getAttribute("aria-controls");
        if (!menuId)
          return;
        const menu = document.getElementById(menuId);
        if (!menu)
          return;
        const menuItems = getMenuItems(menu);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const rootArrow = makeElement(name("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            rootOpen.set(false);
            const $rootActiveTrigger = rootActiveTrigger.get();
            if ($rootActiveTrigger)
              $rootActiveTrigger.focus();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      const unsubPortal = effect([portal], ([$portal]) => {
        if ($portal === null)
          return noop;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop;
        return usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubEscapeKeydown();
          unsubPortal();
        }
      };
    }
  });
  const item = makeElement(name("item"), {
    returned: () => {
      return {
        role: "menuitem",
        tabindex: -1,
        "data-orientation": "vertical"
      };
    },
    action: (node) => {
      setMeltMenuAttribute(node, selector);
      applyAttrsIfDisabled(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
      }), addMeltEventListener(node, "click", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
        if (e.defaultPrevented) {
          handleRovingFocus(itemEl);
          return;
        }
        if (closeOnItemClick.get()) {
          sleep(1).then(() => {
            rootOpen.set(false);
          });
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        onItemKeyDown(e);
      }), addMeltEventListener(node, "pointermove", (e) => {
        onMenuItemPointerMove(e);
      }), addMeltEventListener(node, "pointerleave", (e) => {
        onMenuItemPointerLeave(e);
      }), addMeltEventListener(node, "focusin", (e) => {
        onItemFocusIn(e);
      }), addMeltEventListener(node, "focusout", (e) => {
        onItemFocusOut(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const group = makeElement(name("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = makeElement(name("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const checkboxItemDefaults = {
    defaultChecked: false,
    disabled: false
  };
  const createCheckboxItem = (props) => {
    const withDefaults = { ...checkboxItemDefaults, ...props };
    const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked ?? null);
    const checked = overridable(checkedWritable, withDefaults.onCheckedChange);
    const disabled = writable(withDefaults.disabled);
    const checkboxItem = makeElement(name("checkbox-item"), {
      stores: [checked, disabled],
      returned: ([$checked, $disabled]) => {
        return {
          role: "menuitemcheckbox",
          tabindex: -1,
          "data-orientation": "vertical",
          "aria-checked": isIndeterminate($checked) ? "mixed" : $checked ? "true" : "false",
          "data-disabled": disabledAttr($disabled),
          "data-state": getCheckedState($checked)
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            handleRovingFocus(itemEl);
            return;
          }
          checked.update((prev) => {
            if (isIndeterminate(prev))
              return true;
            return !prev;
          });
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(checked, ($checked) => $checked === true);
    const _isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
    return {
      elements: {
        checkboxItem
      },
      states: {
        checked
      },
      helpers: {
        isChecked,
        isIndeterminate: _isIndeterminate
      },
      options: {
        disabled
      }
    };
  };
  const createMenuRadioGroup = (args = {}) => {
    const valueWritable = args.value ?? writable(args.defaultValue ?? null);
    const value = overridable(valueWritable, args.onValueChange);
    const radioGroup = makeElement(name("radio-group"), {
      returned: () => ({
        role: "group"
      })
    });
    const radioItemDefaults = {
      disabled: false
    };
    const radioItem = makeElement(name("radio-item"), {
      stores: [value],
      returned: ([$value]) => {
        return (itemProps) => {
          const { value: itemValue, disabled } = { ...radioItemDefaults, ...itemProps };
          const checked = $value === itemValue;
          return {
            disabled,
            role: "menuitemradio",
            "data-state": checked ? "checked" : "unchecked",
            "aria-checked": checked,
            "data-disabled": disabledAttr(disabled),
            "data-value": itemValue,
            "data-orientation": "vertical",
            tabindex: -1
          };
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            if (!isHTMLElement(itemEl))
              return;
            handleRovingFocus(itemEl);
            return;
          }
          value.set(itemValue);
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(value, ($value) => {
      return (itemValue) => {
        return $value === itemValue;
      };
    });
    return {
      elements: {
        radioGroup,
        radioItem
      },
      states: {
        value
      },
      helpers: {
        isChecked
      }
    };
  };
  const { elements: { root: separator } } = createSeparator({
    orientation: "horizontal"
  });
  const subMenuDefaults = {
    ...defaults$1,
    disabled: false,
    positioning: {
      placement: "right-start",
      gutter: 8
    }
  };
  const createSubmenu = (args) => {
    const withDefaults = { ...subMenuDefaults, ...args };
    const subOpenWritable = withDefaults.open ?? writable(false);
    const subOpen = overridable(subOpenWritable, withDefaults?.onOpenChange);
    const options = toWritableStores(omit(withDefaults, "ids"));
    const { positioning: positioning2, arrowSize: arrowSize2, disabled } = options;
    const subActiveTrigger = withGet(writable(null));
    const subOpenTimer = withGet(writable(null));
    const pointerGraceTimer = withGet(writable(0));
    const subIds = toWritableStores({ ...generateIds(menuIdParts), ...withDefaults.ids });
    safeOnMount(() => {
      const subTrigger2 = document.getElementById(subIds.trigger.get());
      if (subTrigger2) {
        subActiveTrigger.set(subTrigger2);
      }
    });
    const subIsVisible = derivedVisible({
      open: subOpen,
      forceVisible,
      activeTrigger: subActiveTrigger
    });
    const subMenu = makeElement(name("submenu"), {
      stores: [subIsVisible, subIds.menu, subIds.trigger],
      returned: ([$subIsVisible, $subMenuId, $subTriggerId]) => {
        return {
          role: "menu",
          hidden: $subIsVisible ? void 0 : true,
          style: styleToString({
            display: $subIsVisible ? void 0 : "none"
          }),
          id: $subMenuId,
          "aria-labelledby": $subTriggerId,
          "data-state": $subIsVisible ? "open" : "closed",
          // unit tests fail on `.closest` if the id starts with a number
          // so using a data attribute
          "data-id": $subMenuId,
          tabindex: -1
        };
      },
      action: (node) => {
        let unsubPopper = noop;
        const unsubDerived = effect([subIsVisible, positioning2], ([$subIsVisible, $positioning]) => {
          unsubPopper();
          if (!$subIsVisible)
            return;
          const activeTrigger = subActiveTrigger.get();
          if (!activeTrigger)
            return;
          tick().then(() => {
            unsubPopper();
            const parentMenuEl = getParentMenu(activeTrigger);
            unsubPopper = usePopper(node, {
              anchorElement: activeTrigger,
              open: subOpen,
              options: {
                floating: $positioning,
                portal: isHTMLElement(parentMenuEl) ? parentMenuEl : void 0,
                modal: null,
                focusTrap: null,
                escapeKeydown: null
              }
            }).destroy;
          });
        });
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
          if (e.key === kbd.ESCAPE) {
            return;
          }
          const target = e.target;
          const menuEl = e.currentTarget;
          if (!isHTMLElement(target) || !isHTMLElement(menuEl))
            return;
          const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
          if (!isKeyDownInside)
            return;
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.stopImmediatePropagation();
            handleMenuNavigation(e, loop.get() ?? false);
            return;
          }
          const isCloseKey = SUB_CLOSE_KEYS["ltr"].includes(e.key);
          const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
          const isCharacterKey = e.key.length === 1;
          if (isCloseKey) {
            const $subActiveTrigger = subActiveTrigger.get();
            e.preventDefault();
            subOpen.update(() => {
              if ($subActiveTrigger) {
                handleRovingFocus($subActiveTrigger);
              }
              return false;
            });
            return;
          }
          if (e.key === kbd.TAB) {
            e.preventDefault();
            rootOpen.set(false);
            handleTabNavigation(e, nextFocusable, prevFocusable);
            return;
          }
          if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
            handleTypeaheadSearch(e.key, getMenuItems(menuEl));
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          onMenuPointerMove(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          const $subActiveTrigger = subActiveTrigger.get();
          if (isUsingKeyboard.get()) {
            const target = e.target;
            const submenuEl = document.getElementById(subIds.menu.get());
            if (!isHTMLElement(submenuEl) || !isHTMLElement(target))
              return;
            if (!submenuEl.contains(target) && target !== $subActiveTrigger) {
              subOpen.set(false);
            }
          } else {
            const menuEl = e.currentTarget;
            const relatedTarget = e.relatedTarget;
            if (!isHTMLElement(relatedTarget) || !isHTMLElement(menuEl))
              return;
            if (!menuEl.contains(relatedTarget) && relatedTarget !== $subActiveTrigger) {
              subOpen.set(false);
            }
          }
        }));
        return {
          destroy() {
            unsubDerived();
            unsubPopper();
            unsubEvents();
          }
        };
      }
    });
    const subTrigger = makeElement(name("subtrigger"), {
      stores: [subOpen, disabled, subIds.menu, subIds.trigger],
      returned: ([$subOpen, $disabled, $subMenuId, $subTriggerId]) => {
        return {
          role: "menuitem",
          id: $subTriggerId,
          tabindex: -1,
          "aria-controls": $subMenuId,
          "aria-expanded": $subOpen,
          "data-state": $subOpen ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "aria-haspopop": "menu"
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        subActiveTrigger.update((p) => {
          if (p)
            return p;
          return node;
        });
        const unsubTimer = () => {
          clearTimerStore(subOpenTimer);
          window.clearTimeout(pointerGraceTimer.get());
          pointerGraceIntent.set(null);
        };
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "click", (e) => {
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          handleRovingFocus(triggerEl);
          if (!subOpen.get()) {
            subOpen.update((prev) => {
              const isAlreadyOpen = prev;
              if (!isAlreadyOpen) {
                subActiveTrigger.set(triggerEl);
                return !prev;
              }
              return prev;
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          const $typed = typed.get();
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          const isTypingAhead = $typed.length > 0;
          if (isTypingAhead && e.key === kbd.SPACE)
            return;
          if (SUB_OPEN_KEYS["ltr"].includes(e.key)) {
            if (!subOpen.get()) {
              triggerEl.click();
              e.preventDefault();
              return;
            }
            const menuId = triggerEl.getAttribute("aria-controls");
            if (!menuId)
              return;
            const menuEl = document.getElementById(menuId);
            if (!isHTMLElement(menuEl))
              return;
            const firstItem = getMenuItems(menuEl)[0];
            handleRovingFocus(firstItem);
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          if (!isMouse(e))
            return;
          onItemEnter(e);
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          if (!isFocusWithinSubmenu(subIds.menu.get())) {
            handleRovingFocus(triggerEl);
          }
          const openTimer = subOpenTimer.get();
          if (!subOpen.get() && !openTimer && !isElementDisabled(triggerEl)) {
            subOpenTimer.set(window.setTimeout(() => {
              subOpen.update(() => {
                subActiveTrigger.set(triggerEl);
                return true;
              });
              clearTimerStore(subOpenTimer);
            }, 100));
          }
        }), addMeltEventListener(node, "pointerleave", (e) => {
          if (!isMouse(e))
            return;
          clearTimerStore(subOpenTimer);
          const submenuEl = document.getElementById(subIds.menu.get());
          const contentRect = submenuEl?.getBoundingClientRect();
          if (contentRect) {
            const side = submenuEl?.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            pointerGraceIntent.set({
              area: [
                // Apply a bleed on clientX to ensure that our exit point is
                // consistently within polygon bounds
                { x: e.clientX + bleed, y: e.clientY },
                { x: contentNearEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.bottom },
                { x: contentNearEdge, y: contentRect.bottom }
              ],
              side
            });
            window.clearTimeout(pointerGraceTimer.get());
            pointerGraceTimer.set(window.setTimeout(() => {
              pointerGraceIntent.set(null);
            }, 300));
          } else {
            onTriggerLeave(e);
            if (e.defaultPrevented)
              return;
            pointerGraceIntent.set(null);
          }
        }), addMeltEventListener(node, "focusout", (e) => {
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          removeHighlight(triggerEl);
          const relatedTarget = e.relatedTarget;
          if (!isHTMLElement(relatedTarget))
            return;
          const menuId = triggerEl.getAttribute("aria-controls");
          if (!menuId)
            return;
          const menu = document.getElementById(menuId);
          if (menu && !menu.contains(relatedTarget)) {
            subOpen.set(false);
          }
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }));
        return {
          destroy() {
            unsubTimer();
            unsubEvents();
          }
        };
      }
    });
    const subArrow = makeElement(name("subarrow"), {
      stores: arrowSize2,
      returned: ($arrowSize) => ({
        "data-arrow": true,
        style: styleToString({
          position: "absolute",
          width: `var(--arrow-size, ${$arrowSize}px)`,
          height: `var(--arrow-size, ${$arrowSize}px)`
        })
      })
    });
    effect([rootOpen], ([$rootOpen]) => {
      if (!$rootOpen) {
        subActiveTrigger.set(null);
        subOpen.set(false);
      }
    });
    effect([pointerGraceIntent], ([$pointerGraceIntent]) => {
      if (!isBrowser || $pointerGraceIntent)
        return;
      window.clearTimeout(pointerGraceTimer.get());
    });
    effect([subOpen], ([$subOpen]) => {
      if (!isBrowser)
        return;
      if ($subOpen && isUsingKeyboard.get()) {
        sleep(1).then(() => {
          const menuEl = document.getElementById(subIds.menu.get());
          if (!menuEl)
            return;
          const menuItems = getMenuItems(menuEl);
          if (!menuItems.length)
            return;
          handleRovingFocus(menuItems[0]);
        });
      }
      if (!$subOpen) {
        const focusedItem = currentFocusedItem.get();
        const subTriggerEl = document.getElementById(subIds.trigger.get());
        if (focusedItem) {
          sleep(1).then(() => {
            const menuEl = document.getElementById(subIds.menu.get());
            if (!menuEl)
              return;
            if (menuEl.contains(focusedItem)) {
              removeHighlight(focusedItem);
            }
          });
        }
        if (!subTriggerEl || document.activeElement === subTriggerEl)
          return;
        removeHighlight(subTriggerEl);
      }
    });
    return {
      ids: subIds,
      elements: {
        subTrigger,
        subMenu,
        subArrow
      },
      states: {
        subOpen
      },
      options
    };
  };
  safeOnMount(() => {
    const triggerEl = document.getElementById(rootIds.trigger.get());
    if (isHTMLElement(triggerEl) && rootOpen.get()) {
      rootActiveTrigger.set(triggerEl);
    }
    const unsubs = [];
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = () => {
      isUsingKeyboard.set(true);
      unsubs.push(executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true })));
    };
    const keydownListener = (e) => {
      if (e.key === kbd.ESCAPE && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    unsubs.push(addEventListener(document, "keydown", handleKeyDown, { capture: true }));
    unsubs.push(addEventListener(document, "keydown", keydownListener));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect([rootOpen, currentFocusedItem], ([$rootOpen, $currentFocusedItem]) => {
    if (!$rootOpen && $currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
  });
  effect([rootOpen], ([$rootOpen]) => {
    if (!isBrowser)
      return;
    if (!$rootOpen) {
      const $rootActiveTrigger = rootActiveTrigger.get();
      if (!$rootActiveTrigger)
        return;
      const $closeFocus = closeFocus.get();
      if (!$rootOpen && $rootActiveTrigger) {
        handleFocus({ prop: $closeFocus, defaultEl: $rootActiveTrigger });
      }
    }
  });
  effect([rootOpen, preventScroll], ([$rootOpen, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if (opts.removeScroll && $rootOpen && $preventScroll) {
      unsubs.push(removeScroll());
    }
    sleep(1).then(() => {
      const menuEl = document.getElementById(rootIds.menu.get());
      if (menuEl && $rootOpen && isUsingKeyboard.get()) {
        if (disableFocusFirstItem.get()) {
          handleRovingFocus(menuEl);
          return;
        }
        const menuItems = getMenuItems(menuEl);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }
    });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(rootOpen, ($rootOpen) => {
    if (!isBrowser)
      return;
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = (e) => {
      isUsingKeyboard.set(true);
      if (e.key === kbd.ESCAPE && $rootOpen && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    return executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true }), addEventListener(document, "keydown", handleKeyDown, { capture: true }));
  });
  function handleOpen(triggerEl) {
    rootOpen.update((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        nextFocusable.set(getNextFocusable(triggerEl));
        prevFocusable.set(getPreviousFocusable(triggerEl));
        rootActiveTrigger.set(triggerEl);
      }
      return isOpen;
    });
  }
  function onItemFocusIn(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    const $currentFocusedItem = currentFocusedItem.get();
    if ($currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
    addHighlight(itemEl);
    currentFocusedItem.set(itemEl);
  }
  function onItemFocusOut(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    removeHighlight(itemEl);
  }
  function onItemEnter(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onItemLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    const parentMenuEl = getParentMenu(target);
    if (!parentMenuEl)
      return;
    handleRovingFocus(parentMenuEl);
  }
  function onTriggerLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onMenuPointerMove(e) {
    if (!isMouse(e))
      return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget) || !isHTMLElement(target))
      return;
    const $lastPointerX = lastPointerX.get();
    const pointerXHasChanged = $lastPointerX !== e.clientX;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > $lastPointerX ? "right" : "left";
      pointerDir.set(newDir);
      lastPointerX.set(e.clientX);
    }
  }
  function onMenuItemPointerMove(e, currTarget = null) {
    if (!isMouse(e))
      return;
    onItemEnter(e);
    if (e.defaultPrevented)
      return;
    if (currTarget) {
      handleRovingFocus(currTarget);
      return;
    }
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
      return;
    handleRovingFocus(currentTarget);
  }
  function onMenuItemPointerLeave(e) {
    if (!isMouse(e))
      return;
    onItemLeave(e);
  }
  function onItemKeyDown(e) {
    const $typed = typed.get();
    const isTypingAhead = $typed.length > 0;
    if (isTypingAhead && e.key === kbd.SPACE) {
      e.preventDefault();
      return;
    }
    if (SELECTION_KEYS.includes(e.key)) {
      e.preventDefault();
      const itemEl = e.currentTarget;
      if (!isHTMLElement(itemEl))
        return;
      itemEl.click();
    }
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function isPointerMovingToSubmenu(e) {
    return pointerMovingToSubmenu.get()(e);
  }
  function getParentMenu(element) {
    const parentMenuEl = element.closest('[role="menu"]');
    if (!isHTMLElement(parentMenuEl))
      return null;
    return parentMenuEl;
  }
  return {
    elements: {
      trigger: rootTrigger,
      menu: rootMenu,
      overlay,
      item,
      group,
      groupLabel,
      arrow: rootArrow,
      separator
    },
    builders: {
      createCheckboxItem,
      createSubmenu,
      createMenuRadioGroup
    },
    states: {
      open: rootOpen
    },
    helpers: {
      handleTypeaheadSearch
    },
    ids: rootIds,
    options: opts.rootOptions
  };
}
function handleTabNavigation(e, nextFocusable, prevFocusable) {
  if (e.shiftKey) {
    const $prevFocusable = prevFocusable.get();
    if ($prevFocusable) {
      e.preventDefault();
      sleep(1).then(() => $prevFocusable.focus());
      prevFocusable.set(null);
    }
  } else {
    const $nextFocusable = nextFocusable.get();
    if ($nextFocusable) {
      e.preventDefault();
      sleep(1).then(() => $nextFocusable.focus());
      nextFocusable.set(null);
    }
  }
}
function getMenuItems(menuElement) {
  return Array.from(menuElement.querySelectorAll(`[data-melt-menu-id="${menuElement.id}"]`)).filter((item) => isHTMLElement(item));
}
function applyAttrsIfDisabled(element) {
  if (!element || !isElementDisabled(element))
    return;
  element.setAttribute("data-disabled", "");
  element.setAttribute("aria-disabled", "true");
}
function clearTimerStore(timerStore) {
  if (!isBrowser)
    return;
  const timer = timerStore.get();
  if (timer) {
    window.clearTimeout(timer);
    timerStore.set(null);
  }
}
function isMouse(e) {
  return e.pointerType === "mouse";
}
function setMeltMenuAttribute(element, selector) {
  if (!element)
    return;
  const menuEl = element.closest(`${selector()}, ${selector("submenu")}`);
  if (!isHTMLElement(menuEl))
    return;
  element.setAttribute("data-melt-menu-id", menuEl.id);
}
function handleMenuNavigation(e, loop) {
  e.preventDefault();
  const currentFocusedItem = document.activeElement;
  const currentTarget = e.currentTarget;
  if (!isHTMLElement(currentFocusedItem) || !isHTMLElement(currentTarget))
    return;
  const menuItems = getMenuItems(currentTarget);
  if (!menuItems.length)
    return;
  const candidateNodes = menuItems.filter((item) => {
    if (item.hasAttribute("data-disabled") || item.getAttribute("disabled") === "true") {
      return false;
    }
    return true;
  });
  const currentIndex = candidateNodes.indexOf(currentFocusedItem);
  let nextIndex;
  switch (e.key) {
    case kbd.ARROW_DOWN:
      if (loop) {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : currentIndex;
      }
      break;
    case kbd.ARROW_UP:
      if (loop) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : candidateNodes.length - 1;
      } else {
        nextIndex = currentIndex < 0 ? candidateNodes.length - 1 : currentIndex > 0 ? currentIndex - 1 : 0;
      }
      break;
    case kbd.HOME:
      nextIndex = 0;
      break;
    case kbd.END:
      nextIndex = candidateNodes.length - 1;
      break;
    default:
      return;
  }
  handleRovingFocus(candidateNodes[nextIndex]);
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  const cursorPos = { x: e.clientX, y: e.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isFocusWithinSubmenu(submenuId) {
  const activeEl = document.activeElement;
  if (!isHTMLElement(activeEl))
    return false;
  const submenuEl = activeEl.closest(`[data-id="${submenuId}"]`);
  return isHTMLElement(submenuEl);
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
const defaults = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  forceVisible: false,
  typeahead: true,
  closeFocus: void 0,
  disableFocusFirstItem: false,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createDropdownMenu(props) {
  const withDefaults = { ...defaults, ...props };
  const rootOptions = toWritableStores(omit(withDefaults, "ids"));
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);
  const rootActiveTrigger = withGet(writable(null));
  const nextFocusable = withGet(writable(null));
  const prevFocusable = withGet(writable(null));
  const { elements, builders, ids, states, options } = createMenuBuilder({
    rootOptions,
    rootOpen,
    rootActiveTrigger: withGet(rootActiveTrigger),
    nextFocusable: withGet(nextFocusable),
    prevFocusable: withGet(prevFocusable),
    selector: "dropdown-menu",
    removeScroll: true,
    ids: withDefaults.ids
  });
  return {
    ids,
    elements,
    states,
    builders,
    options
  };
}
function getMenuData() {
  const NAME = "menu";
  const SUB_NAME = "menu-submenu";
  const RADIO_GROUP_NAME = "menu-radiogroup";
  const CHECKBOX_ITEM_NAME = "menu-checkboxitem";
  const RADIO_ITEM_NAME = "menu-radioitem";
  const GROUP_NAME = "menu-group";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "radio-indicator",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    SUB_NAME,
    RADIO_GROUP_NAME,
    CHECKBOX_ITEM_NAME,
    RADIO_ITEM_NAME,
    GROUP_NAME,
    PARTS
  };
}
function getCtx() {
  const { NAME } = getMenuData();
  return getContext(NAME);
}
function setCtx(props) {
  const { NAME, PARTS } = getMenuData();
  const getAttrs = createBitAttrs("menu", PARTS);
  const dropdownMenu = {
    ...createDropdownMenu({ ...removeUndefined(props), forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dropdownMenu);
  return {
    ...dropdownMenu,
    updateOption: getOptionUpdater(dropdownMenu.options)
  };
}
function setCheckboxItem(props) {
  const { CHECKBOX_ITEM_NAME } = getMenuData();
  const { builders: { createCheckboxItem }, getAttrs } = getCtx();
  const checkboxItem = createCheckboxItem(removeUndefined(props));
  setContext(CHECKBOX_ITEM_NAME, checkboxItem.states.checked);
  return {
    ...checkboxItem,
    updateOption: getOptionUpdater(checkboxItem.options),
    getAttrs
  };
}
function getCheckboxIndicator() {
  const { CHECKBOX_ITEM_NAME } = getMenuData();
  return getContext(CHECKBOX_ITEM_NAME);
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
const Menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["href", "asChild", "disabled", "el"]);
  let $item, $$unsubscribe_item;
  let { href = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { disabled = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, getAttrs } = getCtx();
  $$unsubscribe_item = subscribe(item, (value) => $item = value);
  createDispatcher();
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $item;
  attrs = {
    ...getAttrs("item"),
    ...disabledAttrs(disabled)
  };
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        { href: escape_attribute_value(href) },
        escape_object(builder),
        escape_object($$restProps)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}`}`;
});
const Menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $separator, $$unsubscribe_separator;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { separator }, getAttrs } = getCtx();
  $$unsubscribe_separator = subscribe(separator, (value) => $separator = value);
  const attrs = getAttrs("separator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $separator;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_separator();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object($separator), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Menu_checkbox_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["checked", "onCheckedChange", "disabled", "asChild", "el"]);
  let $checkboxItem, $$unsubscribe_checkboxItem;
  let { checked = void 0 } = $$props;
  let { onCheckedChange = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { checkboxItem }, states: { checked: localChecked }, updateOption, getAttrs } = setCheckboxItem({
    disabled,
    defaultChecked: checked,
    onCheckedChange: ({ next }) => {
      if (checked !== next) {
        onCheckedChange?.(next);
        checked = next;
      }
      return next;
    }
  });
  $$unsubscribe_checkboxItem = subscribe(checkboxItem, (value) => $checkboxItem = value);
  createDispatcher();
  const attrs = getAttrs("checkbox-item");
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.onCheckedChange === void 0 && $$bindings.onCheckedChange && onCheckedChange !== void 0)
    $$bindings.onCheckedChange(onCheckedChange);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  checked !== void 0 && localChecked.set(checked);
  {
    updateOption("disabled", disabled);
  }
  builder = $checkboxItem;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_checkboxItem();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Menu_checkbox_indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $checked, $$unsubscribe_checked;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const checked = getCheckboxIndicator();
  $$unsubscribe_checked = subscribe(checked, (value) => $checked = value);
  const { getAttrs } = getCtx();
  const attrs = getAttrs("checkbox-indicator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  $$unsubscribe_checked();
  return `${asChild ? `${slots.default ? slots.default({ attrs, checked: $checked }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${$checked ? `${slots.default ? slots.default({ attrs, checked: $checked }) : ``}` : ``}</div>`}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { typeahead = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { disableFocusFirstItem = void 0 } = $$props;
  let { closeOnItemClick = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible: true,
    defaultOpen: open,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0)
    $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0)
    $$bindings.preventScroll(preventScroll);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0)
    $$bindings.dir(dir);
  if ($$props.typeahead === void 0 && $$bindings.typeahead && typeahead !== void 0)
    $$bindings.typeahead(typeahead);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0)
    $$bindings.closeFocus(closeFocus);
  if ($$props.disableFocusFirstItem === void 0 && $$bindings.disableFocusFirstItem && disableFocusFirstItem !== void 0)
    $$bindings.disableFocusFirstItem(disableFocusFirstItem);
  if ($$props.closeOnItemClick === void 0 && $$bindings.closeOnItemClick && closeOnItemClick !== void 0)
    $$bindings.closeOnItemClick(closeOnItemClick);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0)
    $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("dir", dir);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("disableFocusFirstItem", disableFocusFirstItem);
  }
  {
    updateOption("typeahead", typeahead);
  }
  {
    updateOption("closeOnItemClick", closeOnItemClick);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $open, $$unsubscribe_open;
  let $menu, $$unsubscribe_menu;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "bottom" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { menu }, states: { open }, ids, getAttrs } = getCtx();
  $$unsubscribe_menu = subscribe(menu, (value) => $menu = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0)
    $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0)
    $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0)
    $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0)
    $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0)
    $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0)
    $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0)
    $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0)
    $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0)
    $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.menu.set(id);
    }
  }
  builder = $menu;
  {
    Object.assign(builder, attrs);
  }
  {
    if ($open) {
      updatePositioning({
        side,
        align,
        sideOffset,
        alignOffset,
        collisionPadding,
        avoidCollisions,
        collisionBoundary,
        sameWidth,
        fitViewport,
        strategy,
        overlap
      });
    }
  }
  $$unsubscribe_open();
  $$unsubscribe_menu();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Menu_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const derivedKeys = (storeMap) => {
  const entries = Object.entries(storeMap);
  const keys = entries.map(([key]) => key);
  return derived(entries.map(([, store]) => store), ($stores) => {
    return Object.fromEntries($stores.map((store, idx) => [keys[idx], store]));
  });
};
const Subscribe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let $values, $$unsubscribe_values;
  const values = derivedKeys($$restProps);
  $$unsubscribe_values = subscribe(values, (value) => $values = value);
  $$unsubscribe_values();
  return `${slots.default ? slots.default({ ...$values }) : ``}`;
});
const PropsRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { instance = void 0 } = $$props;
  let { config } = $$props;
  let { props = void 0 } = $$props;
  if ($$props.instance === void 0 && $$bindings.instance && instance !== void 0)
    $$bindings.instance(instance);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${config.children.length === 0 ? `${validate_component(config.component || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign({}, props ?? {}, { this: instance }),
      {
        this: ($$value) => {
          instance = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `${validate_component(config.component || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign({}, props ?? {}, { this: instance }),
      {
        this: ($$value) => {
          instance = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${each(config.children, (child) => {
            return `${validate_component(Render, "Render").$$render($$result, { of: child }, {}, {})}`;
          })}`;
        }
      }
    )}`}`;
  } while (!$$settled);
  return $$rendered;
});
const isReadable = (value) => {
  return value?.subscribe instanceof Function;
};
const Undefined = readable(void 0);
const ComponentRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { config } = $$props;
  let instance;
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${isReadable(config.props) ? `${validate_component(Subscribe, "Subscribe").$$render($$result, { props: config.props }, {}, {
      default: ({ props }) => {
        return `${validate_component(PropsRenderer, "PropsRenderer").$$render(
          $$result,
          { config, props, instance },
          {
            instance: ($$value) => {
              instance = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })}` : `${validate_component(PropsRenderer, "PropsRenderer").$$render(
      $$result,
      { config, props: config.props, instance },
      {
        instance: ($$value) => {
          instance = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}`;
  } while (!$$settled);
  return $$rendered;
});
const Render = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $readableConfig, $$unsubscribe_readableConfig;
  let { of: config } = $$props;
  const readableConfig = isReadable(config) ? config : Undefined;
  $$unsubscribe_readableConfig = subscribe(readableConfig, (value) => $readableConfig = value);
  if ($$props.of === void 0 && $$bindings.of && config !== void 0)
    $$bindings.of(config);
  $$unsubscribe_readableConfig();
  return `${isReadable(config) ? ` ${escape($readableConfig)}` : `${typeof config !== "object" ? `${escape(config)}` : `${validate_component(ComponentRenderer, "ComponentRenderer").$$render($$result, { config }, {}, {})}`}`}`;
});
class ComponentRenderConfig {
  component;
  props;
  constructor(component, props) {
    this.component = component;
    this.props = props;
  }
  eventHandlers = [];
  on(type, handler) {
    this.eventHandlers.push([type, handler]);
    return this;
  }
  children = [];
  slot(...children) {
    this.children = children;
    return this;
  }
}
function createRender(component, props) {
  return new ComponentRenderConfig(component, props);
}
class Column {
  header;
  footer;
  height;
  plugins;
  constructor({ header, footer, height, plugins }) {
    this.header = header;
    this.footer = footer;
    this.height = height;
    this.plugins = plugins;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isFlat() {
    return "__flat" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isData() {
    return "__data" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isDisplay() {
    return "__display" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isGroup() {
    return "__group" in this;
  }
}
class FlatColumn extends Column {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __flat = true;
  id;
  constructor({ header, footer, plugins, id }) {
    super({ header, footer, plugins, height: 1 });
    this.id = id ?? String(header);
  }
}
class DataColumn extends FlatColumn {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __data = true;
  cell;
  accessorKey;
  accessorFn;
  constructor({ header, footer, plugins, cell, accessor, id }) {
    super({ header, footer, plugins, id: "Initialization not complete" });
    this.cell = cell;
    if (accessor instanceof Function) {
      this.accessorFn = accessor;
    } else {
      this.accessorKey = accessor;
    }
    if (id === void 0 && this.accessorKey === void 0 && header === void 0) {
      throw new Error("A column id, string accessor, or header is required");
    }
    const accessorKeyId = typeof this.accessorKey === "string" ? this.accessorKey : null;
    this.id = id ?? accessorKeyId ?? String(header);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValue(item) {
    if (this.accessorFn !== void 0) {
      return this.accessorFn(item);
    }
    if (this.accessorKey !== void 0) {
      return item[this.accessorKey];
    }
    return void 0;
  }
}
class DisplayColumn extends FlatColumn {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __display = true;
  cell;
  data;
  constructor({ header, footer, plugins, id, cell, data }) {
    super({ header, footer, plugins, id });
    this.cell = cell;
    this.data = data;
  }
}
class GroupColumn extends Column {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __group = true;
  columns;
  ids;
  constructor({ header, footer, columns, plugins }) {
    const height = Math.max(...columns.map((c) => c.height)) + 1;
    super({ header, footer, height, plugins });
    this.columns = columns;
    this.ids = getFlatColumnIds(columns);
  }
}
const getFlatColumnIds = (columns) => columns.flatMap((c) => c.isFlat() ? [c.id] : c.isGroup() ? c.ids : []);
const getFlatColumns = (columns) => {
  return columns.flatMap((c) => c.isFlat() ? [c] : c.isGroup() ? getFlatColumns(c.columns) : []);
};
const getCounter = (items) => {
  const result = /* @__PURE__ */ new Map();
  items.forEach((item) => {
    result.set(item, (result.get(item) ?? 0) + 1);
  });
  return result;
};
const getDuplicates = (items) => {
  return Array.from(getCounter(items).entries()).filter(([, count]) => count !== 1).map(([key]) => key);
};
const stringifyCss = (style) => {
  return Object.entries(style).map(([name, value]) => `${name}:${value}`).join(";");
};
const mergeAttributes = (a, b) => {
  if (a.style === void 0 && b.style === void 0) {
    return { ...a, ...b };
  }
  return {
    ...a,
    ...b,
    style: {
      ...typeof a.style === "object" ? a.style : {},
      ...typeof b.style === "object" ? b.style : {}
    }
  };
};
const finalizeAttributes = (attrs) => {
  if (attrs.style === void 0 || typeof attrs.style !== "object") {
    return attrs;
  }
  return {
    ...attrs,
    style: stringifyCss(attrs.style)
  };
};
class TableComponent {
  id;
  constructor({ id }) {
    this.id = id;
  }
  attrsForName = {};
  attrs() {
    return derived(Object.values(this.attrsForName), ($attrsArray) => {
      let $mergedAttrs = {};
      $attrsArray.forEach(($attrs) => {
        $mergedAttrs = mergeAttributes($mergedAttrs, $attrs);
      });
      return finalizeAttributes($mergedAttrs);
    });
  }
  propsForName = {};
  props() {
    return derivedKeys(this.propsForName);
  }
  state;
  injectState(state) {
    this.state = state;
  }
  applyHook(pluginName, hook) {
    if (hook.props !== void 0) {
      this.propsForName[pluginName] = hook.props;
    }
    if (hook.attrs !== void 0) {
      this.attrsForName[pluginName] = hook.attrs;
    }
  }
}
class BodyCell extends TableComponent {
  row;
  constructor({ id, row }) {
    super({ id });
    this.row = row;
  }
  attrs() {
    return derived(super.attrs(), ($baseAttrs) => {
      return {
        ...$baseAttrs,
        role: "cell"
      };
    });
  }
  rowColId() {
    return `${this.row.id}:${this.column.id}`;
  }
  dataRowColId() {
    if (!this.row.isData()) {
      return void 0;
    }
    return `${this.row.dataId}:${this.column.id}`;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isData() {
    return "__data" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isDisplay() {
    return "__display" in this;
  }
}
class DataBodyCell extends BodyCell {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __data = true;
  column;
  label;
  value;
  constructor({ row, column, label, value }) {
    super({ id: column.id, row });
    this.column = column;
    this.label = label;
    this.value = value;
  }
  render() {
    if (this.label === void 0) {
      return `${this.value}`;
    }
    if (this.state === void 0) {
      throw new Error("Missing `state` reference");
    }
    return this.label(this, this.state);
  }
  clone() {
    const clonedCell = new DataBodyCell({
      row: this.row,
      column: this.column,
      label: this.label,
      value: this.value
    });
    return clonedCell;
  }
}
class DisplayBodyCell extends BodyCell {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __display = true;
  column;
  label;
  constructor({ row, column, label }) {
    super({ id: column.id, row });
    this.column = column;
    this.label = label;
  }
  render() {
    if (this.state === void 0) {
      throw new Error("Missing `state` reference");
    }
    return this.label(this, this.state);
  }
  clone() {
    const clonedCell = new DisplayBodyCell({
      row: this.row,
      column: this.column,
      label: this.label
    });
    return clonedCell;
  }
}
const nonUndefined = (value) => value !== void 0;
class BodyRow extends TableComponent {
  cells;
  /**
   * Get the cell with a given column id.
   *
   * **This includes hidden cells.**
   */
  cellForId;
  depth;
  parentRow;
  subRows;
  constructor({ id, cells, cellForId, depth = 0, parentRow }) {
    super({ id });
    this.cells = cells;
    this.cellForId = cellForId;
    this.depth = depth;
    this.parentRow = parentRow;
  }
  attrs() {
    return derived(super.attrs(), ($baseAttrs) => {
      return {
        ...$baseAttrs,
        role: "row"
      };
    });
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isData() {
    return "__data" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isDisplay() {
    return "__display" in this;
  }
}
class DataBodyRow extends BodyRow {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __data = true;
  dataId;
  original;
  constructor({ id, dataId, original, cells, cellForId, depth = 0, parentRow }) {
    super({ id, cells, cellForId, depth, parentRow });
    this.dataId = dataId;
    this.original = original;
  }
  clone({ includeCells = false, includeSubRows = false } = {}) {
    const clonedRow = new DataBodyRow({
      id: this.id,
      dataId: this.dataId,
      cellForId: this.cellForId,
      cells: this.cells,
      original: this.original,
      depth: this.depth
    });
    if (includeCells) {
      const clonedCellsForId = Object.fromEntries(Object.entries(clonedRow.cellForId).map(([id, cell]) => {
        const clonedCell = cell.clone();
        clonedCell.row = clonedRow;
        return [id, clonedCell];
      }));
      const clonedCells = clonedRow.cells.map(({ id }) => clonedCellsForId[id]);
      clonedRow.cellForId = clonedCellsForId;
      clonedRow.cells = clonedCells;
    }
    if (includeSubRows) {
      const clonedSubRows = this.subRows?.map((row) => row.clone({ includeCells, includeSubRows }));
      clonedRow.subRows = clonedSubRows;
    } else {
      clonedRow.subRows = this.subRows;
    }
    return clonedRow;
  }
}
const getBodyRows = (data, flatColumns, { rowDataId } = {}) => {
  const rows = data.map((item, idx) => {
    const id = idx.toString();
    return new DataBodyRow({
      id,
      dataId: rowDataId !== void 0 ? rowDataId(item, idx) : id,
      original: item,
      cells: [],
      cellForId: {}
    });
  });
  data.forEach((item, rowIdx) => {
    const cells = flatColumns.map((col) => {
      if (col.isData()) {
        const dataCol = col;
        const value = dataCol.getValue(item);
        return new DataBodyCell({
          row: rows[rowIdx],
          column: dataCol,
          label: col.cell,
          value
        });
      }
      if (col.isDisplay()) {
        const displayCol = col;
        return new DisplayBodyCell({
          row: rows[rowIdx],
          column: displayCol,
          label: col.cell
        });
      }
      throw new Error("Unrecognized `FlatColumn` implementation");
    });
    rows[rowIdx].cells = cells;
    flatColumns.forEach((c, colIdx) => {
      rows[rowIdx].cellForId[c.id] = cells[colIdx];
    });
  });
  return rows;
};
const getColumnedBodyRows = (rows, columnIdOrder) => {
  const columnedRows = rows.map((row) => {
    const clonedRow = row.clone();
    clonedRow.cells = [];
    clonedRow.cellForId = {};
    return clonedRow;
  });
  if (rows.length === 0 || columnIdOrder.length === 0)
    return rows;
  rows.forEach((row, rowIdx) => {
    const cells = row.cells.map((cell) => {
      const clonedCell = cell.clone();
      clonedCell.row = columnedRows[rowIdx];
      return clonedCell;
    });
    const visibleCells = columnIdOrder.map((cid) => {
      return cells.find((c) => c.id === cid);
    }).filter(nonUndefined);
    columnedRows[rowIdx].cells = visibleCells;
    cells.forEach((cell) => {
      columnedRows[rowIdx].cellForId[cell.id] = cell;
    });
  });
  return columnedRows;
};
const NBSP = " ";
class HeaderCell extends TableComponent {
  label;
  colspan;
  colstart;
  constructor({ id, label, colspan, colstart }) {
    super({ id });
    this.label = label;
    this.colspan = colspan;
    this.colstart = colstart;
  }
  render() {
    if (this.label instanceof Function) {
      if (this.state === void 0) {
        throw new Error("Missing `state` reference");
      }
      return this.label(this, this.state);
    }
    return this.label;
  }
  attrs() {
    return derived(super.attrs(), ($baseAttrs) => {
      return {
        ...$baseAttrs,
        role: "columnheader",
        colspan: this.colspan
      };
    });
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isFlat() {
    return "__flat" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isData() {
    return "__data" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isFlatDisplay() {
    return "__flat" in this && "__display" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isGroup() {
    return "__group" in this;
  }
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  isGroupDisplay() {
    return "__group" in this && "__display" in this;
  }
}
class FlatHeaderCell extends HeaderCell {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __flat = true;
  constructor({ id, label, colstart }) {
    super({ id, label, colspan: 1, colstart });
  }
  clone() {
    return new FlatHeaderCell({
      id: this.id,
      label: this.label,
      colstart: this.colstart
    });
  }
}
class DataHeaderCell extends FlatHeaderCell {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __data = true;
  accessorKey;
  accessorFn;
  constructor({ id, label, accessorKey, accessorFn, colstart }) {
    super({ id, label, colstart });
    this.accessorKey = accessorKey;
    this.accessorFn = accessorFn;
  }
  clone() {
    return new DataHeaderCell({
      id: this.id,
      label: this.label,
      accessorFn: this.accessorFn,
      accessorKey: this.accessorKey,
      colstart: this.colstart
    });
  }
}
class FlatDisplayHeaderCell extends FlatHeaderCell {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __display = true;
  constructor({ id, label = NBSP, colstart }) {
    super({ id, label, colstart });
  }
  clone() {
    return new FlatDisplayHeaderCell({
      id: this.id,
      label: this.label,
      colstart: this.colstart
    });
  }
}
class GroupHeaderCell extends HeaderCell {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __group = true;
  ids;
  allId;
  allIds;
  constructor({ label, ids, allIds, colspan, colstart }) {
    super({ id: `[${ids.join(",")}]`, label, colspan, colstart });
    this.ids = ids;
    this.allId = `[${allIds.join(",")}]`;
    this.allIds = allIds;
  }
  setIds(ids) {
    this.ids = ids;
    this.id = `[${this.ids.join(",")}]`;
  }
  pushId(id) {
    this.ids = [...this.ids, id];
    this.id = `[${this.ids.join(",")}]`;
  }
  clone() {
    return new GroupHeaderCell({
      label: this.label,
      ids: this.ids,
      allIds: this.allIds,
      colspan: this.colspan,
      colstart: this.colstart
    });
  }
}
class GroupDisplayHeaderCell extends GroupHeaderCell {
  // TODO Workaround for https://github.com/vitejs/vite/issues/9528
  __display = true;
  constructor({ label = NBSP, ids, allIds, colspan = 1, colstart }) {
    super({ label, ids, allIds, colspan, colstart });
  }
  clone() {
    return new GroupDisplayHeaderCell({
      label: this.label,
      ids: this.ids,
      allIds: this.allIds,
      colspan: this.colspan,
      colstart: this.colstart
    });
  }
}
const sum = (nums) => nums.reduce((a, b) => a + b, 0);
const getNullMatrix = (width, height) => {
  const result = [];
  for (let i = 0; i < height; i++) {
    result.push(Array(width).fill(null));
  }
  return result;
};
const getTransposed = (matrix) => {
  const height = matrix.length;
  if (height === 0) {
    return matrix;
  }
  const width = matrix[0].length;
  const result = getNullMatrix(height, width);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
};
class HeaderRow extends TableComponent {
  cells;
  constructor({ id, cells }) {
    super({ id });
    this.cells = cells;
  }
  attrs() {
    return derived(super.attrs(), ($baseAttrs) => {
      return {
        ...$baseAttrs,
        role: "row"
      };
    });
  }
  clone() {
    return new HeaderRow({
      id: this.id,
      cells: this.cells
    });
  }
}
const getHeaderRows = (columns, flatColumnIds = []) => {
  const rowMatrix = getHeaderRowMatrix(columns);
  let columnMatrix = getTransposed(rowMatrix);
  columnMatrix = getOrderedColumnMatrix(columnMatrix, flatColumnIds);
  populateGroupHeaderCellIds(columnMatrix);
  return headerRowsForRowMatrix(getTransposed(columnMatrix));
};
const getHeaderRowMatrix = (columns) => {
  const maxColspan = sum(columns.map((c) => c.isGroup() ? c.ids.length : 1));
  const maxHeight = Math.max(...columns.map((c) => c.height));
  const rowMatrix = getNullMatrix(maxColspan, maxHeight);
  let cellOffset = 0;
  columns.forEach((c) => {
    const heightOffset = maxHeight - c.height;
    loadHeaderRowMatrix(rowMatrix, c, heightOffset, cellOffset);
    cellOffset += c.isGroup() ? c.ids.length : 1;
  });
  return rowMatrix.map((cells, rowIdx) => cells.map((cell, columnIdx) => {
    if (cell !== null)
      return cell;
    if (rowIdx === maxHeight - 1)
      return new FlatDisplayHeaderCell({ id: columnIdx.toString(), colstart: columnIdx });
    const flatId = rowMatrix[maxHeight - 1][columnIdx]?.id ?? columnIdx.toString();
    return new GroupDisplayHeaderCell({ ids: [], allIds: [flatId], colstart: columnIdx });
  }));
};
const loadHeaderRowMatrix = (rowMatrix, column, rowOffset, cellOffset) => {
  if (column.isData()) {
    rowMatrix[rowMatrix.length - 1][cellOffset] = new DataHeaderCell({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label: column.header,
      accessorFn: column.accessorFn,
      accessorKey: column.accessorKey,
      id: column.id,
      colstart: cellOffset
    });
    return;
  }
  if (column.isDisplay()) {
    rowMatrix[rowMatrix.length - 1][cellOffset] = new FlatDisplayHeaderCell({
      id: column.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label: column.header,
      colstart: cellOffset
    });
    return;
  }
  if (column.isGroup()) {
    for (let i = 0; i < column.ids.length; i++) {
      rowMatrix[rowOffset][cellOffset + i] = new GroupHeaderCell({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: column.header,
        colspan: 1,
        allIds: column.ids,
        ids: [],
        colstart: cellOffset
      });
    }
    let childCellOffset = 0;
    column.columns.forEach((c) => {
      loadHeaderRowMatrix(rowMatrix, c, rowOffset + 1, cellOffset + childCellOffset);
      childCellOffset += c.isGroup() ? c.ids.length : 1;
    });
    return;
  }
};
const getOrderedColumnMatrix = (columnMatrix, flatColumnIds) => {
  if (flatColumnIds.length === 0) {
    return columnMatrix;
  }
  const orderedColumnMatrix = [];
  flatColumnIds.forEach((key, columnIdx) => {
    const nextColumn = columnMatrix.find((columnCells) => {
      const flatCell = columnCells[columnCells.length - 1];
      if (!flatCell.isFlat()) {
        throw new Error("The last element of each column must be a `FlatHeaderCell`");
      }
      return flatCell.id === key;
    });
    if (nextColumn !== void 0) {
      orderedColumnMatrix.push(nextColumn.map((column) => {
        const clonedColumn = column.clone();
        clonedColumn.colstart = columnIdx;
        return clonedColumn;
      }));
    }
  });
  return orderedColumnMatrix;
};
const populateGroupHeaderCellIds = (columnMatrix) => {
  columnMatrix.forEach((columnCells) => {
    const lastCell = columnCells[columnCells.length - 1];
    if (!lastCell.isFlat()) {
      throw new Error("The last element of each column must be a `FlatHeaderCell`");
    }
    columnCells.forEach((c) => {
      if (c.isGroup()) {
        c.pushId(lastCell.id);
      }
    });
  });
};
const headerRowsForRowMatrix = (rowMatrix) => {
  return rowMatrix.map((rowCells, rowIdx) => {
    return new HeaderRow({ id: rowIdx.toString(), cells: getMergedRow(rowCells) });
  });
};
const getMergedRow = (cells) => {
  if (cells.length === 0) {
    return cells;
  }
  const mergedCells = [];
  let startIdx = 0;
  let endIdx = 1;
  while (startIdx < cells.length) {
    const cell = cells[startIdx].clone();
    if (!cell.isGroup()) {
      mergedCells.push(cell);
      startIdx++;
      continue;
    }
    endIdx = startIdx + 1;
    const ids = [...cell.ids];
    while (endIdx < cells.length) {
      const nextCell = cells[endIdx];
      if (!nextCell.isGroup()) {
        break;
      }
      if (cell.allId !== nextCell.allId) {
        break;
      }
      ids.push(...nextCell.ids);
      endIdx++;
    }
    cell.setIds(ids);
    cell.colspan = endIdx - startIdx;
    mergedCells.push(cell);
    startIdx = endIdx;
  }
  return mergedCells;
};
const createViewModel = (table, columns, { rowDataId } = {}) => {
  const { data, plugins } = table;
  const $flatColumns = getFlatColumns(columns);
  const flatColumns = readable($flatColumns);
  const originalRows = derived([data, flatColumns], ([$data, $flatColumns2]) => {
    return getBodyRows($data, $flatColumns2, { rowDataId });
  });
  const _visibleColumns = writable([]);
  const _headerRows = writable();
  const _rows = writable([]);
  const _pageRows = writable([]);
  const _tableAttrs = writable({
    role: "table"
  });
  const _tableHeadAttrs = writable({});
  const _tableBodyAttrs = writable({
    role: "rowgroup"
  });
  const pluginInitTableState = {
    data,
    columns,
    flatColumns: $flatColumns,
    tableAttrs: _tableAttrs,
    tableHeadAttrs: _tableHeadAttrs,
    tableBodyAttrs: _tableBodyAttrs,
    visibleColumns: _visibleColumns,
    headerRows: _headerRows,
    originalRows,
    rows: _rows,
    pageRows: _pageRows
  };
  const pluginInstances = Object.fromEntries(Object.entries(plugins).map(([pluginName, plugin]) => {
    const columnOptions = Object.fromEntries($flatColumns.map((c) => {
      const option = c.plugins?.[pluginName];
      if (option === void 0)
        return void 0;
      return [c.id, option];
    }).filter(nonUndefined));
    return [
      pluginName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plugin({ pluginName, tableState: pluginInitTableState, columnOptions })
    ];
  }));
  const pluginStates = Object.fromEntries(Object.entries(pluginInstances).map(([key, pluginInstance]) => [
    key,
    pluginInstance.pluginState
  ]));
  const tableState = {
    data,
    columns,
    flatColumns: $flatColumns,
    tableAttrs: _tableAttrs,
    tableHeadAttrs: _tableHeadAttrs,
    tableBodyAttrs: _tableBodyAttrs,
    visibleColumns: _visibleColumns,
    headerRows: _headerRows,
    originalRows,
    rows: _rows,
    pageRows: _pageRows,
    pluginStates
  };
  const deriveTableAttrsFns = Object.values(pluginInstances).map((pluginInstance) => pluginInstance.deriveTableAttrs).filter(nonUndefined);
  let tableAttrs = readable({
    role: "table"
  });
  deriveTableAttrsFns.forEach((fn) => {
    tableAttrs = fn(tableAttrs);
  });
  const finalizedTableAttrs = derived(tableAttrs, ($tableAttrs) => {
    const $finalizedAttrs = finalizeAttributes($tableAttrs);
    _tableAttrs.set($finalizedAttrs);
    return $finalizedAttrs;
  });
  const deriveTableHeadAttrsFns = Object.values(pluginInstances).map((pluginInstance) => pluginInstance.deriveTableBodyAttrs).filter(nonUndefined);
  let tableHeadAttrs = readable({});
  deriveTableHeadAttrsFns.forEach((fn) => {
    tableHeadAttrs = fn(tableHeadAttrs);
  });
  const finalizedTableHeadAttrs = derived(tableHeadAttrs, ($tableHeadAttrs) => {
    const $finalizedAttrs = finalizeAttributes($tableHeadAttrs);
    _tableHeadAttrs.set($finalizedAttrs);
    return $finalizedAttrs;
  });
  const deriveTableBodyAttrsFns = Object.values(pluginInstances).map((pluginInstance) => pluginInstance.deriveTableBodyAttrs).filter(nonUndefined);
  let tableBodyAttrs = readable({
    role: "rowgroup"
  });
  deriveTableBodyAttrsFns.forEach((fn) => {
    tableBodyAttrs = fn(tableBodyAttrs);
  });
  const finalizedTableBodyAttrs = derived(tableBodyAttrs, ($tableBodyAttrs) => {
    const $finalizedAttrs = finalizeAttributes($tableBodyAttrs);
    _tableBodyAttrs.set($finalizedAttrs);
    return $finalizedAttrs;
  });
  const deriveFlatColumnsFns = Object.values(pluginInstances).map((pluginInstance) => pluginInstance.deriveFlatColumns).filter(nonUndefined);
  let visibleColumns = flatColumns;
  deriveFlatColumnsFns.forEach((fn) => {
    visibleColumns = fn(visibleColumns);
  });
  const injectedColumns = derived(visibleColumns, ($visibleColumns) => {
    _visibleColumns.set($visibleColumns);
    return $visibleColumns;
  });
  const columnedRows = derived([originalRows, injectedColumns], ([$originalRows, $injectedColumns]) => {
    return getColumnedBodyRows($originalRows, $injectedColumns.map((c) => c.id));
  });
  const deriveRowsFns = Object.values(pluginInstances).map((pluginInstance) => pluginInstance.deriveRows).filter(nonUndefined);
  let rows = columnedRows;
  deriveRowsFns.forEach((fn) => {
    rows = fn(rows);
  });
  const injectedRows = derived(rows, ($rows) => {
    $rows.forEach((row) => {
      row.injectState(tableState);
      row.cells.forEach((cell) => {
        cell.injectState(tableState);
      });
    });
    Object.entries(pluginInstances).forEach(([pluginName, pluginInstance]) => {
      $rows.forEach((row) => {
        if (pluginInstance.hooks?.["tbody.tr"] !== void 0) {
          row.applyHook(pluginName, pluginInstance.hooks["tbody.tr"](row));
        }
        row.cells.forEach((cell) => {
          if (pluginInstance.hooks?.["tbody.tr.td"] !== void 0) {
            cell.applyHook(pluginName, pluginInstance.hooks["tbody.tr.td"](cell));
          }
        });
      });
    });
    _rows.set($rows);
    return $rows;
  });
  const derivePageRowsFns = Object.values(pluginInstances).map((pluginInstance) => pluginInstance.derivePageRows).filter(nonUndefined);
  let pageRows = injectedRows;
  derivePageRowsFns.forEach((fn) => {
    pageRows = fn(pageRows);
  });
  const injectedPageRows = derived(pageRows, ($pageRows) => {
    $pageRows.forEach((row) => {
      row.injectState(tableState);
      row.cells.forEach((cell) => {
        cell.injectState(tableState);
      });
    });
    Object.entries(pluginInstances).forEach(([pluginName, pluginInstance]) => {
      $pageRows.forEach((row) => {
        if (pluginInstance.hooks?.["tbody.tr"] !== void 0) {
          row.applyHook(pluginName, pluginInstance.hooks["tbody.tr"](row));
        }
        row.cells.forEach((cell) => {
          if (pluginInstance.hooks?.["tbody.tr.td"] !== void 0) {
            cell.applyHook(pluginName, pluginInstance.hooks["tbody.tr.td"](cell));
          }
        });
      });
    });
    _pageRows.set($pageRows);
    return $pageRows;
  });
  const headerRows = derived(injectedColumns, ($injectedColumns) => {
    const $headerRows = getHeaderRows(columns, $injectedColumns.map((c) => c.id));
    $headerRows.forEach((row) => {
      row.injectState(tableState);
      row.cells.forEach((cell) => {
        cell.injectState(tableState);
      });
    });
    Object.entries(pluginInstances).forEach(([pluginName, pluginInstance]) => {
      $headerRows.forEach((row) => {
        if (pluginInstance.hooks?.["thead.tr"] !== void 0) {
          row.applyHook(pluginName, pluginInstance.hooks["thead.tr"](row));
        }
        row.cells.forEach((cell) => {
          if (pluginInstance.hooks?.["thead.tr.th"] !== void 0) {
            cell.applyHook(pluginName, pluginInstance.hooks["thead.tr.th"](cell));
          }
        });
      });
    });
    _headerRows.set($headerRows);
    return $headerRows;
  });
  return {
    tableAttrs: finalizedTableAttrs,
    tableHeadAttrs: finalizedTableHeadAttrs,
    tableBodyAttrs: finalizedTableBodyAttrs,
    visibleColumns: injectedColumns,
    flatColumns: $flatColumns,
    headerRows,
    originalRows,
    rows: injectedRows,
    pageRows: injectedPageRows,
    pluginStates
  };
};
let Table$1 = class Table {
  data;
  plugins;
  constructor(data, plugins) {
    this.data = data;
    this.plugins = plugins;
  }
  createColumns(columns) {
    const ids = getFlatColumnIds(columns);
    const duplicateIds = getDuplicates(ids);
    if (duplicateIds.length !== 0) {
      throw new Error(`Duplicate column ids not allowed: "${duplicateIds.join('", "')}"`);
    }
    return columns;
  }
  column(def) {
    return new DataColumn(def);
  }
  group(def) {
    return new GroupColumn(def);
  }
  display(def) {
    return new DisplayColumn(def);
  }
  createViewModel(columns, options) {
    return createViewModel(this, columns, options);
  }
};
const createTable = (data, plugins = {}) => {
  return new Table$1(data, plugins);
};
const Table2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div class="w-full overflow-auto"><table${spread(
    [
      {
        class: escape_attribute_value(cn("w-full caption-bottom text-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</table></div>`;
});
const Table_body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<tbody${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr:last-child]:border-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tbody>`;
});
const Table_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<td${spread(
    [
      {
        class: escape_attribute_value(cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</td>`;
});
const Table_head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<th${spread(
    [
      {
        class: escape_attribute_value(cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</th>`;
});
const Table_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return ` <thead${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr]:border-b", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</thead>`;
});
const Table_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<tr${spread(
    [
      {
        class: escape_attribute_value(cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tr>`;
});
const Dropdown_menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "inset"]);
  let { class: className = void 0 } = $$props;
  let { inset = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0)
    $$bindings.inset(inset);
  return `${validate_component(Menu_item, "DropdownMenuPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50", inset && "pl-8", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Menu_content, "DropdownMenuPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Menu_separator, "DropdownMenuPrimitive.Separator").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("-mx-1 my-1 h-px bg-muted", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Check$1 = Check;
const Dropdown_menu_checkbox_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "checked"]);
  let { class: className = void 0 } = $$props;
  let { checked = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Menu_checkbox_item, "DropdownMenuPrimitive.CheckboxItem").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50", className)
        },
        $$restProps,
        { checked }
      ),
      {
        checked: ($$value) => {
          checked = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">${validate_component(Menu_checkbox_indicator, "DropdownMenuPrimitive.CheckboxIndicator").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Check$1, "Check").$$render($$result, { class: "h-4 w-4" }, {}, {})}`;
            }
          })}</span> ${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Root = Menu;
const Trigger = Menu_trigger;
const Ellipsis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "1" }],
    ["circle", { "cx": "19", "cy": "12", "r": "1" }],
    ["circle", { "cx": "5", "cy": "12", "r": "1" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "ellipsis" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Ellipsis$1 = Ellipsis;
const Data_table_actions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
        default: ({ builder }) => {
          return `${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "ghost",
              builders: [builder],
              size: "icon",
              class: "relative h-8 w-8 p-0"
            },
            {},
            {
              default: () => {
                return `<span class="sr-only" data-svelte-h="svelte-rsbkxi">Open menu</span> ${validate_component(Ellipsis$1, "Ellipsis").$$render($$result, { class: "h-4 w-4" }, {}, {})}`;
              }
            }
          )}`;
        }
      })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
            default: () => {
              return `View related payment`;
            }
          })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
            default: () => {
              return `View expense details`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
const headers = readable(new Map(Object.entries(ExpenseData.headers)));
const monetaryFields = readable(["total", "subtotal", "tax"]);
const textPrefixFilter = ({ filterValue, value }) => {
  if (filterValue === "") {
    return true;
  }
  return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
};
readable(void 0);
const recordSetStore = (initial = {}) => {
  const withFalseRemoved = (record) => {
    return Object.fromEntries(Object.entries(record).filter(([, v]) => v));
  };
  const { subscribe: subscribe2, update, set } = writable(withFalseRemoved(initial));
  const updateAndRemoveFalse = (fn) => {
    update(($recordSet) => {
      const newRecordSet = fn($recordSet);
      return withFalseRemoved(newRecordSet);
    });
  };
  const toggle = (item) => {
    update(($recordSet) => {
      if ($recordSet[item] === true) {
        delete $recordSet[item];
        return $recordSet;
      }
      return {
        ...$recordSet,
        [item]: true
      };
    });
  };
  const add = (item) => {
    update(($recordSet) => ({
      ...$recordSet,
      [item]: true
    }));
  };
  const addAll = (items) => {
    update(($recordSet) => ({
      ...$recordSet,
      ...Object.fromEntries(items.map((item) => [item, true]))
    }));
  };
  const remove = (item) => {
    update(($recordSet) => {
      delete $recordSet[item];
      return $recordSet;
    });
  };
  const removeAll = (items) => {
    update(($recordSet) => {
      for (const item of items) {
        delete $recordSet[item];
      }
      return $recordSet;
    });
  };
  const clear = () => {
    set({});
  };
  return {
    subscribe: subscribe2,
    update: updateAndRemoveFalse,
    set: (newValue) => updateAndRemoveFalse(() => newValue),
    toggle,
    add,
    addAll,
    remove,
    removeAll,
    clear
  };
};
const isShiftClick = (event) => {
  if (!(event instanceof MouseEvent))
    return false;
  return event.shiftKey;
};
const addHiddenColumns = ({ initialHiddenColumnIds = [] } = {}) => () => {
  const hiddenColumnIds = writable(initialHiddenColumnIds);
  const pluginState = { hiddenColumnIds };
  const deriveFlatColumns = (flatColumns) => {
    return derived([flatColumns, hiddenColumnIds], ([$flatColumns, $hiddenColumnIds]) => {
      if ($hiddenColumnIds.length === 0) {
        return $flatColumns;
      }
      return $flatColumns.filter((c) => !$hiddenColumnIds.includes(c.id));
    });
  };
  return {
    pluginState,
    deriveFlatColumns
  };
};
const MIN_PAGE_SIZE = 1;
const createPageStore = ({ items, initialPageSize, initialPageIndex, serverSide, serverItemCount }) => {
  const pageSize = writable(initialPageSize);
  const updatePageSize = (fn) => {
    pageSize.update(($pageSize) => {
      const newPageSize = fn($pageSize);
      return Math.max(newPageSize, MIN_PAGE_SIZE);
    });
  };
  const setPageSize = (newPageSize) => updatePageSize(() => newPageSize);
  const pageIndex = writable(initialPageIndex);
  function calcPageCountAndLimitIndex([$pageSize, $itemCount]) {
    const $pageCount = Math.ceil($itemCount / $pageSize);
    pageIndex.update(($pageIndex) => {
      if ($pageCount > 0 && $pageIndex >= $pageCount) {
        return $pageCount - 1;
      }
      return $pageIndex;
    });
    return $pageCount;
  }
  let pageCount;
  if (serverSide && serverItemCount != null) {
    pageCount = derived([pageSize, serverItemCount], calcPageCountAndLimitIndex);
  } else {
    const itemCount = derived(items, ($items) => $items.length);
    pageCount = derived([pageSize, itemCount], calcPageCountAndLimitIndex);
  }
  const hasPreviousPage = derived(pageIndex, ($pageIndex) => {
    return $pageIndex > 0;
  });
  const hasNextPage = derived([pageIndex, pageCount], ([$pageIndex, $pageCount]) => {
    return $pageIndex < $pageCount - 1;
  });
  return {
    pageSize: {
      subscribe: pageSize.subscribe,
      update: updatePageSize,
      set: setPageSize
    },
    pageIndex,
    pageCount,
    serverItemCount,
    hasPreviousPage,
    hasNextPage
  };
};
const addPagination = ({ initialPageIndex = 0, initialPageSize = 10, serverSide = false, serverItemCount } = {}) => () => {
  const prePaginatedRows = writable([]);
  const paginatedRows = writable([]);
  const { pageSize, pageIndex, pageCount, hasPreviousPage, hasNextPage } = createPageStore({
    items: prePaginatedRows,
    initialPageIndex,
    initialPageSize,
    serverSide,
    serverItemCount
  });
  const pluginState = {
    pageSize,
    pageIndex,
    pageCount,
    hasPreviousPage,
    hasNextPage
  };
  const derivePageRows = (rows) => {
    return derived([rows, pageSize, pageIndex], ([$rows, $pageSize, $pageIndex]) => {
      prePaginatedRows.set($rows);
      if (serverSide) {
        paginatedRows.set($rows);
        return $rows;
      }
      const startIdx = $pageIndex * $pageSize;
      const _paginatedRows = $rows.slice(startIdx, startIdx + $pageSize);
      paginatedRows.set(_paginatedRows);
      return _paginatedRows;
    });
  };
  return {
    pluginState,
    derivePageRows
  };
};
const compare = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return compareArray(a, b);
  }
  if (typeof a === "number" && typeof b === "number")
    return a - b;
  return a < b ? -1 : a > b ? 1 : 0;
};
const compareArray = (a, b) => {
  const minLength = Math.min(a.length, b.length);
  for (let i = 0; i < minLength; i++) {
    const order = compare(a[i], b[i]);
    if (order !== 0)
      return order;
  }
  return 0;
};
const DEFAULT_TOGGLE_ORDER = ["asc", "desc", void 0];
const createSortKeysStore = (initKeys) => {
  const { subscribe: subscribe2, update, set } = writable(initKeys);
  const toggleId = (id, { multiSort = true, toggleOrder = DEFAULT_TOGGLE_ORDER } = {}) => {
    update(($sortKeys) => {
      const keyIdx = $sortKeys.findIndex((key2) => key2.id === id);
      const key = $sortKeys[keyIdx];
      const order = key?.order;
      const orderIdx = toggleOrder.findIndex((o) => o === order);
      const nextOrderIdx = (orderIdx + 1) % toggleOrder.length;
      const nextOrder = toggleOrder[nextOrderIdx];
      if (!multiSort) {
        if (nextOrder === void 0) {
          return [];
        }
        return [{ id, order: nextOrder }];
      }
      if (keyIdx === -1 && nextOrder !== void 0) {
        return [...$sortKeys, { id, order: nextOrder }];
      }
      if (nextOrder === void 0) {
        return [...$sortKeys.slice(0, keyIdx), ...$sortKeys.slice(keyIdx + 1)];
      }
      return [
        ...$sortKeys.slice(0, keyIdx),
        { id, order: nextOrder },
        ...$sortKeys.slice(keyIdx + 1)
      ];
    });
  };
  const clearId = (id) => {
    update(($sortKeys) => {
      const keyIdx = $sortKeys.findIndex((key) => key.id === id);
      if (keyIdx === -1) {
        return $sortKeys;
      }
      return [...$sortKeys.slice(0, keyIdx), ...$sortKeys.slice(keyIdx + 1)];
    });
  };
  return {
    subscribe: subscribe2,
    update,
    set,
    toggleId,
    clearId
  };
};
const getSortedRows = (rows, sortKeys, columnOptions) => {
  const $sortedRows = [...rows];
  $sortedRows.sort((a, b) => {
    for (const key of sortKeys) {
      const invert = columnOptions[key.id]?.invert ?? false;
      const cellA = a.cellForId[key.id];
      const cellB = b.cellForId[key.id];
      let order = 0;
      const compareFn = columnOptions[key.id]?.compareFn;
      const getSortValue = columnOptions[key.id]?.getSortValue;
      if (!cellA.isData()) {
        return 0;
      }
      const valueA = cellA.value;
      const valueB = cellB.value;
      if (compareFn !== void 0) {
        order = compareFn(valueA, valueB);
      } else if (getSortValue !== void 0) {
        const sortValueA = getSortValue(valueA);
        const sortValueB = getSortValue(valueB);
        order = compare(sortValueA, sortValueB);
      } else if (typeof valueA === "string" || typeof valueA === "number") {
        order = compare(valueA, valueB);
      } else if (valueA instanceof Date || valueB instanceof Date) {
        const sortValueA = valueA instanceof Date ? valueA.getTime() : 0;
        const sortValueB = valueB instanceof Date ? valueB.getTime() : 0;
        order = compare(sortValueA, sortValueB);
      }
      if (order !== 0) {
        let orderFactor = 1;
        if (key.order === "desc") {
          orderFactor *= -1;
        }
        if (invert) {
          orderFactor *= -1;
        }
        return order * orderFactor;
      }
    }
    return 0;
  });
  for (let i = 0; i < $sortedRows.length; i++) {
    const { subRows } = $sortedRows[i];
    if (subRows === void 0) {
      continue;
    }
    const sortedSubRows = getSortedRows(subRows, sortKeys, columnOptions);
    const clonedRow = $sortedRows[i].clone();
    clonedRow.subRows = sortedSubRows;
    $sortedRows[i] = clonedRow;
  }
  return $sortedRows;
};
const addSortBy = ({ initialSortKeys = [], disableMultiSort = false, isMultiSortEvent = isShiftClick, toggleOrder, serverSide = false } = {}) => ({ columnOptions }) => {
  const disabledSortIds = Object.entries(columnOptions).filter(([, option]) => option.disable === true).map(([columnId]) => columnId);
  const sortKeys = createSortKeysStore(initialSortKeys);
  const preSortedRows = writable([]);
  const deriveRows = (rows) => {
    return derived([rows, sortKeys], ([$rows, $sortKeys]) => {
      preSortedRows.set($rows);
      if (serverSide) {
        return $rows;
      }
      return getSortedRows($rows, $sortKeys, columnOptions);
    });
  };
  const pluginState = { sortKeys, preSortedRows };
  return {
    pluginState,
    deriveRows,
    hooks: {
      "thead.tr.th": (cell) => {
        const disabled = disabledSortIds.includes(cell.id);
        const props = derived(sortKeys, ($sortKeys) => {
          const key = $sortKeys.find((k) => k.id === cell.id);
          const toggle = (event) => {
            if (!cell.isData())
              return;
            if (disabled)
              return;
            sortKeys.toggleId(cell.id, {
              multiSort: disableMultiSort ? false : isMultiSortEvent(event),
              toggleOrder
            });
          };
          const clear = () => {
            if (!cell.isData())
              return;
            if (disabledSortIds.includes(cell.id))
              return;
            sortKeys.clearId(cell.id);
          };
          return {
            order: key?.order,
            toggle,
            clear,
            disabled
          };
        });
        return { props };
      },
      "tbody.tr.td": (cell) => {
        const props = derived(sortKeys, ($sortKeys) => {
          const key = $sortKeys.find((k) => k.id === cell.id);
          return {
            order: key?.order
          };
        });
        return { props };
      }
    }
  };
};
const getFilteredRows = (rows, filterValue, columnOptions, { tableCellMatches, fn, includeHiddenColumns }) => {
  const $filteredRows = rows.map((row) => {
    const { subRows } = row;
    if (subRows === void 0) {
      return row;
    }
    const filteredSubRows = getFilteredRows(subRows, filterValue, columnOptions, {
      tableCellMatches,
      fn,
      includeHiddenColumns
    });
    const clonedRow = row.clone();
    clonedRow.subRows = filteredSubRows;
    return clonedRow;
  }).filter((row) => {
    if ((row.subRows?.length ?? 0) !== 0) {
      return true;
    }
    const rowCellMatches = Object.values(row.cellForId).map((cell) => {
      const options = columnOptions[cell.id];
      if (options?.exclude === true) {
        return false;
      }
      const isHidden = row.cells.find((c) => c.id === cell.id) === void 0;
      if (isHidden && !includeHiddenColumns) {
        return false;
      }
      if (!cell.isData()) {
        return false;
      }
      let value = cell.value;
      if (options?.getFilterValue !== void 0) {
        value = options?.getFilterValue(value);
      }
      const matches = fn({ value: String(value), filterValue });
      if (matches) {
        const dataRowColId = cell.dataRowColId();
        if (dataRowColId !== void 0) {
          tableCellMatches[dataRowColId] = matches;
        }
      }
      return matches;
    });
    return rowCellMatches.includes(true);
  });
  return $filteredRows;
};
const addTableFilter = ({ fn = textPrefixFilter, initialFilterValue = "", includeHiddenColumns = false, serverSide = false } = {}) => ({ columnOptions }) => {
  const filterValue = writable(initialFilterValue);
  const preFilteredRows = writable([]);
  const tableCellMatches = recordSetStore();
  const pluginState = { filterValue, preFilteredRows };
  const deriveRows = (rows) => {
    return derived([rows, filterValue], ([$rows, $filterValue]) => {
      preFilteredRows.set($rows);
      tableCellMatches.clear();
      const $tableCellMatches = {};
      const $filteredRows = getFilteredRows($rows, $filterValue, columnOptions, {
        tableCellMatches: $tableCellMatches,
        fn,
        includeHiddenColumns
      });
      tableCellMatches.set($tableCellMatches);
      if (serverSide) {
        return $rows;
      }
      return $filteredRows;
    });
  };
  return {
    pluginState,
    deriveRows,
    hooks: {
      "tbody.tr.td": (cell) => {
        const props = derived([filterValue, tableCellMatches], ([$filterValue, $tableCellMatches]) => {
          const dataRowColId = cell.dataRowColId();
          return {
            matches: $filterValue !== "" && dataRowColId !== void 0 && ($tableCellMatches[dataRowColId] ?? false)
          };
        });
        return { props };
      }
    }
  };
};
const Arrow_up_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "m21 16-4 4-4-4" }],
    ["path", { "d": "M17 20V4" }],
    ["path", { "d": "m3 8 4-4 4 4" }],
    ["path", { "d": "M7 4v16" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-up-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowUpDown = Arrow_up_down;
const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronDown = Chevron_down;
const { Object: Object_1 } = globals;
const Data_table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $headers, $$unsubscribe_headers;
  let $hiddenColumnIds, $$unsubscribe_hiddenColumnIds;
  let $filterValue, $$unsubscribe_filterValue;
  let $tableAttrs, $$unsubscribe_tableAttrs;
  let $headerRows, $$unsubscribe_headerRows;
  let $monetaryFields, $$unsubscribe_monetaryFields;
  let $tableBodyAttrs, $$unsubscribe_tableBodyAttrs;
  let $pageRows, $$unsubscribe_pageRows;
  let $$unsubscribe_pageIndex;
  let $hasPreviousPage, $$unsubscribe_hasPreviousPage;
  let $hasNextPage, $$unsubscribe_hasNextPage;
  $$unsubscribe_headers = subscribe(headers, (value) => $headers = value);
  $$unsubscribe_monetaryFields = subscribe(monetaryFields, (value) => $monetaryFields = value);
  let { data } = $$props;
  const table = createTable(writable(data), {
    page: addPagination(),
    sort: addSortBy({
      initialSortKeys: [
        { id: "invoiceReceiptDate", order: "desc" },
        { id: "invoiceReceiptId", order: "asc" }
      ]
    }),
    // TODO improve filter so it detects dates in various formats
    filter: addTableFilter({
      fn: ({ filterValue: filterValue2, value }) => value.toLowerCase().includes(filterValue2.toLowerCase())
    }),
    hide: addHiddenColumns()
  });
  const columns = table.createColumns([
    table.column({
      accessor: ({ id }) => id,
      header: "",
      cell: ({ value }) => {
        return createRender(Data_table_actions, { id: value });
      },
      plugins: {
        sort: { disable: true },
        filter: { exclude: true }
      }
    }),
    table.column({
      accessor: "invoiceReceiptId",
      header: $headers.get("invoiceReceiptId") || "Invoice/Receipt ID"
    }),
    table.column({
      accessor: "invoiceReceiptDate",
      header: $headers.get("invoiceReceiptDate") || "Invoice/Receipt Date",
      cell: ({ value }) => {
        if (!value)
          return "";
        const date = new Date(value);
        return date.toLocaleDateString();
      }
    }),
    table.column({
      accessor: "vendorName",
      header: $headers.get("vendorName") || "Vendor Name"
    }),
    table.column({
      accessor: "vendorTaxId",
      header: $headers.get("vendorTaxId") || "Vendor Tax ID"
    }),
    table.column({
      accessor: "receiverName",
      header: $headers.get("receiverName") || "Receiver Name"
    }),
    table.column({
      accessor: "receiverTaxId",
      header: $headers.get("receiverTaxId") || "Receiver Tax ID"
    }),
    table.column({
      accessor: "vendorAddress",
      header: $headers.get("vendorAddress") || "Vendor Address"
    }),
    table.column({
      accessor: "receiverAddress",
      header: $headers.get("receiverAddress") || "Receiver Address"
    }),
    table.column({
      accessor: "total",
      header: $headers.get("total") || "Total",
      cell: ({ value }) => {
        if (!value)
          return "";
        const formatted = new Intl.NumberFormat(void 0, { style: "currency", currency: "EUR" }).format(value);
        return formatted;
      }
    }),
    table.column({
      accessor: "subtotal",
      header: $headers.get("subtotal") || "Subtotal",
      cell: ({ value }) => {
        if (!value)
          return "";
        const formatted = new Intl.NumberFormat(void 0, { style: "currency", currency: "EUR" }).format(value);
        return formatted;
      }
    }),
    table.column({
      accessor: "tax",
      header: $headers.get("tax") || "Tax",
      cell: ({ value }) => {
        if (!value)
          return "";
        const formatted = new Intl.NumberFormat(void 0, { style: "currency", currency: "EUR" }).format(value);
        return formatted;
      }
    })
  ]);
  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } = table.createViewModel(columns);
  $$unsubscribe_headerRows = subscribe(headerRows, (value) => $headerRows = value);
  $$unsubscribe_pageRows = subscribe(pageRows, (value) => $pageRows = value);
  $$unsubscribe_tableAttrs = subscribe(tableAttrs, (value) => $tableAttrs = value);
  $$unsubscribe_tableBodyAttrs = subscribe(tableBodyAttrs, (value) => $tableBodyAttrs = value);
  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  $$unsubscribe_hasNextPage = subscribe(hasNextPage, (value) => $hasNextPage = value);
  $$unsubscribe_hasPreviousPage = subscribe(hasPreviousPage, (value) => $hasPreviousPage = value);
  $$unsubscribe_pageIndex = subscribe(pageIndex, (value) => value);
  const { filterValue } = pluginStates.filter;
  $$unsubscribe_filterValue = subscribe(filterValue, (value) => $filterValue = value);
  const { hiddenColumnIds } = pluginStates.hide;
  $$unsubscribe_hiddenColumnIds = subscribe(hiddenColumnIds, (value) => $hiddenColumnIds = value);
  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
  const hidableCols = Array.from($headers.keys()).filter((key) => key !== "invoiceReceiptId");
  const df = new DateFormatter(Intl.DateTimeFormat().resolvedOptions().locale, { dateStyle: "long" });
  let dateStart = void 0;
  let dateEnd = void 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    set_store_value(hiddenColumnIds, $hiddenColumnIds = Object.entries(hideForId).filter(([, hide]) => !hide).map(([id]) => id), $hiddenColumnIds);
    $$rendered = `<div class="flex flex-row gap-4"><div class="flex flex-col">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `Filter:
      ${validate_component(Input, "Input").$$render(
          $$result,
          {
            placeholder: "Filter by any field...",
            class: "my-2",
            type: "text",
            value: $filterValue
          },
          {
            value: ($$value) => {
              $filterValue = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })}</div> <div class="flex flex-row gap-2"><div class="flex flex-col gap-2">${validate_component(Label, "Label").$$render($$result, { for: "date-start" }, {}, {
      default: () => {
        return `Date start:`;
      }
    })} ${validate_component(Root$1, "Popover.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger$1, "Popover.Trigger").$$render($$result, { asChild: true }, {}, {
          default: ({ builder }) => {
            return `${validate_component(Button, "Button").$$render(
              $$result,
              {
                id: "date-start",
                variant: "outline",
                class: cn("justify-start text-left font-normal", !dateStart && "text-muted-foreground"),
                builders: [builder]
              },
              {},
              {
                default: () => {
                  return `${validate_component(CalendarIcon, "CalendarIcon").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})} ${escape(dateStart ? df.format(dateStart.toDate(getLocalTimeZone())) : "Pick a date")}`;
                }
              }
            )}`;
          }
        })} ${validate_component(Popover_content, "Popover.Content").$$render($$result, { class: "w-auto p-0" }, {}, {
          default: () => {
            return `${validate_component(Calendar_1, "Calendar").$$render(
              $$result,
              { initialFocus: true, value: dateStart },
              {
                value: ($$value) => {
                  dateStart = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}`;
      }
    })}</div> <div class="flex flex-col gap-2">${validate_component(Label, "Label").$$render($$result, { for: "date-end" }, {}, {
      default: () => {
        return `Date end:`;
      }
    })} ${validate_component(Root$1, "Popover.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger$1, "Popover.Trigger").$$render($$result, { asChild: true }, {}, {
          default: ({ builder }) => {
            return `${validate_component(Button, "Button").$$render(
              $$result,
              {
                id: "date-end",
                variant: "outline",
                class: cn("justify-start text-left font-normal", !dateEnd && "text-muted-foreground"),
                builders: [builder]
              },
              {},
              {
                default: () => {
                  return `${validate_component(CalendarIcon, "CalendarIcon").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})} ${escape(dateEnd ? df.format(dateEnd.toDate(getLocalTimeZone())) : "Pick a date")}`;
                }
              }
            )}`;
          }
        })} ${validate_component(Popover_content, "Popover.Content").$$render($$result, { class: "w-auto p-0" }, {}, {
          default: () => {
            return `${validate_component(Calendar_1, "Calendar").$$render(
              $$result,
              { initialFocus: true, value: dateEnd },
              {
                value: ($$value) => {
                  dateEnd = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}`;
      }
    })}</div></div> <div><div class="flex flex-col gap-2">${validate_component(Label, "Label").$$render($$result, { for: "columns" }, {}, {
      default: () => {
        return `Show/hide:`;
      }
    })} ${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
          default: ({ builder }) => {
            return `${validate_component(Button, "Button").$$render(
              $$result,
              {
                variant: "outline",
                class: "ml-auto",
                builders: [builder]
              },
              {},
              {
                default: () => {
                  return `Columns ${validate_component(ChevronDown, "ChevronDown").$$render($$result, { class: "ml-2 h-4 w-4" }, {}, {})}`;
                }
              }
            )}`;
          }
        })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${each(flatColumns, (col) => {
              return `${hidableCols.includes(col.id) ? `${validate_component(Dropdown_menu_checkbox_item, "DropdownMenu.CheckboxItem").$$render(
                $$result,
                { checked: hideForId[col.id] },
                {
                  checked: ($$value) => {
                    hideForId[col.id] = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `${escape(col.header)} `;
                  }
                }
              )}` : ``}`;
            })}`;
          }
        })}`;
      }
    })}</div></div></div> <div>${validate_component(Table2, "Table.Root").$$render($$result, Object_1.assign({}, $tableAttrs, { class: "h-full w-full rounded-md border" }), {}, {
      default: () => {
        return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${each($headerRows, (headerRow) => {
              return `${validate_component(Subscribe, "Subscribe").$$render($$result, { rowAttrs: headerRow.attrs() }, {}, {
                default: () => {
                  return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                    default: () => {
                      return `${each(headerRow.cells, (cell) => {
                        return `${validate_component(Subscribe, "Subscribe").$$render($$result, { attrs: cell.attrs(), props: cell.props() }, {}, {
                          default: ({ attrs, props }) => {
                            return `${validate_component(Table_head, "Table.Head").$$render($$result, Object_1.assign({}, attrs), {}, {
                              default: () => {
                                return `${$monetaryFields.includes(cell.id) ? `<div class="text-right">${validate_component(Button, "Button").$$render($$result, { variant: "ghost" }, {}, {
                                  default: () => {
                                    return `${validate_component(Render, "Render").$$render($$result, { of: cell.render() }, {}, {})} ${validate_component(ArrowUpDown, "ArrowUpDown").$$render($$result, { class: "ml-2 h-4 w-4" }, {}, {})} `;
                                  }
                                })} </div>` : `${cell.id === "" ? `${validate_component(Render, "Render").$$render($$result, { of: cell.render() }, {}, {})}` : `${validate_component(Button, "Button").$$render($$result, { variant: "ghost" }, {}, {
                                  default: () => {
                                    return `${validate_component(Render, "Render").$$render($$result, { of: cell.render() }, {}, {})} ${validate_component(ArrowUpDown, "ArrowUpDown").$$render($$result, { class: "ml-2 h-4 w-4" }, {}, {})} `;
                                  }
                                })}`}`} `;
                              }
                            })} `;
                          }
                        })}`;
                      })} `;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })} ${validate_component(Table_body, "Table.Body").$$render($$result, Object_1.assign({}, $tableBodyAttrs), {}, {
          default: () => {
            return `${each($pageRows, (row) => {
              return `${validate_component(Subscribe, "Subscribe").$$render($$result, { rowAttrs: row.attrs() }, {}, {
                default: ({ rowAttrs }) => {
                  return `${validate_component(Table_row, "Table.Row").$$render($$result, Object_1.assign({}, rowAttrs), {}, {
                    default: () => {
                      return `${each(row.cells, (cell) => {
                        return `${validate_component(Subscribe, "Subscribe").$$render($$result, { attrs: cell.attrs() }, {}, {
                          default: ({ attrs }) => {
                            return `${validate_component(Table_cell, "Table.Cell").$$render($$result, Object_1.assign({}, attrs), {}, {
                              default: () => {
                                return `${$monetaryFields.includes(cell.id) ? `<div class="text-right">${validate_component(Render, "Render").$$render($$result, { of: cell.render() }, {}, {})} </div>` : `${validate_component(Render, "Render").$$render($$result, { of: cell.render() }, {}, {})}`} `;
                              }
                            })} `;
                          }
                        })}`;
                      })} `;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })} <div class="flex items-center justify-end space-x-4 py-4">${validate_component(Button, "Button").$$render(
      $$result,
      {
        variant: "outline",
        size: "sm",
        disabled: !$hasPreviousPage
      },
      {},
      {
        default: () => {
          return `Previous`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        variant: "outline",
        size: "sm",
        disabled: !$hasNextPage
      },
      {},
      {
        default: () => {
          return `Next`;
        }
      }
    )}</div></div>`;
  } while (!$$settled);
  $$unsubscribe_headers();
  $$unsubscribe_hiddenColumnIds();
  $$unsubscribe_filterValue();
  $$unsubscribe_tableAttrs();
  $$unsubscribe_headerRows();
  $$unsubscribe_monetaryFields();
  $$unsubscribe_tableBodyAttrs();
  $$unsubscribe_pageRows();
  $$unsubscribe_pageIndex();
  $$unsubscribe_hasPreviousPage();
  $$unsubscribe_hasNextPage();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  writable(data.expenses);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main>${validate_component(Data_table, "DataTable").$$render($$result, { data: data.expenses }, {}, {})}</main>`;
});
export {
  Page as default
};
