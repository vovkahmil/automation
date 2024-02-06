import fs from 'fs/promises';

export async function readJsonFile(filePath) {
    try {
        const jsonString = await fs.readFile(filePath, 'utf8');
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    } catch (error) {

    }
}
