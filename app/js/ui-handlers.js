// Các hàm xử lý UI cho ứng dụng chuyển đổi Hangul sang tiếng Việt
import { convertHangulChar, isHangul, clipboardUtils } from './hangul-converter.js';

// Hàm kiểm tra xuống dòng
export function isNewLine(char) {
    return char === '\n';
}

// Hàm tự động điều chỉnh chiều cao textarea
export function autoResizeTextarea($input) {
    // Reset height để tính toán chính xác
    $input.css('height', 'auto');
    // Điều chỉnh height dựa trên scrollHeight
    $input.css('height', $input[0].scrollHeight + 'px');
}

// Hàm chuyển đổi và hiển thị kết quả
export function convertAndDisplay($input, $output, updateModalContent) {
    const text = $input.val();

    // Tự động điều chỉnh chiều cao textarea
    autoResizeTextarea($input);

    // Xóa kết quả cũ
    $output.empty();

    // Tách chuỗi thành các ký tự
    const chars = text.split('');

    chars.forEach((char) => {
        // Xử lý xuống dòng
        if (isNewLine(char)) {
            const $lineBreak = $('<div>').addClass('line-break');
            $output.append($lineBreak);
            return;
        }

        // Xử lý ký tự Hangul
        if (isHangul(char)) {
            // Chuyển đổi ký tự Hangul sang tiếng Việt
            const convertedChar = convertHangulChar(char);

            // Hiển thị ký tự Hangul và phiên âm
            const $block = $('<div>').addClass('char-block');
            $block.append($('<div>').addClass('hangul').text(char));
            $block.append($('<div>').addClass('latin').text(convertedChar));
            $output.append($block);
        }
        // Bỏ qua các ký tự khác (Latin, dấu câu, khoảng trắng, v.v.)
    });

    // Cập nhật nội dung cho modal
    updateModalContent();
}

// Hàm cập nhật nội dung cho modal theo định dạng yêu cầu
export function updateModalContent($input, $combinedText) {
    const hangulInput = $input.val();

    // Phân tách text thành các dòng và xử lý từng dòng
    const lines = hangulInput.split('\n');
    let result = '';

    lines.forEach(line => {
        // Bỏ qua dòng trống
        if (!line.trim()) {
            result += '\n';
            return;
        }

        // Lưu lại dòng gốc - loại bỏ dấu ngoặc kép ở đầu và cuối
        const originalLine = line.replace(/^"(.*)"$/, '$1');

        // Tạo dòng phiên âm có khoảng trắng giữa các ký tự
        let translitLine = '';
        let lastCharWasSpace = false;

        // Duyệt qua từng ký tự trong dòng (đã loại bỏ dấu ngoặc kép)
        for (let i = 0; i < originalLine.length; i++) {
            const char = originalLine[i];

            // Đầu tiên xử lý trường hợp có khoảng trắng
            if (char === ' ') {
                translitLine += '  '; // Thêm 2 khoảng trắng thay vì 1
                lastCharWasSpace = true;
                continue;
            }

            // Xử lý các ký tự khác
            if (isHangul(char)) {
                // Chuyển đổi ký tự Hangul sang tiếng Việt
                const convertedChar = convertHangulChar(char);

                // Thêm khoảng trắng trước ký tự nếu không phải là ký tự đầu tiên và ký tự trước không phải khoảng trắng
                if (translitLine !== '' && !lastCharWasSpace) {
                    translitLine += ' ';
                }

                translitLine += convertedChar;
                lastCharWasSpace = false;
            } else {
                // Thêm khoảng trắng trước ký tự nếu không phải là ký tự đầu tiên và ký tự trước không phải khoảng trắng
                if (translitLine !== '' && !lastCharWasSpace) {
                    translitLine += ' ';
                }

                // Giữ nguyên các ký tự khác
                translitLine += char;
                lastCharWasSpace = false;
            }
        }

        // Thêm vào kết quả
        result += originalLine + '\n' + translitLine + '\n\n';
    });

    // Cập nhật nội dung cho modal
    $combinedText.val(result.trim());
}

// Hàm xử lý Paste from clipboard
export async function handlePaste($input, convertAndDisplayFn) {
    try {
        // Đọc dữ liệu từ clipboard sử dụng module clipboardUtils
        const text = await clipboardUtils.readFromClipboard();

        // Cập nhật giá trị input và chuyển đổi
        $input.val(text);
        convertAndDisplayFn();
    } catch (error) {
        console.error('Không thể đọc clipboard:', error);
        alert('Không thể truy cập clipboard. Vui lòng kiểm tra quyền truy cập.');
    }
}

// Hàm xử lý Clear input
export function handleClear($input, $output) {
    // Xóa nội dung trong input
    $input.val('');

    // Xóa kết quả hiển thị
    $output.empty();

    // Đặt lại chiều cao mặc định cho textarea
    $input.css('height', '80px');

    // Focus vào textarea
    $input.focus();
}

// Hàm hiển thị modal
export function showModal($modal, $body, updateModalContentFn) {
    // Cập nhật nội dung trước khi hiển thị
    updateModalContentFn();

    // Hiển thị modal
    $modal.addClass('show');

    // Ngăn cuộn trang
    $body.css('overflow', 'hidden');
}

// Hàm ẩn modal
export function hideModal($modal, $body) {
    $modal.removeClass('show');
    $body.css('overflow', '');
}

// Hàm sao chép kết quả
export async function copyResultToClipboard($combinedText, $copyResultBtn) {
    try {
        const textToCopy = $combinedText.val();

        // Sử dụng Clipboard API để sao chép
        await navigator.clipboard.writeText(textToCopy);

        // Hiển thị trạng thái đã sao chép
        $copyResultBtn.addClass('copied');

        // Xóa trạng thái sau 2 giây
        setTimeout(() => {
            $copyResultBtn.removeClass('copied');
        }, 2000);

    } catch (error) {
        console.error('Không thể sao chép vào clipboard:', error);
        alert('Không thể sao chép vào clipboard. Vui lòng kiểm tra quyền truy cập.');
    }
}
