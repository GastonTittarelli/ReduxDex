import { useEffect, useRef } from 'react';

export const CanvasAnimationShine = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    // Ajusta el tamaño del canvas al tamaño del viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cargar la imagen
    const image = new Image();
    image.src = require('../../public/brillo2.png');

    // Array para las imágenes
    const images = [];
    const numberOfImages = 40;

    // Configuración de las imágenes
    image.onload = () => {
      for (let i = 0; i < numberOfImages; i++) {
        images.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 10, // Tamaño inicial
          maxSize: Math.random() * 60 + 20, // Tamaño máximo
          speed: Math.random() * 0.06 + 0.02, // Velocidad de crecimiento
          alpha: 0, // Transparencia inicial
          alphaChange: Math.random() * 0.03 + 0.01 // Velocidad de cambio de transparencia
        });
      }
      animate();
    };

    function drawImage(imageData) {
      ctx.save();
      ctx.globalAlpha = imageData.alpha;
      ctx.drawImage(image, imageData.x, imageData.y, imageData.size, imageData.size);
      ctx.restore();
    }

    function updateImages() {
      images.forEach(imageData => {
        imageData.size += imageData.speed; // Aumenta el tamaño
        imageData.alpha += imageData.alphaChange; // Cambia la transparencia

        // Si la imagen alcanza su tamaño máximo o transparencia máxima, reiníciala
        if (imageData.size >= imageData.maxSize || imageData.alpha >= 1) {
          imageData.x = Math.random() * canvas.width;
          imageData.y = Math.random() * canvas.height;
          imageData.size = Math.random() * 30 + 10;
          imageData.maxSize = Math.random() * 60 + 20;
          imageData.alpha = 0;
          imageData.alphaChange = Math.random() * 0.03 + 0.01;
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
      images.forEach(drawImage);
      updateImages();
      requestAnimationFrame(animate); // Hace que la animación sea infinita
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Opcional: actualizar las posiciones de las imágenes según el nuevo tamaño
      images.forEach(imageData => {
        imageData.x = Math.random() * canvas.width;
        imageData.y = Math.random() * canvas.height;
      });
    }

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="dropsCanvas" />;
};





