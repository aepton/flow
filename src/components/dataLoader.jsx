export default async (round, setInitialStateForRound) => {
    console.log('got round!!', round);
    const manifest = {
        '37th': 'https://flowdebates.sfo3.digitaloceanspaces.com/debates/37_ld_2022.json',
        'gop': 'https://flowdebates.sfo3.digitaloceanspaces.com/debates/gop_debate_1.json'
    };
 
    let data, response;
    if (round) {
        response = await fetch(manifest[round]);
        data = await response.json();
    } else {
        response = await fetch(manifest[Object.keys(manifest)[0]]);
        data = await response.json();
    }

    setInitialStateForRound(data);
}