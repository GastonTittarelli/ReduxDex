import { useEffect, useRef, useState } from "react";

export const CanvasAnimationIcon = ({ pokemonTypes }) => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false); 
    const numberOfImages = 20;

    const typeImageSrc = {
        normal: '/icons/normal.png',
        fire: '/icons/fire.png',
        water: '/icons/water.png',
        grass: '/icons/grass.png',
        electric: '/icons/electric.png',
        ice: '/icons/ice.png',
        fighting: '/icons/fighting.png',
        poison: '/icons/poison.png',
        ground: '/icons/ground.png',
        flying: '/icons/flying.png',
        psychic: '/icons/psychic.png',
        bug: '/icons/bug.png',
        rock: '/icons/rock.png',
        ghost: '/icons/ghost.png',
        dragon: '/icons/dragon.png',
        dark: '/icons/dark.png',
        steel: '/icons/steel.png',
        fairy: '/icons/fairy.png',
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const loadTypeImages = () => {
            const uniqueTypes = [...new Set(pokemonTypes)];
            const imagesToLoad = uniqueTypes.map(type => {
                const src = typeImageSrc[type];
                if (src) {
                    const image = new Image();
                    image.src = src;
                    return image;
                }
                return null;
            }).filter(img => img !== null);

            Promise.all(imagesToLoad.map(img => new Promise(resolve => {
                img.onload = () => resolve(img);
            })))
            .then(loadedImages => {
                const imgObjects = [];
                for (let i = 0; i < numberOfImages; i++) {
                    imgObjects.push({
                        img: loadedImages[Math.floor(Math.random() * loadedImages.length)],
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 30 + 10,
                        speedX: Math.random() * 1 - 0.5,
                        speedY: Math.random() * 1 - 0.5,
                        opacity: Math.random() * 0.5 + 0.3,
                    });
                }
                setImages(imgObjects); // Actualizar el estado de las imágenes
                setLoaded(true); // Marcar que las imágenes se han cargado
            });
        };

        const drawImage = (imageObj) => {
            ctx.globalAlpha = imageObj.opacity;
            ctx.drawImage(imageObj.img, imageObj.x, imageObj.y, imageObj.size, imageObj.size);
        };

        const updateImages = () => {
            images.forEach(imageObj => {
                imageObj.x += imageObj.speedX;
                imageObj.y += imageObj.speedY;

                if (imageObj.x > canvas.width) {
                    imageObj.x = -imageObj.size;
                }
                if (imageObj.x + imageObj.size < 0) {
                    imageObj.x = canvas.width;
                }
                if (imageObj.y > canvas.height) {
                    imageObj.y = -imageObj.size;
                }
                if (imageObj.y + imageObj.size < 0) {
                    imageObj.y = canvas.height;
                }
            });
        };

        const animateImages = () => {
            if (!loaded) return; // No animar hasta que las imágenes hayan cargado

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            images.forEach(drawImage);
            updateImages();
            requestAnimationFrame(animateImages);
        };

        loadTypeImages(); // Cargar las imágenes al inicio

        if (loaded) {
            animateImages(); // Iniciar la animación una vez que las imágenes hayan cargado
        }

        window.addEventListener('resize', () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            images.forEach(imageObj => {
                imageObj.x = Math.random() * canvas.width;
                imageObj.y = Math.random() * canvas.height;
            });
        });

        return () => window.removeEventListener('resize', () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        });

    }, [pokemonTypes, loaded]);

    return <canvas className="canvasIcono" ref={canvasRef} />;
};

