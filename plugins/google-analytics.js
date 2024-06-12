export default ({ app }) => {
  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-LPQW2T7W2D"); // Ganti dengan ID pelacakan Google Analytics yang sesungguhnya
};
