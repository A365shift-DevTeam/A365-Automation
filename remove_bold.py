import os
import glob

def remove_bold():
    src_dir = r"e:\Arul\PROJECTS\A365Shift-Automation POC\A365-Automation\src"
    
    # Exclude Hero.tsx
    excluded = ["Hero.tsx"]
    
    count = 0
    file_count = 0
    
    # Recursively find all tsx files
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(".tsx") or file.endswith(".ts"):
                if file in excluded:
                    continue
                    
                path = os.path.join(root, file)
                
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                if "font-bold" in content or "font-black" in content:
                    # Replace both classes with empty strings
                    new_content = content.replace("font-bold ", "").replace("font-bold", "").replace("font-black ", "").replace("font-black", "")
                    
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    count += content.count("font-bold") + content.count("font-black")
                    file_count += 1
                    
    print(f"Replaced {count} instances across {file_count} files.")

if __name__ == "__main__":
    remove_bold()
