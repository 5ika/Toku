let container;

const initContainer = () => {
    container = document.createElement('div');
    container.className = 'stoast-container';
    document.body.appendChild(container);
}

const removeToast = (toast) => {
    $(toast).fadeOut(500, () => container.removeChild(toast));
}

const createToast = (text, duration) => {
    const toast = document.createElement('div');
    const textNode = document.createTextNode(text);
    toast.className = "stoast";
    toast.appendChild(textNode);
    container.appendChild(toast);

    setTimeout(() => removeToast(toast), duration);
}

module.exports = {
    toast: createToast,
    init: initContainer
};
