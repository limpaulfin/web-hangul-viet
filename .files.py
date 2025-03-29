"""
File: .files-lms.py
Description: Tạo cấu trúc thư mục và thực thi các file Python trong theme

Mục đích chính:
1. Tạo cấu trúc thư mục dạng tree cho plugin fong_de_lms
2. Lọc và loại bỏ các file/thư mục không cần thiết
3. Tạo file markdown chứa cấu trúc thư mục
4. Thực thi các file Python trong theme

Files liên quan:
- .files-lms.md: File output chính
- .files-{module}.md: File output cho mỗi module
- Các file Python trong theme

Lưu ý khi phát triển:
1. Bảo trì pattern timestamp:
   - Cập nhật các pattern trong should_exclude_file()
   - Thêm pattern mới khi cần

2. Xử lý module:
   - Kiểm tra kỹ module trước khi thêm/xóa
   - Giữ cấu trúc file markdown nhất quán

3. Theme scripts:
   - Backup dữ liệu trước khi thực thi
   - Xử lý lỗi cẩn thận

4. Performance:
   - Tối ưu cho thư mục lớn
   - Hạn chế đệ quy sâu
"""

import os
import re
from datetime import datetime
from pathlib import Path
import subprocess

# ========== CẤU HÌNH ĐƯỜNG DẪN ==========
CONFIG_PATH = r"G:\\My Drive\\Ebooks"  # Đường dẫn tuyệt đối Windows
# Ví dụ: CONFIG_PATH = r"C:\\Users\\Admin\\my_project\\wp-content\\plugins\\fong_de_lms"

# Kiểm tra và xác định thư mục làm việc
def get_working_directory():
    if CONFIG_PATH and os.path.exists(CONFIG_PATH):
        return os.path.abspath(CONFIG_PATH)
    return os.path.dirname(os.path.abspath(__file__))

def generate_tree(dir_path, output_file, base_path=''):
    """
    Tạo cây thư mục và ghi vào file markdown.

    Mục đích:
    - Tạo cấu trúc cây thư mục và ghi vào file markdown

    Tham số:
    - dir_path: Đường dẫn thư mục gốc cần quét
    - output_file: File markdown đầu ra
    - base_path: Đường dẫn cơ sở (mặc định rỗng)

    Quy trình:
    1. Tạo header cho file markdown
    2. Ghi tên thư mục gốc
    3. Quét đệ quy toàn bộ cấu trúc
    4. Tính toán thống kê số lượng file/thư mục
    5. Ghi thống kê vào cuối file
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('# Cấu trúc thư mục {}\n\n'.format(os.path.basename(dir_path)))
        f.write(f'Được tạo: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n\n')
        f.write(f'Vị trí file: `{os.path.abspath(dir_path)}`\n\n')
        f.write('## Cấu trúc thư mục\n\n')
        f.write('```plaintext\n')

        root_dir = os.path.basename(dir_path)
        f.write(f'{root_dir}/\n')

        write_directory(dir_path, '', f)
        f.write('```\n\n')

        # Thống kê (không tính các file trong vendor và phpmyadmin)
        total_dirs = 0
        total_files = 0
        for root, dirs, files in os.walk(dir_path):
            # Loại bỏ các thư mục không mong muốn
            dirs[:] = [d for d in dirs if not should_exclude_directory(d)]

            # Loại bỏ các file không mong muốn
            files = [f for f in files if not should_exclude_file(f)]

            total_dirs += len(dirs)
            total_files += len(files)

        f.write('## Thống kê\n\n')
        f.write(f'- Tổng số thư mục: {total_dirs}\n')
        f.write(f'- Tổng số file: {total_files}\n')
        f.write('\n> Note: Thư mục vendor được liệt kê nhưng không quét chi tiết bên trong\n')


def write_directory(path, prefix='', f=None):
    """
    Ghi cấu trúc của một thư mục vào file.

    Mục đích:
    - Ghi cấu trúc của một thư mục vào file

    Tham số:
    - path: Đường dẫn thư mục cần ghi
    - prefix: Tiền tố để tạo indent (mặc định rỗng)
    - f: File handle để ghi

    Quy trình:
    1. Lọc danh sách file/thư mục
    2. Sắp xếp theo alphabet
    3. Ghi từng entry với định dạng tree
    4. Xử lý đệ quy các thư mục con
    """
    entries = os.listdir(path)
    filtered_entries = []

    for entry in entries:
        full_path = os.path.join(path, entry)
        if os.path.isfile(full_path):
            if should_exclude_file(entry):
                continue
        elif os.path.isdir(full_path):
            if should_exclude_directory(entry):
                continue
        filtered_entries.append(entry)

    filtered_entries.sort()

    for entry in filtered_entries:
        full_path = os.path.join(path, entry)
        if os.path.isfile(full_path):
            f.write(f'{prefix}├───{entry}\n')
        elif os.path.isdir(full_path):
            f.write(f'{prefix}├───{entry}/\n')
            if entry != 'vendor':
                write_directory(full_path, prefix + '│   ', f)


def should_exclude_file(filename):
    """
    Kiểm tra file có nên loại trừ không.

    Cập nhật:
    - Thêm danh sách loại trữ theo tên file và phần mở rộng
    - Hỗ trợ cả 2 định dạng: '.txt' và '*.txt'
    """
    # Danh sách loại trừ mới
    exclude_patterns = [
        'index.html',       # Tên file chính xác
        '*.txt',            # Tất cả file .txt
        '*.md',             # Tất cả file markdown
        '*.py',              # file python
        '*.ini',
        '*.gdoc'
    ]

    # Kiểm tra tên file chính xác
    if filename in exclude_patterns:
        return True

    # Kiểm tra phần mở rộng
    for pattern in exclude_patterns:
        if pattern.startswith('*.'):
            ext = pattern[1:]  # Chuyển *.txt thành .txt
            if filename.endswith(ext):
                return True

    # Giữ nguyên các logic cũ về timestamp
    timestamp_patterns = [
        r'\d{4}-\d{2}-\d{2}',
        r'\d{4}-\d{2}-\d{2}---\d{2}-\d{2}',
        r'\d{4}-\d{2}-\d{2}---\d{2}-\d{2}-[AP]M',
        r'_\d{4}-',
        r'.\d{4}-',
    ]
    if any(re.search(pattern, filename) for pattern in timestamp_patterns):
        return True

    return False


def should_exclude_directory(directory):
    """Cập nhật danh sách loại trừ thư mục"""
    exclude_list = ['phpmyadmin', 'tests', '.history', 'vendor']  # Thêm vendor
    return directory in exclude_list


def process_modules(base_dir):
    """
    Xử lý các module trong thư mục modules.

    Mục đích:
    - Xử lý các module trong thư mục modules

    Quy trình:
    1. Tìm thư mục modules
    2. Quét từng module
    3. Tạo file markdown riêng cho mỗi module
    """
    modules_dir = os.path.join(base_dir, 'modules')
    if not os.path.exists(modules_dir):
        return

    for module in os.listdir(modules_dir):
        module_path = os.path.join(modules_dir, module)
        if os.path.isdir(module_path) and not module.startswith('.'):
            output_file = os.path.join(module_path, f'.files-{module}.md')
            base_path = f'wp-content/plugins/fong_de_lms/modules/{module}'
            generate_tree(module_path, output_file, base_path)



if __name__ == '__main__':
    """
    Entry point của script.

    Quy trình:
    1. Tạo file .files-lms.md cho plugin
    2. Tạo file .files-{module}.md cho mỗi module
    3. Thực thi các file Python trong theme

    Xử lý lỗi:
    - Log chi tiết lỗi với traceback
    """
    try:
        current_dir = get_working_directory()  # Đã cập nhật dùng config
        script_dir = os.path.dirname(os.path.abspath(__file__))  # Thư mục chứa script

        print(f"[DEBUG] Thư mục làm việc (config): {current_dir}")
        print(f"[DEBUG] Thư mục script gốc: {script_dir}")

        # Tạo tên file .md cùng tên với file script
        current_script = os.path.basename(__file__)
        md_filename = os.path.splitext(current_script)[0] + ".md"

        # Tạo file chính trong thư mục config
        main_output_config = os.path.join(current_dir, md_filename)
        generate_tree(current_dir, main_output_config, base_path='')
        print(f"\n✅ Đã tạo file cấu hình tại: {main_output_config}")

        # Tạo thêm file trong thư mục script nếu khác nhau
        if os.path.normcase(current_dir) != os.path.normcase(script_dir):
            main_output_script = os.path.join(script_dir, md_filename)
            generate_tree(current_dir, main_output_script, base_path='')
            print(f"\n✅ Đã tạo file bản sao tại: {main_output_script}")
        else:
            print("\nℹ️ Thư mục config trùng với thư mục script, chỉ tạo 1 file")

        # Tạo file cho từng module
        process_modules(current_dir)

    except Exception as e:
        print(f"\n❌ LỖI CHÍNH: {str(e)}")
        import traceback
        traceback.print_exc()
