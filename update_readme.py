import re

readme_path     = "README.md"
changelog_path  = "CHANGELOG.md"

# Read the README.md & CHANEGLOG.md content
with open(readme_path, "r") as readme_file:
    readme_content = readme_file.read()
    
with open(changelog_path, "r") as changelog_file:
    changelog_content = changelog_file.read()

# Extract the latest release notes
latest_changelog = re.split(r'\n## ', changelog_content, maxsplit=1)[0]

# Insert the latest changelog into the README.md
readme_updated = re.sub(
    r'(<!-- changelog-start -->)(.*)(<!-- changelog-end -->)',
    rf'\1\n{latest_changelog}\n\3',
    readme_content,
    flags=re.DOTALL
)

# Write the updated content back to README.md
with open(readme_path, "w") as readme_file:
    readme_file.write(readme_updated)

print("README.md has been updated with the latest changelog.")