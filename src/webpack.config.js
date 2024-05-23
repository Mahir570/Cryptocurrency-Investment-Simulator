export const resolve = {
    fallback: {
        buffer: require.resolve('buffer/')
    }
};
export const plugins = [
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
    })
];
  