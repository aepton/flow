export default async (setCards) => {
    const defaultUrl = 'https://flowdebates.sfo3.digitaloceanspaces.com/debates/37_ld_2022.json';
    const response = await fetch(defaultUrl);
    const data = await response.json();
    const cards = [];
    data.forEach(card => {
        if (!card.id) {
            card.id = self.crypto.randomUUID();
        }
        cards.push(card);
    });
    setCards(cards);
}