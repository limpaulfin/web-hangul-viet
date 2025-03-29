# Tiến độ dự án Hangul-Việt

## Chức năng đã hoàn thành

-   [x] Chuyển đổi ký tự Hangul sang phiên âm tiếng Việt
-   [x] Xử lý phụ âm đầu, nguyên âm và phụ âm cuối
-   [x] Hỗ trợ xử lý phụ âm cuối kép (ㄺ -> lk)
-   [x] Lọc và giữ lại dấu câu cơ bản (.,!?)
-   [x] Hỗ trợ xuống dòng văn bản
-   [x] Giao diện responsive

## Cần cải thiện

-   [ ] Cải thiện phiên âm cho các từ đặc biệt
-   [ ] Hỗ trợ quy tắc nối âm (연음화)
-   [ ] Thêm tính năng sao chép kết quả
-   [ ] Thêm tính năng phát âm
-   [ ] Thêm từ điển tra cứu

## Technical Notes

1. **Phương pháp chuyển đổi:**

    - Sử dụng Unicode range (AC00-D7AF) để nhận diện ký tự Hangul
    - Tách thành phần Jamo từ ký tự Hangul (phụ âm đầu, nguyên âm, phụ âm cuối)
    - Áp dụng bảng chuyển đổi âm theo bảng tương ứng với tiếng Việt

2. **Xử lý đặc biệt:**

    - Phụ âm ㄹ: "r" khi ở đầu, "l" khi ở cuối
    - Phụ âm ㅇ: không phát âm khi ở đầu, "ng" khi ở cuối
    - Phụ âm cuối kép: xử lý riêng (ví dụ: ㄺ -> "lk")

3. **Cấu trúc code:**

    - Mô-đun chuyển đổi: `hangul-converter.js`
    - Xử lý giao diện: `init.js`
    - Styling: CSS với Material Design

4. **Responsive design:**
    - Desktop: max-width 960px
    - Tablet: max-width 720px
    - Mobile: điều chỉnh kích thước phù hợp với màn hình nhỏ
