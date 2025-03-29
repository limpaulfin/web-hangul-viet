// Import module chuyển đổi
import { convertHangulChar, convertHangulText, isHangul, clipboardUtils } from './hangul-converter.js';

// Khởi tạo ứng dụng
$(document).ready(function () {
    // Lấy các phần tử DOM
    const $input = $('#input');
    const $output = $('#output');
    const $modal = $('#result-modal');
    const $showAllBtn = $('#show-all-btn');
    const $closeBtn = $('.close-btn');
    const $copyResultBtn = $('#copy-result-btn');
    const $combinedText = $('#combined-text');
    const $pasteBtn = $('#paste-btn');
    const $clearBtn = $('#clear-btn');

    // Kiểm tra xem các phần tử có tồn tại không
    if (!$input.length || !$output.length) {
        console.error('Không tìm thấy các phần tử HTML cần thiết. Vui lòng kiểm tra lại các ID trong file HTML.');
        return;
    }

    // Kiểm tra xem trình duyệt có hỗ trợ clipboard API không
    if (!clipboardUtils.isClipboardSupported()) {
        console.warn('Trình duyệt không hỗ trợ Clipboard API. Chức năng paste sẽ không hoạt động.');
        $pasteBtn.addClass('disabled').attr('title', 'Trình duyệt không hỗ trợ');
    }

    // Hàm kiểm tra xuống dòng
    function isNewLine(char) {
        return char === '\n';
    }

    // Hàm tự động điều chỉnh chiều cao textarea
    function autoResizeTextarea() {
        // Reset height để tính toán chính xác
        $input.css('height', 'auto');
        // Điều chỉnh height dựa trên scrollHeight
        $input.css('height', $input[0].scrollHeight + 'px');
    }

    // Hàm chuyển đổi và hiển thị kết quả
    function convertAndDisplay() {
        const text = $input.val();
        console.log('Input text:', JSON.stringify(text));

        // Tự động điều chỉnh chiều cao textarea
        autoResizeTextarea();

        // Xóa kết quả cũ
        $output.empty();

        // Tách chuỗi thành các ký tự
        const chars = text.split('');
        console.log('Input chars:', JSON.stringify(chars));

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
                console.log(`Converting char ${char} to ${convertedChar}`);

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
    function updateModalContent() {
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
    async function handlePaste() {
        try {
            // Đọc dữ liệu từ clipboard sử dụng module clipboardUtils
            const text = await clipboardUtils.readFromClipboard();

            // Cập nhật giá trị input và chuyển đổi
            $input.val(text);
            convertAndDisplay();
        } catch (error) {
            console.error('Không thể đọc clipboard:', error);
            alert('Không thể truy cập clipboard. Vui lòng kiểm tra quyền truy cập.');
        }
    }

    // Hàm xử lý Clear input
    function handleClear() {
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
    function showModal() {
        // Cập nhật nội dung trước khi hiển thị
        updateModalContent();

        // Hiển thị modal
        $modal.addClass('show');

        // Ngăn cuộn trang
        $('body').css('overflow', 'hidden');
    }

    // Hàm ẩn modal
    function hideModal() {
        $modal.removeClass('show');
        $('body').css('overflow', '');
    }

    // Hàm sao chép kết quả
    async function copyResultToClipboard() {
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

    // Thêm các sự kiện
    $input.on('input', convertAndDisplay);
    $input.on('keyup input', autoResizeTextarea);
    $pasteBtn.on('click', handlePaste);
    $clearBtn.on('click', handleClear);
    $showAllBtn.on('click', showModal);
    $closeBtn.on('click', hideModal);
    $copyResultBtn.on('click', copyResultToClipboard);

    // Đóng modal khi click bên ngoài
    $modal.on('click', function (e) {
        if (e.target === this) {
            hideModal();
        }
    });

    // Đóng modal khi nhấn ESC
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $modal.hasClass('show')) {
            hideModal();
        }
    });

    // Khởi tạo chiều cao ban đầu
    autoResizeTextarea();
});
