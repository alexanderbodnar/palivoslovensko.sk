import re

readme_path     = "README.md"
changelog_path  = "CHANGELOG.md"

# Read the README.md & CHANEGLOG.md content
with open(readme_path, "r") as readme_file:
    readme_content = readme_file.read()
    
with open(changelog_path, "r") as changelog_file:
    changelog_content = changelog_file.read()

# Split the changelog by entries
changelog_entries = re.split(r'(● \d{2}\.\d{2}\.\d{4})<br>', changelog_content)

# Reverse the order of the entries
reversed_changelog_entries = changelog_entries[1:][::-1]
reversed_changelog = ''.join(reversed_changelog_entries)

# Insert the latest changelog into the README.md
readme_updated = re.sub(
    r'(<!-- changelog-start -->)(.*)(<!-- changelog-end -->)',
    rf'\1\n{reversed_changelog}\n\3',
    readme_content,
    flags=re.DOTALL
)

# Write the updated content back to README.md
with open(readme_path, "w") as readme_file:
    readme_file.write(readme_updated)

print("README.md has been updated with the latest changelog.")