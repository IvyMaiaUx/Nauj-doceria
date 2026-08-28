import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/@fs/home/ubuntu/nauj-doceria-redesign/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=99883b16"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import { Toaster } from "/src/components/ui/sonner.tsx";
import { TooltipProvider } from "/src/components/ui/tooltip.tsx";
import NotFound from "/src/pages/NotFound.tsx";
import { Route, Switch } from "/@fs/home/ubuntu/nauj-doceria-redesign/node_modules/.vite/deps/wouter.js?v=8bf465bf";
import ErrorBoundary from "/src/components/ErrorBoundary.tsx";
import { ThemeProvider } from "/src/contexts/ThemeContext.tsx";
import Home from "/src/pages/Home.tsx?t=1787957558703";
function Router() {
  return /* @__PURE__ */ jsxDEV(Switch, { "data-loc": "client/src/App.tsx:12", children: [
    /* @__PURE__ */ jsxDEV(Route, { "data-loc": "client/src/App.tsx:13", path: "/", component: Home }, void 0, false, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { "data-loc": "client/src/App.tsx:14", path: "/404", component: NotFound }, void 0, false, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { "data-loc": "client/src/App.tsx:16", component: NotFound }, void 0, false, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
_c = Router;
function App() {
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { "data-loc": "client/src/App.tsx:28", children: /* @__PURE__ */ jsxDEV(
    ThemeProvider,
    {
      "data-loc": "client/src/App.tsx:29",
      defaultTheme: "light",
      children: /* @__PURE__ */ jsxDEV(TooltipProvider, { "data-loc": "client/src/App.tsx:33", children: [
        /* @__PURE__ */ jsxDEV(Toaster, { "data-loc": "client/src/App.tsx:34" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
          lineNumber: 34,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Router, { "data-loc": "client/src/App.tsx:35" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
          lineNumber: 35,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
      lineNumber: 29,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
_c2 = App;
export default App;
var _c, _c2;
$RefreshReg$(_c, "Router");
$RefreshReg$(_c2, "App");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) {
  return RefreshRuntime.register(type, "/home/ubuntu/nauj-doceria-redesign/client/src/App.tsx " + id);
}
function $RefreshSig$() {
  return RefreshRuntime.createSignatureFunctionForTransform();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBWU07QUFaTixTQUFTQSxlQUFlO0FBQ3hCLFNBQVNDLHVCQUF1QjtBQUNoQyxPQUFPQyxjQUFjO0FBQ3JCLFNBQVNDLE9BQU9DLGNBQWM7QUFDOUIsT0FBT0MsbUJBQW1CO0FBQzFCLFNBQVNDLHFCQUFxQjtBQUM5QixPQUFPQyxVQUFVO0FBR2pCLFNBQVNDLFNBQVM7QUFDaEIsU0FDRSx1QkFBQywrQ0FDQztBQUFBLDJCQUFDLDhDQUFNLE1BQU0sS0FBSyxXQUFXRCxRQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQWtDO0FBQUEsSUFDbEMsdUJBQUMsOENBQU0sTUFBTSxRQUFRLFdBQVdMLFlBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBeUM7QUFBQSxJQUV6Qyx1QkFBQyw4Q0FBTSxXQUFXQSxZQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQTJCO0FBQUEsT0FKN0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUtBO0FBRUo7QUFLQU8sS0FkU0Q7QUFnQlQsU0FBU0UsTUFBTTtBQUNiLFNBQ0UsdUJBQUMsc0RBQ0M7QUFBQSxJQUFDO0FBQUE7QUFBQTtBQUFBLE1BQ0MsY0FBYTtBQUFBLE1BR2IsaUNBQUMsd0RBQ0M7QUFBQSwrQkFBQyxrREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQVE7QUFBQSxRQUNSLHVCQUFDLGlEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBTztBQUFBLFdBRlQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUdBO0FBQUE7QUFBQSxJQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFBLEtBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQVVBO0FBRUo7QUFBQ0MsTUFkUUQ7QUFnQlQsZUFBZUE7QUFBSSxJQUFBRCxJQUFBRTtBQUFBQyxhQUFBSCxJQUFBO0FBQUFHLGFBQUFELEtBQUEiLCJuYW1lcyI6WyJUb2FzdGVyIiwiVG9vbHRpcFByb3ZpZGVyIiwiTm90Rm91bmQiLCJSb3V0ZSIsIlN3aXRjaCIsIkVycm9yQm91bmRhcnkiLCJUaGVtZVByb3ZpZGVyIiwiSG9tZSIsIlJvdXRlciIsIl9jIiwiQXBwIiwiX2MyIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9hc3RlciB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvc29ubmVyXCI7XG5pbXBvcnQgeyBUb29sdGlwUHJvdmlkZXIgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL3Rvb2x0aXBcIjtcbmltcG9ydCBOb3RGb3VuZCBmcm9tIFwiQC9wYWdlcy9Ob3RGb3VuZFwiO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCB9IGZyb20gXCJ3b3V0ZXJcIjtcbmltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gXCIuL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeVwiO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuL2NvbnRleHRzL1RoZW1lQ29udGV4dFwiO1xuaW1wb3J0IEhvbWUgZnJvbSBcIi4vcGFnZXMvSG9tZVwiO1xuXG5cbmZ1bmN0aW9uIFJvdXRlcigpIHtcbiAgcmV0dXJuIChcbiAgICA8U3dpdGNoPlxuICAgICAgPFJvdXRlIHBhdGg9e1wiL1wifSBjb21wb25lbnQ9e0hvbWV9IC8+XG4gICAgICA8Um91dGUgcGF0aD17XCIvNDA0XCJ9IGNvbXBvbmVudD17Tm90Rm91bmR9IC8+XG4gICAgICB7LyogRmluYWwgZmFsbGJhY2sgcm91dGUgKi99XG4gICAgICA8Um91dGUgY29tcG9uZW50PXtOb3RGb3VuZH0gLz5cbiAgICA8L1N3aXRjaD5cbiAgKTtcbn1cblxuLy8gTk9URTogQWJvdXQgVGhlbWVcbi8vIC0gRmlyc3QgY2hvb3NlIGEgZGVmYXVsdCB0aGVtZSBhY2NvcmRpbmcgdG8geW91ciBkZXNpZ24gc3R5bGUgKGRhcmsgb3IgbGlnaHQgYmcpLCB0aGFuIGNoYW5nZSBjb2xvciBwYWxldHRlIGluIGluZGV4LmNzc1xuLy8gICB0byBrZWVwIGNvbnNpc3RlbnQgZm9yZWdyb3VuZC9iYWNrZ3JvdW5kIGNvbG9yIGFjcm9zcyBjb21wb25lbnRzXG4vLyAtIElmIHlvdSB3YW50IHRvIG1ha2UgdGhlbWUgc3dpdGNoYWJsZSwgcGFzcyBgc3dpdGNoYWJsZWAgVGhlbWVQcm92aWRlciBhbmQgdXNlIGB1c2VUaGVtZWAgaG9va1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIHJldHVybiAoXG4gICAgPEVycm9yQm91bmRhcnk+XG4gICAgICA8VGhlbWVQcm92aWRlclxuICAgICAgICBkZWZhdWx0VGhlbWU9XCJsaWdodFwiXG4gICAgICAgIC8vIHN3aXRjaGFibGVcbiAgICAgID5cbiAgICAgICAgPFRvb2x0aXBQcm92aWRlcj5cbiAgICAgICAgICA8VG9hc3RlciAvPlxuICAgICAgICAgIDxSb3V0ZXIgLz5cbiAgICAgICAgPC9Ub29sdGlwUHJvdmlkZXI+XG4gICAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICAgPC9FcnJvckJvdW5kYXJ5PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXSwiZmlsZSI6Ii9ob21lL3VidW50dS9uYXVqLWRvY2VyaWEtcmVkZXNpZ24vY2xpZW50L3NyYy9BcHAudHN4In0=