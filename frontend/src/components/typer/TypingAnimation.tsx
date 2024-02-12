import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Chat With Your Own AI",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "Built with OpenAI",
        2000,
        "Your Own Customized ChatGPT",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "#7FFFD4",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export { TypingAnimation };
