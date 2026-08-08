document.querySelectorAll('.jf-layout').forEach((root) => initJsonFormatter(root));

function initJsonFormatter(root) {
    const input = root.querySelector('.jf-input');
    const formatBtn = root.querySelector('.jf-format-btn');
    const minifyBtn = root.querySelector('.jf-minify-btn');
    const clearBtn = root.querySelector('.jf-clear-btn');
    const errorEl = root.querySelector('.jf-error');
    const statusEl = root.querySelector('.jf-status');
    const sizeEl = root.querySelector('.jf-size');

    function updateSize() {
        const bytes = new Blob([input.value]).size;
        sizeEl.textContent = bytes > 0 ? `${bytes} bytes` : '';
    }

    function showError(message) {
        errorEl.hidden = false;
        errorEl.textContent = message;
        statusEl.textContent = '';
        statusEl.className = 'jf-status';
    }

    function showSuccess(label) {
        errorEl.hidden = true;
        statusEl.textContent = label;
        statusEl.className = 'jf-status jf-status-ok';
    }

    function parseWithPosition(text) {
        try {
            return { data: JSON.parse(text), error: null };
        } catch (e) {
            const match = e.message.match(/position (\d+)/);
            let detail = e.message;

            if (match) {
                const pos = parseInt(match[1], 10);
                const before = text.slice(0, pos);
                const line = (before.match(/\n/g) || []).length + 1;
                const col = pos - before.lastIndexOf('\n');
                detail = `${e.message} (line ${line}, column ${col})`;
            }

            return { data: null, error: detail };
        }
    }

    formatBtn.addEventListener('click', () => {
        const { data, error } = parseWithPosition(input.value);

        if (error) {
            showError('Invalid JSON: ' + error);
            return;
        }

        input.value = JSON.stringify(data, null, 4);
        updateSize();
        showSuccess('Formatted');
    });

    minifyBtn.addEventListener('click', () => {
        const { data, error } = parseWithPosition(input.value);

        if (error) {
            showError('Invalid JSON: ' + error);
            return;
        }

        input.value = JSON.stringify(data);
        updateSize();
        showSuccess('Minified');
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        errorEl.hidden = true;
        statusEl.textContent = '';
        updateSize();
    });

    input.addEventListener('input', () => {
        updateSize();
        statusEl.textContent = '';

        if (input.value.trim() === '') {
            errorEl.hidden = true;
            return;
        }

        const { error } = parseWithPosition(input.value);
        if (error) {
            showError('Invalid JSON: ' + error);
        } else {
            errorEl.hidden = true;
        }
    });

    updateSize();
}