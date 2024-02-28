import fs from 'fs/promises';

export async function load() {

    const loadImages = async () => {

        const imagesFolder = 'static/photos';

        let images = await fs.readdir(imagesFolder);
        if (images.length < 48) {
            const remainingCount = 48 - images.length;
            const additionalImages = new Array(remainingCount).fill(images[0]);

            images = images.concat(additionalImages);
        }
        return images;
    }

    return {
        streamed: {
            imagePaths: loadImages()
        }
    };
}