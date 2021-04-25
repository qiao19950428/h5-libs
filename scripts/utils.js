const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const cwd = process.cwd();

/**
 * 获取文件或文件夹路径
 * @param  {...any} filePath 文件或文件夹名
 */
function getProjectPath(...filePath) {
    return path.join(cwd, ...filePath);
}

/**
 * 引用样式由 less 修改为 css
 * @param {String} content 文件内容
 */
function cssInjection(content) {
    return content
        .replace(/\/style\/?'/g, "/style/css'")
        .replace(/\/style\/?"/g, '/style/css"')
        .replace(/\.less/g, '.css');
}

function replacePath(src) {
    if (src.node.source && /\/lib\//.test(src.node.source.value)) {
        const esModule = src.node.source.value.replace('/lib/', '/es/');
        const esPath = path.dirname(getProjectPath('node_modules', esModule));
        if (fs.existsSync(esPath)) {
            src.node.source.value = esModule;
        }
    }
}

function replaceLib() {
    return {
        visitor: {
            ImportDeclaration: replacePath,
            ExportNamedDeclaration: replacePath,
        },
    };
}

function runCmd(cmd, _args, fn) {
    const args = _args || [];
    const runner = spawn(cmd, args, {
        stdio: 'inherit',
        env: 'production',
    });
    runner.on('close', (code) => {
        if (fn) {
            fn(code);
        }
    });
}

module.exports = {
    getProjectPath,
    cssInjection,
    replaceLib,
    runCmd,
}
