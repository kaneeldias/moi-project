export async function waitRandomTime() {
    const randomTime = Math.floor(Math.random() * 0);
    return new Promise(resolve => setTimeout(resolve, randomTime));
}