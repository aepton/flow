export default async (setInitialStateForRound) => {
    const defaultUrl = 'https://flowdebates.sfo3.digitaloceanspaces.com/debates/37_ld_2022.json';
    const response = await fetch(defaultUrl);
    const data = await response.json();

    setInitialStateForRound(data);
}