export default () => {
    const response = fetch('https://flowdebates.sfo3.digitaloceanspaces.com/debates/37_ld_2022.json');
    const cards = response.json();
    cards.forEach(card => {
    if (!card.id) {
        card.id = self.crypto.randomUUID();
    }
    });
    return cards;
}