#!/usr/bin/env python3
"""
CSS Build Script for Framer Design System
Optimizes and minifies CSS files for production deployment
"""

import os
import re
import gzip
from pathlib import Path

def minify_css(css_content):
    """
    Minify CSS content by removing unnecessary whitespace and comments
    """
    # Remove comments
    css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    
    # Remove unnecessary whitespace
    css_content = re.sub(r'\s+', ' ', css_content)
    css_content = re.sub(r';\s*}', '}', css_content)
    css_content = re.sub(r'{\s*', '{', css_content)
    css_content = re.sub(r'}\s*', '}', css_content)
    css_content = re.sub(r':\s*', ':', css_content)
    css_content = re.sub(r';\s*', ';', css_content)
    css_content = re.sub(r',\s*', ',', css_content)
    
    # Remove trailing semicolons before closing braces
    css_content = re.sub(r';+}', '}', css_content)
    
    return css_content.strip()

def combine_css_files():
    """
    Combine all CSS files into a single optimized file
    """
    css_dir = Path('app/static/css')
    
    # Order of CSS files for optimal loading
    css_files = [
        'design-system.css',
        'components/buttons.css',
        'components/navigation.css',
        'forms.css',
        'modal.css',
        'quiz.css',
        'results.css',
        'breed_details.css'
    ]
    
    combined_css = []
    
    for css_file in css_files:
        file_path = css_dir / css_file
        if file_path.exists():
            print(f"Processing {css_file}...")
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Remove @import statements (we're combining manually)
            content = re.sub(r'@import[^;]+;', '', content)
            
            combined_css.append(f"/* {css_file} */")
            combined_css.append(content)
            combined_css.append("")
    
    return '\n'.join(combined_css)

def optimize_custom_properties(css_content):
    """
    Optimize CSS custom properties usage
    """
    # Find all custom property definitions
    properties = re.findall(r'--[\w-]+:\s*[^;]+;', css_content)
    
    # Count usage of each property
    property_usage = {}
    for prop in properties:
        prop_name = prop.split(':')[0].strip()
        usage_count = len(re.findall(rf'var\({re.escape(prop_name)}[^)]*\)', css_content))
        property_usage[prop_name] = usage_count
    
    print(f"Found {len(property_usage)} custom properties")
    
    # Remove unused properties (usage count = 0)
    unused_props = [prop for prop, count in property_usage.items() if count == 0]
    if unused_props:
        print(f"Removing {len(unused_props)} unused custom properties")
        for prop in unused_props:
            css_content = re.sub(rf'{re.escape(prop)}:[^;]+;', '', css_content)
    
    return css_content

def create_gzipped_version(css_content, output_path):
    """
    Create a gzipped version of the CSS for better compression
    """
    gzip_path = output_path.with_suffix('.css.gz')
    with gzip.open(gzip_path, 'wt', encoding='utf-8') as f:
        f.write(css_content)
    
    original_size = len(css_content.encode('utf-8'))
    gzipped_size = gzip_path.stat().st_size
    compression_ratio = (1 - gzipped_size / original_size) * 100
    
    print(f"Gzipped version created: {gzip_path}")
    print(f"Compression: {original_size:,} bytes → {gzipped_size:,} bytes ({compression_ratio:.1f}% reduction)")

def analyze_css_performance(css_content):
    """
    Analyze CSS for performance metrics
    """
    print("\n=== CSS Performance Analysis ===")
    
    # File size analysis
    size_bytes = len(css_content.encode('utf-8'))
    size_kb = size_bytes / 1024
    print(f"File size: {size_bytes:,} bytes ({size_kb:.1f} KB)")
    
    # Rule count
    rule_count = len(re.findall(r'{[^}]*}', css_content))
    print(f"CSS rules: {rule_count:,}")
    
    # Selector complexity
    selectors = re.findall(r'([^{]+){', css_content)
    complex_selectors = [s for s in selectors if s.count(' ') > 3 or s.count('>') > 1]
    print(f"Complex selectors: {len(complex_selectors)}")
    
    # Media queries
    media_queries = len(re.findall(r'@media[^{]+{', css_content))
    print(f"Media queries: {media_queries}")
    
    # Custom properties
    custom_props = len(re.findall(r'--[\w-]+:', css_content))
    print(f"Custom properties: {custom_props}")
    
    # Performance recommendations
    print("\n=== Performance Recommendations ===")
    if size_kb > 100:
        print("⚠️  CSS file is large (>100KB). Consider code splitting.")
    if len(complex_selectors) > 10:
        print("⚠️  Many complex selectors found. Consider simplifying.")
    if media_queries > 20:
        print("⚠️  Many media queries. Consider consolidating breakpoints.")
    
    print("✅ Use gzipped version in production")
    print("✅ Enable CSS caching with proper headers")
    print("✅ Consider critical CSS extraction for above-the-fold content")

def main():
    """
    Main build process
    """
    print("🚀 Starting CSS build process...")
    
    # Combine all CSS files
    print("\n📦 Combining CSS files...")
    combined_css = combine_css_files()
    
    # Optimize custom properties
    print("\n🔧 Optimizing custom properties...")
    optimized_css = optimize_custom_properties(combined_css)
    
    # Minify CSS
    print("\n📦 Minifying CSS...")
    minified_css = minify_css(optimized_css)
    
    # Write optimized version
    output_path = Path('app/static/css/styles.optimized.css')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(minified_css)
    
    print(f"✅ Optimized CSS written to: {output_path}")
    
    # Create gzipped version
    print("\n🗜️  Creating gzipped version...")
    create_gzipped_version(minified_css, output_path)
    
    # Performance analysis
    analyze_css_performance(minified_css)
    
    print("\n🎉 CSS build process completed successfully!")
    print(f"📁 Output files:")
    print(f"   - {output_path}")
    print(f"   - {output_path.with_suffix('.css.gz')}")

if __name__ == "__main__":
    main()
