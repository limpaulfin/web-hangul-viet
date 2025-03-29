# Ứng dụng chuyển đổi chữ Hangul sang phiên âm tiếng Việt

Ứng dụng web đơn giản giúp chuyển đổi chữ Hangul (tiếng Hàn Quốc) sang phiên âm tiếng Việt, giúp người Việt Nam dễ dàng đọc và phát âm chính xác các từ tiếng Hàn.

## Tính năng

-   Chuyển đổi ký tự Hangul sang phiên âm tiếng Việt
-   Hiển thị từng ký tự Hangul kèm phiên âm tương ứng
-   Hỗ trợ sao chép văn bản từ clipboard
-   Xuất kết quả để dễ dàng sao chép
-   Giao diện thân thiện, dễ sử dụng

## Cài đặt

1. Clone repository:

```
git clone https://github.com/yourusername/web-hangul-viet.git
cd web-hangul-viet
```

2. Cài đặt các gói phụ thuộc:

```
npm install
```

3. Chạy ứng dụng:

```
npm start
```

4. Mở trình duyệt và truy cập: `http://localhost:8080`

## Công nghệ sử dụng

-   HTML, CSS, JavaScript
-   jQuery
-   Node.js (cho web server)

## Cấu trúc dự án

```
web-hangul-viet/
├── app/                  # Mã nguồn ứng dụng
│   ├── css/              # Style sheets
│   ├── js/               # JavaScript files
│   │   ├── init.js       # Entry point
│   │   ├── ui-handlers.js # Xử lý giao diện người dùng
│   │   └── hangul-converter.js # Công cụ chuyển đổi Hangul
│   └── index.html        # File HTML chính
├── docs/                 # Tài liệu
├── server.js             # Node.js server
└── package.json          # Cấu hình npm
```

## Đóng góp

Mọi đóng góp đều được hoan nghênh. Vui lòng mở một issue hoặc tạo pull request để thêm tính năng mới hoặc sửa lỗi.

## Giấy phép

[MIT](LICENSE)
