module.exports = {
  async redirects() {
    return [{ source: "/", destination: "/mail/incoming", permanent: false }];
  },
};
