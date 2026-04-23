const BlobBackground = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
    {/* Large blue blob top-left */}
    <div
      className="absolute"
      style={{
        left: "-120px",
        top: "-100px",
        width: "520px",
        height: "520px",
        borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%",
        background: "hsl(217, 72%, 72%)",
        opacity: 0.5,
        filter: "blur(30px)",
      }}
    />
    {/* Yellow/sand blob top-right */}
    <div
      className="absolute"
      style={{
        right: "-80px",
        top: "-60px",
        width: "480px",
        height: "480px",
        borderRadius: "44% 56% 62% 38% / 52% 60% 40% 48%",
        background: "hsl(45, 93%, 78%)",
        opacity: 0.55,
        filter: "blur(25px)",
      }}
    />
    {/* Green/teal blob bottom-right */}
    <div
      className="absolute"
      style={{
        right: "-40px",
        bottom: "-60px",
        width: "440px",
        height: "440px",
        borderRadius: "54% 46% 38% 62% / 48% 56% 44% 52%",
        background: "hsl(160, 50%, 72%)",
        opacity: 0.45,
        filter: "blur(25px)",
      }}
    />
    {/* Purple/pink blob bottom-left */}
    <div
      className="absolute"
      style={{
        left: "-60px",
        bottom: "10%",
        width: "380px",
        height: "380px",
        borderRadius: "58% 42% 50% 50% / 42% 58% 42% 58%",
        background: "hsl(280, 50%, 78%)",
        opacity: 0.35,
        filter: "blur(30px)",
      }}
    />
    {/* Small green accent center-right */}
    <div
      className="absolute"
      style={{
        right: "15%",
        top: "45%",
        width: "250px",
        height: "250px",
        borderRadius: "50% 50% 42% 58% / 58% 42% 58% 42%",
        background: "hsl(152, 48%, 68%)",
        opacity: 0.35,
        filter: "blur(20px)",
      }}
    />
  </div>
);

export default BlobBackground;
