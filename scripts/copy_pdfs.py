import os
import shutil
import glob

print("===== STARTING PDF COPY PROCESS =====")

# 定义源目录和目标目录
src_dir = 'src'
dist_dir = 'src/.vuepress/dist'

print(f"Source directory: {src_dir}")
print(f"Destination directory: {dist_dir}")

# 查找所有PDF文件
pdf_files = glob.glob(os.path.join(src_dir, '**', '*.pdf'), recursive=True)

print(f"Found {len(pdf_files)} PDF files:")
for pdf_file in pdf_files:
    print(f"  - {pdf_file}")

if not pdf_files:
    print("No PDF files found. Exiting...")
else:
    print("\n===== COPYING PDF FILES =====")
    for pdf_file in pdf_files:
        # 计算相对路径
        relative_path = os.path.relpath(pdf_file, src_dir)
        # 构建目标路径
        dest_path = os.path.join(dist_dir, relative_path)
        # 确保目标目录存在
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        print(f"\nCopying: {pdf_file}")
        print(f"To:       {dest_path}")
        # 复制文件
        try:
            shutil.copy2(pdf_file, dest_path)
            print("✓ Copy successful!")
        except Exception as e:
            print(f"✗ Copy failed: {e}")

print("\n===== PDF COPY PROCESS COMPLETED =====")
