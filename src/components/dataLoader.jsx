export default dataLoader = () => {
    const response = fetch('https://flowdebates.sfo3.digitaloceanspaces.com/debates/37_ld_2022.json');
    return response.json();
}