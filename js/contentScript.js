chrome.storage.sync.get("rtlEnabled", (data) => {
    toggleRTL(data.rtlEnabled);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleRTL') {
        toggleRTL(request.enabled);
    }
});

const rtlCss =
`textarea {
    direction: rtl;
}
.text-base {
    direction: rtl;
}
.text-base div:has(>button) {
    left: 0;
}
.text-base div.lg\\:right-0:has(>button) {
    right: initial;
}
.text-base div.lg\\:pl-2:has(>button) {
    padding-left: 0;
    padding-right: 0.5rem;
}
.text-base div.lg\\:translate-x-full:has(>button) {
    --tw-translate-x: -100%;
}
main :has(textarea) {
    padding-right: 0;
    padding-left: 1rem;
}
main :has(textarea) > button,
main :has(textarea) > button.md\\:right-2 {
    right: initial;
    left: 0.5rem;
}`;

function toggleRTL(rtlEnabled) {
    const styleId = "rtl-style";
    const style = document.getElementById(styleId);

    if (rtlEnabled && !style) {
        const newStyle = document.createElement("style");
        newStyle.id = styleId;
        newStyle.textContent = rtlCss;
        document.head.appendChild(newStyle);
    } else if (!rtlEnabled && style) {
        style.remove();
    }
}