import fs from 'fs/promises';

export async function load() {

    const loadImages = async () => {

        const imagesFolder = 'static/photos';

        const images = await fs.readdir(imagesFolder);

        return images;
    }

    return {
        streamed: {
            imagePaths: loadImages()
        }
    };
}