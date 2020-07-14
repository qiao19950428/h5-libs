module.exports = function(modules) {
    return {
        presets: [
            require.resolve('@babel/preset-react'),
            [
                require.resolve('@babel/preset-env'),
                {
                    modules,
                    targets: {
                        browsers: [
                            'last 5 versions',
                            'Firefox ESR',
                            '> 1%',
                            'ie >= 9',
                            'iOS >= 8',
                            'Android >= 4',
                        ]
                    }
                }
            ],
        ],
        plugins: [
            require.resolve('babel-plugin-inline-import-data-uri'),
            require.resolve('@babel/plugin-transform-member-expression-literals'),
            // 支持 Object.assign(a, b);
            require.resolve('@babel/plugin-transform-object-assign'),
            require.resolve('@babel/plugin-transform-property-literals'),
            [
                require.resolve('@babel/plugin-transform-runtime'),
                {
                    helpers: false,
                },
            ],
            // 数组解构赋值
            require.resolve('@babel/plugin-transform-spread'),
            // 模板字符串`${a}b`
            require.resolve('@babel/plugin-transform-template-literals'),
            // export a from 'mob';
            require.resolve('@babel/plugin-proposal-export-default-from'),
            // export * as ns from 'mod';
            require.resolve('@babel/plugin-proposal-export-namespace-from'),
            [
                require.resolve('@babel/plugin-proposal-decorators'),
                {
                    legacy: true,
                },
            ],
            // 对象解构赋值
            require.resolve('@babel/plugin-proposal-object-rest-spread'),
            require.resolve('@babel/plugin-proposal-class-properties'),
        ],
    }
}
