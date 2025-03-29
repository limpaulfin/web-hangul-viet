// Xử lý phụ âm đầu
const initialConsonants = {
    'ㄱ': 'k/g',
    'ㄴ': 'n',
    'ㄷ': 't/d',
    'ㄹ': 'r/l',
    'ㅁ': 'm',
    'ㅂ': 'p/b',
    'ㅅ': 'x',
    'ㅇ': 'ng',
    'ㅈ': 'ch/j',
    'ㅊ': 'ch\'',
    'ㅋ': 'kh',
    'ㅌ': 'th',
    'ㅍ': 'ph',
    'ㅎ': 'h'
};

// Xử lý phụ âm cuối
const finalConsonants = {
    'ㄱ': 'k',
    'ㄴ': 'n',
    'ㄷ': 't',
    'ㄹ': 'l',
    'ㅁ': 'm',
    'ㅂ': 'p',
    'ㅇ': 'ng'
};

// Xử lý phụ âm kép
const doubleConsonants = {
    'ㄲ': 'kk',
    'ㄸ': 'tt',
    'ㅃ': 'pp',
    'ㅆ': 'ss',
    'ㅉ': 'jj'
};

// Hàm kiểm tra xem ký tự có phải là phụ âm đầu không
function isInitialConsonant(char) {
    return char in initialConsonants;
}

// Hàm kiểm tra xem ký tự có phải là phụ âm cuối không
function isFinalConsonant(char) {
    return char in finalConsonants;
}

// Hàm kiểm tra xem ký tự có phải là phụ âm kép không
function isDoubleConsonant(char) {
    return char in doubleConsonants;
}

// Hàm chuyển đổi phụ âm đầu
function convertInitialConsonant(char) {
    return initialConsonants[char] || char;
}

// Hàm chuyển đổi phụ âm cuối
function convertFinalConsonant(char) {
    return finalConsonants[char] || char;
}

// Hàm chuyển đổi phụ âm kép
function convertDoubleConsonant(char) {
    return doubleConsonants[char] || char;
}

// Export các hàm và đối tượng
export {
    initialConsonants,
    finalConsonants,
    doubleConsonants,
    isInitialConsonant,
    isFinalConsonant,
    isDoubleConsonant,
    convertInitialConsonant,
    convertFinalConsonant,
    convertDoubleConsonant
};
