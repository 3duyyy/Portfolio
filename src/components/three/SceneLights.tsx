export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={3.5} color="#e0f2fe" />
      <directionalLight position={[-3, -1, 2]} intensity={2} color="#38bdf8" />
      <pointLight position={[0, 2, -2]} intensity={12} color="#6ee7b7" />
    </>
  )
}
