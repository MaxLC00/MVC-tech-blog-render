module.exports = {
    truncate: (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text
    },
    formatDate: (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        return new Date(date).toLocaleDateString(undefined, options);
    }
};