export function queryStringToJSON(url) {
    var pairs = url.query.split('&');
    var result = [];
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result.push({
            name : pair[0],
            value: decodeURIComponent(pair[1] || '')
        })
    });
    return JSON.parse(JSON.stringify(result));
}