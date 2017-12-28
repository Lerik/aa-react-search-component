export default FindTextInSource = function(text, source, field, maxResults) {
    const firstElementOfSource = source[0];
    let results = [];

    if (typeof firstElementOfSource === 'string') {
        results = source.filter((item) => {
            return item.indexOf(text) >= 0;
        });
    } else if (typeof firstElementOfSource === 'object' &&
        typeof firstElementOfSource[field] === 'string') {
        const resultsPreCasted = results = source.filter((item) => item[field].indexOf(text) >= 0);
        results = resultsPreCasted.map((item) => item[field]);
    } else if (typeof firstElementOfSource === 'number') {
        results = source.filter((item) => {
            const itemAsString = item.toString();
            return itemAsString.startsWith(text);
        });
    } else if (typeof firstElementOfSource === 'object' &&
        typeof firstElementOfSource[field] === 'number') {
        const resultsPreCasted = source.filter((item) => {
            const itemAsString = item[field].toString();
            return itemAsString.startsWith(text);
        });

        results = resultsPreCasted.map((item) => item[field]);
    }

    if (results.length > maxResults) {
        return results.sort().slice(0, maxResults);
    }

    return results.sort();
}
