export async function waitRandomTime() {
    const randomTime = Math.floor(Math.random() * 10);
    return new Promise(resolve => setTimeout(resolve, randomTime));
}