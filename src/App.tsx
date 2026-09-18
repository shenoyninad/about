import DepthText from "./components/DepthText";

function App() {
  return (
    <main className="min-h-svh flex items-center justify-center bg-[#361b2b]">
      <DepthText
        text="Ninad Shenoy"
        layers={34}
        depth={2.4}
        faceColor="#ffffff"
        depthColor="#361b2b"
        tilt={7.5}
        pointerTracking
        smoothing={0.14}
        perspective={900}
        autoOrbit
        orbitSpeed={0.35}
        fontSize="clamp(4.5rem, 16vw, 11rem)"
        fontWeight={900}
        shadow
      />
    </main>
  );
}

export default App;
