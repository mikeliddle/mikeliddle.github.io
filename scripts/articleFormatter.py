import re
import textwrap
import sys

def format_markdown(file_path, line_length=80):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Split the content into header and body
    header_match = re.match(r'^(---\n.*?\n---\n)', content, re.DOTALL)
    if header_match:
        header = header_match.group(1)
        body = content[len(header):]
    else:
        header = ''
        body = content

    # Ensure a blank line after the header
    if header and not header.endswith('\n\n'):
        header += '\n'

    # Reflow paragraphs to the specified line length
    paragraphs = body.split('\n\n')
    wrapped_paragraphs = []
    for paragraph in paragraphs:
        lines = paragraph.split('\n')
        combined_paragraph = ' '.join(line.strip() for line in lines if not line.startswith('!'))
        wrapped_paragraph = textwrap.fill(combined_paragraph, width=line_length)
        wrapped_paragraphs.append(wrapped_paragraph)

        # Add lines starting with '!' without modification
        for line in lines:
            if line.startswith('!') or line.startswith('>') or line.startswith('|'):
                wrapped_paragraphs.append(line)

    wrapped_body = '\n\n'.join(wrapped_paragraphs)

    # Combine the header and wrapped body
    formatted_content = header + wrapped_body

    # Ensure a blank line at the end of the file
    if not formatted_content.endswith('\n'):
        formatted_content += '\n'

    # Write the formatted content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(formatted_content)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python articleFormatter.py <path_to_markdown_file>")
    else:
        format_markdown(sys.argv[1])