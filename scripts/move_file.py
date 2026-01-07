import os
import shutil

def cover_md_to_semester_folders(root, move=True):
    for fname in os.listdir(root):
        if fname.endswith('.md') and fname not in ['README.md']:
            src = os.path.join(root, fname)
            # 遍历所有子文件夹
            for sub in os.listdir(root):
                subdir = os.path.join(root, sub)
                if os.path.isdir(subdir):
                    dst = os.path.join(subdir, fname)
                    if os.path.exists(dst):
                        shutil.copyfile(src, dst)
                        print(f'覆盖: {dst}')
                        if move:
                            os.remove(src)
                            print(f'已删除源文件: {src}')


# 用法
cover_md_to_semester_folders('src/study/bscs')
cover_md_to_semester_folders('src/study/mscs')