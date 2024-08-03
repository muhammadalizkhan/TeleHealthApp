const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Default configuration
const defaultConfig = getDefaultConfig(__dirname);

// Custom configuration for SVG support
const svgConfig = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
};

const config = mergeConfig(defaultConfig, svgConfig);

module.exports = config;
