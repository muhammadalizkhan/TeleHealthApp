const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

// Default configuration
const defaultConfig = getDefaultConfig(__dirname);

// Custom configuration for SVG support and events module
const customConfig = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
        extraNodeModules: {
            events: path.resolve(__dirname, 'node_modules/events'),
        },
    },
};

const config = mergeConfig(defaultConfig, customConfig);

module.exports = config;
