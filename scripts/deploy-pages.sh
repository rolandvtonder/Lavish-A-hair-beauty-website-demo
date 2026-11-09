#!/usr/bin/env bash
# Builds the site for GitHub Pages and publishes dist/ to the gh-pages branch.
# Usage (from the website folder): bash scripts/deploy-pages.sh
set -euo pipefail

REPO="https://github.com/rolandvtonder/Lavish-A-hair-beauty-website-demo.git"

npm run build:pages
cd dist
touch .nojekyll   # serve files as-is, no Jekyll processing
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -qm "Deploy site $(date +%Y-%m-%d)"
git push -f "$REPO" gh-pages
rm -rf .git
echo "Published: https://rolandvtonder.github.io/Lavish-A-hair-beauty-website-demo/"
