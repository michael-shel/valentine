import fs from 'fs/promises';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function load() {

    const loadImages = async () => {

        const imagesFolder = 'src/lib/images/photos'; // Update with your actual folder path

        await delay(Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);

        const images = await fs.readdir(imagesFolder);
        
        return images;
    }

    return {
        streamed: {
            imagePaths: loadImages()
        }
    };
}