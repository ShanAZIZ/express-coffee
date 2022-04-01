BUILD_DIR="./dist"

if [ -d "$BUILD_DIR" ]; then
  rm -r "$BUILD_DIR"
fi

npx tsc

