function isHebrew(text) {
    const hebrewRegex = /[\u0590-\u05FF]/;
    return hebrewRegex.test(text);
}

function handleInputDirection(input) {
    const styleIdRtl = 'rtl-style';
    const styleIdLtr = 'ltr-style';

    input.addEventListener("keyup", () => {
        console.log('input', input.value);
        const isRtl = isHebrew(input.value);
        const rtlStyle = document.getElementById(styleIdRtl);
        const ltrStyle = document.getElementById(styleIdLtr);

        if (isRtl && !rtlStyle) {
            ltrStyle && ltrStyle.remove();
            injectStyles(styleIdRtl, `
        textarea,
        div.group {
          direction: rtl;
        }
      `);
        } else if (!isRtl && !ltrStyle) {
            rtlStyle && rtlStyle.remove();
            injectStyles(styleIdLtr, `
        textarea,
        div.group {
          direction: ltr;
        }
      `);
        }
    });
}

function injectStyles(id, css) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
}

function monitorInput() {
    const input = document.querySelector("textarea");
    console.log('input', input);
    if (input) {
        handleInputDirection(input);
    } else {
        setTimeout(monitorInput, 500);
    }
}

monitorInput();