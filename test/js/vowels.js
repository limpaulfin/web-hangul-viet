// Xử lý nguyên âm đơn
const singleVowels = {
    'ㅏ': 'a',
    'ㅑ': 'ya',
    'ㅓ': 'o',
    'ㅕ': 'yo',
    'ㅗ': 'ô',
    'ㅛ': 'yô',
    'ㅜ': 'u',
    'ㅠ': 'yu',
    'ㅡ': 'ư',
    'ㅣ': 'i'
};

// Xử lý nguyên âm đôi
const doubleVowels = {
    'ㅐ': 'ê',
    'ㅒ': 'yê',
    'ㅔ': 'ê',
    'ㅖ': 'yê',
    'ㅘ': 'oa',
    'ㅙ': 'oe',
    'ㅚ': 'uê',
    'ㅝ': 'uơ',
    'ㅞ': 'uê',
    'ㅟ': 'uy',
    'ㅢ': 'ưi'
};

// Hàm kiểm tra xem ký tự có phải là nguyên âm đơn không
function isSingleVowel(char) {
    return char in singleVowels;
}

// Hàm kiểm tra xem ký tự có phải là nguyên âm đôi không
function isDoubleVowel(char) {
    return char in doubleVowels;
}

// Hàm chuyển đổi nguyên âm đơn
function convertSingleVowel(char) {
    return singleVowels[char] || char;
}

// Hàm chuyển đổi nguyên âm đôi
function convertDoubleVowel(char) {
    return doubleVowels[char] || char;
}

// Export các hàm và đối tượng
export {
    singleVowels,
    doubleVowels,
    isSingleVowel,
    isDoubleVowel,
    convertSingleVowel,
    convertDoubleVowel
};
