import { useEffect, useRef } from "react";
// @ts-ignore
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let globe: any = null;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 40000,
        mapBrightness: 12,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [0.1, 0.8, 1],
        markers: [],
        onRender: (state: any) => {
          state.phi = phi;
          phi += 0.002;
          state.width = width * 2;
          state.height = width * 2;
        },
      });
    } catch (err) {
      console.error('Failed to create globe:', err);
    }

    return () => {
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <div className="w-full max-w-[600px] md:max-w-[700px] aspect-square opacity-80 translate-y-10 md:translate-y-20">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
