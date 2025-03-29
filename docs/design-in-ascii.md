# Thiết kế giao diện Material Design - Hangul sang Việt

```
+------------------------------------------+
|                                          |
|  +----------------------------------+    |
|  |                                  |    |
|  |  Chuyển Hangul sang Phiên âm Việt|    |
|  |                                  |    |
|  +----------------------------------+    |
|                                          |
|  +----------------------------------+    |
|  |                                  |    |
|  |  [Nhập chữ Hangul tại đây...]    |    |
|  |                                  |    |
|  +----------------------------------+    |
|                                          |
|  +----------------------------------+    |
|  |                                  |    |
|  |  [한] [글] [한] [글] [소] [개]   |    |
|  |  [han][kưl][han][kưl][xô] [kê]   |    |
|  |                                  |    |
|  |  --- Ngắt dòng ---               |    |
|  |                                  |    |
|  |  [한] [글] [한] [글] [소] [개]   |    |
|  |  [han][kưl][han][kưl][xô] [kê]   |    |
|  |                                  |    |
|  +----------------------------------+    |
|                                          |
+------------------------------------------+

## Màu sắc:
- Nền chính: #F7F9FC (Light Blue Grey)
- Nền card: #FFFFFF (White)
- Tiêu đề: #3F51B5 (Indigo)
- Chữ Hangul: #424242 (Grey 800)
- Chữ Latin: #5C6BC0 (Indigo 400)
- Border card: #F0F0F0 (Grey 100)
- Shadow: rgba(0,0,0,0.08)
- Đường ngắt dòng: #E0E0E0 (Grey 300, dashed)

## Typography:
- Font chính: Roboto
- Tiêu đề: 20px, Medium (18px trên mobile)
- Input: 15px, Regular
- Chữ Hangul: 22px, Medium (18px trên mobile)
- Chữ Latin: 14px, Regular (12px trên mobile)

## Spacing:
- Padding card: 16px
- Margin giữa các card: 12px
- Padding input: 12px
- Gap giữa các ký tự: 6px
- Chiều cao ngắt dòng: 12px (8px trên mobile)

## Components:
- Card: Border radius 8px, elevation 1-2dp
- Input: Border radius 6px, inset shadow
- Ký tự: Border radius 6px, border 1px solid #F0F0F0
- Hover effect: Transform translateY(-2px)

## Responsive:
- Mobile (<600px): Các ô ký tự nhỏ hơn, fonts nhỏ hơn
- Tablet (≥768px): Container max-width 720px
- Desktop (≥992px): Container max-width 960px
```
