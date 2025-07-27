#!/usr/bin/env python3
"""
Build a consolidated CSS file to avoid @import issues
"""
import os
import re

def read_css_file(filepath):
    """Read a CSS file and return its content"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Warning: {filepath} not found")
        return ""

def main():
    print("🎨 Building consolidated CSS...")
    
    # Define the order of CSS files to include
    css_files = [
        'app/static/css/design-system.css',
        'app/static/css/components/buttons.css', 
        'app/static/css/components/navigation.css',
        'app/static/css/components/footer.css',
        'app/static/css/forms.css'
    ]
    
    # Start with the main styles.css but skip the @import lines
    styles_content = read_css_file('app/static/css/styles.css')
    
    # Remove @import lines
    styles_content = re.sub(r'@import.*?;', '', styles_content)
    
    # Build consolidated content
    consolidated_css = []
    
    # Add header comment
    consolidated_css.append("""/* PETential - Consolidated CSS */
/* Generated automatically to avoid @import issues */

""")
    
    # Add each CSS file
    for css_file in css_files:
        if os.path.exists(css_file):
            print(f"Adding {css_file}")
            content = read_css_file(css_file)
            consolidated_css.append(f"/* === {css_file} === */")
            consolidated_css.append(content)
            consolidated_css.append("")
        else:
            print(f"Skipping missing file: {css_file}")
    
    # Add the main styles content (without imports)
    consolidated_css.append("/* === Main Styles === */")
    consolidated_css.append(styles_content)
    
    # Write consolidated file
    output_path = 'app/static/css/styles-consolidated.css'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(consolidated_css))
    
    print(f"✅ Consolidated CSS created: {output_path}")
    print(f"📊 Total size: {len(''.join(consolidated_css))} characters")

if __name__ == '__main__':
    main()
