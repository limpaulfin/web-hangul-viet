// Import module chuyển đổi
import { clipboardUtils } from './hangul-converter.js';
import {
    autoResizeTextarea,
    convertAndDisplay,
    updateModalContent,
    handlePaste,
    handleClear,
    showModal,
    hideModal,
    copyResultToClipboard
} from './ui-handlers.js';

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
    const $body = $('body');

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

    // Thêm các sự kiện
    $input.on('input', () => convertAndDisplay($input, $output, () => updateModalContent($input, $combinedText)));
    $input.on('keyup input', () => autoResizeTextarea($input));
    $pasteBtn.on('click', () => handlePaste($input, () => convertAndDisplay($input, $output, () => updateModalContent($input, $combinedText))));
    $clearBtn.on('click', () => handleClear($input, $output));
    $showAllBtn.on('click', () => showModal($modal, $body, () => updateModalContent($input, $combinedText)));
    $closeBtn.on('click', () => hideModal($modal, $body));
    $copyResultBtn.on('click', () => copyResultToClipboard($combinedText, $copyResultBtn));

    // Đóng modal khi click bên ngoài
    $modal.on('click', function (e) {
        if (e.target === this) {
            hideModal($modal, $body);
        }
    });

    // Đóng modal khi nhấn ESC
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $modal.hasClass('show')) {
            hideModal($modal, $body);
        }
    });

    // Khởi tạo chiều cao ban đầu
    autoResizeTextarea($input);
});
