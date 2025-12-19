#!/bin/bash
# shadcn-vue component downloader for Nuxt 4
# Bypasses broken CLI by downloading directly from GitHub
# Usage: ./scripts/shadcn-download.sh <component-name>
# Example: ./scripts/shadcn-download.sh sidebar

set -e

COMPONENT=$1
BRANCH="dev"
STYLE="new-york-v4"
REPO="unovue/shadcn-vue"
BASE_PATH="apps/v4/registry/${STYLE}/ui/${COMPONENT}"
RAW_URL="https://raw.githubusercontent.com/${REPO}/${BRANCH}"
API_URL="https://api.github.com/repos/${REPO}/contents/${BASE_PATH}?ref=${BRANCH}"
TARGET_DIR="app/components/ui/${COMPONENT}"

if [ -z "$COMPONENT" ]; then
  echo "Usage: $0 <component-name>"
  echo "Example: $0 sidebar"
  exit 1
fi

echo "📦 Downloading shadcn-vue component: ${COMPONENT}"
echo "   From: ${BASE_PATH}"
echo "   To:   ${TARGET_DIR}"
echo ""

# Create target directory
mkdir -p "${TARGET_DIR}"

# Get list of files from GitHub API
echo "🔍 Fetching file list..."
FILES=$(curl -s "${API_URL}" | grep '"name"' | sed 's/.*"name": "\([^"]*\)".*/\1/')

if [ -z "$FILES" ]; then
  echo "❌ No files found for component '${COMPONENT}'"
  echo "   Check if the component exists at: https://github.com/${REPO}/tree/${BRANCH}/${BASE_PATH}"
  exit 1
fi

# Download each file
for FILE in $FILES; do
  echo "   ⬇️  ${FILE}"
  curl -s "${RAW_URL}/${BASE_PATH}/${FILE}" -o "${TARGET_DIR}/${FILE}"
done

echo ""
echo "🔧 Fixing import paths for Nuxt..."

# Fix imports in all downloaded files
find "${TARGET_DIR}" -type f \( -name "*.vue" -o -name "*.ts" \) | while read -r FILE; do
  # Fix @/lib/utils -> ~/lib/utils
  sed -i 's|@/lib/utils|~/lib/utils|g' "$FILE"

  # Fix @/registry/new-york-v4/ui/ -> ~/components/ui/
  sed -i 's|@/registry/new-york-v4/ui/|~/components/ui/|g' "$FILE"

  # Fix @/components/ui/ -> ~/components/ui/
  sed -i 's|@/components/ui/|~/components/ui/|g' "$FILE"
done

echo "✅ Component '${COMPONENT}' downloaded successfully!"
echo ""
echo "Files created:"
ls -la "${TARGET_DIR}"
