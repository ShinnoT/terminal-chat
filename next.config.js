const nextConfig = {
    // react strict mode disabled as it re-runs components and useEffect twice for development purposes (bug finding)
    reactStrictMode: false,

    // for import 'supports-color' issue BUT THIS IS EXPERIMENTAL
    // experimental: {
    //     esmExternals: "loose",
    // },
};

module.exports = {
    ...nextConfig,
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        // Important: return the modified config
        if (isServer) {
            config.externals.push({
                bufferutil: "bufferutil",
                "utf-8-validate": "utf-8-validate",
                "supports-color": "supports-color",
            });
        }
        return config;
    },
};
