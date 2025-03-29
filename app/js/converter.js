// Import các module
import {
    isSingleVowel,
    isDoubleVowel,
    convertSingleVowel,
    convertDoubleVowel
} from './vowels.js';

import {
    isInitialConsonant,
    isFinalConsonant,
    isDoubleConsonant,
    convertInitialConsonant,
    convertFinalConsonant,
    convertDoubleConsonant
} from './consonants.js';

import {
    applyLinkingRule,
    applyTensingRule,
    applyLiquidRule,
    applyConsonantAssimilation,
    needsLinking,
    needsTensing,
    needsLiquid,
    needsConsonantAssimilation
} from './rules.js';

// Hàm chính để chuyển đổi một ký tự Hangul
function convertHangulChar(char, context = {}) {
    // Kiểm tra và chuyển đổi nguyên âm
    if (isSingleVowel(char)) {
        return convertSingleVowel(char);
    }
    if (isDoubleVowel(char)) {
        return convertDoubleVowel(char);
    }

    // Kiểm tra và chuyển đổi phụ âm
    if (isDoubleConsonant(char)) {
        return convertDoubleConsonant(char);
    }

    // Áp dụng các quy tắc đặc biệt
    if (needsLinking(char) && context.nextIsVowel) {
        return applyLinkingRule(char);
    }
    if (needsTensing(char) && context.nextIsConsonant) {
        return applyTensingRule(char);
    }
    if (needsLiquid(char)) {
        return applyLiquidRule(char, context.isFinal);
    }
    if (needsConsonantAssimilation(char)) {
        return applyConsonantAssimilation(char, context.isInitial);
    }

    // Chuyển đổi phụ âm thông thường
    if (isInitialConsonant(char)) {
        return convertInitialConsonant(char);
    }
    if (isFinalConsonant(char)) {
        return convertFinalConsonant(char);
    }

    return char;
}

// Hàm chuyển đổi một từ Hangul
function convertHangulWord(word) {
    let result = '';
    const chars = word.split('');

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const context = {
            isInitial: i === 0,
            isFinal: i === chars.length - 1,
            nextIsVowel: i < chars.length - 1 && (isSingleVowel(chars[i + 1]) || isDoubleVowel(chars[i + 1])),
            nextIsConsonant: i < chars.length - 1 && (isInitialConsonant(chars[i + 1]) || isFinalConsonant(chars[i + 1]))
        };

        result += convertHangulChar(char, context);
    }

    return result;
}

// Hàm chuyển đổi văn bản Hangul
function convertHangulText(text) {
    return text.split(' ').map(word => convertHangulWord(word)).join(' ');
}

// Export các hàm
export {
    convertHangulChar,
    convertHangulWord,
    convertHangulText
};
