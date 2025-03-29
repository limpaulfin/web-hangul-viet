// Bảng chuyển đổi nguyên âm
const vowels = {
    'ㅏ': 'a',
    'ㅑ': 'ya',
    'ㅓ': 'o',
    'ㅕ': 'yo',
    'ㅗ': 'ô',
    'ㅛ': 'yô',
    'ㅜ': 'u',
    'ㅠ': 'yu',
    'ㅡ': 'ư',
    'ㅣ': 'i',
    'ㅐ': 'ê',
    'ㅒ': 'yê',
    'ㅔ': 'ê',
    'ㅖ': 'yê',
    'ㅘ': 'oa',
    'ㅙ': 'oe',
    'ㅚ': 'uê',
    'ㅝ': 'uo',
    'ㅞ': 'uê',
    'ㅟ': 'uy',
    'ㅢ': 'ưi'
};

// Bảng chuyển đổi phụ âm
const consonants = {
    'ㄱ': 'k',
    'ㄴ': 'n',
    'ㄷ': 'đ',
    'ㄹ': 'r',  // Phụ âm đầu là r
    'ㅁ': 'm',
    'ㅂ': 'p',
    'ㅅ': 'x',
    'ㅇ': '',   // Không phát âm khi ở đầu
    'ㅈ': 'j',
    'ㅊ': 'ch\'',
    'ㅋ': 'kh',
    'ㅌ': 'th',
    'ㅍ': 'ph',
    'ㅎ': 'h',
    'ㄲ': 'kk',
    'ㄸ': 'tt',
    'ㅃ': 'pp',
    'ㅆ': 'ss',
    'ㅉ': 'jj'
};

// Bảng chuyển đổi phụ âm cuối
const finalConsonants = {
    'ㄱ': 'k',
    'ㄴ': 'n',
    'ㄷ': 't',
    'ㄹ': 'l',  // Phụ âm cuối là l
    'ㅁ': 'm',
    'ㅂ': 'p',
    'ㅅ': 't',
    'ㅇ': 'ng',
    'ㅈ': 't',
    'ㅊ': 't',
    'ㅋ': 'k',
    'ㅌ': 't',
    'ㅍ': 'p',
    'ㅎ': 'k',
    'ㄲ': 'k',
    'ㄸ': 't',
    'ㅃ': 'p',
    'ㅆ': 't',
    'ㅉ': 't',
    'ㄳ': 'k',
    'ㄵ': 'n',
    'ㄶ': 'n',
    'ㄺ': 'lk',
    'ㄻ': 'lm',
    'ㄼ': 'lp',
    'ㄽ': 'ls',
    'ㄾ': 'lt',
    'ㄿ': 'lp',
    'ㅀ': 'lh',
    'ㅄ': 'ps'
};

// Mảng các phụ âm đầu
const initialConsonants = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// Mảng các nguyên âm
const medialVowels = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];

// Mảng các phụ âm cuối
const finalConsonantsList = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// Hàm kiểm tra ký tự có phải là Hangul không
function isHangul(char) {
    const code = char.charCodeAt(0);
    // Khoảng Unicode của Hangul: AC00-D7AF
    return code >= 0xAC00 && code <= 0xD7AF;
}

// Hàm chuyển đổi một ký tự Hangul sang tiếng Việt
function convertHangulChar(char) {
    // Kiểm tra xem ký tự có phải là Hangul không (mã Unicode từ AC00 đến D7AF)
    if (!isHangul(char)) {
        return char; // Giữ nguyên các ký tự không phải Hangul
    }

    const code = char.charCodeAt(0);

    // Tách ký tự Hangul thành các thành phần
    const hangulCode = code - 0xAC00;
    const jong = hangulCode % 28;
    const jung = ((hangulCode - jong) / 28) % 21;
    const cho = Math.floor(((hangulCode - jong) / 28 - jung) / 21);

    // Chuyển đổi các thành phần sang tiếng Việt
    let result = '';

    // Thêm phụ âm đầu (KHÔNG cần kiểm tra cho > 0 vì cho = 0 cũng có phụ âm)
    const consonant = consonants[initialConsonants[cho]];
    result += consonant || '';

    // Thêm nguyên âm
    const vowel = vowels[medialVowels[jung]];
    result += vowel || '';

    // Thêm phụ âm cuối
    if (jong > 0) {
        const finalComponent = finalConsonantsList[jong];
        const final = finalConsonants[finalComponent];
        result += final || '';
    }

    return result;
}

// Hàm chuyển đổi chuỗi Hangul sang tiếng Việt
function convertHangulText(text) {
    // Tách chuỗi thành các ký tự
    const chars = text.split('');
    let result = '';

    // Chuyển đổi từng ký tự
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        result += convertHangulChar(char);
    }

    return result;
}

// Module xử lý clipboard
const clipboardUtils = {
    // Đọc dữ liệu từ clipboard
    async readFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            return text;
        } catch (error) {
            console.error('Không thể đọc clipboard:', error);
            throw new Error('Không có quyền truy cập clipboard hoặc trình duyệt không hỗ trợ');
        }
    },

    // Kiểm tra xem trình duyệt có hỗ trợ API Clipboard không
    isClipboardSupported() {
        return navigator && navigator.clipboard && typeof navigator.clipboard.readText === 'function';
    }
};

// Export các hàm để sử dụng trong các module khác
export { convertHangulChar, convertHangulText, isHangul, clipboardUtils };
