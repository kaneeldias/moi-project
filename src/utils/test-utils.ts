export async function waitRandomTime() {
    const randomTime = Math.floor(Math.random() * 2000);
    return new Promise(resolve => setTimeout(resolve, randomTime));
}