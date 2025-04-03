let currentMode = null;

setInterval(() => {
    const val = valueRaw[77]?.value;

    if (val !== currentMode && (val == 0 || val == 1)) {
        currentMode = val;

        document.querySelector('.block-mode-0')?.classList.toggle('hidden-xl', val != 0);
        document.querySelector('.block-mode-1')?.classList.toggle('hidden-xl', val != 1);
    }
}, 1000); 
