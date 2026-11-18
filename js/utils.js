
// Debounce Function
export function debounce(callback, delay = 300) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}


export function throttle(callback, delay = 150) {
    let shouldWait = false;

    return function (...args) {
        if (shouldWait) return;

        callback.apply(this, args);
        shouldWait = true;

        setTimeout(() => {
            shouldWait = false;
        }, delay);
    };
}
