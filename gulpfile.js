const webpack = require('webpack');
const gulp = require('gulp');
const babel = require('gulp-babel');
const stripCode = require('gulp-strip-code');
const eslint = require('gulp-eslint');
const through2 = require('through2');
const rimraf = require('rimraf');
const merge2 = require('merge2');
const chalk = require('chalk');
const { execSync } = require('child_process');
const clearConsole = require('react-dev-utils/clearConsole');
const WebpackDevServer = require('webpack-dev-server');
const {
    choosePort,
    createCompiler,
    prepareProxy,
    prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const packageJson = require('./package.json');
const webpackConfig = require('./webpack.config');
const demoConfig = require('./webpack.config.demo');
const createDevServerConfig = require('./scripts/webpackDevServer.config');
const getBabelCommonConfig = require('./scripts/getBabelCommonConfig');
const transformLess = require('./scripts/transformLess');
const {
    getProjectPath, cssInjection, replaceLib, runCmd
} = require('./scripts/utils');

const isInteractive = process.stdout.isTTY;

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';


const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

function dist(done) {
    rimraf.sync(getProjectPath('dist'));
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }

        const buildInfo = stats.toString({
            colors: true,
            children: true,
            chunks: false,
            modules: false,
            chunkModules: false,
            hash: false,
            version: false,
        });
        console.log(buildInfo);
        done(0);
    });
}

function babelify(modules) {
    const babelConfig = getBabelCommonConfig(modules);
    delete babelConfig.cacheDirectory;
    if (modules === false) {
        babelConfig.plugins.push(replaceLib);
    } else {
        babelConfig.plugins.push(require.resolve('babel-plugin-add-module-exports'));
    }
    const source = [ 'src/**/*.jsx', 'src/**/*.js' ];
    let stream = gulp.src(source).pipe(babel(babelConfig)).pipe(
        through2.obj(function z(file, encoding, next) {
            this.push(file.clone());
            if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
                const content = file.contents.toString(encoding);
                // 引用样式由 less 修改为 css，同时生成 css.js 文件
                file.contents = Buffer.from(cssInjection(content));
                file.path = file.path.replace(/index\.js/, 'css.js');
                this.push(file);
                next();
            } else {
                next();
            }
        })
    );
    if (modules === false) {
        stream = stream.pipe(
            stripCode({
                start_comment: '@remove-on-es-build-begin',
                end_comment: '@remove-on-es-build-end',
            })
        );
    }
    return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

/**
 * 编译.less、.jsx、.png、.svg
 * @param {bool} modules
 */
function compile(modules) {
    rimraf.sync(modules !== false ? libDir : esDir);
    const lessC = gulp
        .src([ 'src/**/**/*.less' ])
        .pipe(
            through2.obj(function z(file, encoding, next) {
                this.push(file.clone());
                // 编译 style/index.less
                if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/)) {
                    transformLess(file.path)
                        .then((css) => {
                            file.contents = Buffer.from(css);
                            file.path = file.path.replace(/\.less$/, '.css');
                            this.push(file);
                            next();
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                } else {
                    next();
                }
            })
        )
        .pipe(gulp.dest(modules === false ? esDir : libDir));
    const assets = gulp
        .src([ 'src/**/**/*.@(png|svg)' ])
        .pipe(gulp.dest(modules === false ? esDir : libDir));
    const fileStream = babelify(modules);
    return merge2([ lessC, fileStream, assets ]);
}

/**
 * demo 编译
 * @param {func} done
 */
function start(done) {
    if (process.env.HOST) {
        console.log(
            chalk.cyan(
                `Attempting to bind to HOST environment variable: ${chalk.yellow(
                    chalk.bold(process.env.HOST)
                )}`
            )
        );
        console.log(
            'If this was unintentional, check that you haven\'t mistakenly set it in your shell.'
        );
        console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`);
        console.log();
    }

    choosePort(HOST, DEFAULT_PORT)
        .then((port) => {
            if (port == null) {
                // We have not found a port.
                return;
            }
            const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
            const appName = packageJson.name;
            const urls = prepareUrls(protocol, HOST, port);
            // Create a webpack compiler that is configured with custom messages.
            const compiler = createCompiler(webpack, demoConfig, appName, urls, false);
            const proxySetting = packageJson.proxy;
            const proxyConfig = prepareProxy(proxySetting, getProjectPath('./demo'));
            // Serve webpack assets generated by the compiler over a web sever.
            const serverConfig = createDevServerConfig(
                proxyConfig,
                urls.lanUrlForConfig
            );
            const devServer = new WebpackDevServer(compiler, serverConfig);
            // Launch WebpackDevServer.
            devServer.listen(port, HOST, (err) => {
                if (err) {
                    return console.log(err);
                }
                if (isInteractive) {
                    clearConsole();
                }
                console.log(chalk.cyan('Starting the development server...\n'));
                openBrowser(urls.localUrlForBrowser);
            });

            [ 'SIGINT', 'SIGTERM' ].forEach((sig) => {
                process.on(sig, () => {
                    devServer.close();
                    done();
                    process.exit();
                });
            });
        }).catch((err) => {
            if (err && err.message) {
                console.log(err.message);
            }
            done();
            process.exit(1);
        });
}

/**
 * 编译发布到 gitlab
 * @param {func} done
 */
function publish(done) {
    dist((code) => {
        if (code) {
            done(code);
            return;
        }
        const notOk = !packageJson.version.match(/^\d+\.\d+\.\d+$/);
        if (notOk) {
            console.log('The version code is wrong, please check it in package.json!');
            return;
        }
        execSync('npm publish');
        done(code);
    });
}

gulp.task('lint', (done) => {
    gulp.src([ 'src/components/**/*.jsx', 'src/network/*.js', 'src/utils/*.js' ])
        .pipe(eslint('.eslintrc.js'))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    done();
});

gulp.task('dist', (done) => {
    dist(done);
});

gulp.task('compile-with-es', (done) => {
    console.log('[Parallel] Compile to es...');
    compile(false).on('finish', done);
});

gulp.task('compile-with-lib', (done) => {
    console.log('[Parallel] Compile to js...');
    compile().on('finish', done);
});

gulp.task('compile', gulp.series('lint', gulp.parallel('compile-with-es', 'compile-with-lib')));

gulp.task('build', gulp.series('dist', gulp.parallel('compile-with-es', 'compile-with-lib')));

gulp.task('start', gulp.series('compile', (done) => {
    start(done);
}));

gulp.task('pub', gulp.series('compile', (done) => {
    publish(done);
}));
