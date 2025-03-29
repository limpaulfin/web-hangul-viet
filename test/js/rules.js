// Quy tắc nối âm (연음화)
function applyLinkingRule(char) {
    const linkingRules = {
        'ㄱ': 'g',
        'ㄷ': 'd',
        'ㅂ': 'b'
    };
    return linkingRules[char] || char;
}

// Quy tắc trọng âm (경음화)
function applyTensingRule(char) {
    const tensingRules = {
        'ㄱ': 'kk',
        'ㄷ': 'tt',
        'ㅂ': 'pp',
        'ㅅ': 'ss',
        'ㅈ': 'jj'
    };
    return tensingRules[char] || char;
}

// Quy tắc nhũ âm hóa (유음화)
function applyLiquidRule(char, isFinal) {
    if (char === 'ㄹ') {
        return isFinal ? 'l' : 'r';
    }
    return char;
}

// Quy tắc biến âm (자음 동화)
function applyConsonantAssimilation(char, isInitial) {
    if (char === 'ㅇ') {
        return isInitial ? '' : 'ng';
    }
    return char;
}

// Hàm kiểm tra xem có cần áp dụng quy tắc nối âm không
function needsLinking(char) {
    return ['ㄱ', 'ㄷ', 'ㅂ'].includes(char);
}

// Hàm kiểm tra xem có cần áp dụng quy tắc trọng âm không
function needsTensing(char) {
    return ['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ'].includes(char);
}

// Hàm kiểm tra xem có cần áp dụng quy tắc nhũ âm hóa không
function needsLiquid(char) {
    return char === 'ㄹ';
}

// Hàm kiểm tra xem có cần áp dụng quy tắc biến âm không
function needsConsonantAssimilation(char) {
    return char === 'ㅇ';
}

// Export các hàm
export {
    applyLinkingRule,
    applyTensingRule,
    applyLiquidRule,
    applyConsonantAssimilation,
    needsLinking,
    needsTensing,
    needsLiquid,
    needsConsonantAssimilation
};
