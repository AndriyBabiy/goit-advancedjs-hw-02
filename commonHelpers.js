import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */const d=document.querySelector("body"),t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};let a=null;t.start.addEventListener("click",l);t.stop.addEventListener("click",s);t.stop.disabled=!0;function l(e){t.stop.disabled=!1,t.start.disabled=!0,r(o()),a=setInterval(()=>{let n=o();r(n)},1e3)}function s(e){clearInterval(a),t.start.disabled=!1,t.stop.disabled=!0}function o(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}function r(e){d.setAttribute("style",`background-color: ${e}`)}
//# sourceMappingURL=commonHelpers.js.map
