function encodeyBeGoodHeaderStuff(str) {
    // Convert the string to a UTF-8 byte array
    let utf8Bytes = new TextEncoder().encode(str);
    
    // Convert the byte array to a base64 encoded string
    let base64Encoded = btoa(String.fromCharCode(...utf8Bytes));
    
    // Format it as RFC 2047 base64 encoding
    return `=?UTF-8?B?${base64Encoded}?=`;
}

export default encodeyBeGoodHeaderStuff;