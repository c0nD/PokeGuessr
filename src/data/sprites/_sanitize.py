import os

def sanitize_input(input: str) -> str:
    return ''.join(e for e in input.lower() if e.isalnum())

for filename in os.listdir('.'):
    if filename.endswith('.png'):
        sanitized_name = sanitize_input(os.path.splitext(filename)[0]) + '.png'
        old_path = os.path.join('.', filename)
        new_path = os.path.join('.', sanitized_name)
        os.rename(old_path, new_path)

print("Renaming complete.")
