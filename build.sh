echo 删除临时目录
rm -rf h5-libs.tar.gz

echo 组件编译
npm install
npm run build

echo 生成组件包
mkdir -p temp
cp -R dist es lib package.json README.md temp
tar czf h5-libs.tar.gz temp
rm -rf temp
