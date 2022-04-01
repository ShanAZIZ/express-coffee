DEPLOY_DIR="./heroku-app"
BUILD_DIR="./dist"
TRANSPILE_SCRIPT="./transpile.sh"
PACKAGE_JSON="./package.json"

### Check for dir, if not found create it using the mkdir ##
if [ ! -d "$DEPLOY_DIR" ]; then
  mkdir -p "$DEPLOY_DIR"
  cd "$DEPLOY_DIR"
  git init
  heroku git:remote -a express-cafe-demo-saziz
  cd ..
fi

## Launch the transpile script
chmod +x "$TRANSPILE_SCRIPT"

"$TRANSPILE_SCRIPT"


## copy all the builded in DEPLOY_DIR
if [ -d "$BUILD_DIR" ]; then
  cp -r "$BUILD_DIR" "$DEPLOY_DIR"/
  cp "$PACKAGE_JSON" "$DEPLOY_DIR"/package.json
  echo "Copying all the files"
  cd "$DEPLOY_DIR"
  pwd
  git add .
  git commit -am "make it better"
  git push heroku master -f
else
  echo "Build dir does not exists"
fi